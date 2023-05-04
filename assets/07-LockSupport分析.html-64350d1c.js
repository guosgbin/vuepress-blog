import{_ as n,X as s,Y as a,$ as t}from"./framework-60036392.js";const e={},p=t(`<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>新建</td><td>2022年09月05日00:35:26</td></tr></tbody></table><h2 id="locksupport-简介" tabindex="-1"><a class="header-anchor" href="#locksupport-简介" aria-hidden="true">#</a> LockSupport 简介</h2><p>LockSupport 是 JUC 包的一个用于阻塞和唤醒线程的工具类。park 系列方法会阻塞当前线程，unpark 方法会唤醒指定的线程。（其实这两个方法都是基于 sun.misc.Unsafe 类来实现的）</p><p>LockSupport 使用会对每个线程维持一个叫“许可证”的东西（boolean），我们可以把它当成只有 1 个许可证的Semaphore。</p><h2 id="使用案例" tabindex="-1"><a class="header-anchor" href="#使用案例" aria-hidden="true">#</a> 使用案例</h2><p>下面给的是源码中的案例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">FIFOMutex</span> <span class="token punctuation">{</span>
    <span class="token comment">// 当锁用</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">AtomicBoolean</span> locked <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicBoolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 等待队列</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Thread</span><span class="token punctuation">&gt;</span></span> waiters <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentLinkedQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Thread</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 加锁
     *
     * 1.先将当前线程加入到等待队列；
     * 2.判断当前线程是否是等待队列的队首线程，只有队首线程才有资格获取锁
     * 3.获取锁失败则 park 阻塞，获取成功则从等待队列移除
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> wasInterrupted <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> current <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        waiters<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>current<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Block while not first in queue or cannot acquire lock</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>waiters<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> current <span class="token operator">||</span> <span class="token operator">!</span>locked<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 不是队首线程或者是队首线程但是抢锁失败，阻塞当前线程</span>
            <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">interrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// ignore interrupts while waiting</span>
                wasInterrupted <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        waiters<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>wasInterrupted<span class="token punctuation">)</span>          <span class="token comment">// reassert interrupt status on exit</span>
            current<span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        locked<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 唤醒队首线程</span>
        <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">unpark</span><span class="token punctuation">(</span>waiters<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一种FIFO类型的独占锁，可以把这种锁看成是 ReentrantLock 的公平锁简单版本，且是不可重入的，就是说当一个线程获得锁后，其它等待线程以 FIFO 的调度方式等待获取锁。</p><h2 id="unsafe-的阻塞和唤醒的方法" tabindex="-1"><a class="header-anchor" href="#unsafe-的阻塞和唤醒的方法" aria-hidden="true">#</a> Unsafe 的阻塞和唤醒的方法</h2><p>LockSupport 里面的阻塞和唤醒的方法都是基于 sun.misc.Unsafe 类来实现的，所以我们先来看下 Unsafe 类的相关方法。</p><h3 id="unsafe-park" tabindex="-1"><a class="header-anchor" href="#unsafe-park" aria-hidden="true">#</a> Unsafe#park</h3><p>阻塞当前线程</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Block current thread, returning when a balancing
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">unpark</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">&gt;</span></span> occurs, or a balancing <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">unpark</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">&gt;</span></span> has
 * already occurred, or the thread is interrupted, or, if not
 * absolute and time is not zero, the given time nanoseconds have
 * elapsed, or if absolute, the given deadline in milliseconds
 * since Epoch has passed, or spuriously (i.e., returning for no
 * &quot;reason&quot;). Note: This operation is in the Unsafe class only
 * because <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">unpark</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">&gt;</span></span> is, so it would be strange to place it
 * elsewhere.
 */</span>
<span class="token keyword">public</span> <span class="token keyword">native</span> <span class="token keyword">void</span> <span class="token function">park</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> isAbsolute<span class="token punctuation">,</span> <span class="token keyword">long</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先说明一下参数：</p><ol><li>boolean isAbsolute：表示阻塞时间 time 是否是绝对时间；</li><li>long time：表示阻塞时间；</li></ol><p>阻塞当前线程，会在以下几种情况返回</p><ol><li>其他线程调用 unpark 方法让当前线程被唤醒；</li><li>超时时间到了就会被唤醒；</li><li>其他线程调用了当前线程的 interrupt 方法中断了当前线程，当前线程就会被唤醒；</li><li>虚假唤醒；</li></ol><h3 id="unsafe-unpark" tabindex="-1"><a class="header-anchor" href="#unsafe-unpark" aria-hidden="true">#</a> Unsafe#unpark</h3><p>唤醒被 park 后阻塞的线程。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Unblock the given thread blocked on <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">park</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">&gt;</span></span>, or, if it is
 * not blocked, cause the subsequent call to <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java">park</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">&gt;</span></span> not to
 * block.  Note: this operation is &quot;unsafe&quot; solely because the
 * caller must somehow ensure that the thread has not been
 * destroyed. Nothing special is usually required to ensure this
 * when called from Java (in which there will ordinarily be a live
 * reference to the thread) but this is not nearly-automatically
 * so when calling from native code.
 * <span class="token keyword">@param</span> <span class="token parameter">thread</span> the thread to unpark.
 *
 */</span>
<span class="token keyword">public</span> <span class="token keyword">native</span> <span class="token keyword">void</span> <span class="token function">unpark</span><span class="token punctuation">(</span><span class="token class-name">Object</span> thread<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>前面我们说了 park 和 unpark 会给线程维持一个许可证（boolean），当调用 unpark 的时候就会给许可证置为 true，调用 park 的时候就会将许可证置为 false。</p><p>无论 unpark 调用多少次都只会有一个许可证，unpark 可以先于 park 方法，也就是说当某个线程先调用了 unpark 方法，那么该线程后续调用 park 方法也不会阻塞，只是会消耗这个许可证。</p><h2 id="locksupport-的-api" tabindex="-1"><a class="header-anchor" href="#locksupport-的-api" aria-hidden="true">#</a> LockSupport 的 API</h2><h3 id="locksupport-setblocker" tabindex="-1"><a class="header-anchor" href="#locksupport-setblocker" aria-hidden="true">#</a> LockSupport#setBlocker</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/*
 * 记录了当前线程阻塞时是被谁阻塞的，用于线程监控和分析
 */</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setBlocker</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> t<span class="token punctuation">,</span> <span class="token class-name">Object</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Even though volatile, hotspot doesn&#39;t need a write barrier here.</span>
    <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">putObject</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> parkBlockerOffset<span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置这个 Object 对象一般供监视、诊断工具确定线程受阻塞的原因时使用，写个测试案例然后用 jstack 查看。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LockSupportTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LockSupportTest</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LockSupportTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;结束&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行之后 jstack 部分显示如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;main&quot; #1 prio=5 os_prio=31 tid=0x00007f968180c000 nid=0x1703 waiting on condition [0x000000030d4b9000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        - parking to wait for  &lt;0x000000076adaaa78&gt; (a test.java.util.concurrent.locks.LockSupportTest)
        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
        at test.java.util.concurrent.locks.LockSupportTest.main(LockSupportTest.java:26)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="park-相关方法" tabindex="-1"><a class="header-anchor" href="#park-相关方法" aria-hidden="true">#</a> park 相关方法</h3><p>（1）保存当前线程阻塞是被那个对象阻塞的；</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">park</span><span class="token punctuation">(</span><span class="token class-name">Object</span> blocker<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setBlocker</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> blocker<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 阻塞线程</span>
    <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token number">0L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setBlocker</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）保存当前线程阻塞是被那个对象阻塞的，并增加了最大的阻塞时间；</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">parkNanos</span><span class="token punctuation">(</span><span class="token class-name">Object</span> blocker<span class="token punctuation">,</span> <span class="token keyword">long</span> nanos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nanos <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setBlocker</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> blocker<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 阻塞线程 nanos 时间</span>
        <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> nanos<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setBlocker</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）保存当前线程阻塞是被那个对象阻塞的，并增加了阻塞的截止时间；</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">parkUntil</span><span class="token punctuation">(</span><span class="token class-name">Object</span> blocker<span class="token punctuation">,</span> <span class="token keyword">long</span> deadline<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setBlocker</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> blocker<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// true 表示绝对时间，阻塞到 deadline 为止</span>
    <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> deadline<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setBlocker</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（4）一直阻塞当前线程；</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">park</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token number">0L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（5）设置最大阻塞时长；</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">parkNanos</span><span class="token punctuation">(</span><span class="token keyword">long</span> nanos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nanos <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token comment">// 阻塞 nanos 秒</span>
        <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> nanos<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（6）设置阻塞的截止时间；</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">parkUntil</span><span class="token punctuation">(</span><span class="token keyword">long</span> deadline<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 阻塞到绝对时间 deadline 为止</span>
    <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> deadline<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="unpark" tabindex="-1"><a class="header-anchor" href="#unpark" aria-hidden="true">#</a> unpark</h3><p>其实就是直接调的 Unsafe#unpark 方法。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">unpark</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> thread<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>thread <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token comment">// 唤醒线程</span>
        <span class="token constant">UNSAFE</span><span class="token punctuation">.</span><span class="token function">unpark</span><span class="token punctuation">(</span>thread<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>LockSupport 的 park 方法在下面这几种情况发生之前都会阻塞：</p><ol><li>调用了 unpark 方法；</li><li>park 的线程被中断了；</li><li>设置的超时时间到了；</li><li>被虚假唤醒了；</li></ol><p>使用 park 方法需要注意的地方，一般 park 方法需要在一个循环体中使用，这是为了防止线程被唤醒后，循环条件可能还是不满足，假如此处不判断继续向下运行是有问题的。</p><p>模板如下</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">while</span><span class="token punctuation">(</span>条件<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：park 方法是会响应中断的，但是不会抛出异常。</p>`,53),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","07-LockSupport分析.html.vue"]]);export{k as default};
