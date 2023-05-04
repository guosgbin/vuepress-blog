import{_ as n,X as s,Y as a,$ as e}from"./framework-60036392.js";const t="/assets/45-LinkedBlockingDeque继承关系-d6296341.png",p={},c=e('<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>新建</td><td>2022年12月06日23:52:45</td></tr></tbody></table><h2 id="linkedblockingdeque概述" tabindex="-1"><a class="header-anchor" href="#linkedblockingdeque概述" aria-hidden="true">#</a> LinkedBlockingDeque概述</h2><p>LinkedBlockingDeque 是基于双链表的无界阻塞队列，FIFO。</p><p>LinkedBlockingDeque 使用 ReentrantLock 实现同步操作。</p><p>需要注意的是 LinkedBlockingDeque 是一个近似的无界队列，默认的容量是 <code>Integer.MAX_VALUE</code>。</p><h2 id="linkedblockingdeque-继承体系" tabindex="-1"><a class="header-anchor" href="#linkedblockingdeque-继承体系" aria-hidden="true">#</a> LinkedBlockingDeque 继承体系</h2><p>LinkedBlockingDeque 实现 BlockingDeque 接口，它提供了一些双端队列的操作。例如 addFirst，addLast 等。</p><p>而 BlockingDeque 接口继承自 BlockingQueue 接口。</p><p><img src="'+t+`" alt="45-LinkedBlockingDeque继承关系"></p><h2 id="双链表节点对象" tabindex="-1"><a class="header-anchor" href="#双链表节点对象" aria-hidden="true">#</a> 双链表节点对象</h2><p>LinkedBlockingDeque 是基于双链表实现的，所以节点里面定义了前驱指针和后驱指针。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/** Doubly-linked list node class */</span>
<span class="token comment">// 双端队列的节点对象</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * The item, or null if this node has been removed.
     */</span>
    <span class="token class-name">E</span> item<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * One of:
     * - the real predecessor Node
     * - this Node, meaning the predecessor is tail
     * - null, meaning there is no predecessor
     */</span>
    <span class="token comment">/*
     * 1. 指向真正的前驱
     * 2. 指向自己的时候，说明前驱是 tail
     * 3. null 说明没有前驱
     */</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> prev<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * One of:
     * - the real successor Node
     * - this Node, meaning the successor is head
     * - null, meaning there is no successor
     */</span>
    <span class="token comment">/*
     * 1. 指向真正的后驱节点
     * 2. 指向自己的时候，说明后驱是 header
     * 3. null 说明没有后驱
     */</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> next<span class="token punctuation">;</span>

    <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">E</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        item <span class="token operator">=</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="linkedblockingdeque-成员属性" tabindex="-1"><a class="header-anchor" href="#linkedblockingdeque-成员属性" aria-hidden="true">#</a> LinkedBlockingDeque 成员属性</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Pointer to first node.
 * Invariant: (first == null &amp;&amp; last == null) ||
 *            (first.prev == null &amp;&amp; first.item != null)
 */</span>
<span class="token comment">// 指向头节点的指针</span>
<span class="token keyword">transient</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> first<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * Pointer to last node.
 * Invariant: (first == null &amp;&amp; last == null) ||
 *            (last.next == null &amp;&amp; last.item != null)
 */</span>
<span class="token comment">// 指向尾结点的指针</span>
<span class="token keyword">transient</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> last<span class="token punctuation">;</span>

<span class="token doc-comment comment">/** Number of items in the deque */</span>
<span class="token comment">// 队列中元素的数量</span>
<span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token keyword">int</span> count<span class="token punctuation">;</span>

<span class="token doc-comment comment">/** Maximum number of items in the deque */</span>
<span class="token comment">// 队列的容量</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> capacity<span class="token punctuation">;</span>

<span class="token doc-comment comment">/** Main lock guarding all access */</span>
<span class="token comment">// 锁对象</span>
<span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/** Condition for waiting takes */</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Condition</span> notEmpty <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/** Condition for waiting puts */</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Condition</span> notFull <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>属性</th><th>含义</th></tr></thead><tbody><tr><td><code>Node&lt;E&gt; first</code></td><td>指向头节点的指针</td></tr><tr><td><code>Node&lt;E&gt; last</code></td><td>指向尾结点的指针</td></tr><tr><td><code>int count</code></td><td>队列中元素数量</td></tr><tr><td><code>int capacity</code></td><td>队列的总容量</td></tr><tr><td><code>ReentrantLock lock</code></td><td>阻塞队列的同步锁</td></tr><tr><td><code>Condition notEmpty</code></td><td>当队列为空的时候，入队线程需要在此条件队列阻塞</td></tr><tr><td><code>Condition notFull</code></td><td>当队列满了的时候，出队线程需要在此条件队列阻塞</td></tr></tbody></table><h2 id="linkedblockingdeque-构造函数" tabindex="-1"><a class="header-anchor" href="#linkedblockingdeque-构造函数" aria-hidden="true">#</a> LinkedBlockingDeque 构造函数</h2><p>近似无界队列，默认的容量是 <code>Integer.MAX_VALUE</code>。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Creates a <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">LinkedBlockingDeque</span></span></span><span class="token punctuation">}</span> with a capacity of
 * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Integer</span><span class="token punctuation">#</span><span class="token field">MAX_VALUE</span></span><span class="token punctuation">}</span>.
 */</span>
<span class="token keyword">public</span> <span class="token class-name">LinkedBlockingDeque</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Creates a <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">LinkedBlockingDeque</span></span></span><span class="token punctuation">}</span> with the given (fixed) capacity.
 *
 * <span class="token keyword">@param</span> <span class="token parameter">capacity</span> the capacity of this deque
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IllegalArgumentException</span></span> if <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">capacity</span></span><span class="token punctuation">}</span> is less than 1
 */</span>
<span class="token keyword">public</span> <span class="token class-name">LinkedBlockingDeque</span><span class="token punctuation">(</span><span class="token keyword">int</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>capacity <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>capacity <span class="token operator">=</span> capacity<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Creates a <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">LinkedBlockingDeque</span></span></span><span class="token punctuation">}</span> with a capacity of
 * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Integer</span><span class="token punctuation">#</span><span class="token field">MAX_VALUE</span></span><span class="token punctuation">}</span>, initially containing the elements of
 * the given collection, added in traversal order of the
 * collection&#39;s iterator.
 *
 * <span class="token keyword">@param</span> <span class="token parameter">c</span> the collection of elements to initially contain
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the specified collection or any
 *         of its elements are null
 */</span>
<span class="token keyword">public</span> <span class="token class-name">LinkedBlockingDeque</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lock<span class="token punctuation">;</span>
    lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Never contended, but necessary for visibility</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">E</span> e <span class="token operator">:</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">linkLast</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;Deque full&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="linkedblockingdeque-核心方法" tabindex="-1"><a class="header-anchor" href="#linkedblockingdeque-核心方法" aria-hidden="true">#</a> LinkedBlockingDeque 核心方法</h2><p>既然是双端队列，所以核心方法就是</p><ol><li>队首入队；</li><li>队尾入队；</li><li>队首出队；</li><li>队尾出队；</li></ol><h3 id="队首阻塞入队-putfirst" tabindex="-1"><a class="header-anchor" href="#队首阻塞入队-putfirst" aria-hidden="true">#</a> 队首阻塞入队 putFirst</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 插入元素到对队首，阻塞等待</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">putFirst</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lock<span class="token punctuation">;</span>
    lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">linkFirst</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token comment">// 假如队列已经满了，入队现场阻塞等待</span>
            notFull<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>首先创建 Node 节点；</li><li>获取锁对象；</li><li>while 循环条件调用 LinkedBlockingDeque#linkFirst 方法，该方法返回 false 时表示队列已满。假如队列满了，则需要在条件队列上阻塞等待；</li><li>最后释放锁；</li></ol><p>LinkedBlockingDeque#linkFirst 方法很简单，就是双端链表的插入队首的操作。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Links node as first element, or returns false if full.
 */</span>
<span class="token comment">// 插入元素到队首，假如队列已经满了则返回 false</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">linkFirst</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// assert lock.isHeldByCurrentThread();</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">&gt;=</span> capacity<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> f <span class="token operator">=</span> first<span class="token punctuation">;</span>
    node<span class="token punctuation">.</span>next <span class="token operator">=</span> f<span class="token punctuation">;</span>
    first <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>last <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        last <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        f<span class="token punctuation">.</span>prev <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token operator">++</span>count<span class="token punctuation">;</span>
    <span class="token comment">// 唤醒可能因为队列没有元素而阻塞的出队线程</span>
    notEmpty<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="队尾阻塞入队-putlast" tabindex="-1"><a class="header-anchor" href="#队尾阻塞入队-putlast" aria-hidden="true">#</a> 队尾阻塞入队 putLast</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 插入元素到对队尾，阻塞等待</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">putLast</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lock<span class="token punctuation">;</span>
    lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">linkLast</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token comment">// 假如队列已经满了，入队线程阻塞等待</span>
            notFull<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码和 putFirst 十分类似，区别调用了 LinkedBlockingDeque#linkLast 方法。</p><p>LinkedBlockingDeque#linkLast</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 插入元素到队尾</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">linkLast</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// assert lock.isHeldByCurrentThread();</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">&gt;=</span> capacity<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> l <span class="token operator">=</span> last<span class="token punctuation">;</span>
    node<span class="token punctuation">.</span>prev <span class="token operator">=</span> l<span class="token punctuation">;</span>
    last <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>first <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        first <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        l<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token operator">++</span>count<span class="token punctuation">;</span>
    <span class="token comment">// 唤醒可能因为队列没有元素而阻塞的出队线程</span>
    notEmpty<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="队首阻塞出队-takefirst" tabindex="-1"><a class="header-anchor" href="#队首阻塞出队-takefirst" aria-hidden="true">#</a> 队首阻塞出队 takeFirst</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 出队，阻塞移除队首元素</span>
<span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">takeFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lock<span class="token punctuation">;</span>
    lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">E</span> x<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span>x <span class="token operator">=</span> <span class="token function">unlinkFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 假如队列为空，则让当前出队线程阻塞等待</span>
            notEmpty<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 移除队首元素，假如队列中没有元素则返回 null</span>
<span class="token keyword">private</span> <span class="token class-name">E</span> <span class="token function">unlinkFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// assert lock.isHeldByCurrentThread();</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> f <span class="token operator">=</span> first<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>f <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> n <span class="token operator">=</span> f<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token class-name">E</span> item <span class="token operator">=</span> f<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
    f<span class="token punctuation">.</span>item <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    f<span class="token punctuation">.</span>next <span class="token operator">=</span> f<span class="token punctuation">;</span> <span class="token comment">// help GC</span>
    first <span class="token operator">=</span> n<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        last <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        n<span class="token punctuation">.</span>prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token operator">--</span>count<span class="token punctuation">;</span>
    <span class="token comment">// 唤醒可能因为队列满了而阻塞的入队线程</span>
    notFull<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> item<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="队尾阻塞出队-takelast" tabindex="-1"><a class="header-anchor" href="#队尾阻塞出队-takelast" aria-hidden="true">#</a> 队尾阻塞出队 takeLast</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 出队，阻塞移除队尾元素</span>
<span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">takeLast</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lock<span class="token punctuation">;</span>
    lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">E</span> x<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span>x <span class="token operator">=</span> <span class="token function">unlinkLast</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token comment">// 假如队列为空，则让当前出队线程阻塞等待</span>
            notEmpty<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 移除队尾元素，假如队列中没有元素则返回 null</span>
<span class="token keyword">private</span> <span class="token class-name">E</span> <span class="token function">unlinkLast</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// assert lock.isHeldByCurrentThread();</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> l <span class="token operator">=</span> last<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>l <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> p <span class="token operator">=</span> l<span class="token punctuation">.</span>prev<span class="token punctuation">;</span>
    <span class="token class-name">E</span> item <span class="token operator">=</span> l<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
    l<span class="token punctuation">.</span>item <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    l<span class="token punctuation">.</span>prev <span class="token operator">=</span> l<span class="token punctuation">;</span> <span class="token comment">// help GC</span>
    last <span class="token operator">=</span> p<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        first <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        p<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token operator">--</span>count<span class="token punctuation">;</span>
    <span class="token comment">// 唤醒可能因为队列满了而阻塞的入队线程</span>
    notFull<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> item<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>LinkedBlockingDeque 基于双链表实现的近似无界阻塞队列，内部仅使用一个 ReentrantLock 来实现入队和出队的同步操作。源码还是很简单的，就是简单的双链表的操作。</p>`,37),o=[c];function l(i,u){return s(),a("div",null,o)}const d=n(p,[["render",l],["__file","29-阻塞队列LinkedBlockingDeque.html.vue"]]);export{d as default};
