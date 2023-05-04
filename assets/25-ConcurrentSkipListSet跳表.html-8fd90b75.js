import{_ as n,X as s,Y as a,$ as t}from"./framework-60036392.js";const e={},p=t(`<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>新建</td><td>2022年11月13日18:33:11</td></tr></tbody></table><h2 id="concurrentskiplistset-概述" tabindex="-1"><a class="header-anchor" href="#concurrentskiplistset-概述" aria-hidden="true">#</a> ConcurrentSkipListSet 概述</h2><p>ConcurrentSkipListSet 就是我们认知的 Set 集合，只不过底层是通过跳表实现的。</p><p>JDK 提供的 HashSet 内部的操作都是委托给 HashMap 实现的，ConcurrentSkipListSet 也是这样，其内部的操作都是委托 ConcurrentSkipListMap 实现的。</p><h2 id="concurrentskiplistset-原理" tabindex="-1"><a class="header-anchor" href="#concurrentskiplistset-原理" aria-hidden="true">#</a> ConcurrentSkipListSet 原理</h2><p>ConcurrentSkipListSet 的内部有一个 ConcurrentSkipListMap 类型的属性：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * The underlying map. Uses Boolean.TRUE as value for each
 * element.  This field is declared final for the sake of thread
 * safety, which entails some ugliness in clone().
 */</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ConcurrentNavigableMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> m<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看一个 ConcurrentSkipListSet 的构造方法，可以看到是直接创建一个 ConcurrentSkipListMap 对象，Set 内部的操作都是委托给 ConcurrentSkipListMap 对象的。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ConcurrentSkipListSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    m <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentSkipListMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以 ConcurrentSkipListSet 就是一种跳表的数据结构，它的时间复杂度</p><table><thead><tr><th style="text-align:left;">Algorithm</th><th><strong>Average</strong></th><th><strong>Worst case</strong></th></tr></thead><tbody><tr><td style="text-align:left;">Space</td><td>O(n)</td><td>O(nlogn)</td></tr><tr><td style="text-align:left;">Search</td><td>O(logn)</td><td>O(n)</td></tr><tr><td style="text-align:left;">Insert</td><td>O(logn)</td><td>O(n)</td></tr><tr><td style="text-align:left;">Delete</td><td>O(logn)</td><td>O(n)</td></tr></tbody></table><p>看下 ConcurrentSkipListSet 的增删改查的方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> m<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到基本上都是调用的 ConcurrentSkipListMap 的对应的方法。</p><p>需要注意的是，因为 ConcurrentSkipListMap 的 key 和 value 都不允许为空，所以 ConcurrentSkipListSet 都给 value 设置为 Boolean.TRUE。</p>`,15),c=[p];function o(i,l){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","25-ConcurrentSkipListSet跳表.html.vue"]]);export{r as default};
