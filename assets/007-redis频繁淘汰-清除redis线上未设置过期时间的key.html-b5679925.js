import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-c5a35b28.js";const p="/assets/image-20240301194442438-1df9a6f1.png",t={},i=e(`<h2 id="现象" tabindex="-1"><a class="header-anchor" href="#现象" aria-hidden="true">#</a> 现象</h2><p>线上有台 redis 的内存老是满了，经常发生内存淘汰，导致 redis 的命中率比较低。</p><h2 id="排查方法" tabindex="-1"><a class="header-anchor" href="#排查方法" aria-hidden="true">#</a> 排查方法</h2><p>使用 redis 的分析工具分析 redis 的 rdb 文件。</p><h2 id="问题排查和分析" tabindex="-1"><a class="header-anchor" href="#问题排查和分析" aria-hidden="true">#</a> 问题排查和分析</h2><p>经过排查发现，该 redis 本来是用来存储过期时间的 key 的，也就是 lru 的缓存，但是有些旧的逻辑没有遵守这个规则，往里面存放了未设置过期时间的 key。现在的做法就是</p><ul><li>将未设置过期时间的 key 迁移到持久化功能的 redis 实例里面去；</li><li>清除当前 redis 上未设置过期时间的 key；</li></ul><p>使用工具分析 redis key 的分布情况，以及是否有涉及到大 key 的，删除的时候需要注意，否则会阻塞 redis：</p><ul><li>使用 redis-rdb-tools 工具（离线），地址：https://github.com/sripathikrishnan/redis-rdb-tools</li><li>使用 rdr 工具（离线），地址 https://github.com/xueqiu/rdr</li></ul><p>大概了解了 redis 的 key 的分布后，就可以写脚本删除 redis key 了</p><h2 id="问题解决" tabindex="-1"><a class="header-anchor" href="#问题解决" aria-hidden="true">#</a> 问题解决</h2><p>分批次删除大 key：</p><p>1）hash key：通过 hscan 命令，每次获取 500 个字段，再用 hdel 命令；</p><p>2）set key：使用 sscan 命令，每次扫描集合中 500 个元素，再用 srem 命令每次删除一个元素；</p><p>3）list key：删除大的 list 键，未使用 scan 命令； 通过 ltrim 命令每次删除少量元素；</p><p>4）zset key：删除大的有序集合键，和 list 类似，使用 zset 自带的 zremrangebyrank 命令，每次删除 top 100 个元素；</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># -*- coding: utf-8 -*-</span>

<span class="token triple-quoted-string string">&quot;&quot;&quot;
扫描 redis 实例中的 key，按照规则删除 key
&quot;&quot;&quot;</span>
<span class="token keyword">import</span> datetime
<span class="token keyword">import</span> time

<span class="token keyword">import</span> redis

redis_client <span class="token operator">=</span> redis<span class="token punctuation">.</span>StrictRedis<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span>
                                 port<span class="token operator">=</span><span class="token number">6379</span><span class="token punctuation">,</span>
                                 db<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>
                                 decode_responses<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

string_key_standrd <span class="token operator">=</span> <span class="token number">10000</span>  <span class="token comment"># string key 中认为是大 key 的自定义标准</span>

regex_str <span class="token operator">=</span> <span class="token string">&#39;random*&#39;</span>  <span class="token comment"># 要删除的 key 的前缀</span>

string_keys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>  <span class="token comment"># string key 列表</span>
hash_keys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>  <span class="token comment"># hash key 列表</span>
list_keys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>  <span class="token comment"># list key 列表</span>
set_keys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>  <span class="token comment"># set key 列表</span>
zset_keys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>  <span class="token comment"># zset key 列表</span>


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    start_time <span class="token operator">=</span> datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;start scan time: %s&#39;</span> <span class="token operator">%</span> start_time<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;begin redis db size: %d&#39;</span> <span class="token operator">%</span> redis_client<span class="token punctuation">.</span>dbsize<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    scan_and_fill_array<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;scan\\t: fill array success... \\t%s&#39;</span> <span class="token operator">%</span> datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    scan_and_remove_hash<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;remove\\t: del hash key success...\\t%s&#39;</span> <span class="token operator">%</span> datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    scan_and_remove_list<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;remove\\t: del list key success...\\t%s&#39;</span> <span class="token operator">%</span> datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    scan_and_remove_string<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;remove\\t: del string key success...\\t%s&#39;</span> <span class="token operator">%</span> datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;scan and remove success, scan db again...&#39;</span><span class="token punctuation">)</span>
    scan_and_fill_array<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;after redis db size: %d&#39;</span> <span class="token operator">%</span> redis_client<span class="token punctuation">.</span>dbsize<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    end_time <span class="token operator">=</span> datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span>
    waste_time <span class="token operator">=</span> end_time <span class="token operator">-</span> start_time
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;end scan time: %s, waste %f.3 seconds&#39;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>end_time<span class="token punctuation">,</span> waste_time<span class="token punctuation">.</span>total_seconds<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">scan_and_fill_array</span><span class="token punctuation">(</span>fill<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    扫描 redis， 按照不同的类型保存到集合中
    &quot;&quot;&quot;</span>
    scan_iter <span class="token operator">=</span> redis_client<span class="token punctuation">.</span>scan_iter<span class="token punctuation">(</span><span class="token keyword">match</span><span class="token operator">=</span>regex_str<span class="token punctuation">,</span> count<span class="token operator">=</span><span class="token number">10000</span><span class="token punctuation">)</span>
    keys <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span>scan_iter<span class="token punctuation">)</span>
    keys_count <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>keys<span class="token punctuation">)</span>

    <span class="token keyword">with</span> redis_client<span class="token punctuation">.</span>pipeline<span class="token punctuation">(</span>transaction<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span> <span class="token keyword">as</span> pipe<span class="token punctuation">:</span>
        pipe_size <span class="token operator">=</span> <span class="token number">1000</span>
        idx <span class="token operator">=</span> <span class="token number">0</span>

        string_count <span class="token operator">=</span> <span class="token number">0</span>
        hash_count <span class="token operator">=</span> <span class="token number">0</span>
        list_count <span class="token operator">=</span> <span class="token number">0</span>
        set_count <span class="token operator">=</span> <span class="token number">0</span>
        zset_count <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">while</span> idx <span class="token operator">&lt;</span> keys_count<span class="token punctuation">:</span>
            old_idx <span class="token operator">=</span> idx
            pipe_idx <span class="token operator">=</span> <span class="token number">0</span>
            <span class="token keyword">while</span> idx <span class="token operator">&lt;</span> keys_count <span class="token keyword">and</span> pipe_idx <span class="token operator">&lt;</span> pipe_size<span class="token punctuation">:</span>
                pipe<span class="token punctuation">.</span><span class="token builtin">type</span><span class="token punctuation">(</span>keys<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">)</span>
                idx <span class="token operator">+=</span> <span class="token number">1</span>
                pipe_idx <span class="token operator">+=</span> <span class="token number">1</span>
            key_type_list <span class="token operator">=</span> pipe<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">for</span> key_type <span class="token keyword">in</span> key_type_list<span class="token punctuation">:</span>
                <span class="token keyword">if</span> key_type <span class="token operator">==</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">if</span> fill<span class="token punctuation">:</span>
                        string_keys<span class="token punctuation">.</span>append<span class="token punctuation">(</span>keys<span class="token punctuation">[</span>old_idx<span class="token punctuation">]</span><span class="token punctuation">)</span>
                    string_count <span class="token operator">+=</span> <span class="token number">1</span>
                <span class="token keyword">elif</span> key_type <span class="token operator">==</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">if</span> fill<span class="token punctuation">:</span>
                        list_keys<span class="token punctuation">.</span>append<span class="token punctuation">(</span>keys<span class="token punctuation">[</span>old_idx<span class="token punctuation">]</span><span class="token punctuation">)</span>
                    list_count <span class="token operator">+=</span> <span class="token number">1</span>
                <span class="token keyword">elif</span> key_type <span class="token operator">==</span> <span class="token string">&quot;hash&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">if</span> fill<span class="token punctuation">:</span>
                        hash_keys<span class="token punctuation">.</span>append<span class="token punctuation">(</span>keys<span class="token punctuation">[</span>old_idx<span class="token punctuation">]</span><span class="token punctuation">)</span>
                    hash_count <span class="token operator">+=</span> <span class="token number">1</span>
                <span class="token keyword">elif</span> key_type <span class="token operator">==</span> <span class="token string">&quot;set&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">if</span> fill<span class="token punctuation">:</span>
                        set_keys<span class="token punctuation">.</span>append<span class="token punctuation">(</span>keys<span class="token punctuation">[</span>old_idx<span class="token punctuation">]</span><span class="token punctuation">)</span>
                    set_count <span class="token operator">+=</span> <span class="token number">1</span>
                <span class="token keyword">elif</span> key_type <span class="token operator">==</span> <span class="token string">&quot;zset&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">if</span> fill<span class="token punctuation">:</span>
                        zset_keys<span class="token punctuation">.</span>append<span class="token punctuation">(</span>keys<span class="token punctuation">[</span>old_idx<span class="token punctuation">]</span><span class="token punctuation">)</span>
                    zset_count <span class="token operator">+=</span> <span class="token number">1</span>
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;no key&#39;</span><span class="token punctuation">)</span>
                old_idx <span class="token operator">+=</span> <span class="token number">1</span>

            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0.02</span><span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;relation keys info: string: %d, hash: %d, list: %d, set:%d, zset:%d&#39;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>
    string_count<span class="token punctuation">,</span> hash_count<span class="token punctuation">,</span> list_count<span class="token punctuation">,</span> set_count<span class="token punctuation">,</span> zset_count<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">scan_and_remove_hash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    删除 hash
    &quot;&quot;&quot;</span>
    pipe_size <span class="token operator">=</span> <span class="token number">1000</span>
    pipe_idx <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">with</span> redis_client<span class="token punctuation">.</span>pipeline<span class="token punctuation">(</span>transaction<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span> <span class="token keyword">as</span> pipe<span class="token punctuation">:</span>
        <span class="token comment"># 遍历所有的 hash key</span>
        <span class="token keyword">for</span> hash_key <span class="token keyword">in</span> hash_keys<span class="token punctuation">:</span>
            <span class="token comment"># 获取某个 hash key 的 所有 field</span>
            hscan_iter <span class="token operator">=</span> redis_client<span class="token punctuation">.</span>hscan_iter<span class="token punctuation">(</span>hash_key<span class="token punctuation">,</span> count<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">)</span>
            <span class="token keyword">for</span> field_val <span class="token keyword">in</span> hscan_iter<span class="token punctuation">:</span>
                pipe<span class="token punctuation">.</span>hdel<span class="token punctuation">(</span>hash_key<span class="token punctuation">,</span> field_val<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                pipe_idx <span class="token operator">+=</span> <span class="token number">1</span>
                <span class="token keyword">if</span> pipe_idx <span class="token operator">&gt;</span> pipe_size<span class="token punctuation">:</span>
                    pipe<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token punctuation">)</span>
                    pipe_idx <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token comment"># 最后执行下，还有一点命令没执行</span>
        pipe<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">scan_and_remove_list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    删除 list
    &quot;&quot;&quot;</span>
    count <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> list_key <span class="token keyword">in</span> list_keys<span class="token punctuation">:</span>
        <span class="token keyword">while</span> redis_client<span class="token punctuation">.</span>llen<span class="token punctuation">(</span>list_key<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
            <span class="token comment"># 每次只删除最右 100 个元素</span>
            redis_client<span class="token punctuation">.</span>ltrim<span class="token punctuation">(</span>list_key<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">101</span><span class="token punctuation">)</span>
            count <span class="token operator">+=</span> <span class="token number">1</span>
            <span class="token keyword">if</span> count <span class="token operator">==</span> <span class="token number">1000</span><span class="token punctuation">:</span>
                count <span class="token operator">=</span> <span class="token number">0</span>
                time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0.01</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">scan_and_remove_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    删除 string， 低版本没有 unlink 命令
    &quot;&quot;&quot;</span>
    big_string_keys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    str_len_list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token keyword">with</span> redis_client<span class="token punctuation">.</span>pipeline<span class="token punctuation">(</span>transaction<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span> <span class="token keyword">as</span> pipe<span class="token punctuation">:</span>
        pipe_size <span class="token operator">=</span> <span class="token number">1000</span>
        idx <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token comment"># 找出所有的 string key 的长度</span>
        <span class="token keyword">while</span> idx <span class="token operator">&lt;</span> <span class="token builtin">len</span><span class="token punctuation">(</span>string_keys<span class="token punctuation">)</span><span class="token punctuation">:</span>
            pipe_idx <span class="token operator">=</span> <span class="token number">0</span>
            <span class="token keyword">while</span> idx <span class="token operator">&lt;</span> <span class="token builtin">len</span><span class="token punctuation">(</span>string_keys<span class="token punctuation">)</span> <span class="token keyword">and</span> pipe_idx <span class="token operator">&lt;</span> pipe_size<span class="token punctuation">:</span>
                pipe<span class="token punctuation">.</span>strlen<span class="token punctuation">(</span>string_keys<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">)</span>
                idx <span class="token operator">+=</span> <span class="token number">1</span>
                pipe_idx <span class="token operator">+=</span> <span class="token number">1</span>
            len_list <span class="token operator">=</span> pipe<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token punctuation">)</span>
            str_len_list <span class="token operator">+=</span> len_list

        <span class="token keyword">for</span> key_idx<span class="token punctuation">,</span> str_len <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>str_len_list<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> str_len <span class="token operator">&gt;</span> string_key_standrd<span class="token punctuation">:</span>
                big_string_keys<span class="token punctuation">.</span>append<span class="token punctuation">(</span>string_keys<span class="token punctuation">[</span>key_idx<span class="token punctuation">]</span><span class="token punctuation">)</span>

        <span class="token comment"># 过滤掉我们认为的大 key</span>
        string_keys_filter <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x <span class="token keyword">not</span> <span class="token keyword">in</span> big_string_keys<span class="token punctuation">,</span> string_keys<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token comment"># print(len(string_keys))</span>
        <span class="token comment"># print(len(string_keys_filter))</span>
        <span class="token comment"># print(len(big_string_keys))</span>

        idx <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token comment"># 依次执行 del 命令，低版本没有 unlink</span>
        <span class="token keyword">while</span> idx <span class="token operator">&lt;</span> <span class="token builtin">len</span><span class="token punctuation">(</span>string_keys_filter<span class="token punctuation">)</span><span class="token punctuation">:</span>
            pipe_idx <span class="token operator">=</span> <span class="token number">0</span>
            <span class="token keyword">while</span> idx <span class="token operator">&lt;</span> <span class="token builtin">len</span><span class="token punctuation">(</span>string_keys_filter<span class="token punctuation">)</span> <span class="token keyword">and</span> pipe_idx <span class="token operator">&lt;</span> pipe_size<span class="token punctuation">:</span>
                pipe<span class="token punctuation">.</span>delete<span class="token punctuation">(</span>string_keys_filter<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">)</span>
                idx <span class="token operator">+=</span> <span class="token number">1</span>
                pipe_idx <span class="token operator">+=</span> <span class="token number">1</span>
            pipe<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>big_string_keys<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;warning!!! big string key found: %d, output to stringBigKey.txt&#39;</span> <span class="token operator">%</span> <span class="token builtin">len</span><span class="token punctuation">(</span>big_string_keys<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token builtin">file</span><span class="token operator">=</span><span class="token string">&#39;stringBigKey.txt&#39;</span><span class="token punctuation">,</span> mode<span class="token operator">=</span><span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
            <span class="token keyword">for</span> big_string_key <span class="token keyword">in</span> big_string_keys<span class="token punctuation">:</span>
                f<span class="token punctuation">.</span>writelines<span class="token punctuation">(</span>big_string_key <span class="token operator">+</span> <span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行成功，成功删除未设置过期时间的 key。</p><img src="`+p+'" alt="image-20240301194442438" style="zoom:100%;"><h2 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h2><p>清理完未设置过期时间的 key 后，该 redis 实例都是设置了过期时间的 key，一段时间后，该 redis 实例的命中率达到 99%。</p>',21),o=[i];function c(l,u){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","007-redis频繁淘汰-清除redis线上未设置过期时间的key.html.vue"]]);export{d as default};
