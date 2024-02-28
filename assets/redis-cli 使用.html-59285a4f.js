import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as n,f as a}from"./app-c9bd35d8.js";const t={},i=a(`<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>新增</td><td>2023年04月11日00:36:04</td></tr></tbody></table><h2 id="redis-cli-支持的所有选项" tabindex="-1"><a class="header-anchor" href="#redis-cli-支持的所有选项" aria-hidden="true">#</a> Redis-cli 支持的所有选项</h2><p>Redis-cli 支持很多选项，每个 Redis 版本支持的选项不一样。</p><h3 id="redis-4-0-6-支持的选项" tabindex="-1"><a class="header-anchor" href="#redis-4-0-6-支持的选项" aria-hidden="true">#</a> Redis 4.0.6 支持的选项</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>Calven.Liu@ALYBJ59-6 ~<span class="token punctuation">]</span>$ redis-cli <span class="token parameter variable">--help</span>
redis-cli <span class="token number">4.0</span>.6

Usage: redis-cli <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> <span class="token punctuation">[</span>cmd <span class="token punctuation">[</span>arg <span class="token punctuation">[</span>arg <span class="token punctuation">..</span>.<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
  <span class="token parameter variable">-h</span> <span class="token operator">&lt;</span>hostname<span class="token operator">&gt;</span>      Server <span class="token function">hostname</span> <span class="token punctuation">(</span>default: <span class="token number">127.0</span>.0.1<span class="token punctuation">)</span>.
  <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>port<span class="token operator">&gt;</span>          Server port <span class="token punctuation">(</span>default: <span class="token number">6379</span><span class="token punctuation">)</span>.
  <span class="token parameter variable">-s</span> <span class="token operator">&lt;</span>socket<span class="token operator">&gt;</span>        Server socket <span class="token punctuation">(</span>overrides <span class="token function">hostname</span> and port<span class="token punctuation">)</span>.
  <span class="token parameter variable">-a</span> <span class="token operator">&lt;</span>password<span class="token operator">&gt;</span>      Password to use when connecting to the server.
  <span class="token parameter variable">-u</span> <span class="token operator">&lt;</span>uri<span class="token operator">&gt;</span>           Server URI.
  <span class="token parameter variable">-r</span> <span class="token operator">&lt;</span>repeat<span class="token operator">&gt;</span>        Execute specified <span class="token builtin class-name">command</span> N times.
  <span class="token parameter variable">-i</span> <span class="token operator">&lt;</span>interval<span class="token operator">&gt;</span>      When <span class="token parameter variable">-r</span> is used, waits <span class="token operator">&lt;</span>interval<span class="token operator">&gt;</span> seconds per command.
                     It is possible to specify sub-second <span class="token builtin class-name">times</span> like <span class="token parameter variable">-i</span> <span class="token number">0.1</span>.
  <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>db<span class="token operator">&gt;</span>            Database number.
  <span class="token parameter variable">-x</span>                 Read last argument from STDIN.
  <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>delimiter<span class="token operator">&gt;</span>     Multi-bulk delimiter <span class="token keyword">in</span> <span class="token keyword">for</span> raw formatting <span class="token punctuation">(</span>default: <span class="token punctuation">\\</span>n<span class="token punctuation">)</span>.
  <span class="token parameter variable">-c</span>                 Enable cluster mode <span class="token punctuation">(</span>follow <span class="token parameter variable">-ASK</span> and <span class="token parameter variable">-MOVED</span> redirections<span class="token punctuation">)</span>.
  <span class="token parameter variable">--raw</span>              Use raw formatting <span class="token keyword">for</span> replies <span class="token punctuation">(</span>default when STDOUT is
                     not a <span class="token function">tty</span><span class="token punctuation">)</span>.
  --no-raw           Force formatted output even when STDOUT is not a tty.
  <span class="token parameter variable">--csv</span>              Output <span class="token keyword">in</span> CSV format.
  <span class="token parameter variable">--stat</span>             Print rolling stats about server: mem, clients, <span class="token punctuation">..</span>.
  <span class="token parameter variable">--latency</span>          Enter a special mode continuously sampling latency.
                     If you use this mode <span class="token keyword">in</span> an interactive session it runs
                     forever displaying real-time stats. Otherwise <span class="token keyword">if</span> <span class="token parameter variable">--raw</span> or
                     <span class="token parameter variable">--csv</span> is specified, or <span class="token keyword">if</span> you redirect the output to a non
                     TTY, it samples the latency <span class="token keyword">for</span> <span class="token number">1</span> second <span class="token punctuation">(</span>you can use
                     <span class="token parameter variable">-i</span> to change the interval<span class="token punctuation">)</span>, <span class="token keyword">then</span> produces a single output
                     and exits.
  --latency-history  Like <span class="token parameter variable">--latency</span> but tracking latency changes over time.
                     Default <span class="token function">time</span> interval is <span class="token number">15</span> sec. Change it using -i.
  --latency-dist     Shows latency as a spectrum, requires xterm <span class="token number">256</span> colors.
                     Default <span class="token function">time</span> interval is <span class="token number">1</span> sec. Change it using -i.
  --lru-test <span class="token operator">&lt;</span>keys<span class="token operator">&gt;</span>  Simulate a cache workload with an <span class="token number">80</span>-20 distribution.
  <span class="token parameter variable">--slave</span>            Simulate a slave showing commands received from the master.
  <span class="token parameter variable">--rdb</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>   Transfer an RDB dump from remote server to <span class="token builtin class-name">local</span> file.
  <span class="token parameter variable">--pipe</span>             Transfer raw Redis protocol from stdin to server.
  --pipe-timeout <span class="token operator">&lt;</span>n<span class="token operator">&gt;</span> In <span class="token parameter variable">--pipe</span> mode, abort with error <span class="token keyword">if</span> after sending all data.
                     no reply is received within <span class="token operator">&lt;</span>n<span class="token operator">&gt;</span> seconds.
                     Default timeout: <span class="token number">30</span>. Use <span class="token number">0</span> to <span class="token function">wait</span> forever.
  <span class="token parameter variable">--bigkeys</span>          Sample Redis keys looking <span class="token keyword">for</span> big keys.
  <span class="token parameter variable">--hotkeys</span>          Sample Redis keys looking <span class="token keyword">for</span> hot keys.
                     only works when maxmemory-policy is *lfu.
  <span class="token parameter variable">--scan</span>             List all keys using the SCAN command.
  <span class="token parameter variable">--pattern</span> <span class="token operator">&lt;</span>pat<span class="token operator">&gt;</span>    Useful with <span class="token parameter variable">--scan</span> to specify a SCAN pattern.
  --intrinsic-latency <span class="token operator">&lt;</span>sec<span class="token operator">&gt;</span> Run a <span class="token builtin class-name">test</span> to measure intrinsic system latency.
                     The <span class="token builtin class-name">test</span> will run <span class="token keyword">for</span> the specified amount of seconds.
  <span class="token parameter variable">--eval</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>      Send an EVAL <span class="token builtin class-name">command</span> using the Lua script at <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>.
  <span class="token parameter variable">--ldb</span>              Used with <span class="token parameter variable">--eval</span> <span class="token builtin class-name">enable</span> the Redis Lua debugger.
  --ldb-sync-mode    Like <span class="token parameter variable">--ldb</span> but uses the synchronous Lua debugger, <span class="token keyword">in</span>
                     this mode the server is blocked and script changes are
                     are not rolled back from the server memory.
  <span class="token parameter variable">--help</span>             Output this <span class="token builtin class-name">help</span> and exit.
  <span class="token parameter variable">--version</span>          Output version and exit.

Examples:
  <span class="token function">cat</span> /etc/passwd <span class="token operator">|</span> redis-cli <span class="token parameter variable">-x</span> <span class="token builtin class-name">set</span> mypasswd
  redis-cli get mypasswd
  redis-cli <span class="token parameter variable">-r</span> <span class="token number">100</span> lpush mylist x
  redis-cli <span class="token parameter variable">-r</span> <span class="token number">100</span> <span class="token parameter variable">-i</span> <span class="token number">1</span> info <span class="token operator">|</span> <span class="token function">grep</span> used_memory_human:
  redis-cli <span class="token parameter variable">--eval</span> myscript.lua key1 key2 , arg1 arg2 arg3
  redis-cli <span class="token parameter variable">--scan</span> <span class="token parameter variable">--pattern</span> <span class="token string">&#39;*:12345*&#39;</span>

  <span class="token punctuation">(</span>Note: when using <span class="token parameter variable">--eval</span> the comma separates KEYS<span class="token punctuation">[</span><span class="token punctuation">]</span> from ARGV<span class="token punctuation">[</span><span class="token punctuation">]</span> items<span class="token punctuation">)</span>

When no <span class="token builtin class-name">command</span> is given, redis-cli starts <span class="token keyword">in</span> interactive mode.
Type <span class="token string">&quot;help&quot;</span> <span class="token keyword">in</span> interactive mode <span class="token keyword">for</span> information on available commands
and settings.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="redis-4-0-6-支持的选项介绍" tabindex="-1"><a class="header-anchor" href="#redis-4-0-6-支持的选项介绍" aria-hidden="true">#</a> Redis 4.0.6 支持的选项介绍</h3><table><thead><tr><th>选项</th><th>含义</th></tr></thead><tbody><tr><td><code>-h &lt;hostname&gt;</code></td><td>服务器 IP 地址，默认 127.0.0.1</td></tr><tr><td><code>-p &lt;port&gt;</code></td><td>服务器端口，默认 6379</td></tr><tr><td><code>-s &lt;socket&gt;</code></td><td>Unix socket 文件连接到服务器</td></tr><tr><td><code>-a &lt;password&gt; </code></td><td>密码</td></tr><tr><td><code> -u &lt;uri&gt;</code></td><td>连接服务器，<code>redis://password@host:port/dbnum</code></td></tr><tr><td><code>-r &lt;repeat&gt;</code></td><td>重复执行命令 N 次，-1 表示无限次</td></tr><tr><td><code>-i &lt;interval&gt;</code></td><td>每个命令执行的间隔时间，单位秒，可以指定小数</td></tr><tr><td><code>-n &lt;db&gt;</code></td><td>选择对应编号的数据库</td></tr><tr><td><code>-x</code></td><td>Read last argument from STDIN</td></tr><tr><td><code> -d &lt;delimiter&gt;</code></td><td>Multi-bulk delimiter in for raw formatting (default: \\n).</td></tr><tr><td><code>-c</code></td><td>-c （cluster）是连接 Redis Cluster 节点时需要使用的，-c 选项可以防止 moved 和 ask 异常</td></tr><tr><td><code>--raw</code></td><td>命令返回的是格式化后的结果</td></tr><tr><td><code>--no-raw</code></td><td>命令返回的结果是原始的格式</td></tr><tr><td><code>--csv</code></td><td>命令以 CSV 格式返回结果，CSV（逗号分隔值）</td></tr><tr><td><code>--stat</code></td><td>实时获取服务器的统计信息，如内存......</td></tr><tr><td><code>--latency</code></td><td>测试客户端到目标 Redis 的网络延迟，原理是客户端每秒发送 100 个 PING 命令到服务端并计算收到回复的时间（单位毫秒），支持和 <code>--raw</code> 和 <code>--csv</code>一起使用，和这两个一起使用时，可以 <code>-i</code> 指定采样时间</td></tr><tr><td><code>--latency-history</code></td><td>测试客户端到目标 Redis 服务端的一段时间内的最大延迟和平均延迟，默认情况每 15 秒打印一次，可以使用 <code>-i &lt;interval&gt;</code>选项修改时间间隔</td></tr><tr><td><code>--latency-dist</code></td><td>使用统计图表的形式从控制台输出延迟统计信息，可以使用 <code>-i &lt;interval&gt;</code>选项修改时间间隔；</td></tr><tr><td><code>--lru-test &lt;keys&gt;</code></td><td>模拟 80% 的请求命中 20% 的缓存的命中率</td></tr><tr><td><code>--slave</code></td><td>把当前客户端模拟成当前 Redis 的从节点，可以用来获取当前 Redis 节点的更新操作。</td></tr><tr><td><code>--rdb &lt;filename&gt;</code></td><td>请求 Redis 实例生成并发送 RDB 持久化文件，保存在客户端所在的机器。可以用它做持久化文件的定期备份</td></tr><tr><td><code>--pipe</code></td><td>将命令封装成 Redis 通信协议定义的数据格式，批量发送给 Redis 执行（单独写一篇文章）</td></tr><tr><td><code>--pipe-timeout &lt;n&gt;</code></td><td><code>--pipe</code>配合使用，表示与Redis服务器之间的超时时间，单位为毫秒。该参数的默认值为 30 秒。设置 0 表示一直等待导入数据完成。</td></tr><tr><td><code>--bigkeys</code></td><td>使用 SCAN 命令对 Redis 进行采样，从中找到内存占用比较大的键值对</td></tr><tr><td><code>--hotkeys</code></td><td>找出服务器中的热 key。当服务器的淘汰策略（maxmemory-policy）是 *lfu 类型才可以</td></tr><tr><td><code>--scan</code></td><td>通过 SCAN 命令获取当前服务器的所有键名</td></tr><tr><td><code>--pattern &lt;pat&gt;</code></td><td>和<code>--scan</code> 选项配合使用，指定匹配规则</td></tr><tr><td><code>--intrinsic-latency &lt;sec&gt;</code></td><td>测试服务器硬件本身存在的固有延迟</td></tr><tr><td><code>--eval &lt;file&gt;</code></td><td>Send an EVAL command using the Lua script at <code>&lt;file&gt;</code>.</td></tr><tr><td><code>--ldb</code></td><td>Used with --eval enable the Redis Lua debugger.</td></tr><tr><td><code>--ldb-sync-mode</code></td><td>Like --ldb but uses the synchronous Lua debugger, in this mode the server is blocked and script changes are are not rolled back from the server memory.</td></tr><tr><td><code>--help</code></td><td>打印帮助</td></tr><tr><td><code>--version</code></td><td>打印当前服务器的版本号</td></tr></tbody></table><h3 id="redis-6-2-11-支持的选项" tabindex="-1"><a class="header-anchor" href="#redis-6-2-11-支持的选项" aria-hidden="true">#</a> Redis 6.2.11 支持的选项</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ./redis-cli <span class="token parameter variable">--help</span>
redis-cli <span class="token number">6.2</span>.11 <span class="token punctuation">(</span>git:720ea82e<span class="token punctuation">)</span>

Usage: redis-cli <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> <span class="token punctuation">[</span>cmd <span class="token punctuation">[</span>arg <span class="token punctuation">[</span>arg <span class="token punctuation">..</span>.<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
  <span class="token parameter variable">-h</span> <span class="token operator">&lt;</span>hostname<span class="token operator">&gt;</span>      Server <span class="token function">hostname</span> <span class="token punctuation">(</span>default: <span class="token number">127.0</span>.0.1<span class="token punctuation">)</span>.
  <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>port<span class="token operator">&gt;</span>          Server port <span class="token punctuation">(</span>default: <span class="token number">6379</span><span class="token punctuation">)</span>.
  <span class="token parameter variable">-s</span> <span class="token operator">&lt;</span>socket<span class="token operator">&gt;</span>        Server socket <span class="token punctuation">(</span>overrides <span class="token function">hostname</span> and port<span class="token punctuation">)</span>.
  <span class="token parameter variable">-a</span> <span class="token operator">&lt;</span>password<span class="token operator">&gt;</span>      Password to use when connecting to the server.
                     You can also use the REDISCLI_AUTH environment
                     variable to pass this password <span class="token function">more</span> safely
                     <span class="token punctuation">(</span>if both are used, this argument takes precedence<span class="token punctuation">)</span>.
  <span class="token parameter variable">--user</span> <span class="token operator">&lt;</span>username<span class="token operator">&gt;</span>  Used to send ACL style <span class="token string">&#39;AUTH username pass&#39;</span><span class="token builtin class-name">.</span> Needs -a.
  <span class="token parameter variable">--pass</span> <span class="token operator">&lt;</span>password<span class="token operator">&gt;</span>  Alias of <span class="token parameter variable">-a</span> <span class="token keyword">for</span> consistency with the new <span class="token parameter variable">--user</span> option.
  <span class="token parameter variable">--askpass</span>          Force user to input password with mask from STDIN.
                     If this argument is used, <span class="token string">&#39;-a&#39;</span> and REDISCLI_AUTH
                     environment variable will be ignored.
  <span class="token parameter variable">-u</span> <span class="token operator">&lt;</span>uri<span class="token operator">&gt;</span>           Server URI.
  <span class="token parameter variable">-r</span> <span class="token operator">&lt;</span>repeat<span class="token operator">&gt;</span>        Execute specified <span class="token builtin class-name">command</span> N times.
  <span class="token parameter variable">-i</span> <span class="token operator">&lt;</span>interval<span class="token operator">&gt;</span>      When <span class="token parameter variable">-r</span> is used, waits <span class="token operator">&lt;</span>interval<span class="token operator">&gt;</span> seconds per command.
                     It is possible to specify sub-second <span class="token builtin class-name">times</span> like <span class="token parameter variable">-i</span> <span class="token number">0.1</span>.
  <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>db<span class="token operator">&gt;</span>            Database number.
  <span class="token parameter variable">-3</span>                 Start session <span class="token keyword">in</span> RESP3 protocol mode.
  <span class="token parameter variable">-x</span>                 Read last argument from STDIN.
  <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>delimiter<span class="token operator">&gt;</span>     Delimiter between response bulks <span class="token keyword">for</span> raw formatting <span class="token punctuation">(</span>default: <span class="token punctuation">\\</span>n<span class="token punctuation">)</span>.
  <span class="token parameter variable">-D</span> <span class="token operator">&lt;</span>delimiter<span class="token operator">&gt;</span>     Delimiter between responses <span class="token keyword">for</span> raw formatting <span class="token punctuation">(</span>default: <span class="token punctuation">\\</span>n<span class="token punctuation">)</span>.
  <span class="token parameter variable">-c</span>                 Enable cluster mode <span class="token punctuation">(</span>follow <span class="token parameter variable">-ASK</span> and <span class="token parameter variable">-MOVED</span> redirections<span class="token punctuation">)</span>.
  <span class="token parameter variable">-e</span>                 Return <span class="token builtin class-name">exit</span> error code when <span class="token builtin class-name">command</span> execution fails.
  <span class="token parameter variable">--tls</span>              Establish a secure TLS connection.
  <span class="token parameter variable">--sni</span> <span class="token operator">&lt;</span>host<span class="token operator">&gt;</span>       Server name indication <span class="token keyword">for</span> TLS.
  <span class="token parameter variable">--cacert</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>    CA Certificate <span class="token function">file</span> to verify with.
  <span class="token parameter variable">--cacertdir</span> <span class="token operator">&lt;</span>dir<span class="token operator">&gt;</span>  Directory where trusted CA certificates are stored.
                     If neither cacert nor cacertdir are specified, the default
                     system-wide trusted root certs configuration will apply.
  <span class="token parameter variable">--insecure</span>         Allow insecure TLS connection by skipping cert validation.
  <span class="token parameter variable">--cert</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>      Client certificate to authenticate with.
  <span class="token parameter variable">--key</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>       Private key <span class="token function">file</span> to authenticate with.
  --tls-ciphers <span class="token operator">&lt;</span>list<span class="token operator">&gt;</span> Sets the list of prefered ciphers <span class="token punctuation">(</span>TLSv1.2 and below<span class="token punctuation">)</span>
                     <span class="token keyword">in</span> order of preference from highest to lowest separated by colon <span class="token punctuation">(</span><span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span>.
                     See the ciphers<span class="token punctuation">(</span>1ssl<span class="token punctuation">)</span> manpage <span class="token keyword">for</span> <span class="token function">more</span> information about the syntax of this string.
  --tls-ciphersuites <span class="token operator">&lt;</span>list<span class="token operator">&gt;</span> Sets the list of prefered ciphersuites <span class="token punctuation">(</span>TLSv1.3<span class="token punctuation">)</span>
                     <span class="token keyword">in</span> order of preference from highest to lowest separated by colon <span class="token punctuation">(</span><span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span>.
                     See the ciphers<span class="token punctuation">(</span>1ssl<span class="token punctuation">)</span> manpage <span class="token keyword">for</span> <span class="token function">more</span> information about the syntax of this string,
                     and specifically <span class="token keyword">for</span> TLSv1.3 ciphersuites.
  <span class="token parameter variable">--raw</span>              Use raw formatting <span class="token keyword">for</span> replies <span class="token punctuation">(</span>default when STDOUT is
                     not a <span class="token function">tty</span><span class="token punctuation">)</span>.
  --no-raw           Force formatted output even when STDOUT is not a tty.
  --quoted-input     Force input to be handled as quoted strings.
  <span class="token parameter variable">--csv</span>              Output <span class="token keyword">in</span> CSV format.
  --show-pushes <span class="token operator">&lt;</span>yn<span class="token operator">&gt;</span> Whether to print RESP3 PUSH messages.  Enabled by default when
                     STDOUT is a <span class="token function">tty</span> but can be overriden with --show-pushes no.
  <span class="token parameter variable">--stat</span>             Print rolling stats about server: mem, clients, <span class="token punctuation">..</span>.
  <span class="token parameter variable">--latency</span>          Enter a special mode continuously sampling latency.
                     If you use this mode <span class="token keyword">in</span> an interactive session it runs
                     forever displaying real-time stats. Otherwise <span class="token keyword">if</span> <span class="token parameter variable">--raw</span> or
                     <span class="token parameter variable">--csv</span> is specified, or <span class="token keyword">if</span> you redirect the output to a non
                     TTY, it samples the latency <span class="token keyword">for</span> <span class="token number">1</span> second <span class="token punctuation">(</span>you can use
                     <span class="token parameter variable">-i</span> to change the interval<span class="token punctuation">)</span>, <span class="token keyword">then</span> produces a single output
                     and exits.
  --latency-history  Like <span class="token parameter variable">--latency</span> but tracking latency changes over time.
                     Default <span class="token function">time</span> interval is <span class="token number">15</span> sec. Change it using -i.
  --latency-dist     Shows latency as a spectrum, requires xterm <span class="token number">256</span> colors.
                     Default <span class="token function">time</span> interval is <span class="token number">1</span> sec. Change it using -i.
  --lru-test <span class="token operator">&lt;</span>keys<span class="token operator">&gt;</span>  Simulate a cache workload with an <span class="token number">80</span>-20 distribution.
  <span class="token parameter variable">--replica</span>          Simulate a replica showing commands received from the master.
  <span class="token parameter variable">--rdb</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>   Transfer an RDB dump from remote server to <span class="token builtin class-name">local</span> file.
                     Use filename of <span class="token string">&quot;-&quot;</span> to <span class="token function">write</span> to stdout.
  <span class="token parameter variable">--pipe</span>             Transfer raw Redis protocol from stdin to server.
  --pipe-timeout <span class="token operator">&lt;</span>n<span class="token operator">&gt;</span> In <span class="token parameter variable">--pipe</span> mode, abort with error <span class="token keyword">if</span> after sending all data.
                     no reply is received within <span class="token operator">&lt;</span>n<span class="token operator">&gt;</span> seconds.
                     Default timeout: <span class="token number">30</span>. Use <span class="token number">0</span> to <span class="token function">wait</span> forever.
  <span class="token parameter variable">--bigkeys</span>          Sample Redis keys looking <span class="token keyword">for</span> keys with many elements <span class="token punctuation">(</span>complexity<span class="token punctuation">)</span>.
  <span class="token parameter variable">--memkeys</span>          Sample Redis keys looking <span class="token keyword">for</span> keys consuming a lot of memory.
  --memkeys-samples <span class="token operator">&lt;</span>n<span class="token operator">&gt;</span> Sample Redis keys looking <span class="token keyword">for</span> keys consuming a lot of memory.
                     And define number of key elements to sample
  <span class="token parameter variable">--hotkeys</span>          Sample Redis keys looking <span class="token keyword">for</span> hot keys.
                     only works when maxmemory-policy is *lfu.
  <span class="token parameter variable">--scan</span>             List all keys using the SCAN command.
  <span class="token parameter variable">--pattern</span> <span class="token operator">&lt;</span>pat<span class="token operator">&gt;</span>    Keys pattern when using the --scan, <span class="token parameter variable">--bigkeys</span> or <span class="token parameter variable">--hotkeys</span>
                     options <span class="token punctuation">(</span>default: *<span class="token punctuation">)</span>.
  --quoted-pattern <span class="token operator">&lt;</span>pat<span class="token operator">&gt;</span> Same as --pattern, but the specified string can be
                         quoted, <span class="token keyword">in</span> order to pass an otherwise non binary-safe string.
  --intrinsic-latency <span class="token operator">&lt;</span>sec<span class="token operator">&gt;</span> Run a <span class="token builtin class-name">test</span> to measure intrinsic system latency.
                     The <span class="token builtin class-name">test</span> will run <span class="token keyword">for</span> the specified amount of seconds.
  <span class="token parameter variable">--eval</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>      Send an EVAL <span class="token builtin class-name">command</span> using the Lua script at <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>.
  <span class="token parameter variable">--ldb</span>              Used with <span class="token parameter variable">--eval</span> <span class="token builtin class-name">enable</span> the Redis Lua debugger.
  --ldb-sync-mode    Like <span class="token parameter variable">--ldb</span> but uses the synchronous Lua debugger, <span class="token keyword">in</span>
                     this mode the server is blocked and script changes are
                     not rolled back from the server memory.
  <span class="token parameter variable">--cluster</span> <span class="token operator">&lt;</span>command<span class="token operator">&gt;</span> <span class="token punctuation">[</span>args<span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token punctuation">[</span>opts<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
                     Cluster Manager <span class="token builtin class-name">command</span> and arguments <span class="token punctuation">(</span>see below<span class="token punctuation">)</span>.
  <span class="token parameter variable">--verbose</span>          Verbose mode.
  --no-auth-warning  Don<span class="token string">&#39;t show warning message when using password on command
                     line interface.
  --help             Output this help and exit.
  --version          Output version and exit.

Cluster Manager Commands:
  Use --cluster help to list all available cluster manager commands.

Examples:
  cat /etc/passwd | redis-cli -x set mypasswd
  redis-cli get mypasswd
  redis-cli -r 100 lpush mylist x
  redis-cli -r 100 -i 1 info | grep used_memory_human:
  redis-cli --quoted-input set &#39;</span><span class="token string">&quot;null-<span class="token entity" title="\\x00">\\x00</span>-separated&quot;</span>&#39; value
  redis-cli <span class="token parameter variable">--eval</span> myscript.lua key1 key2 , arg1 arg2 arg3
  redis-cli <span class="token parameter variable">--scan</span> <span class="token parameter variable">--pattern</span> <span class="token string">&#39;*:12345*&#39;</span>

  <span class="token punctuation">(</span>Note: when using <span class="token parameter variable">--eval</span> the comma separates KEYS<span class="token punctuation">[</span><span class="token punctuation">]</span> from ARGV<span class="token punctuation">[</span><span class="token punctuation">]</span> items<span class="token punctuation">)</span>

When no <span class="token builtin class-name">command</span> is given, redis-cli starts <span class="token keyword">in</span> interactive mode.
Type <span class="token string">&quot;help&quot;</span> <span class="token keyword">in</span> interactive mode <span class="token keyword">for</span> information on available commands
and settings.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="redis-6-2-11-支持的选项介绍" tabindex="-1"><a class="header-anchor" href="#redis-6-2-11-支持的选项介绍" aria-hidden="true">#</a> Redis 6.2.11 支持的选项介绍</h3><p>大部分选项在上面的 1.2 节的表格里列出了，这个表格列出上面表格不存在的选项</p><table><thead><tr><th>选项</th><th>含义</th></tr></thead><tbody><tr><td><code>-h &lt;hostname&gt;</code></td><td>服务器 IP 地址，默认 127.0.0.1</td></tr><tr><td><code>-p &lt;port&gt;</code></td><td>服务器端口，默认 6379</td></tr><tr><td><code>-s &lt;socket&gt;</code></td><td>Unix socket 文件连接到服务器</td></tr><tr><td><code>-a &lt;password&gt; </code></td><td>密码<br>可以使用 REDISCLI_AUTH 环境变量配置密码，比较安全</td></tr><tr><td><code>--user &lt;username&gt;</code></td><td>Used to send ACL style &#39;AUTH username pass&#39;. Needs -a.</td></tr><tr><td><code> --pass &lt;password&gt;</code></td><td>Alias of -a for consistency with the new --user option.</td></tr><tr><td><code> --askpass</code></td><td>就是另起一行输入密码，密码是星号展示</td></tr><tr><td><code> -u &lt;uri&gt;</code></td><td>连接服务器，<code>redis://password@host:port/dbnum</code></td></tr><tr><td><code>-r &lt;repeat&gt;</code></td><td>重复执行命令 N 次，-1 表示无限次</td></tr><tr><td><code>-i &lt;interval&gt;</code></td><td>每个命令执行的间隔时间，单位秒，可以指定小数</td></tr><tr><td><code>-n &lt;db&gt;</code></td><td>选择对应编号的数据库</td></tr><tr><td><code>-3</code></td><td>使用 RESP3 协议开启会话</td></tr><tr><td><code>-x</code></td><td>Read last argument from STDIN</td></tr><tr><td><code> -d &lt;delimiter&gt;</code></td><td>Delimiter between response bulks for raw formatting (default: \\n).</td></tr><tr><td><code>-D &lt;delimiter&gt;</code></td><td>Delimiter between responses for raw formatting (default: \\n).</td></tr><tr><td><code>-c</code></td><td>-c （cluster）是连接 Redis Cluster 节点时需要使用的，-c 选项可以防止 moved 和 ask 异常</td></tr><tr><td><code>-e</code></td><td>Return exit error code when command execution fails.</td></tr><tr><td><code>--tls</code></td><td>Establish a secure TLS connection.</td></tr><tr><td><code>--sni &lt;host&gt;</code></td><td>Server name indication for TLS.</td></tr><tr><td><code>--cacert &lt;file&gt;</code></td><td>CA Certificate file to verify with</td></tr><tr><td><code>--cacertdir &lt;dir&gt;</code></td><td>Directory where trusted CA certificates are stored.If neither cacert nor cacertdir are specified, the default system-wide trusted root certs configuration will apply.</td></tr><tr><td><code>--insecure</code></td><td>Allow insecure TLS connection by skipping cert validation.</td></tr><tr><td><code>--cert &lt;file&gt;</code></td><td>Client certificate to authenticate with.</td></tr><tr><td><code>--key &lt;file&gt;</code></td><td>Private key file to authenticate with.</td></tr><tr><td><code>--tls-ciphers &lt;list&gt;</code></td><td>Sets the list of prefered ciphers (TLSv1.2 and below).in order of preference from highest to lowest separated by colon (&quot;😊.See the ciphers(1ssl) manpage for more information about the syntax of this string.</td></tr><tr><td><code>--tls-ciphersuitess &lt;list&gt;</code></td><td>Sets the list of prefered ciphersuites (TLSv1.3).in order of preference from highest to lowest separated by colon (&quot;😊.See the ciphers(1ssl) manpage for more information about the syntax of this string,and specifically for TLSv1.3 ciphersuites.</td></tr><tr><td><code>--raw</code></td><td>命令返回的是格式化后的结果</td></tr><tr><td><code>--no-raw</code></td><td>命令返回的结果是原始的格式</td></tr><tr><td><code>--quoted-input</code></td><td>Force input to be handled as quoted strings.</td></tr><tr><td><code>--csv</code></td><td>命令以 CSV 格式返回结果，CSV（逗号分隔值）</td></tr><tr><td><code>--show-pushes &lt;yn&gt;</code></td><td>Whether to print RESP3 PUSH messages. Enabled by default when STDOUT is a tty but can be overriden with --show-pushes no.</td></tr><tr><td><code>--stat</code></td><td>实时获取服务器的统计信息，如内存......</td></tr><tr><td><code>--latency</code></td><td>测试客户端到目标 Redis 的网络延迟，原理是客户端每秒发送 100 个 PING 命令到服务端并计算收到回复的时间（单位毫秒），支持和 <code>--raw</code> 和 <code>--csv</code>一起使用，和这两个一起使用时，可以 <code>-i</code> 指定采样时间</td></tr><tr><td><code>--latency-history</code></td><td>测试客户端到目标 Redis 服务端的一段时间内的最大延迟和平均延迟，默认情况每 15 秒打印一次，可以使用 <code>-i &lt;interval&gt;</code>选项修改时间间隔</td></tr><tr><td><code>--latency-dist</code></td><td>使用统计图表的形式从控制台输出延迟统计信息，可以使用 <code>-i &lt;interval&gt;</code>选项修改时间间隔；</td></tr><tr><td><code>--lru-test &lt;keys&gt;</code></td><td>模拟 80% 的请求命中 20% 的缓存的命中率</td></tr><tr><td><code>--replica</code></td><td>把当前客户端模拟成当前 Redis 的从节点，可以用来获取当前 Redis 节点的更新操作。</td></tr><tr><td><code>--rdb &lt;filename&gt;</code></td><td>请求 Redis 实例生成并发送 RDB 持久化文件，保存在客户端所在的机器。可以用它做持久化文件的定期备份</td></tr><tr><td><code>--pipe</code></td><td>将命令封装成 Redis 通信协议定义的数据格式，批量发送给 Redis 执行（单独写一篇文章）</td></tr><tr><td><code>--pipe-timeout &lt;n&gt;</code></td><td><code>--pipe</code>配合使用，表示与Redis服务器之间的超时时间，单位为毫秒。该参数的默认值为 30 秒。设置 0 表示一直等待导入数据完成。</td></tr><tr><td><code>--bigkeys</code></td><td>使用 SCAN 命令对 Redis 进行采样，从中找到内存占用比较大的键值对</td></tr><tr><td><code>--memkeys</code></td><td>Sample Redis keys looking for keys consuming a lot of memory.</td></tr><tr><td><code>--memkeys-samples &lt;n&gt;</code></td><td>Sample Redis keys looking for keys consuming a lot of memory.And define number of key elements to sample</td></tr><tr><td><code>--hotkeys</code></td><td>找出服务器中的热 key。当服务器的淘汰策略（maxmemory-policy）是 *lfu 类型才可以</td></tr><tr><td><code>--scan</code></td><td>通过 SCAN 命令获取当前服务器的所有键名</td></tr><tr><td><code>--pattern &lt;pat&gt;</code></td><td>和<code>--scan</code> 选项配合使用，指定匹配规则</td></tr><tr><td><code>--quoted-pattern &lt;pat&gt;</code></td><td>Same as --pattern, but the specified string can be quoted, in order to pass an otherwise non binary-safe string.</td></tr><tr><td><code>--intrinsic-latency &lt;sec&gt;</code></td><td>测试服务器硬件本身存在的固有延迟</td></tr><tr><td><code>--eval &lt;file&gt;</code></td><td>Send an EVAL command using the Lua script at <code>&lt;file&gt;</code>.</td></tr><tr><td><code>--ldb</code></td><td>Used with --eval enable the Redis Lua debugger.</td></tr><tr><td><code>--ldb-sync-mode</code></td><td>Like --ldb but uses the synchronous Lua debugger, in this mode the server is blocked and script changes are are not rolled back from the server memory.</td></tr><tr><td><code>--cluster &lt;command&gt; [args...] [opts...]</code></td><td>Cluster Manager command and arguments (see below).</td></tr><tr><td><code>--verbose</code></td><td>Verbose mode.</td></tr><tr><td><code>--no-auth-warning</code></td><td>Don&#39;t show warning message when using password on command line interface.</td></tr><tr><td><code>--help</code></td><td>打印帮助</td></tr><tr><td><code>--version</code></td><td>打印当前服务器的版本号</td></tr></tbody></table><h2 id="连接-redis" tabindex="-1"><a class="header-anchor" href="#连接-redis" aria-hidden="true">#</a> 连接 Redis</h2><p>默认情况下 redis-cli 连接的服务器是 127.0.0.1 的 6379 端口。</p><ul><li><code>-h</code>：指定 IP；（h，host）</li><li><code>-p</code>：指定端口；（p，port）</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ redis-cli -h redis15.localnet.org -p 6390 PING
PONG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>-a</code>：如果有密码，<code>-a &lt;password&gt;</code> 指定密码；（a，auth）</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ redis-cli -a myUnguessablePazzzzzword123 PING
PONG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>为了安全，可以使用 <code>export REDISCLI_AUTH=你的密码</code>，通过环境变量的方式指定密码。</p></blockquote><ul><li>最后，可以使用<code> -n &lt;dbnum&gt;</code> 选项，指定操作的数据库编号（默认操作编号 0 的数据库）；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ redis-cli FLUSHALL
OK
$ redis-cli -n 1 INCR a
(integer) 1
$ redis-cli -n 1 INCR a
(integer) 2
$ redis-cli -n 2 INCR a
(integer) 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="获取其它程序的内容作为输入" tabindex="-1"><a class="header-anchor" href="#获取其它程序的内容作为输入" aria-hidden="true">#</a> 获取其它程序的内容作为输入</h2><h3 id="x-选项" tabindex="-1"><a class="header-anchor" href="#x-选项" aria-hidden="true">#</a> -x 选项</h3><p>现在有一个 test.txt 文件，要把这个文件的内容作为某个 key 的值</p><p>test.txt 文件内容如下面的 cat 命令所示</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cat test.txt                               
Hello World
$ ./redis-cli -x set test:key &lt; test.txt
OK
$ ./redis-cli --raw get test:key        
Hello World
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="执行文件存储的命令" tabindex="-1"><a class="header-anchor" href="#执行文件存储的命令" aria-hidden="true">#</a> 执行文件存储的命令</h3><p>有一个文件 command.txt，存的数据如下 cat 命令所示，command.txt 中的所有命令都由 redis-cli 连续执行，就好像它们是用户在交互模式下输入的一样。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cat command.txt                           
SET counter 128
INCR counter
GET counter
$ cat command.txt | ./redis-cli -a master123
(integer) 129
&quot;129&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要，可以在文件中引用字符串，因此可以使用带有空格、换行符或其他特殊字符的单个参数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cat command.txt
SET arg_example &quot;This is a single argument&quot;
STRLEN arg_example
$ cat command.txt | redis-cli
OK
(integer) 25
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="连续执行相同的命令" tabindex="-1"><a class="header-anchor" href="#连续执行相同的命令" aria-hidden="true">#</a> 连续执行相同的命令</h2><ul><li><code>-r &lt;count&gt;</code> ：指定重复执行命令的次数，假如要无限执行命令，可以使用 -1 作为值；（r，repeat）</li><li><code>-i &lt;delay&gt;</code>：每次执行命令的间隔（单位秒，可以使用小数）。不指定这个选项，默认间隔时间是 0；（i，interval）</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli -r 10 INCR counter_value 
(integer) 1
(integer) 2
(integer) 3
(integer) 4
(integer) 5
(integer) 6
(integer) 7
(integer) 8
(integer) 9
(integer) 10
$ ./redis-cli -r 10 -i 0.1 INCR counter_value
(integer) 11
(integer) 12
(integer) 13
(integer) 14
(integer) 15
(integer) 16
(integer) 17
(integer) 18
(integer) 19
(integer) 20
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>无限期执行命令，比如 INFO replication 命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli -r 10 -i 1 INFO replication    
# Replication
role:master
connected_slaves:0
master_failover_state:no-failover
master_replid:1bf13e0771fcafcdc0aa2f7ca1c300369543a925
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0

...... 无限打印 ......
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="raw-和-no-raw" tabindex="-1"><a class="header-anchor" href="#raw-和-no-raw" aria-hidden="true">#</a> --raw 和 --no-raw</h2><ul><li><code>--no-raw</code>：要求命令返回的结果必须是原始的格式；</li><li><code>--raw</code>：要求命令返回的是格式化后的结果；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli set test 你好哇
OK
$ ./redis-cli --no-raw get test
&quot;\\xe4\\xbd\\xa0\\xe5\\xa5\\xbd\\xe5\\x93\\x87&quot;
$ ./redis-cli get test
&quot;\\xe4\\xbd\\xa0\\xe5\\xa5\\xbd\\xe5\\x93\\x87&quot;
$ ./redis-cli --raw get test
你好哇
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="csv-输出-逗号分隔值" tabindex="-1"><a class="header-anchor" href="#csv-输出-逗号分隔值" aria-hidden="true">#</a> CSV 输出（逗号分隔值）</h2><p>redis-cli 中存在 CSV（逗号分隔值）输出功能，用于将数据从 Redis 导出到外部程序。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli LPUSH mylist a b c d       
(integer) 4
$ ./redis-cli --csv LRANGE mylist 0 -1   
&quot;d&quot;,&quot;c&quot;,&quot;b&quot;,&quot;a&quot;
$ ./redis-cli  LRANGE mylist 0 -1 
1) &quot;d&quot;
2) &quot;c&quot;
3) &quot;b&quot;
4) &quot;a&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，使用 <code>--csv</code> 选项只能将单个命令导出为 CSV 格式，而不能将整个数据库作为 CSV 文件进行导出。</p><h2 id="实时获取统计信息" tabindex="-1"><a class="header-anchor" href="#实时获取统计信息" aria-hidden="true">#</a> 实时获取统计信息</h2><p><code>redis-cli --stat</code>，可以使用 <code>-i &lt;interval&gt;</code>选项修改每次打印的间隔时间。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ redis-cli --stat
------- data ------ --------------------- load -------------------- - child -
keys       mem      clients blocked requests            connections          
224616     58.16M   1316    0       292596804 (+0)      248791      
224616     58.50M   1316    0       292596834 (+30)     248791      
224616     58.38M   1316    0       292596856 (+22)     248791      
224616     58.54M   1316    0       292596902 (+46)     248791      
224617     58.75M   1316    0       292596936 (+34)     248791      
224617     58.50M   1316    0       292596975 (+39)     248791      
224617     58.60M   1316    0       292596999 (+24)     248791      
224617     58.22M   1316    0       292597007 (+8)      248791      
224616     58.41M   1316    0       292597043 (+36)     248791      
224616     58.47M   1316    0       292597059 (+16)     248791      
224615     58.16M   1316    0       292597073 (+14)     248791      
224615     58.28M   1316    0       292597089 (+16)     248791
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="replica-或-slave" tabindex="-1"><a class="header-anchor" href="#replica-或-slave" aria-hidden="true">#</a> --replica 或 --slave</h2><p><code>--replica</code> 是新版本的 Redis 的选项，<code>--slave</code> 是旧版本的选项。</p><p>这个选项是把当前客户端模拟成当前 Redis 的从节点，可以用来获取当前 Redis 节点的更新操作。合理的利用这个选项可以记录当前连接 Redis 节点的一些更新操作，这些更新操作很可能是实际开发业务时需要的数据。</p><p>先开一个客户端：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli -a master123 --replica
Warning: Using a password with &#39;-a&#39; or &#39;-u&#39; option on the command line interface may not be safe.
sending REPLCONF capa eof
SYNC with master, discarding 101043241 bytes of bulk transfer...
SYNC done. Logging commands from master.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到已经同步完成了，开始记录 master 的写命令了。</p><p>这时再开另外一个客户端，执行几个命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6379&gt; set name name
OK
127.0.0.1:6379&gt; get name
&quot;name&quot;
127.0.0.1:6379&gt; set name 1
OK
127.0.0.1:6379&gt; del name
(integer) 1
127.0.0.1:6379&gt; set name hello
OK
127.0.0.1:6379&gt; set name 2
OK
127.0.0.1:6379&gt; get name
&quot;2&quot;
127.0.0.1:6379&gt; del name
(integer) 1
127.0.0.1:6379&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到第一个客户端记录的信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sending REPLCONF capa eof
SYNC with master, discarding 101043241 bytes of bulk transfer...
SYNC done. Logging commands from master.
&quot;ping&quot;
&quot;SELECT&quot;,&quot;0&quot;
&quot;set&quot;,&quot;name&quot;,&quot;hello&quot;
&quot;set&quot;,&quot;name&quot;,&quot;2&quot;
&quot;ping&quot;
&quot;del&quot;,&quot;name&quot;
&quot;ping&quot;
&quot;ping&quot;
.
.
.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>PING 是主从复制使用到的命令。</p></blockquote><h2 id="扫描大键" tabindex="-1"><a class="header-anchor" href="#扫描大键" aria-hidden="true">#</a> 扫描大键</h2><p><code>--bigkeys</code> 选项使用 SCAN 命令对 Redis 进行采样，从中找到内存占用比较大的键值对，这些键值对可能就是系统的瓶颈。</p><p>可以使用 <code>-i &lt;interval&gt;</code>选项修改内部每次调用 SCAN 的时间间隔。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[Calven.Liu@ALYBJ59-6 ~]$ redis-cli -p 6321 -a uxin001 --bigkeys

# Scanning the entire keyspace to find biggest keys as well as
# average sizes per key type.  You can use -i 0.1 to sleep 0.1 sec
# per 100 SCAN commands (not usually needed).

[00.00%] Biggest hash   found so far &#39;user_item_push_identifier_3303575322628&#39; with 1 fields
.
.
.
.
[49.02%] Biggest string found so far &#39;talker_default_kneadface_8&#39; with 7971 bytes
[86.95%] Biggest list   found so far &#39;cv_actor_perform_radio_drama_list_108_1480950194479562754&#39; with 142 items
[89.94%] Biggest string found so far &#39;1511661600000&#39; with 2829894 bytes

-------- summary -------

Sampled 224618 keys in the keyspace!
Total key length in bytes is 7895074 (avg len 35.15)

Biggest string found &#39;1511661600000&#39; has 2829894 bytes
Biggest   list found &#39;cv_actor_perform_radio_drama_list_108_1480950194479562754&#39; has 142 items
Biggest    set found &#39;talker_id_pool_set&#39; has 9759 members
Biggest   hash found &#39;cache_score_hot_room_list_0&#39; has 33 fields
Biggest   zset found &#39;user_noble_days&#39; has 812 members

88415 strings with 3998010 bytes (39.36% of keys, avg size 45.22)
2675 lists with 6017 items (01.19% of keys, avg size 2.25)
50332 sets with 70812 members (22.41% of keys, avg size 1.41)
74141 hashs with 110112 fields (33.01% of keys, avg size 1.49)
9055 zsets with 43551 members (04.03% of keys, avg size 4.81)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个命令的缺点是，虽然 <code>--bigkeys</code> 选项会扫描整个 Redis，但是只输出每种数据类型 TOP1 的那个 key。但是，实际我们可能需要前 N 个 bigkey。</p><h2 id="获取键列表" tabindex="-1"><a class="header-anchor" href="#获取键列表" aria-hidden="true">#</a> 获取键列表</h2><ul><li><code>--scan</code>：扫描键；</li><li><code>--pattern</code>：匹配模式；</li></ul><p>相当于 SCAN 命令，可以使用 <code>-i &lt;interval&gt;</code>选项修改内部每次调用 SCAN 的时间间隔。</p><p>下面的 head 表示展示前面 10 个键</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ redis-cli --scan --pattern key*  | head -10
key_3303575322628
key_3303602741252
key_3303595335682
key_3300808482818
key_3303586463748
key_3303621804036
key_3175456120834
key_3303585234946
key_3300767391746
key_3303122927636
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="监控-redis-实例的延迟" tabindex="-1"><a class="header-anchor" href="#监控-redis-实例的延迟" aria-hidden="true">#</a> 监控 Redis 实例的延迟</h2><ul><li><p><code>--latency</code>：测试客户端到目标 Redis 的网络延迟，原理是客户端每秒发送 100 个 PING 命令到服务端并计算收到回复的时间（单位毫秒）；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ redis-cli --latency
min: 0, max: 5, avg: 0.07 (1265 samples)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>--latency-history</code>：测试客户端到目标 Redis 服务端的一段时间内的最大延迟和平均延迟，默认情况每 15 秒打印一次，可以使用 <code>-i &lt;interval&gt;</code>选项修改时间间隔；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ redis-cli --latency-history
min: 0, max: 1, avg: 0.07 (1478 samples) -- 15.01 seconds range
min: 0, max: 21, avg: 0.09 (1474 samples) -- 15.01 seconds range
min: 0, max: 3, avg: 0.08 (1476 samples) -- 15.01 seconds range
min: 0, max: 1, avg: 0.07 (1476 samples) -- 15.01 seconds range
$ redis-cli --latency-history -i 5
min: 0, max: 1, avg: 0.06 (493 samples) -- 5.01 seconds range
min: 0, max: 1, avg: 0.07 (493 samples) -- 5.01 seconds range

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看一下客户端和服务端不在一个机器的延迟情况</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli -h xx.xxx.xx.x -p 6326 --latency-history -i 1
Warning: Using a password with &#39;-a&#39; or &#39;-u&#39; option on the command line interface may not be safe.
min: 61, max: 64, avg: 61.79 (14 samples) -- 1.02 seconds range
min: 60, max: 76, avg: 62.64 (14 samples) -- 1.04 seconds range
min: 61, max: 64, avg: 61.71 (14 samples) -- 1.03 seconds range
min: 60, max: 64, avg: 61.36 (14 samples) -- 1.03 seconds range
min: 60, max: 70, avg: 62.29 (14 samples) -- 1.03 seconds range
min: 60, max: 64, avg: 61.93 (14 samples) -- 1.03 seconds range
min: 61, max: 64, avg: 61.57 (14 samples) -- 1.03 seconds range
min: 60, max: 69, avg: 62.14 (14 samples) -- 1.03 seconds range
min: 60, max: 64, avg: 61.36 (14 samples) -- 1.03 seconds range
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>--latency-dist</code>：使用统计图表的形式从控制台输出延迟统计信息，可以使用 <code>-i &lt;interval&gt;</code>选项修改时间间隔；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ redis-cli -a uxin001 --latency-dist
---------------------------------------------
. - * #          .01 .125 .25 .5 milliseconds
1,2,3,...,9      from 1 to 9     milliseconds
A,B,C,D,E        10,20,30,40,50  milliseconds
F,G,H,I,J        .1,.2,.3,.4,.5       seconds
K,L,M,N,O,P,Q,?  1,2,4,8,16,30,60,&gt;60 seconds
From 0 to 100%:                    
---------------------------------------------
图表
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>--intrinsic-latency &lt;sec&gt;</code>：用于测量 Redis 实例的固有延迟。固有延迟是指在执行一项特定操作时，硬件本身存在的固有延迟。与之相对的是外部延迟，即由于数据传输、处理等原因而引起的额外延迟。举例来说，CPU 从内存中读取数据的延迟包括内存的访问延迟和 CPU 处理数据所需的时间，其中内存的访问延迟就属于 <code>intrinsic latency</code>。当使用 <code>redis-cli --intrinsic-latency</code> 命令时，Redis 会在不进行任何实际操作的情况下，周期性地发送一个特殊的命令并测量响应时间，从而得出 Redis 实例的固有延迟。这个选项通常用于评估 Redis 实例的性能，并帮助用户更好地优化 Redis 配置和运行环境。</p><p>需要注意的是，由于 <code>--intrinsic-latency</code> 选项会使 Redis 实例不断地发送命令，因此可能会对实例的性能造成一定的影响，在生产环境中需要慎重使用。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli -a master123 --intrinsic-latency 5
Warning: Using a password with &#39;-a&#39; or &#39;-u&#39; option on the command line interface may not be safe.
Max latency so far: 2 microseconds.
Max latency so far: 3 microseconds.
Max latency so far: 17 microseconds.
Max latency so far: 18 microseconds.
Max latency so far: 47 microseconds.
Max latency so far: 63 microseconds.
Max latency so far: 102 microseconds.
Max latency so far: 902 microseconds.

4998465 total runs (avg latency: 1.0003 microseconds / 1000.31 nanoseconds per run).
Worst run took 902x longer than the average latency.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述命令需要在运行 Redis 服务器实例的计算机上执行，不能在其他主机上执行。命令不会连接到 Redis 实例并在本地执行测试。</p><p>在此情况下，系统最差情况下的延迟为 902 微秒，因此可以预期某些查询偶尔会在 1 毫秒以下时间内完成。</p></li></ul><h2 id="远程-rdb-备份" tabindex="-1"><a class="header-anchor" href="#远程-rdb-备份" aria-hidden="true">#</a> 远程 RDB 备份</h2><p><code>--rdb</code> 选项会请求 Redis 实例生成并发送 RDB 持久化文件，保存在客户端所在的机器。可以用它做持久化文件的定期备份</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --rdb ./596dump.rdb
Warning: Using a password with &#39;-a&#39; or &#39;-u&#39; option on the command line interface may not be safe.
sending REPLCONF capa eof
sending REPLCONF rdb-only 1
SYNC sent to master, writing 4094994 bytes to &#39;./596dump.rdb&#39;
Transfer finished with success.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="lru-模拟测试" tabindex="-1"><a class="header-anchor" href="#lru-模拟测试" aria-hidden="true">#</a> LRU 模拟测试</h2><p>Redis 是一种常用的缓存工具，可以在其中设置一个 LRU 算法以进行对象的驱逐。根据存储的键值对数量以及分配给缓存的内存大小，缓存命中和未命中的次数也会相应地改变。为了能够正确配置缓存，模拟缓存命中率非常有帮助。</p><p>Redis-cli 有一种专门的模式，可以模拟 GET 和 SET 操作的行为。在这个模式下，它会使用一种 80-20% 的幂律分布，表示只有 20% 的对象会被 80% 的请求访问到，这在缓存场景中是比较常见的分布情况。</p><p>理论上，根据请求分布和 Redis 内存开销的情况，应该可以通过数学公式来计算缓存命中率。但是，Redis 可以配置不同的 LRU 设置（样本数），并且在不同版本之间 Redis 的 LRU 实现也会有很大的改变。同样，每个键所需的内存量也可能在不同版本中发生变化。这就是为什么开发出这个工具的原因：它的主要动机是测试 Redis 的 LRU 实现质量，但现在也可以用来测试特定版本如何以最初预期的配置行为。</p><p>要使用此模式，请指定测试中的键数量并将一个合理的 maxmemory 设置为第一次尝试。</p><p>重要提示：在 Redis 配置中设置 maxmemory 参数是至关重要的，因为如果没有限制最大内存使用量，缓存命中率最终将达到 100%，因为所有键都可以存储在内存中。如果指定了太多的键并且与最大内存一起使用，最终会使用计算机 RAM 的所有空间。</p><blockquote><p>警告：此测试使用 Pipeline 技术，会对服务器造成压力，请勿在生产环境中使用。</p></blockquote><p>测试 1：配置了 100MB 的内存限制（maxmemory 104857600），并使用 1000 万个键进行 LRU 模拟测试，内存淘汰策略用的是 allkeys-lru。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --lru-test 10000000
Warning: Using a password with &#39;-a&#39; or &#39;-u&#39; option on the command line interface may not be safe.
192250 Gets/sec | Hits: 6741 (3.51%) | Misses: 185509 (96.49%)
185500 Gets/sec | Hits: 18794 (10.13%) | Misses: 166706 (89.87%)
187750 Gets/sec | Hits: 30871 (16.44%) | Misses: 156879 (83.56%)
171000 Gets/sec | Hits: 36806 (21.52%) | Misses: 134194 (78.48%)
184000 Gets/sec | Hits: 48342 (26.27%) | Misses: 135658 (73.73%)
183750 Gets/sec | Hits: 56834 (30.93%) | Misses: 126916 (69.07%)
184250 Gets/sec | Hits: 64535 (35.03%) | Misses: 119715 (64.97%)
181500 Gets/sec | Hits: 70484 (38.83%) | Misses: 111016 (61.17%)
172500 Gets/sec | Hits: 72462 (42.01%) | Misses: 100038 (57.99%)
160500 Gets/sec | Hits: 68569 (42.72%) | Misses: 91931 (57.28%)
164500 Gets/sec | Hits: 71001 (43.16%) | Misses: 93499 (56.84%)
159750 Gets/sec | Hits: 69116 (43.27%) | Misses: 90634 (56.73%)
162250 Gets/sec | Hits: 70300 (43.33%) | Misses: 91950 (56.67%)
154500 Gets/sec | Hits: 66959 (43.34%) | Misses: 87541 (56.66%)
153000 Gets/sec | Hits: 66574 (43.51%) | Misses: 86426 (56.49%)
159250 Gets/sec | Hits: 69483 (43.63%) | Misses: 89767 (56.37%)
161750 Gets/sec | Hits: 70525 (43.60%) | Misses: 91225 (56.40%)
161500 Gets/sec | Hits: 70513 (43.66%) | Misses: 90987 (56.34%)
157250 Gets/sec | Hits: 68404 (43.50%) | Misses: 88846 (56.50%)
161750 Gets/sec | Hits: 70613 (43.66%) | Misses: 91137 (56.34%)
161000 Gets/sec | Hits: 69970 (43.46%) | Misses: 91030 (56.54%)
161750 Gets/sec | Hits: 70405 (43.53%) | Misses: 91345 (56.47%)
161750 Gets/sec | Hits: 70700 (43.71%) | Misses: 91050 (56.29%)
160750 Gets/sec | Hits: 70437 (43.82%) | Misses: 90313 (56.18%)
161000 Gets/sec | Hits: 69885 (43.41%) | Misses: 91115 (56.59%)
155000 Gets/sec | Hits: 67698 (43.68%) | Misses: 87302 (56.32%)
159500 Gets/sec | Hits: 69818 (43.77%) | Misses: 89682 (56.23%)
161000 Gets/sec | Hits: 70211 (43.61%) | Misses: 90789 (56.39%)
160750 Gets/sec | Hits: 70448 (43.82%) | Misses: 90302 (56.18%)
160250 Gets/sec | Hits: 70235 (43.83%) | Misses: 90015 (56.17%)
161250 Gets/sec | Hits: 70241 (43.56%) | Misses: 91009 (56.44%)
161250 Gets/sec | Hits: 70456 (43.69%) | Misses: 90794 (56.31%)
158000 Gets/sec | Hits: 69050 (43.70%) | Misses: 88950 (56.30%)
162250 Gets/sec | Hits: 70933 (43.72%) | Misses: 91317 (56.28%)
162750 Gets/sec | Hits: 71523 (43.95%) | Misses: 91227 (56.05%)
162000 Gets/sec | Hits: 70773 (43.69%) | Misses: 91227 (56.31%)
161750 Gets/sec | Hits: 71039 (43.92%) | Misses: 90711 (56.08%)
161250 Gets/sec | Hits: 70740 (43.87%) | Misses: 90510 (56.13%)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该程序每秒显示一次统计数据。在最初的几秒钟内，开始向缓存填充数据。未命中率随后稳定为可以预期的实际数字：56% 左右。</p><p>对于某些用例，59% 的未命中率可能是不可接受的，因此 100MB 的内存是不够的。观察一个使用 0.5 GB 内存的示例。几分钟后，输出稳定为以下数字：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli -a master123 --lru-test 10000000
175500 Gets/sec | Hits: 172606 (98.35%) | Misses: 2894 (1.65%)
175250 Gets/sec | Hits: 172435 (98.39%) | Misses: 2815 (1.61%)
173750 Gets/sec | Hits: 170917 (98.37%) | Misses: 2833 (1.63%)
165750 Gets/sec | Hits: 163111 (98.41%) | Misses: 2639 (1.59%)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>官方文档还有下面几个没有在本文档提现</p><blockquote><p>https://redis.io/docs/ui/cli</p></blockquote><ul><li>Command line usage</li><li>String quoting and escaping</li><li>SSL/TLS</li><li>Mass insertion of data using <code>redis-cli</code></li><li>Running Lua scripts</li><li>Pub/sub mode</li><li>Monitoring commands executed in Redis</li></ul>`,87),d=[i];function l(r,c){return s(),n("div",null,d)}const u=e(t,[["render",l],["__file","redis-cli 使用.html.vue"]]);export{u as default};
