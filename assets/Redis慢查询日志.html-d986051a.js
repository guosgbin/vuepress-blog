import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as l,f as n}from"./app-04507aac.js";const t={},s=n(`<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>新增</td><td>2023年04月09日22:36:04</td></tr></tbody></table><p>本文参考：</p><ul><li>http://redisbook.com/preview/server/execute_command.html</li><li>https://blog.csdn.net/wwh578867817/article/details/123173543</li></ul><h2 id="redis-执行一个命令的整个过程" tabindex="-1"><a class="header-anchor" href="#redis-执行一个命令的整个过程" aria-hidden="true">#</a> Redis 执行一个命令的整个过程</h2><blockquote><p>http://redisbook.com/preview/server/execute_command.html</p></blockquote><p>一个命令请求从发送到获得回复的过程大致如下：</p><ol><li><strong>发送命令请求</strong>：Redis 客户端将命令请求转换成协议格式，通过套接字发送给 Redis 服务器；</li><li><strong>读取命令请求</strong>：Redis 服务器读取来自 Redis 客户端的请求命令，并将其保存到客户端状态的输入缓冲区里面；</li><li><strong>解析命令参数</strong>：Redis 服务器将命令解析为命令名和参数，并在内部执行相应的处理逻辑；</li><li><strong>执行命令逻辑</strong>：Redis 服务器根据命令类型和具体的参数，在数据库中执行相应的操作；</li><li><strong>存储命令结果</strong>：Redis 服务器将命令执行后得到的结果存储在输出缓冲区中；</li><li><strong>发送命令结果</strong>：Redis 服务器从输出缓冲区中读取命令结果，并将其通过网络协议发送给客户端。</li></ol><blockquote><p>Redis 6 后的多线程部分只是用来处理网络数据的读写和协议解析，执行命令还是单线程的。但如果严格来讲从 Redis 4 之后并不是单线程，除了主线程外，它也有后台线程在处理一些较为缓慢的操作，例如清理脏数据、无用连接的释放、大 key 的删除等等。</p></blockquote><h2 id="慢查询的两个配置参数" tabindex="-1"><a class="header-anchor" href="#慢查询的两个配置参数" aria-hidden="true">#</a> 慢查询的两个配置参数</h2><h3 id="慢查询的两个配置" tabindex="-1"><a class="header-anchor" href="#慢查询的两个配置" aria-hidden="true">#</a> 慢查询的两个配置</h3><p>在 Redis 的配置文件中有下面两个配置项</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>slowlog-log-slower-than 10000
slowlog-max-len 128
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>slowlog-log-slower-than</strong>：表示 Redis 命令执行超过多长时间（微秒）才会被记录在慢查询日志中； <ul><li>如果配置中输入一个负数，则会禁用慢查询日志；</li><li>如果输入 0，则会记录每个命令的执行情况；</li></ul></li><li><strong>slowlog-max-len</strong>：表示慢查询日志的长度。当日志条数已经满了时，新的命令被记录时，最旧的记录将从队列中移除；</li></ul><h3 id="在线修改慢查询的两个配置" tabindex="-1"><a class="header-anchor" href="#在线修改慢查询的两个配置" aria-hidden="true">#</a> 在线修改慢查询的两个配置</h3><p>这两个参数可以使用 <strong>CONFIG SET</strong> 命令在线修改</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CONFIG SET parameter value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>先看一下之前的配置的值</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6379&gt; config get *slow*
1) &quot;slowlog-max-len&quot;
2) &quot;128&quot;
3) &quot;slowlog-log-slower-than&quot;
4) &quot;10000&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在线修改</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6379&gt; config set slowlog-log-slower-than 100
OK
127.0.0.1:6379&gt; config set slowlog-max-len 1024
OK
127.0.0.1:6379&gt;
127.0.0.1:6379&gt; config get *slow*
1) &quot;slowlog-max-len&quot;
2) &quot;1024&quot;
3) &quot;slowlog-log-slower-than&quot;
4) &quot;100&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用 <strong>CONFIG REWRITE</strong> 将配置持久化本地配置文件中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6379&gt; config rewrite
OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以去本地配置文件查看，确实是持久化到了本地配置文件中。</p><h2 id="查看慢查询日志" tabindex="-1"><a class="header-anchor" href="#查看慢查询日志" aria-hidden="true">#</a> 查看慢查询日志</h2><p>慢查询日志是存放在 Redis 的内存列表中，我们需要通过命令来访问慢查询日志。</p><h3 id="slowlog-get-获取慢查询日志" tabindex="-1"><a class="header-anchor" href="#slowlog-get-获取慢查询日志" aria-hidden="true">#</a> SLOWLOG GET：获取慢查询日志</h3><blockquote><p>https://redis.io/commands/slowlog-get/</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SLOWLOG GET [count]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>默认返回最近的 10 条慢查询日志。</p><p>可选的 count 参数限制返回条目的数量，因此该命令最多返回 count 个条目，特殊数字 -1 表示返回所有条目。</p><p>看个案例，为了看慢查询日志，我临时把 slowlog-log-slower-than 改成 1 了：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6379&gt; slowlog get
1) 1) (integer) 4
   2) (integer) 1680796134
   3) (integer) 560
   4) 1) &quot;set&quot;
      2) &quot;name&quot;
      3) &quot;hello&quot;
   5) &quot;127.0.0.1:51612&quot;
   6) &quot;&quot;
2) 1) (integer) 3
   2) (integer) 1680796120
   3) (integer) 6027
   4) 1) &quot;config&quot;
      2) &quot;rewrite&quot;
   5) &quot;127.0.0.1:51612&quot;
   6) &quot;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>慢查询日志中的每个条目由下面 6 个值组成：</p><ol><li>慢查询日志的标识 ID（唯一性）；</li><li>记录日志的 Unix 时间戳；</li><li>命令耗时（微秒）；</li><li>执行命令和参数的数组；</li><li>客户端 IP 和端口（仅限 4.0 或更高版本）；</li><li>客户端名称（如果通过 CLIENT SETNAME 命令设置，仅限 4.0 或更高版本）；</li></ol><blockquote><p>Starting with Redis version 4.0.0: Added client IP address, port and name to the reply.</p></blockquote><h3 id="slowlog-len-获取慢查询日志列表的长度" tabindex="-1"><a class="header-anchor" href="#slowlog-len-获取慢查询日志列表的长度" aria-hidden="true">#</a> SLOWLOG LEN：获取慢查询日志列表的长度</h3><blockquote><p>https://redis.io/commands/slowlog-len/</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SLOWLOG LEN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>看个例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6379&gt; slowlog len
(integer) 6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦慢查询日志列表的长度达到 slowlog-max-len 限制，每当创建新的慢查询日志时，都会删除最旧慢查询日志。可以使用 SLOWLOG RESET 命令清除慢查询日志。</p><h3 id="slowlog-reset-重置慢查询日志" tabindex="-1"><a class="header-anchor" href="#slowlog-reset-重置慢查询日志" aria-hidden="true">#</a> SLOWLOG RESET：重置慢查询日志</h3><blockquote><p>https://redis.io/commands/slowlog-reset/</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SLOWLOG RESET
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对慢查询日志列表做清空操作。一旦清空，永远无法找回。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6379&gt; slowlog len
(integer) 9
127.0.0.1:6379&gt; slowlog reset
OK
127.0.0.1:6379&gt; slowlog len
(integer) 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运维实践" tabindex="-1"><a class="header-anchor" href="#运维实践" aria-hidden="true">#</a> 运维实践</h2><p>需要注意的是，慢查询记录的是命令的执行时间，并不包括命令排队和网络传输的时间。所以客户端执行命令的时间会大于命令的实际执行时间。因为命令执行排队机制，慢查询会导致其它命令级联阻塞，因此当客户端出现请求超时时，需要检查该时间点是否有对应的慢查询，从而分析出是否是慢查询导致的命令级联阻塞。</p><ul><li><strong>slowlog-log-slower-than</strong>：默认值超过 10 毫秒就是慢查询，这个值需要根据 Redis 的并发量来调整该值。因为 Redis 的命令都是单线程执行的，对于高流量的场景，如果命令执行时间在 1 毫秒以上，那么 Redis 最多可支撑的 OPS 不到 1000。所以对于高 OPS 的场景的 Redis 建议给这个配置项设置为 1 毫秒；</li><li><strong>slowlog-max-len</strong>：线上建议调大慢查询查询列表，记录慢查询时 Redis 会对长命令做截断操作，并不会占用大量内存。线上可设置为 1000 以上。因为慢查询列表是一个长度有限制的 FIFO 的队列，所以可能会有记录丢失的情况，我们可以定时调用 SLOW GET 命令将慢查询日志持久化到其他存储中；</li></ul><table><thead><tr><th>参数</th><th>说明</th><th>设置建议</th></tr></thead><tbody><tr><td>slowlog-log-slower-than</td><td>设置慢查询阈值，执行时间超过阈值后会被记录到慢日志。<br>单位为微秒（μs）。负数会禁用慢日志，而零值会强制记录每个命令。</td><td>不要设置过大，通常设置 1ms。</td></tr><tr><td>slowlog-max-len</td><td>设置慢日志的长度。当记录新命令并且慢速日志已达到其最大长度时，最旧的命令将从记录的命令队列中删除以腾出空间。</td><td>不要设置过小，通常设置 1000 左右。</td></tr></tbody></table>`,50),d=[s];function a(o,r){return i(),l("div",null,d)}const v=e(t,[["render",a],["__file","Redis慢查询日志.html.vue"]]);export{v as default};
