import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-42161907.js";const t="/assets/image-20230515233856262-6f8f137d.png",p={},c=e('<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>EventExecutorGroup</td><td>2022年1月27日11:38:16</td></tr><tr><td>V2</td><td>新增相关接口</td><td>2022年1月27日12:29:06</td></tr><tr><td>V3</td><td>重构</td><td>2023年05月16日00:12:52</td></tr></tbody></table><h2 id="nioeventloop-继承体系" tabindex="-1"><a class="header-anchor" href="#nioeventloop-继承体系" aria-hidden="true">#</a> NioEventLoop 继承体系</h2><img src="'+t+`" alt="image-20230515233856262" style="zoom:50%;"><h2 id="nioeventloop-父接口" tabindex="-1"><a class="header-anchor" href="#nioeventloop-父接口" aria-hidden="true">#</a> NioEventLoop 父接口</h2><p>NioEventLoop 的继承体系中，它的父接口如下：</p><ul><li>java.util.concurrent.Executor：JDK 提供的执行器的顶级接口；</li><li>java.util.concurrent.ExecutorService：继承 Executor 接口，额外提供了一些线程池生命周期的方法；</li><li>java.util.concurrent.ScheduledExecutorService：JDK 的调度线程池的接口，提供了一些周期、延迟的 API；</li><li>java.lang.Iterable：JDK 的迭代接口；</li><li>io.netty.util.concurrent.EventExecutorGroup：Netty 的接口，主要提供了一个 next 方法，用于获取池中的某个执行器；</li><li>io.netty.channel.EventLoopGroup：主要提供了 Channel 绑定执行器的 register 方法；</li><li>io.netty.util.concurrent.EventExecutor：主要提供一个 inEventLoop 方法，用于判断当前执行线程是不是指定的线程；</li><li>io.netty.util.concurrent.OrderedEventExecutor：仅仅是一个标记接口；</li><li>io.netty.channel.EventLoop：提供方法，返回当前 EventLoop 实例是属于那个 EventLoopGroup 管理的；</li></ul><h2 id="eventexecutorgroup-接口" tabindex="-1"><a class="header-anchor" href="#eventexecutorgroup-接口" aria-hidden="true">#</a> EventExecutorGroup 接口</h2><h3 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h3><p>继承体系：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">EventExecutorGroup</span> <span class="token keyword">extends</span> <span class="token class-name">ScheduledExecutorService</span><span class="token punctuation">,</span> <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">EventExecutor</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>该接口主要提供了下面的 API：</p><ul><li>EventExecutorGroup 通过 next 方法提供 EventExecutor 实例；</li><li>除此之外，EventExecutorGroup 还负责处理它们的生命周期并允许以全局方式关闭它们；</li><li>EventExecutorGroup 中重写了 ScheduledExecutorService 接口中的一些方法，修改了方法的返回值；</li></ul><h3 id="接口源码" tabindex="-1"><a class="header-anchor" href="#接口源码" aria-hidden="true">#</a> 接口源码</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">EventExecutorGroup</span> <span class="token keyword">extends</span> <span class="token class-name">ScheduledExecutorService</span><span class="token punctuation">,</span> <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">EventExecutor</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 当且仅当该 EventExecutorGroup 管理的所有 EventExecutor
     * 都使用 \`shutdownGracefully()\` 或者 \`isShutdown()\` 关闭时 才返回true。
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">isShuttingDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 优雅地关闭 EventExecutorGroup
     * 使用默认值调用 shutdownGracefully(long, long, TimeUnit) 方法
     * 返回值就是 terminationFuture() 方法返回值
     */</span>
    <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">shutdownGracefully</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 向此执行程序发出信号，表明调用者希望关闭执行程序。
     * 一旦调用此方法， isShuttingDown()开始返回true ，并且执行程序准备关闭自己。
     * 与shutdown()不同，优雅关机确保在它自己关闭之前，在“安静期” （通常是几秒钟）内不会提交任何任务。
     * 如果在静默期提交任务，则保证被接受，静默期将重新开始
     */</span>
    <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">shutdownGracefully</span><span class="token punctuation">(</span><span class="token keyword">long</span> quietPeriod<span class="token punctuation">,</span> <span class="token keyword">long</span> timeout<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 当该 EventExecutorGroup 管理的所有 EventExecutor 被终止时，该Future会被通知。
     */</span>
    <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">terminationFuture</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@deprecated</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">shutdownGracefully</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">,</span> <span class="token keyword">long</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span> or <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">shutdownGracefully</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span> instead.
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token keyword">void</span> <span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@deprecated</span> <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">shutdownGracefully</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">,</span> <span class="token keyword">long</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span> or <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">shutdownGracefully</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span> instead.
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span> <span class="token function">shutdownNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 返回该 EventExecutorGroup 所管理的一个 EventExecutor 实例
     */</span>
    <span class="token class-name">EventExecutor</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">EventExecutor</span><span class="token punctuation">&gt;</span></span> <span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> task<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> task<span class="token punctuation">,</span> <span class="token class-name">T</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Callable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> task<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">ScheduledFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">schedule</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> command<span class="token punctuation">,</span> <span class="token keyword">long</span> delay<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">ScheduledFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token function">schedule</span><span class="token punctuation">(</span><span class="token class-name">Callable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> callable<span class="token punctuation">,</span> <span class="token keyword">long</span> delay<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">ScheduledFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">scheduleAtFixedRate</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> command<span class="token punctuation">,</span> <span class="token keyword">long</span> initialDelay<span class="token punctuation">,</span> <span class="token keyword">long</span> period<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">ScheduledFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">scheduleWithFixedDelay</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> command<span class="token punctuation">,</span> <span class="token keyword">long</span> initialDelay<span class="token punctuation">,</span> <span class="token keyword">long</span> delay<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩展的方法" tabindex="-1"><a class="header-anchor" href="#扩展的方法" aria-hidden="true">#</a> 扩展的方法</h3><p><strong>（1）shutdownGracefully 关闭系列方法。</strong></p><ul><li><p><code>Future&lt;?&gt; shutdownGracefully();</code></p></li><li><p><code>Future&lt;?&gt; shutdownGracefully(long quietPeriod, long timeout, TimeUnit unit);</code></p></li></ul><p>在 ScheduledExecutorService 接口中本来也有关闭执行器的 shutdown 和 shutdownNow 方法。shutdownGracefully 方法和它们的区别是在执行器关闭这段时间内，假如有任务添加，它也保证任务被接收。</p><p><strong>（2）isShuttingDown 方法</strong></p><p>表示 EventExecutorGroup 中的所有的执行器 EventExecutor 正在进行关闭，也就是调用了 shutdown 系列方法。</p><p><strong>（3）terminationFuture方法</strong></p><p>当 EventExecutorGroup 中所有的执行器 EventExecutor 都被关闭时会返回一个 Future 通知。</p><p><strong>（4）next 方法</strong></p><p>EventExecutorGroup 中管理多个执行器 EventExecutor，next 方法的作用是返回一个执行器对象。</p><h3 id="重写的方法" tabindex="-1"><a class="header-anchor" href="#重写的方法" aria-hidden="true">#</a> 重写的方法</h3><p>在 EventExecutorGroup 接口中重写了一些提交任务的方法。主要是将方法的返回值由 JDK 的（Future 和 ScheduledFuture）对象改为了 Netty 自己的（Future 和 ScheduledFuture）对象。如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> task<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="eventloopgroup-接口" tabindex="-1"><a class="header-anchor" href="#eventloopgroup-接口" aria-hidden="true">#</a> EventLoopGroup 接口</h2><p>EventLoopGroup 接口<strong>主要提供了 Channel 绑定执行器的 register 方法</strong>。这样事件执行器就可以处理通道 Channel 的 I/O 操作，也就变成了事件轮询器 EventLoop。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">EventLoopGroup</span> <span class="token keyword">extends</span> <span class="token class-name">EventExecutorGroup</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 返回下一个 EventLoop
     * 复写了 EventExecutorGroup 的方法，改变了返回值类型
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">EventLoop</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 向这个EventLoop注册一个Channel，一旦注册完成，返回的 ChannelFuture 将得到通知。
     */</span>
    <span class="token class-name">ChannelFuture</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">Channel</span> channel<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 使用参数 ChannelPromise 向 EventLoop 注册一个Channel。 
     * （ChannelPromise类中包含一个Channel）
     * 一旦注册完成，传递的 ChannelPromise 将得到通知，返回的 ChannelFuture 也将得到通知。
     */</span>
    <span class="token class-name">ChannelFuture</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">ChannelPromise</span> promise<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token class-name">ChannelFuture</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">Channel</span> channel<span class="token punctuation">,</span> <span class="token class-name">ChannelPromise</span> promise<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="eventexecutor-接口" tabindex="-1"><a class="header-anchor" href="#eventexecutor-接口" aria-hidden="true">#</a> EventExecutor 接口</h2><p>EventExecutor 接口主要提供了 inEventLoop 方法，用于判断当前执行代码的线程是否是指定线程。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">EventExecutor</span> <span class="token keyword">extends</span> <span class="token class-name">EventExecutorGroup</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 返回自己
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">EventExecutor</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 返回管理该事件执行器EventExecutor的父EventExecutorGroup
     */</span>
    <span class="token class-name">EventExecutorGroup</span> <span class="token function">parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 相当于 inEventLoop(Thread.currentThread())
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">inEventLoop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 如果给定的Thread在事件循环中执行，则返回true否则返回false 。
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">inEventLoop</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> thread<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 返回一个新的 Promise 实例
     */</span>
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Promise</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token function">newPromise</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 返回一个新的 ProgressivePromise 实例
     */</span>
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">ProgressivePromise</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token function">newProgressivePromise</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 创建一个新的已经标记为成功的 Future，所以Future.isSuccess()将返回true 。
     * 所有添加到它的FutureListener都会被直接通知。 此外，所有阻塞方法的调用都不会阻塞直接返回
     */</span>
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token function">newSucceededFuture</span><span class="token punctuation">(</span><span class="token class-name">V</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 创建一个新的已标记为失败的Future，所以Future.isSuccess()将返回false 。
     * 所有添加到它的FutureListener都会被直接通知。 此外，每次调用阻塞方法都会返回而不会阻塞
     */</span>
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token function">newFailedFuture</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> cause<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Q：EventExecutor 继承 EventExecutorGroup 接口，那么可能有疑问 EventExecutor 是不是也可以管理一些 EventExecutor 对象？</p><p>A：理论是是可行的，但是在一般情况下，在实现 EventExecutor 接口时，EventExecutor#next 返回的就是它自身。</p><h2 id="eventloop-接口" tabindex="-1"><a class="header-anchor" href="#eventloop-接口" aria-hidden="true">#</a> EventLoop 接口</h2><p>EventLoop 接口比较简单，主要就是提供了一个 parent 方法，该方法返回当前 EventLoop 实例是被那个 EventLoopGroup 管理的</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">EventLoop</span> <span class="token keyword">extends</span> <span class="token class-name">OrderedEventExecutor</span><span class="token punctuation">,</span> <span class="token class-name">EventLoopGroup</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 返回管理该事件执行器EventLoop的父EventLoopGroup
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token class-name">EventLoopGroup</span> <span class="token function">parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38),o=[c];function l(i,u){return s(),a("div",null,o)}const k=n(p,[["render",l],["__file","05-线程体系-NioEventLoop相关父接口分析.html.vue"]]);export{k as default};
