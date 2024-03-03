import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-1070b179.js";const t="/assets/NioEventLoop的run方法-0798ca7c.png",p={},o=e(`<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>新建</td><td>2022年2月23日18:38:06</td></tr><tr><td>V2</td><td>重构</td><td>2023年05月21日14:50:59</td></tr></tbody></table><h2 id="引入" tabindex="-1"><a class="header-anchor" href="#引入" aria-hidden="true">#</a> 引入</h2><p>前面文章已经分析了，NioEventLoop 和一个线程绑定并且启动的流程。线程启动最终调用的方法就是 NioEventLoop#run 方法（当然还有别的 EventLoop 的实现）。</p><p>本篇主要分析 NioEventLoop#run 的实现逻辑。</p><h2 id="nioeventloop-run-核心逻辑分析" tabindex="-1"><a class="header-anchor" href="#nioeventloop-run-核心逻辑分析" aria-hidden="true">#</a> NioEventLoop#run 核心逻辑分析</h2><h3 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h3><p>NioEventLoop#run 方法的代码比较长，直接看代码比较难懂，先简要了解下该方法的大概的处理思路。</p><p>首先我们需要知道的是 NioEventLoop 中需要执行那些任务：</p><ul><li>调度任务队列 AbstractScheduledEventExecutor#scheduledTaskQueue 中的任务，前面文章已经分析过；</li><li>普通的任务队列 SingleThreadEventExecutor#taskQueue 中的任务；</li><li>尾部队列 SingleThreadEventLoop#tailTasks 中的任务；（这个队列没看到怎么用，应该不重要）</li><li>处理通道的 I/O 事件；</li></ul><p>NioEventLoop#run 内部就是一个死循环，循环查找是否有上面要执行的任务到了执行的时间了，如果有任务要执行就去执行对应的任务，I/O 事件。</p><p>NioEventLoop#run 方法比较长，下面分步分析，分步分析的代码会精简一点，最后会贴出整个 NioEventLoop#run 的源代码。</p><h3 id="查找要执行的任务" tabindex="-1"><a class="header-anchor" href="#查找要执行的任务" aria-hidden="true">#</a> 查找要执行的任务</h3><p>下面是死循环中，查找要执行任务的逻辑，省略了真正执行任务的代码。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// epoll bug的一个特征计数变量</span>
    <span class="token keyword">int</span> selectCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 1. &gt;= 0 表示Selector的返回值，注册在Selector上就绪事件的个数</span>
            <span class="token comment">// 2. &lt; 0 状态常量 CONTINUE BUSY_WAIT SELECT</span>
            <span class="token keyword">int</span> strategy<span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token comment">// 根据当前NioEventLoop是否有任务，来判断</span>
                <span class="token comment">// 1.有任务，调用Selector的selectNow()方法，返回就绪事件的个数</span>
                <span class="token comment">// 2.没有任务，直接返回SELECT 也就是-1</span>
                strategy <span class="token operator">=</span> selectStrategy<span class="token punctuation">.</span><span class="token function">calculateStrategy</span><span class="token punctuation">(</span>selectNowSupplier<span class="token punctuation">,</span> <span class="token function">hasTasks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">switch</span> <span class="token punctuation">(</span>strategy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">case</span> <span class="token class-name">SelectStrategy</span><span class="token punctuation">.</span><span class="token constant">CONTINUE</span><span class="token operator">:</span>
                        <span class="token keyword">continue</span><span class="token punctuation">;</span>

                    <span class="token keyword">case</span> <span class="token class-name">SelectStrategy</span><span class="token punctuation">.</span><span class="token constant">BUSY_WAIT</span><span class="token operator">:</span>
                        <span class="token comment">// fall-through to SELECT since the busy-wait is not supported with NIO</span>

                    <span class="token keyword">case</span> <span class="token class-name">SelectStrategy</span><span class="token punctuation">.</span><span class="token constant">SELECT</span><span class="token operator">:</span>
                        <span class="token comment">// 返回下一个计划任务准备运行的截止时间纳秒值</span>
                        <span class="token comment">// 返回-1表示 NioEventLoop中没有需要周期性调度的任务</span>
                        <span class="token keyword">long</span> curDeadlineNanos <span class="token operator">=</span> <span class="token function">nextScheduledTaskDeadlineNanos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>curDeadlineNanos <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1L</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token comment">// 将 curDeadlineNanos 设置为 Long.MAX_VALUE，</span>
                            curDeadlineNanos <span class="token operator">=</span> <span class="token constant">NONE</span><span class="token punctuation">;</span> <span class="token comment">// nothing on the calendar</span>
                        <span class="token punctuation">}</span>
                        <span class="token comment">// 设置 超时等待时间</span>
                        nextWakeupNanos<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>curDeadlineNanos<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">try</span> <span class="token punctuation">{</span>
                            <span class="token comment">// 条件成立：表示没有本地普通任务 需要执行</span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasTasks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                <span class="token comment">// curDeadlineNanos</span>
                                <span class="token comment">// 1. NONE</span>
                                <span class="token comment">// 2. 表示周期性任务需要执行的 截止时间</span>
                                strategy <span class="token operator">=</span> <span class="token function">select</span><span class="token punctuation">(</span>curDeadlineNanos<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                            <span class="token comment">// This update is just to help block unnecessary selector wakeups</span>
                            <span class="token comment">// so use of lazySet is ok (no race condition)</span>
                            nextWakeupNanos<span class="token punctuation">.</span><span class="token function">lazySet</span><span class="token punctuation">(</span><span class="token constant">AWAKE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        <span class="token comment">// fall through</span>
                    <span class="token keyword">default</span><span class="token operator">:</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// https://github.com/netty/netty/issues/8566</span>
                <span class="token comment">// 出现 I/O 异常时重新构建Selector</span>
                <span class="token function">rebuildSelector0</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                selectCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                <span class="token function">handleLoopException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// ......省略处理任务的代码......</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一步：判断是否有任务需要执行。</p><ol><li><p><code>hasTasks()</code> 判断当前 NioEventLoop 的队列中是否有任务。</p><ol><li>有任务：那么无需等待 I/O 事件，调用<code>selector.selectNow()</code>方法获取已经就绪的事件的个数，并赋值给 strategy 变量。此方法不阻塞线程；</li><li>没有任务：直接返回 <code>SelectStrategy.SELECT</code>，也就是 -1，赋值给 strategy 变量；</li></ol></li><li><p>根据 strategy 变量的值判断</p><ol><li><p>strategy 是 <code>SelectStrategy.SELECT</code> ，也就是 -1，此时需要查询 schedule 调度任务队列是否存在已经到了执行时间的任务了，方法<code>nextScheduledTaskDeadlineNanos()</code>返回值 curDeadlineNanos 可能是-1，也可能是一个时间戳。-1 表示 schedule 任务队列中没有调度任务，返回时间戳表示调度任务队列中的队首任务的执行时间；</p><p>获取到 curDeadlineNanos 的值后，调用<code>select(long deadlineNanos) </code>方法阻塞线程，尝试获取就绪的 I/O 任务；</p></li><li><p>strategy 不是 <code>SelectStrategy.SELECT</code>，继续往下走后面处理任务的代码；</p></li></ol></li></ol><h3 id="处理-i-o-事件和其他任务" tabindex="-1"><a class="header-anchor" href="#处理-i-o-事件和其他任务" aria-hidden="true">#</a> 处理 I/O 事件和其他任务</h3><p>走到下面的代码，strategy 变量就表示 channel上就绪事件的个数。要么就是有 I/O 事件就绪了，要么就是有普通任务和调度任务，或者是JDK 的空轮询 BUG。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// epoll bug的一个特征计数变量</span>
    <span class="token keyword">int</span> selectCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            
            <span class="token comment">// ......省略查找要任务的代码......</span>

            <span class="token comment">// 走到此处，strategy就表示 channel上就绪事件的个数</span>
            <span class="token comment">// 要么就是有I/O事件，要么就是有scheduledTask，或者是JDK的 epoll 的空轮询 BUG</span>

            selectCnt<span class="token operator">++</span><span class="token punctuation">;</span>
            cancelledKeys <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            needsToSelectAgain <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

            <span class="token comment">// 线程处理IO事件的时间占比，默认是50%</span>
            <span class="token keyword">final</span> <span class="token keyword">int</span> ioRatio <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ioRatio<span class="token punctuation">;</span>
            <span class="token comment">// 表示本轮线程有没有处理过本地任务</span>
            <span class="token keyword">boolean</span> ranTasks<span class="token punctuation">;</span>
            <span class="token comment">// 条件成立表示IO优先，IO处理完之后，再处理本地任务</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ioRatio <span class="token operator">==</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 条件成立：说明当前NIoEventLoop的Selector上有就绪事件</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>strategy <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 处理IO事件</span>
                        <span class="token function">processSelectedKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                    <span class="token comment">// Ensure we always run tasks.</span>
                    <span class="token comment">// 确保运行了所有待执行任务，包括ScheduledTask任务</span>
                    <span class="token comment">// 执行本地任务队列的任务</span>
                    ranTasks <span class="token operator">=</span> <span class="token function">runAllTasks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 条件成立，说明当前NIoEventLoop的Selector上有就绪事件</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>strategy <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">final</span> <span class="token keyword">long</span> ioStartTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token function">processSelectedKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                    <span class="token comment">// Ensure we always run tasks.</span>
                    <span class="token comment">// IO事件处理总耗时</span>
                    <span class="token keyword">final</span> <span class="token keyword">long</span> ioTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> ioStartTime<span class="token punctuation">;</span>
                    <span class="token comment">// 计算执行本地队列任务的最大时间，根据ioRatio，有可能遗留一部分任务等待下次执行</span>
                    ranTasks <span class="token operator">=</span> <span class="token function">runAllTasks</span><span class="token punctuation">(</span>ioTime <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">100</span> <span class="token operator">-</span> ioRatio<span class="token punctuation">)</span> <span class="token operator">/</span> ioRatio<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 条件成立，说明当前NioEventLoop上没有就绪事件，只处理本地任务就行了</span>
            <span class="token comment">// 也就是说没有IO事件了</span>
            <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 最多只能执行64个任务</span>
                ranTasks <span class="token operator">=</span> <span class="token function">runAllTasks</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// This will run the minimum number of tasks</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>ranTasks <span class="token operator">||</span> strategy <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 要么有任务运行，要么有 IO 事件处理</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>selectCnt <span class="token operator">&gt;</span> <span class="token constant">MIN_PREMATURE_SELECTOR_RETURNS</span> <span class="token operator">&amp;&amp;</span> logger<span class="token punctuation">.</span><span class="token function">isDebugEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;Selector.select() returned prematurely {} times in a row for Selector {}.&quot;</span><span class="token punctuation">,</span>
                            selectCnt <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> selector<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 正常流程进到这里面，NioEventLoop线程从Selector唤醒后工作，是因为有IO事件</span>
                selectCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 处理nio的bug</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">unexpectedSelectorWakeup</span><span class="token punctuation">(</span>selectCnt<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Unexpected wakeup (unusual case)</span>
                <span class="token comment">// 即没有任务运行，也没有IO 事件处理，就有可能是 JDK 的 epoll 的空轮询 BUG</span>
                <span class="token comment">// 调用 unexpectedSelectorWakeup(selectCnt) 方法处理。</span>
                <span class="token comment">// 可能会重新建立 Select</span>
                selectCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> 
        
        <span class="token comment">// ......省略异常处理和关闭执行器的代码......</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步：处理 I/O 事件和任务</p><p>根据成员变量 ioRatio 来判断，ioRatio的含义是表示在一次循环中 I/O 时间占一个循环时间的比例</p><ol><li>假如 ioRatio 是 100，则表示此次循环的时候 I/O 任务优先处理，处理完后再处理所有本地任务；</li><li>假如 ioRatio 是其他，默认是 50，表示此次循环中先处理 I/O 任务，计算处理 I/O 任务的耗时，通过<code>ioTime * (100 - ioRatio) / ioRatio</code>，来计算本地任务的允许的最大执行时间；</li></ol><blockquote><p>ioRatio 目前 Netty 没有提供参数来配置，默认是 50。</p></blockquote><p>下面是几个处理的方法：</p><ul><li>NioEventLoop#processSelectedKeys：处理 I/O 任务；</li><li>SingleThreadEventExecutor#runAllTasks()：处理所有调度任务、普通任务；</li><li>SingleThreadEventExecutor#runAllTasks(long)：其中 long 参数是通过 ioRatio 属性来决定的，表示处理调度任务和普通任务允许的最大消耗时间；</li></ul><p>关于这几个方法下面小结单独分析，这里先跳过。</p><h3 id="处理-jdk-空循环-bug" tabindex="-1"><a class="header-anchor" href="#处理-jdk-空循环-bug" aria-hidden="true">#</a> 处理 JDK 空循环 bug</h3><p>第三步：处理 NIO 的空循环 bug（此处不讲，下面专门一小节讲）</p><p>假如确定了是 NIO 的空循环 bug，那么需要重新构建一个 Selector。</p><p>此处略。下一篇单独分析</p><h3 id="关闭执行器的逻辑" tabindex="-1"><a class="header-anchor" href="#关闭执行器的逻辑" aria-hidden="true">#</a> 关闭执行器的逻辑</h3><p>上一篇文章已经分析过 NioEventLoop 有 5 个状态，分别是 ST_TERMINATED、ST_SHUTDOWN、 ST_SHUTTING_DOWN、 ST_STARTED、 ST_NOT_STARTED。它们之间的状态转换见上一篇文章。</p><p>在 NioEventLoop#run 的死循环中，最后一部分就是检查执行器的逻辑，假如执行器关闭了，就需要走关闭 NioEventLoop 的逻辑了。对应代码就是 NioEventLoop#run 中的 finally 代码块了。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token comment">// Always handle shutdown even if the loop processing threw an exception.</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isShuttingDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果事件轮询器开始 shutdown，就要关闭 IO 资源</span>
            <span class="token function">closeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">confirmShutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Error</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">handleLoopException</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第四步：调用 <code>isShuttingDown()</code> 判断是否调用了 shutdown 相关的方法，假如已经调用了，那么就将执行退出循环操作。</p><ol><li>调用<code>closeAll();</code>清理资源，例如把原本注册再 selector 上的所有 Channel 都关闭，触发 unregistered事件等。</li><li>调用<code>confirmShutdown()</code>确认是否可以 shutdown。假如返回 true，则退出循环。</li></ol><p>关于 <code>confirmShutdown()</code> 方法，后面单独一篇文章分析。</p><h3 id="nioeventloop-run-整体代码" tabindex="-1"><a class="header-anchor" href="#nioeventloop-run-整体代码" aria-hidden="true">#</a> NioEventLoop#run 整体代码</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// epoll bug的一个特征计数变量</span>
    <span class="token keyword">int</span> selectCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 1. &gt;= 0 表示Selector的返回值，注册在Selector上就绪事件的个数</span>
            <span class="token comment">// 2. &lt; 0 状态常量 CONTINUE BUSY_WAIT SELECT</span>
            <span class="token keyword">int</span> strategy<span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token comment">// 根据当前NioEventLoop是否有任务，来判断</span>
                <span class="token comment">// 1.有任务，调用Selector的selectNow()方法，返回就绪事件的个数</span>
                <span class="token comment">// 2.没有任务，直接返回SELECT 也就是-1</span>
                strategy <span class="token operator">=</span> selectStrategy<span class="token punctuation">.</span><span class="token function">calculateStrategy</span><span class="token punctuation">(</span>selectNowSupplier<span class="token punctuation">,</span> <span class="token function">hasTasks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">switch</span> <span class="token punctuation">(</span>strategy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token class-name">SelectStrategy</span><span class="token punctuation">.</span><span class="token constant">CONTINUE</span><span class="token operator">:</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>

                <span class="token keyword">case</span> <span class="token class-name">SelectStrategy</span><span class="token punctuation">.</span><span class="token constant">BUSY_WAIT</span><span class="token operator">:</span>
                    <span class="token comment">// fall-through to SELECT since the busy-wait is not supported with NIO</span>

                <span class="token keyword">case</span> <span class="token class-name">SelectStrategy</span><span class="token punctuation">.</span><span class="token constant">SELECT</span><span class="token operator">:</span>
                    <span class="token comment">// 返回下一个计划任务准备运行的截止时间纳秒值</span>
                    <span class="token comment">// 返回-1表示 NioEventLoop中没有需要周期性调度的任务</span>
                    <span class="token keyword">long</span> curDeadlineNanos <span class="token operator">=</span> <span class="token function">nextScheduledTaskDeadlineNanos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>curDeadlineNanos <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1L</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 将 curDeadlineNanos 设置为 Long.MAX_VALUE，</span>
                        curDeadlineNanos <span class="token operator">=</span> <span class="token constant">NONE</span><span class="token punctuation">;</span> <span class="token comment">// nothing on the calendar</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">// 设置 超时等待时间</span>
                    nextWakeupNanos<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>curDeadlineNanos<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 条件成立：表示没有本地普通任务 需要执行</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasTasks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token comment">// curDeadlineNanos</span>
                            <span class="token comment">// 1. NONE</span>
                            <span class="token comment">// 2. 表示周期性任务需要执行的 截止时间</span>
                            strategy <span class="token operator">=</span> <span class="token function">select</span><span class="token punctuation">(</span>curDeadlineNanos<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                        <span class="token comment">// This update is just to help block unnecessary selector wakeups</span>
                        <span class="token comment">// so use of lazySet is ok (no race condition)</span>
                        nextWakeupNanos<span class="token punctuation">.</span><span class="token function">lazySet</span><span class="token punctuation">(</span><span class="token constant">AWAKE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">// fall through</span>
                <span class="token keyword">default</span><span class="token operator">:</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// If we receive an IOException here its because the Selector is messed up. Let&#39;s rebuild</span>
                <span class="token comment">// the selector and retry. https://github.com/netty/netty/issues/8566</span>
                <span class="token comment">// 出现I/O异常时重新构建Selector</span>
                <span class="token function">rebuildSelector0</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                selectCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                <span class="token function">handleLoopException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 走到此处，strategy就表示 channel上就绪事件的个数</span>
            <span class="token comment">// 要么就是有I/O事件，要么就是有scheduledTask，或者是JDK的 epoll 的空轮询 BUG</span>

            selectCnt<span class="token operator">++</span><span class="token punctuation">;</span>
            cancelledKeys <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            needsToSelectAgain <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

            <span class="token comment">// 线程处理IO事件的时间占比，默认是50%</span>
            <span class="token keyword">final</span> <span class="token keyword">int</span> ioRatio <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ioRatio<span class="token punctuation">;</span>
            <span class="token comment">// 表示本轮线程有没有处理过本地任务</span>
            <span class="token keyword">boolean</span> ranTasks<span class="token punctuation">;</span>
            <span class="token comment">// 条件成立表示IO优先，IO处理完之后，再处理本地任务</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ioRatio <span class="token operator">==</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 条件成立：说明当前NIoEventLoop的Selector上有就绪事件</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>strategy <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 处理IO事件</span>
                        <span class="token function">processSelectedKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                    <span class="token comment">// Ensure we always run tasks.</span>
                    <span class="token comment">// 确保运行了所有待执行任务，包括ScheduledTask任务</span>
                    <span class="token comment">// 执行本地任务队列的任务</span>
                    ranTasks <span class="token operator">=</span> <span class="token function">runAllTasks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 条件成立，说明当前NIoEventLoop的Selector上有就绪事件</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>strategy <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">final</span> <span class="token keyword">long</span> ioStartTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token function">processSelectedKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                    <span class="token comment">// Ensure we always run tasks.</span>
                    <span class="token comment">// IO事件处理总耗时</span>
                    <span class="token keyword">final</span> <span class="token keyword">long</span> ioTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> ioStartTime<span class="token punctuation">;</span>
                    <span class="token comment">// 计算执行本地队列任务的最大时间，根据ioRatio，有可能遗留一部分任务等待下次执行</span>
                    ranTasks <span class="token operator">=</span> <span class="token function">runAllTasks</span><span class="token punctuation">(</span>ioTime <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">100</span> <span class="token operator">-</span> ioRatio<span class="token punctuation">)</span> <span class="token operator">/</span> ioRatio<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 条件成立，说明当前NioEventLoop上没有就绪事件，只处理本地任务就行了</span>
            <span class="token comment">// 也就是说没有IO事件了</span>
            <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 最多只能执行64个任务</span>
                ranTasks <span class="token operator">=</span> <span class="token function">runAllTasks</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// This will run the minimum number of tasks</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>ranTasks <span class="token operator">||</span> strategy <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 要么有任务运行，要么有 IO 事件处理</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>selectCnt <span class="token operator">&gt;</span> <span class="token constant">MIN_PREMATURE_SELECTOR_RETURNS</span> <span class="token operator">&amp;&amp;</span> logger<span class="token punctuation">.</span><span class="token function">isDebugEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;Selector.select() returned prematurely {} times in a row for Selector {}.&quot;</span><span class="token punctuation">,</span>
                            selectCnt <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> selector<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 正常流程进到这里面，NioEventLoop线程从Selector唤醒后工作，是因为有IO事件</span>
                selectCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 处理nio的bug</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">unexpectedSelectorWakeup</span><span class="token punctuation">(</span>selectCnt<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// Unexpected wakeup (unusual case)</span>
                <span class="token comment">// 即没有任务运行，也没有IO 事件处理，就有可能是 JDK 的 epoll 的空轮询 BUG</span>
                <span class="token comment">// 调用 unexpectedSelectorWakeup(selectCnt) 方法处理。</span>
                <span class="token comment">// 可能会重新建立 Select</span>
                selectCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">CancelledKeyException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// Harmless exception - log anyway</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isDebugEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token class-name">CancelledKeyException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; raised by a Selector {} - JDK bug?&quot;</span><span class="token punctuation">,</span>
                        selector<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Error</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">handleLoopException</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// Always handle shutdown even if the loop processing threw an exception.</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isShuttingDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 如果事件轮询器开始 shutdown，就要关闭 IO 资源</span>
                    <span class="token function">closeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">confirmShutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">return</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Error</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">handleLoopException</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="处理-i-o-事件和其他任务-1" tabindex="-1"><a class="header-anchor" href="#处理-i-o-事件和其他任务-1" aria-hidden="true">#</a> 处理 I/O 事件和其他任务</h2><h3 id="处理-i-o-事件" tabindex="-1"><a class="header-anchor" href="#处理-i-o-事件" aria-hidden="true">#</a> 处理 I/O 事件</h3><p>io.netty.channel.nio.NioEventLoop#processSelectedKeys</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">processSelectedKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断优化后的selectedKeys是否为空</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>selectedKeys <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 优化处理</span>
        <span class="token function">processSelectedKeysOptimized</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 原始处理</span>
        <span class="token function">processSelectedKeysPlain</span><span class="token punctuation">(</span>selector<span class="token punctuation">.</span><span class="token function">selectedKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里只分析Netty 优化 Selector 后的处理逻辑，也就是 processSelectedKeysOptimized 方法的处理逻辑</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">processSelectedKeysOptimized</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> selectedKeys<span class="token punctuation">.</span>size<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 就绪事件</span>
            <span class="token keyword">final</span> <span class="token class-name">SelectionKey</span> k <span class="token operator">=</span> selectedKeys<span class="token punctuation">.</span>keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">// null out entry in the array to allow to have it GC&#39;ed once the Channel close</span>
            <span class="token comment">// See https://github.com/netty/netty/issues/2363</span>
            <span class="token comment">// 先将selectedKeys.keys[i]置空，快速GC，不需要等到调用其重置再去回收，因为key的附件比较大，很容易造成内存泄露</span>
            selectedKeys<span class="token punctuation">.</span>keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

            <span class="token comment">// 附件，这里会拿到注册时向Selector提供的Channel对象</span>
            <span class="token keyword">final</span> <span class="token class-name">Object</span> a <span class="token operator">=</span> k<span class="token punctuation">.</span><span class="token function">attachment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token keyword">instanceof</span> <span class="token class-name">AbstractNioChannel</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 处理IO事件，根据key的就绪事件触发对应的事件方法</span>
                <span class="token function">processSelectedKey</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">AbstractNioChannel</span><span class="token punctuation">)</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">)</span>
                <span class="token class-name">NioTask</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SelectableChannel</span><span class="token punctuation">&gt;</span></span> task <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">NioTask</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SelectableChannel</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> a<span class="token punctuation">;</span>
                <span class="token function">processSelectedKey</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> task<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 判断是否应该再次轮询，每当256个channel从selector上移除时，就标记needsToSelectAgain为true</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>needsToSelectAgain<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// null out entries in the array to allow to have it GC&#39;ed once the Channel close</span>
                <span class="token comment">// See https://github.com/netty/netty/issues/2363</span>
                selectedKeys<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token function">selectAgain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                i <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>processSelectedKeysOptimized 方法里面就是遍历已经就绪的事件的 SelectionKey，通过 SelectionKey 附件 attachment 获取就绪的 Channel 对象，然后调用 processSelectedKey() 方法去处理单个就绪的事件。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">processSelectedKey</span><span class="token punctuation">(</span><span class="token class-name">SelectionKey</span> k<span class="token punctuation">,</span> <span class="token class-name">AbstractNioChannel</span> ch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// NioServerSocketChannel -&gt; NioMessageUnsafe</span>
    <span class="token comment">// NioSocketChannel -&gt; NioByteUnsafe</span>
    <span class="token keyword">final</span> <span class="token class-name">AbstractNioChannel<span class="token punctuation">.</span>NioUnsafe</span> unsafe <span class="token operator">=</span> ch<span class="token punctuation">.</span><span class="token function">unsafe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>k<span class="token punctuation">.</span><span class="token function">isValid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">EventLoop</span> eventLoop<span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            eventLoop <span class="token operator">=</span> ch<span class="token punctuation">.</span><span class="token function">eventLoop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ignored<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// ......省略异常处理代码......</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// ......省略非核心逻辑代码......</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取 IO 事件类型</span>
        <span class="token keyword">int</span> readyOps <span class="token operator">=</span> k<span class="token punctuation">.</span><span class="token function">readyOps</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// We first need to call finishConnect() before try to trigger a read(...) or write(...) as otherwise</span>
        <span class="token comment">// the NIO JDK channel implementation may throw a NotYetConnectedException.</span>
        <span class="token comment">// 首先判断是不是连接的IO事件 OP_CONNECT</span>
        <span class="token comment">// 在尝试触发read(…)或write(…)之前，</span>
        <span class="token comment">// 我们首先需要调用finishConnect()，</span>
        <span class="token comment">// 否则NIO JDK通道实现可能抛出 NotYetConnectedException 异常。</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>readyOps <span class="token operator">&amp;</span> <span class="token class-name">SelectionKey</span><span class="token punctuation">.</span><span class="token constant">OP_CONNECT</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// remove OP_CONNECT as otherwise Selector.select(..) will always return without blocking</span>
            <span class="token comment">// See https://github.com/netty/netty/issues/924</span>
            <span class="token keyword">int</span> ops <span class="token operator">=</span> k<span class="token punctuation">.</span><span class="token function">interestOps</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 删除OP_CONNECT，否则Selector.select(..)将始终返回而不阻塞</span>
            ops <span class="token operator">&amp;=</span> <span class="token operator">~</span><span class="token class-name">SelectionKey</span><span class="token punctuation">.</span><span class="token constant">OP_CONNECT</span><span class="token punctuation">;</span>
            k<span class="token punctuation">.</span><span class="token function">interestOps</span><span class="token punctuation">(</span>ops<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 连接完成则调用finishiConnect操作</span>
            unsafe<span class="token punctuation">.</span><span class="token function">finishConnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 首先处理写事件 OP_WRITE，因为我们可以写一些队列缓冲区，从而释放内存。</span>
        <span class="token comment">// Process OP_WRITE first as we may be able to write some queued buffers and so free memory.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>readyOps <span class="token operator">&amp;</span> <span class="token class-name">SelectionKey</span><span class="token punctuation">.</span><span class="token constant">OP_WRITE</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// Call forceFlush which will also take care of clear the OP_WRITE once there is nothing left to write</span>
            <span class="token comment">// 调用forceFlush，即使没有东西可写，它也会清除OP_WRITE</span>
            ch<span class="token punctuation">.</span><span class="token function">unsafe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forceFlush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Also check for readOps of 0 to workaround possible JDK bug which may otherwise lead</span>
        <span class="token comment">// to a spin loop</span>
        <span class="token comment">// 最后处理读事件</span>
        <span class="token comment">// 还要检查 readOps 是否为0，以解决可能导致旋转循环的JDK错误</span>
        <span class="token comment">// (readyOps &amp; (SelectionKey.OP_READ | SelectionKey.OP_ACCEPT)) != 0  正常逻辑 channel有read或者accept事件</span>
        <span class="token comment">// readyOps == 0 是解决NIO的bug</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>readyOps <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token class-name">SelectionKey</span><span class="token punctuation">.</span><span class="token constant">OP_READ</span> <span class="token operator">|</span> <span class="token class-name">SelectionKey</span><span class="token punctuation">.</span><span class="token constant">OP_ACCEPT</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">||</span> readyOps <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            unsafe<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">CancelledKeyException</span> ignored<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// key失效则close这个channel</span>
        unsafe<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">voidPromise</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到这个方法里面就是处理 I/O 事件的对应逻辑了，就是 OP_READ、OP_WRITE、OP_CONNECT、OP_ACCEPT 这些事件。这里知道处理 I/O 事件的入口就行了，后面单独篇章详细分析。</p><h3 id="处理其他任务" tabindex="-1"><a class="header-anchor" href="#处理其他任务" aria-hidden="true">#</a> 处理其他任务</h3><p>关于处理其他任务，就是调用 SingleThreadEventExecutor#runAllTasks()，和它的一些重载方法。这些方法的处理逻辑比较简单，主要就是处理几个队列中的任务。</p><ul><li>调度任务队列 AbstractScheduledEventExecutor#scheduledTaskQueue 中的任务，前面文章已经分析过；</li><li>普通的任务队列 SingleThreadEventExecutor#taskQueue 中的任务；</li><li>尾部队列 SingleThreadEventLoop#tailTasks 中的任务；（这个队列没看到怎么用，应该不重要）</li></ul><p>这里分析下 SingleThreadEventExecutor#runAllTasks(long) 方法的处理逻辑，无参的 runAllTask() 方法的处理逻辑比较类似。</p><p>关于有参方法，它的 long 参数表示执行任务允许的最大耗时，取值如下：</p><ul><li>如果大于 0，表示处理任务的耗时不允许超过这个时间；</li><li>如果等于 0，最多处理 64 个任务；</li></ul><p>下面是该方法的源码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">runAllTasks</span><span class="token punctuation">(</span><span class="token keyword">long</span> timeoutNanos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 从定时任务队列中将达到执行事件的task转移到taskQueue队列中</span>
    <span class="token function">fetchFromScheduledTaskQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 从taskQueue中获取task，如果队列为空，则返回 null，不会阻塞线程</span>
    <span class="token class-name">Runnable</span> task <span class="token operator">=</span> <span class="token function">pollTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>task <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">afterRunningAllTasks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 表示执行任务的截止时间</span>
    <span class="token keyword">final</span> <span class="token keyword">long</span> deadline <span class="token operator">=</span> timeoutNanos <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token class-name">ScheduledFutureTask</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> timeoutNanos <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">// 已经执行任务的个数</span>
    <span class="token keyword">long</span> runTasks <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">// 最后一个任务的执行时间</span>
    <span class="token keyword">long</span> lastExecutionTime<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 执行任务</span>
        <span class="token function">safeExecute</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">;</span>

        runTasks <span class="token operator">++</span><span class="token punctuation">;</span>

        <span class="token comment">// Check timeout every 64 tasks because nanoTime() is relatively expensive.</span>
        <span class="token comment">// XXX: Hard-coded value - will make it configurable if it is really a problem.</span>
        <span class="token comment">// 每隔64个任务去查看是否超时</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>runTasks <span class="token operator">&amp;</span> <span class="token number">0x3F</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lastExecutionTime <span class="token operator">=</span> <span class="token class-name">ScheduledFutureTask</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>lastExecutionTime <span class="token operator">&gt;=</span> deadline<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 从taskQueue队列中获取task，假如没有task了，则更新最后执行时间，并跳出循环</span>
        task <span class="token operator">=</span> <span class="token function">pollTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>task <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lastExecutionTime <span class="token operator">=</span> <span class="token class-name">ScheduledFutureTask</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">afterRunningAllTasks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 记录最后一次执行任务的时间</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>lastExecutionTime <span class="token operator">=</span> lastExecutionTime<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（1）第一步就是将调度任务队列中的任务拉取到普通任务队列中，方便后续统一执行，也就是下面的代码</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token function">fetchFromScheduledTaskQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>（2）第二步判断普通任务队列中有没有需要执行的任务；</p><p>（3）第三步，假如有任务需要执行，就开启一个 for 循环执行普通任务队列中的所有任务（包括从调度任务队列中拉取过来的任务）。需要注意的是 <code>(runTasks &amp; 0x3F) == 0</code> 这个判断条件，这里说明 Netty 处理任务的时候，并不是每次处理一个任务后，就去判断是否已经到了允许执行时间的限制，而是每隔 64 个任务才去检查时间限制。这也说明了为什么传入 0 的时候最多只允许执行 64 个任务。</p><p>为什么要这样做呢？代码中有行注释 Check timeout every 64 tasks because nanoTime() is relatively expensive. 就是因为nanoTime() 方法的成本相对较高，。<strong><code>System.nanoTime()</code> 方法需要查询计算机硬件时钟，并返回当前时钟周期计数器的值，这个操作需要消耗一定的 CPU 资源和时间，在大量调用 <code>System.nanoTime()</code> 方法的情况下，它的高成本可能会导致性能问题或其他方面的问题。</strong></p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>NioEventLoop 中需要执行下面这些任务：</p><ul><li>调度任务队列 AbstractScheduledEventExecutor#scheduledTaskQueue 中的任务，前面文章已经分析过；</li><li>普通的任务队列 SingleThreadEventExecutor#taskQueue 中的任务；</li><li>尾部队列 SingleThreadEventLoop#tailTasks 中的任务；（这个队列没看到怎么用，应该不重要）</li><li>处理通道的 I/O 事件；</li></ul><p>NioEventLoop 的 run 方法中处理了 JDK 的空循环 bug（虽然本章没具体分析）</p><p>下面是 NioEventLoop 的 run 方法的流程图：</p><p><img src="`+t+'" alt="NioEventLoop的run方法"></p>',67),c=[o];function l(i,u){return s(),a("div",null,c)}const r=n(p,[["render",l],["__file","11-线程体系-NioEventLoop的run方法.html.vue"]]);export{r as default};
