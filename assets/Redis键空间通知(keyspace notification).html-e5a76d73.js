import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as d,f as n}from"./app-89fa67df.js";const s={},t=n(`<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>新建</td><td>2023年04月22日17:29:04</td></tr></tbody></table><blockquote><p>本文档翻译自：https://redis.io/docs/manual/keyspace-notifications/</p></blockquote><h2 id="keyspace-notification-简介" tabindex="-1"><a class="header-anchor" href="#keyspace-notification-简介" aria-hidden="true">#</a> keyspace notification 简介</h2><p>键空间通知使得客户端可以通过订阅频道或模式， 来接收那些以某种方式改动了 Redis 数据集的事件。</p><p>举个例子，以下是一些键空间通知发送的事件的例子：</p><ul><li>所有修改键的命令；</li><li>所有接收到 <code>[LPUSH key value [value …])</code>命令的键；</li><li><code>0</code> 号数据库中所有已过期的键；</li></ul><p>注意：事件通过 Redis 的订阅与发布功能（Pub/Sub）来进行分发， 因此所有支持订阅与发布功能的客户端都可以在无须做任何修改的情况下， 直接使用键空间通知功能。Redis Pub/Sub 是 fire and forget，也就是说，如果你的 Pub/Sub 客户端断开连接，然后重新连接，那么在客户端断开连接期间传递的所有事件都会丢失。</p><h2 id="事件通知类型" tabindex="-1"><a class="header-anchor" href="#事件通知类型" aria-hidden="true">#</a> 事件通知类型</h2><p>Redis 中的键空间通知机制，<strong>对于每个修改数据库的操作，通过发送两种不同类型的事件来通知应用程序</strong>。这样，应用程序可以及时了解 Redis 数据空间的变化情况，从而做出相应的处理。</p><p>例如，针对数据库 0 中名为 mykey 的键的 DEL 操作将触发两条消息的传递，完全等同于以下两个 PUBLISH 命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PUBLISH __keyspace@0__:mykey del
PUBLISH __keyevent@0__:del mykey
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>第一个频道 <code>__keyspace@0__:mykey</code> 监听针对数据库 0 中的键 mykey 的所有事件。</p></li><li><p>另一个频道 <code>__keyevent@0__:del</code> 只监听数据库 0 中的键 mykey 的 DEL 操作事件。</p></li></ul><p>以 <code>keyspace</code> 为前缀的频道被称为键空间通知（key-space notification）， 而以 <code>keyevent</code> 为前缀的频道则被称为键事件通知（key-event notification）。</p><p>在前面的示例中，为键 mykey 生成了一个 del 事件，会触发两条消息：</p><ul><li>键空间（Key-space）频道的订阅者会接收到该键被操作的操作名字，案例中就是 <code>del</code> 了；</li><li>键事件（Key-event）频道的订阅者会接收到被操作的键的名字，案例中就是<code>mykey</code>了；</li></ul><p>当然我们可以只启用一种通知机制，只关注我们感兴趣的事件子集。</p><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><p>默认情况下，键空间事件通知被禁用，因为该功能会占用一些 CPU 资源。使用 redis.conf 的 notify-keyspace-events 或通过 CONFIG SET 启用通知。</p><ul><li>将参数设置为空字符串会禁用通知；</li><li>启用该功能，需要使用了由多个字符组成的非空字符串；</li></ul><p>根据下表来设置，其中每个字符都有特殊含义：</p><blockquote><p>注意：每个版本的 Redis 中支持的不一样，需要关注各个版本的配置文件支持那=哪些配置</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>K     Keyspace events, published with __keyspace@&lt;db&gt;__ prefix.
E     Keyevent events, published with __keyevent@&lt;db&gt;__ prefix.
g     Generic commands (non-type specific) like DEL, EXPIRE, RENAME, ...
$     String commands
l     List commands
s     Set commands
h     Hash commands
z     Sorted set commands
t     Stream commands
d     Module key type events
x     Expired events (events generated every time a key expires)
e     Evicted events (events generated when a key is evicted for maxmemory)
m     Key miss events (events generated when a key that doesn&#39;t exist is accessed)
n     New key events (Note: not included in the &#39;A&#39; class)
A     Alias for &quot;g$lshztxed&quot;, so that the &quot;AKE&quot; string means all the events except &quot;m&quot; and &quot;n&quot;.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>字符串中至少应包含 K 或 E，否则无论字符串的其余部分如何，都不会传递任何事件。</strong></p><p>例如，只为列表启用键空间（Key-space）事件，配置参数必须设置为 <code>Kl</code>，等等。</p><p>您可以使用字符串 <code>KEA</code> 来启用大多数类型的事件。</p><h2 id="命令产生的通知" tabindex="-1"><a class="header-anchor" href="#命令产生的通知" aria-hidden="true">#</a> 命令产生的通知</h2><p>根据以下列表，不同的命令会生成不同类型的事件。</p><p>有很多通知的时间，具体可看官网的解释 https://redis.io/docs/manual/keyspace-notifications/#events-generated-by-different-commands。</p><p>这里说一些命令产生的通知：</p><ul><li>DEL 命令删除一个键时会产生一个 <code>del</code> 事件的通知；</li><li>RENAME 生成两个事件，源键的 <code>rename_from </code>事件和目标键的 <code>rename_to</code>事件；</li><li>SET 及其所有变体（SETEX、SETNX、GETSET）生成 <code>set</code>事件。 SETEX 也会产生过期事件；</li><li>每当一个键因为过期而被删除时，产生一个 <code>expired</code> 通知；</li><li>每当一个键因为 <code>maxmemory</code> 政策而被删除以回收内存时，产生一个 <code>evicted</code> 通知；、</li><li>每次将新键添加到数据集中时，都会生成一个 <code>new</code>事件；</li></ul><blockquote><p>注意：各个版本的 Redis 支持的事件的情况不一样。</p></blockquote><p>需要注意的是：<strong>所有命令仅在目标键真正被修改时才会生成事件</strong>。例如，从 set 中删除一个不存在的元素的 SREM 实际上不会更改键的值，因此不会生成任何事件。</p><p>测试一下：</p><p>客户端 A 订阅 <code>__keyspace@0__:mykey</code> 模式</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6379&gt; auth master123
OK
127.0.0.1:6379&gt; config set notify-keyspace-events KEA
OK
127.0.0.1:6379&gt; psubscribe &#39;__keyspace@0__:mykey&#39;
Reading messages... (press Ctrl-C to quit)
1) &quot;psubscribe&quot;
2) &quot;__keyspace@0__:mykey&quot;
3) (integer) 1
1) &quot;pmessage&quot;
2) &quot;__keyspace@0__:mykey&quot;
3) &quot;__keyspace@0__:mykey&quot;
4) &quot;set&quot;
1) &quot;pmessage&quot;
2) &quot;__keyspace@0__:mykey&quot;
3) &quot;__keyspace@0__:mykey&quot;
4) &quot;del&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端 B 操作键 mykey</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6379&gt; set mykey aaa
OK
127.0.0.1:6379&gt; get mykey
&quot;aaa&quot;
127.0.0.1:6379&gt; del mykey
(integer) 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="键过期的事件" tabindex="-1"><a class="header-anchor" href="#键过期的事件" aria-hidden="true">#</a> 键过期的事件</h2><p>在 Redis 中键过期删除有两种触发方式：</p><ul><li>惰性删除：当某个键被访问时，会检查键是否过期，假如过期了就删除键；</li><li>定时删除：Redis 的定期任务会渐进地查找并删除那些过期的键，从而处理那些已经过期、但是不会被访问到的键；</li></ul><p>当过期键被以上两个触发方式发现过期时， 将键从 Redis 中删除时， Redis 会产生一个 <code>expired</code> 通知。</p><p>因为惰性删除和定时删除的存在，所以过期键的 <code>expired</code> 通知可能并不是实时的，Redis 产生 <code>expired</code> 通知的时间为过期键被删除的时候， 而不是键的生存时间变为 <code>0</code> 的时候。</p><blockquote><p>拿 Redis 的定时任务作为延迟任务执行并不靠谱，不知道网络上用这个方式做延迟任务的是怎么想的😅</p></blockquote>`,43),a=[t];function l(c,o){return i(),d("div",null,a)}const v=e(s,[["render",l],["__file","Redis键空间通知(keyspace notification).html.vue"]]);export{v as default};
