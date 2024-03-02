import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as n,f as e}from"./app-cadb7c17.js";const i="/assets/image-20231228143523849-8f4d35c1.png",l="/assets/image-20231228163150922-b415bfab.png",t="/assets/image-20231228164118656-e8fb2c46.png",o="/assets/image-20231228165047387-ceecad67.png",p="/assets/image-20231228165515906-15965657.png",r={},c=e('<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>新建</td><td>2023年04月17日12:49:21</td></tr></tbody></table><h2 id="现象" tabindex="-1"><a class="header-anchor" href="#现象" aria-hidden="true">#</a> 现象</h2><img src="'+i+`" alt="image-20231228143523849" style="zoom:67%;"><p><strong>现象</strong>：线上某个服务的服务器在准点时间出现 CPU 峰刺，高峰期的峰刺十分明显。</p><p><strong>影响</strong>：如果是相同流量，那么这个峰刺将会导致服务无法缩容。</p><p><strong>简单分析</strong>：观察阿里云监控，峰刺期间会有<strong>大量磁盘读写请求</strong>，其它网<strong>络流入流出数据正常</strong>，TCP连接正常。在某个准点时间是由 top 命令发现是 Java 进程导致 CPU 飙升。</p><h2 id="排查方向" tabindex="-1"><a class="header-anchor" href="#排查方向" aria-hidden="true">#</a> 排查方向</h2><p>首先根据经验，CPU 规律性峰刺大部分情况是定时触发的某个操作导致的。排查方向如下：</p><ol><li>观察线上接口请求无异常，在<strong>峰刺时间点的接口请求量没有增加</strong>；</li><li>服务器的 <strong>crontab 定时任务并没有</strong>每小时执行的任务；</li><li><strong>业务定时任务也没有</strong>每小时执行的任务；</li><li>大数据和 PHP 部门，他们也没有每小时定时访问该服务的操作；</li><li>观察<strong>准点时的垃圾收集器，没有异常</strong>情况；</li><li>观察线程栈信息，查找到导致cpu飙升的具体线程，根据线程名字分析出具体业务</li></ol><h2 id="问题排查和分析" tabindex="-1"><a class="header-anchor" href="#问题排查和分析" aria-hidden="true">#</a> 问题排查和分析</h2><p>（1）首先查看当前服务器运行的 Java 进程号</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ps -ef | grep java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>（2）在整点时刻执行下面两个命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ps -p &#39;你的进程pid&#39; -m -o THREAD,tid,cputime | sort -k 2 -r &gt; threadcpu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面这个命令是打出整点时刻指定 pid 的进程的线程的 CPU 占用情况，倒序排列</p><blockquote><p>ps. 这个图当时没有使用排序，所以没有排序，现在没法子还原当时的场景了</p></blockquote><img src="`+l+`" alt="image-20231228163150922"><p>第二个命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jcmd &#39;你的进程pid&#39; Thread.print &gt; threadprint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>关于怎么查看 jcmd 的一些 command，可以使用<code> jcmd &#39;你的pid&#39; help</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># jcmd 347 help
347:
The following commands are available:
JFR.stop
JFR.start
JFR.dump
JFR.check
VM.native_memory
VM.check_commercial_features
VM.unlock_commercial_features
ManagementAgent.stop
ManagementAgent.start_local
ManagementAgent.start
GC.rotate_log
Thread.print
GC.class_stats
GC.class_histogram
GC.heap_dump
GC.run_finalization
GC.run
VM.uptime
VM.flags
VM.system_properties
VM.command_line
VM.version
help

For more information about a specific command use &#39;help &lt;command&gt;&#39;.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><p>通过上面的两个命令，我们得到了两个文件，一个是线程 cpu 的使用情况，一个是线程的堆栈信息。</p><ol><li>通过%CPU和 TIME，判断占用的异常线程TID【12817】</li><li>找到TID，转换成16进制【3211】，在java线程栈中找到具体的线程id 【nid=0x3211】（shell 转换方式 <code>printf &#39;%x\\n&#39; 十进制数</code>）</li><li>定位到线程名 log4j-28 的线程；</li><li>每小时一次的峰刺时 log4j2 引起的，观察 log4j 配置文件最近没有更改</li><li>结合每小时一次，看堆栈信息，分析出是 log4j 每小时生成一个日志文件导致的cpu飙升。</li></ol><img src="`+t+'" alt="image-20231228164118656"><h2 id="问题解决" tabindex="-1"><a class="header-anchor" href="#问题解决" aria-hidden="true">#</a> 问题解决</h2><h3 id="阶段-1-优化日志打印" tabindex="-1"><a class="header-anchor" href="#阶段-1-优化日志打印" aria-hidden="true">#</a> 阶段 1 - 优化日志打印</h3><ol><li><strong>删除部分大日志</strong>；</li><li>观察整点日志压缩，CPU 峰刺有降低，但是依然存在；</li><li>继续观察日志，未找到可以优化大日志；</li></ol><h3 id="阶段-2-脚本压缩日志" tabindex="-1"><a class="header-anchor" href="#阶段-2-脚本压缩日志" aria-hidden="true">#</a> 阶段 2 - 脚本压缩日志</h3><p><strong>log4j2 每小时切割日志，但不进行压缩</strong>；</p><img src="'+o+`" alt="image-20231228165047387" style="zoom:100%;"><p><strong>通过脚本限制单个 cpu 使用 10% 性能进行压缩，脚本定时每天凌晨 4 点统一压缩前一天的日志</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">log_path_new</span><span class="token operator">=</span><span class="token string">&quot;/your/log/path&quot;</span>
<span class="token builtin class-name">cd</span> <span class="token variable">$log_path_new</span>
<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">2</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">))</span></span>
<span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token variable">$i</span> <span class="token operator">==</span> <span class="token number">2</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token assign-left variable">num</span><span class="token operator">=</span><span class="token number">3</span> <span class="token operator">||</span> <span class="token assign-left variable">num</span><span class="token operator">=</span><span class="token number">9</span>
    <span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span>j<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>j<span class="token operator">&lt;=</span>\${num}<span class="token punctuation">;</span>j<span class="token operator">++</span><span class="token punctuation">))</span></span>
    <span class="token keyword">do</span>
        <span class="token assign-left variable">log_file</span><span class="token operator">=</span><span class="token string">&quot;info.log.<span class="token variable">\${date_hour}</span><span class="token variable">\${i}</span><span class="token variable">\${j}</span>&quot;</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable">$log_file</span> <span class="token punctuation">]</span> <span class="token punctuation">;</span> <span class="token keyword">then</span>
            cpulimit <span class="token parameter variable">--limit</span><span class="token operator">=</span><span class="token number">10</span> <span class="token function">gzip</span> <span class="token variable">$log_file</span>
        <span class="token keyword">fi</span>
        <span class="token builtin class-name">echo</span> <span class="token variable">$log_file</span>
        <span class="token assign-left variable">apilog_file</span><span class="token operator">=</span><span class="token string">&quot;api.log.<span class="token variable">\${date_hour}</span><span class="token variable">\${i}</span><span class="token variable">\${j}</span>&quot;</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable">$apilog_file</span> <span class="token punctuation">]</span> <span class="token punctuation">;</span> <span class="token keyword">then</span>
            cpulimit <span class="token parameter variable">--limit</span><span class="token operator">=</span><span class="token number">10</span> <span class="token function">gzip</span> <span class="token variable">$apilog_file</span>
        <span class="token keyword">fi</span>
        <span class="token builtin class-name">echo</span> <span class="token variable">$apilog_file</span>
    <span class="token keyword">done</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="优化结果" tabindex="-1"><a class="header-anchor" href="#优化结果" aria-hidden="true">#</a> 优化结果</h2><p>优化日志打印，和脚本凌晨统一压缩日志后，CPU 已经没有峰刺了。</p><img src="`+p+'" alt="image-20231228165515906" style="zoom:100%;">',34),d=[c];function u(v,m){return s(),n("div",null,d)}const g=a(r,[["render",u],["__file","001-服务器CPU问题-规律性峰刺.html.vue"]]);export{g as default};
