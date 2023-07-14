import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as c,c as a,b as e,e as i,d as l,f as s}from"./app-3c76045a.js";const u="/assets/Data_size-fc157568.png",r="/assets/NUMA_chart-e7881042.gif",m="/assets/Connections_chart-f453c1c7.png",v={},o=s(`<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>新建</td><td>2023年04月23日01:29:59</td></tr></tbody></table><blockquote><p>翻译自 https://redis.io/docs/management/optimization/benchmarks/</p></blockquote><h2 id="基准测试" tabindex="-1"><a class="header-anchor" href="#基准测试" aria-hidden="true">#</a> 基准测试</h2><p>Redis 有一个 redis-benchmark 的可执行程序，它可以模拟N个客户端同时向Redis发送M条查询命令的应用场景。</p><h2 id="redis-benchmark-选项" tabindex="-1"><a class="header-anchor" href="#redis-benchmark-选项" aria-hidden="true">#</a> Redis Benchmark 选项</h2><h3 id="测试选项介绍" tabindex="-1"><a class="header-anchor" href="#测试选项介绍" aria-hidden="true">#</a> 测试选项介绍</h3><p>测试的 Redis 版本是 6.2.6。</p><p>使用 <code>redis-benchmark --help</code> 命令可以查看支持那些选项</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Usage: redis-benchmark [-h &lt;host&gt;] [-p &lt;port&gt;] [-c &lt;clients&gt;] [-n &lt;requests&gt;] [-k &lt;boolean&gt;]

 -h &lt;hostname&gt;      Server hostname (default 127.0.0.1)
 -p &lt;port&gt;          Server port (default 6379)
 -s &lt;socket&gt;        Server socket (overrides host and port)
 -a &lt;password&gt;      Password for Redis Auth
 --user &lt;username&gt;  Used to send ACL style &#39;AUTH username pass&#39;. Needs -a.
 -c &lt;clients&gt;       Number of parallel connections (default 50)
 -n &lt;requests&gt;      Total number of requests (default 100000)
 -d &lt;size&gt;          Data size of SET/GET value in bytes (default 3)
 --dbnum &lt;db&gt;       SELECT the specified db number (default 0)
 --threads &lt;num&gt;    Enable multi-thread mode.
 --cluster          Enable cluster mode.
 --enable-tracking  Send CLIENT TRACKING on before starting benchmark.
 -k &lt;boolean&gt;       1=keep alive 0=reconnect (default 1)
 -r &lt;keyspacelen&gt;   Use random keys for SET/GET/INCR, random values for SADD,
                    random members and scores for ZADD.
  Using this option the benchmark will expand the string __rand_int__
  inside an argument with a 12 digits number in the specified range
  from 0 to keyspacelen-1. The substitution changes every time a command
  is executed. Default tests use this to hit random keys in the
  specified range.
 -P &lt;numreq&gt;        Pipeline &lt;numreq&gt; requests. Default 1 (no pipeline).
 -q                 Quiet. Just show query/sec values
 --precision        Number of decimal places to display in latency output (default 0)
 --csv              Output in CSV format
 -l                 Loop. Run the tests forever
 -t &lt;tests&gt;         Only run the comma separated list of tests. The test
                    names are the same as the ones produced as output.
 -I                 Idle mode. Just open N idle connections and wait.
 --tls              Establish a secure TLS connection.
 --sni &lt;host&gt;       Server name indication for TLS.
 --cacert &lt;file&gt;    CA Certificate file to verify with.
 --cacertdir &lt;dir&gt;  Directory where trusted CA certificates are stored.
                    If neither cacert nor cacertdir are specified, the default
                    system-wide trusted root certs configuration will apply.
 --insecure         Allow insecure TLS connection by skipping cert validation.
 --cert &lt;file&gt;      Client certificate to authenticate with.
 --key &lt;file&gt;       Private key file to authenticate with.
 --tls-ciphers &lt;list&gt; Sets the list of prefered ciphers (TLSv1.2 and below)
                    in order of preference from highest to lowest separated by colon (&quot;:&quot;).
                    See the ciphers(1ssl) manpage for more information about the syntax of this string.
 --tls-ciphersuites &lt;list&gt; Sets the list of prefered ciphersuites (TLSv1.3)
                    in order of preference from highest to lowest separated by colon (&quot;:&quot;).
                    See the ciphers(1ssl) manpage for more information about the syntax of this string,
                    and specifically for TLSv1.3 ciphersuites.
 --help             Output this help and exit.
 --version          Output version and exit.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>redis-benchmark 常用选项</th><th>含义</th></tr></thead><tbody><tr><td><code>-h &lt;hostname&gt;</code></td><td>服务器的主机名，可以是ip或者域名</td></tr><tr><td><code>-p &lt;port&gt;</code></td><td>服务器的端口，默认是6379</td></tr><tr><td><code>-a &lt;password&gt;</code></td><td>连接服务器的密码，免密实例不写</td></tr><tr><td><code>-c &lt;clients&gt;</code></td><td>并发连接数 ，默认50</td></tr><tr><td><code>-n &lt;requests&gt;</code></td><td>请求总数（默认为100000）</td></tr><tr><td><code>-d &lt;size&gt;</code></td><td>SET/GET值的数据大小（以字节为单位，默认值2）</td></tr><tr><td><code>--dbnum &lt;db&gt; </code></td><td>选择指定的数据库编号（默认值0）</td></tr><tr><td><code>--threads &lt;num&gt;</code></td><td>启动多线程模式（redis 6.0版本编译的redis-benchmark才支持，多线程压测redis的性能优于单线程）</td></tr><tr><td><code>--cluster</code></td><td>启动集群模式（cluster集群才需要该参数）</td></tr><tr><td><code>-k &lt;boolean&gt; </code></td><td>1=keep alive 0=reconnect（默认值1，可以测试长短连接）</td></tr><tr><td><code>-r &lt;keyspacelen&gt; </code></td><td>对SET/GET/INCR使用随机键，对SADD使用随机值。参数中keyspacelen 指的是添加键的数量。</td></tr><tr><td><code>-e</code></td><td>如果服务器回复错误，请在stdout上显示它们</td></tr><tr><td><code>-q</code></td><td>只展示query/sec的值</td></tr><tr><td><code>-l </code></td><td>循环测试</td></tr><tr><td><code>-t &lt;tests&gt;</code></td><td>可以对指定的命令进行测试</td></tr><tr><td><code>-I </code></td><td>空闲模式。仅打开N个空闲连接并等待</td></tr><tr><td><code>-P &lt;numreq&gt; </code></td><td>管道请求的并发数量（默认值为1）</td></tr></tbody></table><h3 id="测试所有用例" tabindex="-1"><a class="header-anchor" href="#测试所有用例" aria-hidden="true">#</a> 测试所有用例</h3><p><code>-n</code> 表示请求总数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-benchmark -q -n 100000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PING_INLINE: 159489.64 requests per second, p50=0.175 msec
PING_MBULK: 164744.64 requests per second, p50=0.167 msec
SET: 162337.66 requests per second, p50=0.175 msec
GET: 164473.69 requests per second, p50=0.175 msec
INCR: 170357.75 requests per second, p50=0.183 msec
LPUSH: 173310.22 requests per second, p50=0.183 msec
RPUSH: 173611.12 requests per second, p50=0.183 msec
LPOP: 171821.30 requests per second, p50=0.183 msec
RPOP: 171232.88 requests per second, p50=0.183 msec
SADD: 166112.95 requests per second, p50=0.175 msec
HSET: 173310.22 requests per second, p50=0.183 msec
SPOP: 165837.48 requests per second, p50=0.167 msec
ZADD: 165016.50 requests per second, p50=0.175 msec
ZPOPMIN: 166389.34 requests per second, p50=0.167 msec
LPUSH (needed to benchmark LRANGE): 174216.03 requests per second, p50=0.183 msec
LRANGE_100 (first 100 elements): 50607.29 requests per second, p50=0.511 msec
LRANGE_300 (first 300 elements): 20959.97 requests per second, p50=1.215 msec
LRANGE_500 (first 500 elements): 13607.29 requests per second, p50=1.855 msec
LRANGE_600 (first 600 elements): 11496.90 requests per second, p50=2.183 msec
MSET (10 keys): 58105.75 requests per second, p50=0.799 msec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="只测试某个命令-可指定命令参数" tabindex="-1"><a class="header-anchor" href="#只测试某个命令-可指定命令参数" aria-hidden="true">#</a> 只测试某个命令（可指定命令参数）</h3><p><code>-t</code> 选项可以对指定的命令进行测试。</p><p>例如只测试 set 命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-benchmark  -n 100000 -a -t set

====== SET ======
  100000 requests completed in 0.79 seconds
  50 parallel clients
  3 bytes payload
  keep alive: 1
  host configuration &quot;save&quot;: 3600 1 300 100 60 10000
  host configuration &quot;appendonly&quot;: no
  multi-thread: no

Latency by percentile distribution:
0.000% &lt;= 0.103 milliseconds (cumulative count 1)
50.000% &lt;= 0.191 milliseconds (cumulative count 51052)
75.000% &lt;= 0.239 milliseconds (cumulative count 76569)
87.500% &lt;= 0.343 milliseconds (cumulative count 87775)
93.750% &lt;= 0.527 milliseconds (cumulative count 93761)
96.875% &lt;= 0.719 milliseconds (cumulative count 96883)
98.438% &lt;= 0.927 milliseconds (cumulative count 98465)
99.219% &lt;= 1.199 milliseconds (cumulative count 99220)
99.609% &lt;= 1.655 milliseconds (cumulative count 99610)
99.805% &lt;= 2.879 milliseconds (cumulative count 99805)
99.902% &lt;= 4.775 milliseconds (cumulative count 99903)
99.951% &lt;= 5.111 milliseconds (cumulative count 99952)
99.976% &lt;= 5.495 milliseconds (cumulative count 99976)
99.988% &lt;= 5.615 milliseconds (cumulative count 99988)
99.994% &lt;= 5.671 milliseconds (cumulative count 99994)
99.997% &lt;= 5.743 milliseconds (cumulative count 99997)
99.998% &lt;= 5.799 milliseconds (cumulative count 99999)
99.999% &lt;= 5.855 milliseconds (cumulative count 100000)
100.000% &lt;= 5.855 milliseconds (cumulative count 100000)

Cumulative distribution of latencies:
0.001% &lt;= 0.103 milliseconds (cumulative count 1)
63.456% &lt;= 0.207 milliseconds (cumulative count 63456)
85.030% &lt;= 0.303 milliseconds (cumulative count 85030)
90.556% &lt;= 0.407 milliseconds (cumulative count 90556)
93.216% &lt;= 0.503 milliseconds (cumulative count 93216)
95.390% &lt;= 0.607 milliseconds (cumulative count 95390)
96.701% &lt;= 0.703 milliseconds (cumulative count 96701)
97.679% &lt;= 0.807 milliseconds (cumulative count 97679)
98.369% &lt;= 0.903 milliseconds (cumulative count 98369)
98.751% &lt;= 1.007 milliseconds (cumulative count 98751)
99.014% &lt;= 1.103 milliseconds (cumulative count 99014)
99.233% &lt;= 1.207 milliseconds (cumulative count 99233)
99.384% &lt;= 1.303 milliseconds (cumulative count 99384)
99.473% &lt;= 1.407 milliseconds (cumulative count 99473)
99.528% &lt;= 1.503 milliseconds (cumulative count 99528)
99.591% &lt;= 1.607 milliseconds (cumulative count 99591)
99.638% &lt;= 1.703 milliseconds (cumulative count 99638)
99.671% &lt;= 1.807 milliseconds (cumulative count 99671)
99.684% &lt;= 1.903 milliseconds (cumulative count 99684)
99.706% &lt;= 2.007 milliseconds (cumulative count 99706)
99.724% &lt;= 2.103 milliseconds (cumulative count 99724)
99.808% &lt;= 3.103 milliseconds (cumulative count 99808)
99.871% &lt;= 4.103 milliseconds (cumulative count 99871)
99.951% &lt;= 5.103 milliseconds (cumulative count 99951)
100.000% &lt;= 6.103 milliseconds (cumulative count 100000)

Summary:
  throughput summary: 126742.72 requests per second
  latency summary (msec):
          avg       min       p50       p95       p99       max
        0.255     0.096     0.191     0.591     1.095     5.855
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>甚至可以测试指定命令测试，并带上参数</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-benchmark  -n 100000 -a master123  set name hello

====== set name hello ======
  100000 requests completed in 0.61 seconds
  50 parallel clients
  34 bytes payload
  keep alive: 1
  host configuration &quot;save&quot;: 3600 1 300 100 60 10000
  host configuration &quot;appendonly&quot;: no
  multi-thread: no

Latency by percentile distribution:
0.000% &lt;= 0.095 milliseconds (cumulative count 1)
50.000% &lt;= 0.183 milliseconds (cumulative count 59097)
75.000% &lt;= 0.199 milliseconds (cumulative count 78854)
87.500% &lt;= 0.215 milliseconds (cumulative count 89721)
93.750% &lt;= 0.231 milliseconds (cumulative count 94303)
96.875% &lt;= 0.271 milliseconds (cumulative count 96934)
98.438% &lt;= 0.383 milliseconds (cumulative count 98458)
99.219% &lt;= 0.647 milliseconds (cumulative count 99219)
99.609% &lt;= 0.775 milliseconds (cumulative count 99610)
99.805% &lt;= 0.831 milliseconds (cumulative count 99807)
99.902% &lt;= 0.895 milliseconds (cumulative count 99908)
99.951% &lt;= 3.615 milliseconds (cumulative count 99952)
99.976% &lt;= 4.151 milliseconds (cumulative count 99976)
99.988% &lt;= 4.247 milliseconds (cumulative count 99988)
99.994% &lt;= 4.311 milliseconds (cumulative count 99994)
99.997% &lt;= 4.327 milliseconds (cumulative count 99997)
99.998% &lt;= 4.343 milliseconds (cumulative count 100000)
100.000% &lt;= 4.343 milliseconds (cumulative count 100000)

Cumulative distribution of latencies:
0.006% &lt;= 0.103 milliseconds (cumulative count 6)
85.293% &lt;= 0.207 milliseconds (cumulative count 85293)
97.719% &lt;= 0.303 milliseconds (cumulative count 97719)
98.592% &lt;= 0.407 milliseconds (cumulative count 98592)
98.835% &lt;= 0.503 milliseconds (cumulative count 98835)
99.191% &lt;= 0.607 milliseconds (cumulative count 99191)
99.346% &lt;= 0.703 milliseconds (cumulative count 99346)
99.722% &lt;= 0.807 milliseconds (cumulative count 99722)
99.911% &lt;= 0.903 milliseconds (cumulative count 99911)
99.942% &lt;= 1.007 milliseconds (cumulative count 99942)
99.950% &lt;= 1.103 milliseconds (cumulative count 99950)
99.973% &lt;= 4.103 milliseconds (cumulative count 99973)
100.000% &lt;= 5.103 milliseconds (cumulative count 100000)

Summary:
  throughput summary: 163132.14 requests per second
  latency summary (msec):
          avg       min       p50       p95       p99       max
        0.191     0.088     0.183     0.239     0.535     4.343
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="selecting-the-size-of-the-key-space-随机键" tabindex="-1"><a class="header-anchor" href="#selecting-the-size-of-the-key-space-随机键" aria-hidden="true">#</a> Selecting the size of the key space（随机键）</h3><p>Redis 基准测试默认只针对一个键进行测试。虽然 Redis 是一种内存数据库，基准测试和真实情况之间的差异并不大，但是通过扩大测试数据的范围，可以更好地模拟真实世界中的工作场景，例如缓存失效等情况。这样可以更准确地测试 Redis 的性能表现。</p><p>为了更好地测试 Redis 的性能，可以通过使用命令行参数<code>-r</code>来扩大基准测试的数据范围。例如，如果想运行100万个 SET 操作，并随机选择一百万个可能的键中的一个来进行每个操作，就可以使用提供的命令行参数来执行测试。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-benchmark  -a master123 -t set -r 100000 -n 1000000
====== SET ======
  1000000 requests completed in 9.31 seconds
  50 parallel clients
  3 bytes payload
  keep alive: 1
  host configuration &quot;save&quot;: 3600 1 300 100 60 10000
  host configuration &quot;appendonly&quot;: no
  multi-thread: no

Latency by percentile distribution:
0.000% &lt;= 0.103 milliseconds (cumulative count 1)
50.000% &lt;= 0.423 milliseconds (cumulative count 502592)
75.000% &lt;= 0.495 milliseconds (cumulative count 762516)
87.500% &lt;= 0.543 milliseconds (cumulative count 889421)
93.750% &lt;= 0.583 milliseconds (cumulative count 944764)
96.875% &lt;= 0.623 milliseconds (cumulative count 971665)
98.438% &lt;= 0.663 milliseconds (cumulative count 984768)
99.219% &lt;= 0.727 milliseconds (cumulative count 992205)
99.609% &lt;= 0.967 milliseconds (cumulative count 996123)
99.805% &lt;= 1.239 milliseconds (cumulative count 998051)
99.902% &lt;= 1.367 milliseconds (cumulative count 999060)
99.951% &lt;= 1.471 milliseconds (cumulative count 999531)
99.976% &lt;= 1.631 milliseconds (cumulative count 999762)
99.988% &lt;= 1.767 milliseconds (cumulative count 999881)
99.994% &lt;= 2.207 milliseconds (cumulative count 999940)
99.997% &lt;= 4.927 milliseconds (cumulative count 999970)
99.998% &lt;= 5.063 milliseconds (cumulative count 999985)
99.999% &lt;= 5.239 milliseconds (cumulative count 999993)
100.000% &lt;= 5.335 milliseconds (cumulative count 999997)
100.000% &lt;= 5.471 milliseconds (cumulative count 999999)
100.000% &lt;= 5.527 milliseconds (cumulative count 1000000)
100.000% &lt;= 5.527 milliseconds (cumulative count 1000000)

Cumulative distribution of latencies:
0.000% &lt;= 0.103 milliseconds (cumulative count 1)
17.740% &lt;= 0.207 milliseconds (cumulative count 177402)
28.966% &lt;= 0.303 milliseconds (cumulative count 289658)
45.339% &lt;= 0.407 milliseconds (cumulative count 453390)
78.855% &lt;= 0.503 milliseconds (cumulative count 788547)
96.303% &lt;= 0.607 milliseconds (cumulative count 963031)
99.055% &lt;= 0.703 milliseconds (cumulative count 990548)
99.445% &lt;= 0.807 milliseconds (cumulative count 994452)
99.565% &lt;= 0.903 milliseconds (cumulative count 995648)
99.641% &lt;= 1.007 milliseconds (cumulative count 996408)
99.700% &lt;= 1.103 milliseconds (cumulative count 996995)
99.779% &lt;= 1.207 milliseconds (cumulative count 997792)
99.860% &lt;= 1.303 milliseconds (cumulative count 998598)
99.927% &lt;= 1.407 milliseconds (cumulative count 999269)
99.959% &lt;= 1.503 milliseconds (cumulative count 999589)
99.973% &lt;= 1.607 milliseconds (cumulative count 999730)
99.983% &lt;= 1.703 milliseconds (cumulative count 999828)
99.989% &lt;= 1.807 milliseconds (cumulative count 999895)
99.992% &lt;= 1.903 milliseconds (cumulative count 999921)
99.993% &lt;= 2.007 milliseconds (cumulative count 999928)
99.993% &lt;= 2.103 milliseconds (cumulative count 999930)
99.995% &lt;= 3.103 milliseconds (cumulative count 999953)
99.999% &lt;= 5.103 milliseconds (cumulative count 999986)
100.000% &lt;= 6.103 milliseconds (cumulative count 1000000)

Summary:
  throughput summary: 107388.31 requests per second
  latency summary (msec):
          avg       min       p50       p95       p99       max
        0.394     0.096     0.423     0.591     0.703     5.527
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-pipeline" tabindex="-1"><a class="header-anchor" href="#使用-pipeline" aria-hidden="true">#</a> 使用 pipeline</h3><p>默认情况下，Redis 基准测试会模拟 50 个客户端发送命令。每个客户端在发送下一个命令之前，需要等待上一个命令的响应返回，这意味着服务器需要进行一次读取操作以读取每个客户端的命令，并且也需要考虑来回传输时间。</p><p>但是 Redis 支持流水线技术，因此可以一次性发送多个命令，这也是现实世界应用程序经常使用的功能- Redis 的流水线技术能够显著提高服务器的每秒操作次数。</p><p>下面是使用 16 个命令的 pipeline 运行基准测试的例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-benchmark  -a master123 -n 1000000 -t set,get -P 16 -q
SET: 219202.11 requests per second, p50=3.135 msec
GET: 1189060.62 requests per second, p50=0.575 msec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 pipeline 可以显着提高性能。</p><h3 id="一些基准测试的例子" tabindex="-1"><a class="header-anchor" href="#一些基准测试的例子" aria-hidden="true">#</a> 一些基准测试的例子</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Examples:

 Run the benchmark with the default configuration against 127.0.0.1:6379:
   $ redis-benchmark

 Use 20 parallel clients, for a total of 100k requests, against 192.168.1.1:
   $ redis-benchmark -h 192.168.1.1 -p 6379 -n 100000 -c 20

 Fill 127.0.0.1:6379 with about 1 million keys only using the SET test:
   $ redis-benchmark -t set -n 1000000 -r 100000000

 Benchmark 127.0.0.1:6379 for a few commands producing CSV output:
   $ redis-benchmark -t ping,set,get -n 100000 --csv

 Benchmark a specific command line:
   $ redis-benchmark -r 10000 -n 10000 eval &#39;return redis.call(&quot;ping&quot;)&#39; 0

 Fill a list with 10000 random elements:
   $ redis-benchmark -r 10000 -n 10000 lpush mylist __rand_int__

 On user specified command lines __rand_int__ is replaced with a random integer
 with a range of values selected by the -r option.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>单机、主备、读写分离和proxy集群的测试命令：</p><p><strong>./redis-benchmark -h {IP或域名} -p 6379 -a {pwd}--threads {num} -n { nreqs } -r { randomkeys } -c {clients} -d {datasize} -t {command}</strong></p></li><li><p>cluster集群测试命令：</p><p><strong>./redis-benchmark -h {IP或域名} -p 6379 -a {pwd}--threads {num} -n { nreqs } -r { randomkeys } -c {clients} -d {datasize} --cluster -t {command}</strong></p></li><li><p>测试短连接：</p><p><strong>./redis-benchmark -h {IP或域名} -p 6379 -a {pwd}--threads {num} -n { nreqs } -r { randomkeys } -c {clients} -d {datasize} -k 0 -t {command}</strong></p></li><li><p>测试空闲连接：</p><p><strong>./redis-benchmark -h {IP或域名} -p 6379 -a {pwd} -c {clients} -I</strong></p></li></ul><h2 id="影响-redis-性能的因素" tabindex="-1"><a class="header-anchor" href="#影响-redis-性能的因素" aria-hidden="true">#</a> 影响 Redis 性能的因素</h2><p>有多种因素会直接影响 redis 的性能。这里，我们分析一些，因为它们可以改变所有 benchmark 测试的结果。但请注意，一个典型的 redis 实例，运行在低速、未调优过的系统上，提供的性能对大多数应用来说也是够好的。</p><ul><li>网络带宽和延迟通常会直接影响性能。在启动基准测试之前，使用 ping 程序快速检查客户端和服务器主机之间的延迟是否正常是一个好习惯。对于带宽，通常很有用的是估算吞吐量（以 Gbit/s 为单位），并将其与网络的理论带宽进行比较。例如，以每秒 10 万次为速率在 Redis 中设置 4 KB 的字符串，实际上会消耗 3.2 Gbit/s 的带宽，并可能适用于 10 Gbit/s 的链路，但不适用于 1 Gbit/s 的链路。在许多真实场景中，Redis 的吞吐量由网络限制，而不是由 CPU 限制。要在单个服务器上合并几个高吞吐量的 Redis 实例，考虑安装一个 10 Gbit/s 的 NIC 或多个带有 TCP/IP 绑定的 1 Gbit/s 的 NIC 是值得的。</li><li>CPU 是另一个非常重要的因素。由于 Redis 是单线程的，因此它青睐具有大缓存和较少核心的快速 CPU。在这个方面，Intel CPU 目前是赢家。在使用 redis-benchmark 时，当客户端和服务器运行在同一台机器上时，CPU 是限制因素。</li><li>RAM 和内存带宽的速度似乎对全局性能不太关键，尤其是对于小对象来说。但是对于大对象（&gt;10 KB），这可能变得明显。通常，为了优化 Redis 而购买昂贵的快速内存模块并不划算。</li><li>Redis 在虚拟机上运行比在相同硬件上不使用虚拟化运行要慢。如果您有机会在物理机器上运行 Redis，则应优先选择这种方式。但这并不意味着 Redis 在虚拟化环境中很慢，实际表现仍然非常好，而在虚拟化环境中遇到的大多数严重性能问题都是由于超额分配、具有高延迟的非本地磁盘或旧的 hypervisor 软件具有缓慢的 fork 系统调用实现。</li><li>当服务器和客户端基准测试程序在同一台机器上运行时，可以使用 TCP/IP 回环和 Unix 域套接字。根据平台的不同，Unix 域套接字的吞吐量可以比 TCP/IP 回环高出约 50%（例如在 Linux 上）。redis-benchmark 的默认行为是使用 TCP/IP 回环。</li><li>与 TCP/IP 回环相比，Unix 域套接字的性能优势在强烈使用管道线路时（即长管道线路时）会减少。</li><li>当以太网网络用于访问 Redis 时，使用管道化聚合命令在数据大小保持在以太网数据包大小以下（约为 1500 字节）时特别高效。实际上，处理 10 字节、100 字节或 1000 字节的查询几乎得到相同的吞吐量。</li></ul><img src="`+u+'" alt="Data size impact"><ul><li>在多 CPU 插槽服务器中，Redis 的性能会受到 NUMA 配置和进程位置的影响。最明显的影响是，redis-benchmark 的结果似乎是不确定的，因为客户端和服务器进程是随机分布在核心上的。为了获得确定性结果，需要使用进程放置工具（在 Linux 中是 taskset 或 numactl）。最有效的组合是将客户端和服务器放置在同一 CPU 的两个不同核心上，以获得 L3 缓存的优势。以下是使用不同相对放置方式的 4 KB SET 基准测试的三个服务器 CPU（AMD Istanbul、Intel Nehalem EX 和 Intel Westmere）的结果，请注意，此基准测试不旨在比较 CPU 型号本身（因此未公开 CPU 的确切型号和频率）。</li></ul><img src="'+r+'" alt="NUMA chart"><ul><li>客户端连接的数量也是一个重要的因素。Redis 事件循环基于 epoll/kqueue，具有相当好的可扩展性。Redis 已经在超过 60000 个连接上进行了基准测试，并且在这些条件下仍能支持每秒 50000 个请求。作为一个经验法则，具有 30000 个连接的实例只能处理具有 100 个连接时可实现吞吐量的一半。下图显示 Redis 实例的吞吐量与连接数之间的关系：</li></ul><img src="'+m+'" alt="connections chart">',42),b={href:"https://groups.google.com/forum/#!msg/redis-db/gUhc19gnYgc/BruTPCOroiMJ",target:"_blank",rel:"noopener noreferrer"},p=e("li",null,[e("p",null,"Redis 可以在不同的平台上使用不同的内存分配器（比如 libc malloc、jemalloc、tcmalloc），它们在处理内存的速度、内部和外部碎片化方面可能会有不同的表现。如果你没有自己编译 Redis，可以使用 INFO 命令来查看内存分配器的类型。需要注意的是，大多数基准测试运行的时间不够长，无法产生明显的外部碎片问题（与实际生产环境的 Redis 实例可能存在不同）。")],-1),h=s('<h2 id="其他要考虑的事情" tabindex="-1"><a class="header-anchor" href="#其他要考虑的事情" aria-hidden="true">#</a> 其他要考虑的事情</h2><p>任何基准测试的一个重要目标是获得可重现的结果，以便将它们与其他测试的结果进行比较。</p><ol><li>最好在没有其他运行程序的独立硬件上进行基准测试，如果不行，也要尽量避免基准测试受到外部活动的影响。</li><li>一些电脑和服务器具有可变的 CPU 核心频率机制，为了得到可重复的结果，最好将所有 CPU 核心的频率设置为最高的固定频率。</li><li>要根据基准测试的规模来调整系统，确保拥有足够的 RAM，避免交换内存。32 位和 64 位 Redis 实例的内存占用不同。</li><li>如果在基准测试中使用 RDB 或 AOF，避免将文件放置在网络带宽和延迟受影响的设备上。</li><li>将 Redis 的日志级别设置为 warning 或 notice，并将日志文件放置在本地而非远程文件系统上。</li><li>避免使用会改变基准测试结果的监视工具，例如 MONITOR，这会显著影响测量性能。</li></ol><h2 id="其他-redis-基准测试工具" tabindex="-1"><a class="header-anchor" href="#其他-redis-基准测试工具" aria-hidden="true">#</a> 其他 Redis 基准测试工具</h2><p>有几种第三方工具可用于对 Redis 进行基准测试。有关其目标和功能的更多信息，请参阅每个工具的文档。</p>',5),g={href:"https://github.com/redislabs/memtier_benchmark",target:"_blank",rel:"noopener noreferrer"},f={href:"https://twitter.com/RedisInc",target:"_blank",rel:"noopener noreferrer"},k={href:"https://github.com/twitter/rpc-perf",target:"_blank",rel:"noopener noreferrer"},_={href:"https://twitter.com/twitter",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/brianfrankcooper/YCSB",target:"_blank",rel:"noopener noreferrer"},q={href:"https://twitter.com/Yahoo",target:"_blank",rel:"noopener noreferrer"};function x(R,P){const n=d("ExternalLinkIcon");return c(),a("div",null,[o,e("ul",null,[e("li",null,[e("p",null,[i("通过调整网卡配置和相关的中断可以实现更高的吞吐量。最佳吞吐量是通过设置 Rx/Tx 网卡队列与 CPU 核心之间的亲和性，并激活 RPS（接收数据包转发）支持来实现的。有关更多信息，请参考 "),e("a",b,[i("thread"),l(n)]),i("。当使用大型对象时，Jumbo 帧也可以提供性能提升。")])]),p]),h,e("ul",null,[e("li",null,[e("a",g,[i("memtier_benchmark"),l(n)]),i(" from "),e("a",f,[i("Redis Ltd."),l(n)]),i(" is a NoSQL Redis and Memcache traffic generation and benchmarking tool.")]),e("li",null,[e("a",k,[i("rpc-perf"),l(n)]),i(" from "),e("a",_,[i("Twitter"),l(n)]),i(" is a tool for benchmarking RPC services that supports Redis and Memcache.")]),e("li",null,[e("a",y,[i("YCSB"),l(n)]),i(" from "),e("a",q,[i("Yahoo @Yahoo"),l(n)]),i(" is a benchmarking framework with clients to many databases, including Redis.")])])])}const T=t(v,[["render",x],["__file","Redis_Benchmark基准测试.html.vue"]]);export{T as default};
