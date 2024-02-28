import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as n,f as a}from"./app-6dab4fa1.js";const t={},i=a(`<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>新建</td><td>2023-05-04 20:45:56</td></tr></tbody></table><blockquote><p>大部分内容来自 redis 使用手册</p></blockquote><h2 id="集群管理工具-redis-cli" tabindex="-1"><a class="header-anchor" href="#集群管理工具-redis-cli" aria-hidden="true">#</a> 集群管理工具 redis-cli</h2><p>Redis 版本 6.2.6</p><p>通过 <code>redis-cli --cluster help</code> 可以看到所有的集群相关的管理命令。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster help                 
Cluster Manager Commands:
  create         host1:port1 ... hostN:portN				# 创建集群
                 --cluster-replicas &lt;arg&gt;					# 从节点个数
  check          host:port									# 检查集群
                 --cluster-search-multiple-owners			# 检查是否有槽同时被分配给多个节点
  info           host:port									# 查看集群信息
  fix            host:port									# 修复集群
                 --cluster-search-multiple-owners			# 检查是否有槽同时被分配给多个节点
                 --cluster-fix-with-unreachable-masters
  reshard        host:port									# 重分片
                 --cluster-from &lt;arg&gt;						# 需要从哪些源节点上迁移slot，可从多个源节点完成迁移，以逗号隔开，传递的是节点的node id
                 --cluster-to &lt;arg&gt;							# slot需要迁移的目的节点的node id，目的节点只能填写一个，不传递该参数的话，则会在迁移过程中提示用户输入
                 --cluster-slots &lt;arg&gt;						# 需要迁移的slot数量，不传递该参数的话，则会在迁移过程中提示用户输入。
                 --cluster-yes								# 指定迁移时的确认输入
                 --cluster-timeout &lt;arg&gt;					# 超时时间
                 --cluster-pipeline &lt;arg&gt;					# 是否使用 pipeline
                 --cluster-replace							# 是否直接replace到目标节点
  rebalance      host:port									# 重平衡
                 --cluster-weight &lt;node1=w1...nodeN=wN&gt;		# 指定权重
                 --cluster-use-empty-masters				# 设置可以让没有槽的空节点也分配相应的槽（默认不允许）
                 --cluster-timeout &lt;arg&gt;					# 超时时间
                 --cluster-simulate							# 模拟重平衡，并不会迁移节点
                 --cluster-pipeline &lt;arg&gt;					# 是否使用 pipeline
                 --cluster-threshold &lt;arg&gt;					# 阈值
                 --cluster-replace							# 是否直接replace到目标节点
  add-node       new_host:new_port existing_host:existing_port # 添加节点
                 --cluster-slave							# 作为从节点
                 --cluster-master-id &lt;arg&gt;					# 作为那个主节点的从节点	
  del-node       host:port node_id							# 删除节点
  call           host:port command arg arg .. arg			# 执行命令
                 --cluster-only-masters
                 --cluster-only-replicas
  set-timeout    host:port milliseconds						# 设置超时时间 cluster-node-timeout
  import         host:port									# 导入数据
                 --cluster-from &lt;arg&gt;						# 单机 redis 数据源
                 --cluster-from-user &lt;arg&gt;
                 --cluster-from-pass &lt;arg&gt;
                 --cluster-from-askpass
                 --cluster-copy								# 复制
                 --cluster-replace							# 覆盖同名键
  backup         host:port backup_directory					# 备份
  help           

For check, fix, reshard, del-node, set-timeout you can specify the host and port of any working node in the cluster.

Cluster Manager Options:
  --cluster-yes  Automatic yes to cluster commands prompts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="子命令介绍" tabindex="-1"><a class="header-anchor" href="#子命令介绍" aria-hidden="true">#</a> 子命令介绍</h2><h3 id="create-创建集群" tabindex="-1"><a class="header-anchor" href="#create-创建集群" aria-hidden="true">#</a> create 创建集群</h3><p>表示创建一个集群，<code>host1:port1</code> 表示集群中的节点的 IP 和端口，其中可选的 <code>--cluster-replicas</code> 表示为主节点设置几个从节点。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create host1:port1 ... hostN:portN --cluster-replicas &lt;arg&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>举个例子：表示建立一个 3 主 3 从的集群。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-cli --cluster create 127.0.0.1:30001 127.0.0.1:30002 127.0.0.1:30003 127.0.0.1:30004 127.0.0.1:30005 127.0.0.1:30006 --cluster-replicas 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="check-检查集群" tabindex="-1"><a class="header-anchor" href="#check-检查集群" aria-hidden="true">#</a> check 检查集群</h3><p>通过 check 子命令，可以查看集群的配置是否正常，只需要连接一个集群中的节点即可。</p><p><code>--cluster-search-multiple-owners</code> 表示检查是否有槽同时被分配给了多个节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>check host:port --cluster-search-multiple-owners
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>举例：对于一个正常运行的集群，对其执行 check 子命令将得到一切正常的结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster check 127.0.0.1:30001
127.0.0.1:30001 (7a606264...) -&gt; 0 keys | 5461 slots | 1 slaves.
127.0.0.1:30003 (7ffb7490...) -&gt; 0 keys | 5461 slots | 1 slaves.
127.0.0.1:30002 (b894fa8e...) -&gt; 0 keys | 5462 slots | 1 slaves.
[OK] 0 keys in 3 masters.
0.00 keys per slot on average.
&gt;&gt;&gt; Performing Cluster Check (using node 127.0.0.1:30001)
M: 7a6062647ca518602bfd4df53aa05e8b91685492 127.0.0.1:30001
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
M: 7ffb74903c1f83e972db6aa4ccbea7d05c78522e 127.0.0.1:30003
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
S: 348c9f527752ea19f29ccf662e939d6c6dc10678 127.0.0.1:30004
   slots: (0 slots) slave
   replicates 7ffb74903c1f83e972db6aa4ccbea7d05c78522e
S: 49eb6dbcb6bd920702a8d8c4d4d76b1b621b7b9a 127.0.0.1:30006
   slots: (0 slots) slave
   replicates b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf
M: b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf 127.0.0.1:30002
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: e9afac3ecc6ca627830cf24d5fd0834d6b747b31 127.0.0.1:30005
   slots: (0 slots) slave
   replicates 7a6062647ca518602bfd4df53aa05e8b91685492
[OK] All nodes agree about slots configuration.
&gt;&gt;&gt; Check for open slots...
&gt;&gt;&gt; Check slots coverage...
[OK] All 16384 slots covered.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="info-集群信息" tabindex="-1"><a class="header-anchor" href="#info-集群信息" aria-hidden="true">#</a> info 集群信息</h3><p>子命令 info 查看集群信息，只需要连接集群中的一个节点即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>info host:port
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令返回的信息包括：</p><ul><li>主节点的地址以及运行 ID，它们存储的键数量以及负责的槽数量，以及它们拥有的从节点数量；</li><li>集群包含的数据库键数量以及主节点数量，以及每个槽平均存储的键数量；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster info 127.0.0.1:30001     
127.0.0.1:30001 (7a606264...) -&gt; 0 keys | 5461 slots | 1 slaves.
127.0.0.1:30003 (7ffb7490...) -&gt; 0 keys | 5461 slots | 1 slaves.
127.0.0.1:30002 (b894fa8e...) -&gt; 0 keys | 5462 slots | 1 slaves.
[OK] 0 keys in 3 masters.
0.00 keys per slot on average.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fix-修复槽错误" tabindex="-1"><a class="header-anchor" href="#fix-修复槽错误" aria-hidden="true">#</a> fix 修复槽错误</h3><p>当集群在重分片、重平衡或者槽迁移的过程中出现错误时，执行 cluster 的子命令 fix 可以让涉及的槽重新回到正常状态。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>fix host:port							    # 修复集群
  --cluster-search-multiple-owners			# 检查是否有槽同时被分配给多个节点
  --cluster-fix-with-unreachable-masters
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 fix 命令在检查集群之后没有发现任何异常，那么它将不做任何动作，直接退出。</p><h3 id="reshard-重分片" tabindex="-1"><a class="header-anchor" href="#reshard-重分片" aria-hidden="true">#</a> reshard 重分片</h3><p>将指定数量的槽从原节点迁移至目标节点，被迁移的槽将交由后者负责，并且槽中已有的数据也会陆续从原节点转移至目标节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>reshard  host:port
	--cluster-from &lt;arg&gt;  	# 源节点 id
	--cluster-to &lt;arg&gt;   	# 目标节点 id
	--cluster-slots &lt;arg&gt;	# 要迁移槽的数量
	--cluster-yes			# 直接 yes 执行
	--cluster-timeout &lt;arg&gt;	# 迁移的超时时间
	--cluster-pipeline &lt;arg&gt;# 是否使用 pipeline
	--cluster-replace		# 是否直接 replace 到目标节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><p>将 30001 端口的 redis 实例（节点 ID 是 7a6062647ca518602bfd4df53aa05e8b91685492）迁移 10 个槽位到 30002 的 redis 实例（节点 ID 是）b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster reshard 127.0.0.1:30001 --cluster-from 7a6062647ca518602bfd4df53aa05e8b91685492 --cluster-to b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf --cluster-slots 10 
&gt;&gt;&gt; Performing Cluster Check (using node 127.0.0.1:30001)
M: 7a6062647ca518602bfd4df53aa05e8b91685492 127.0.0.1:30001
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
M: 7ffb74903c1f83e972db6aa4ccbea7d05c78522e 127.0.0.1:30003
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
S: 348c9f527752ea19f29ccf662e939d6c6dc10678 127.0.0.1:30004
   slots: (0 slots) slave
   replicates 7ffb74903c1f83e972db6aa4ccbea7d05c78522e
S: 49eb6dbcb6bd920702a8d8c4d4d76b1b621b7b9a 127.0.0.1:30006
   slots: (0 slots) slave
   replicates b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf
M: b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf 127.0.0.1:30002
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: e9afac3ecc6ca627830cf24d5fd0834d6b747b31 127.0.0.1:30005
   slots: (0 slots) slave
   replicates 7a6062647ca518602bfd4df53aa05e8b91685492
[OK] All nodes agree about slots configuration.
&gt;&gt;&gt; Check for open slots...
&gt;&gt;&gt; Check slots coverage...
[OK] All 16384 slots covered.

Ready to move 10 slots.
  Source nodes:
    M: 7a6062647ca518602bfd4df53aa05e8b91685492 127.0.0.1:30001
       slots:[0-5460] (5461 slots) master
       1 additional replica(s)
  Destination node:
    M: b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf 127.0.0.1:30002
       slots:[5461-10922] (5462 slots) master
       1 additional replica(s)
  Resharding plan:
    Moving slot 0 from 7a6062647ca518602bfd4df53aa05e8b91685492
    Moving slot 1 from 7a6062647ca518602bfd4df53aa05e8b91685492
    Moving slot 2 from 7a6062647ca518602bfd4df53aa05e8b91685492
    Moving slot 3 from 7a6062647ca518602bfd4df53aa05e8b91685492
    Moving slot 4 from 7a6062647ca518602bfd4df53aa05e8b91685492
    Moving slot 5 from 7a6062647ca518602bfd4df53aa05e8b91685492
    Moving slot 6 from 7a6062647ca518602bfd4df53aa05e8b91685492
    Moving slot 7 from 7a6062647ca518602bfd4df53aa05e8b91685492
    Moving slot 8 from 7a6062647ca518602bfd4df53aa05e8b91685492
    Moving slot 9 from 7a6062647ca518602bfd4df53aa05e8b91685492
Do you want to proceed with the proposed reshard plan (yes/no)? yes
Moving slot 0 from 127.0.0.1:30001 to 127.0.0.1:30002: 
Moving slot 1 from 127.0.0.1:30001 to 127.0.0.1:30002: 
Moving slot 2 from 127.0.0.1:30001 to 127.0.0.1:30002: 
Moving slot 3 from 127.0.0.1:30001 to 127.0.0.1:30002: 
Moving slot 4 from 127.0.0.1:30001 to 127.0.0.1:30002: 
Moving slot 5 from 127.0.0.1:30001 to 127.0.0.1:30002: 
Moving slot 6 from 127.0.0.1:30001 to 127.0.0.1:30002: 
Moving slot 7 from 127.0.0.1:30001 to 127.0.0.1:30002: 
Moving slot 8 from 127.0.0.1:30001 to 127.0.0.1:30002: 
Moving slot 9 from 127.0.0.1:30001 to 127.0.0.1:30002: 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>迁移前的集群信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster info 127.0.0.1:30001 127.0.0.1:30001 (7a606264...) -&gt; 0 keys | 5461 slots | 1 slaves.
127.0.0.1:30003 (7ffb7490...) -&gt; 0 keys | 5461 slots | 1 slaves.
127.0.0.1:30002 (b894fa8e...) -&gt; 0 keys | 5462 slots | 1 slaves.
[OK] 0 keys in 3 masters.
0.00 keys per slot on average.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>迁移后的集群信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster info 127.0.0.1:30001
127.0.0.1:30001 (7a606264...) -&gt; 0 keys | 5451 slots | 1 slaves.
127.0.0.1:30003 (7ffb7490...) -&gt; 0 keys | 5461 slots | 1 slaves.
127.0.0.1:30002 (b894fa8e...) -&gt; 0 keys | 5472 slots | 1 slaves.
[OK] 0 keys in 3 masters.
0.00 keys per slot on average.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rebalance-重平衡" tabindex="-1"><a class="header-anchor" href="#rebalance-重平衡" aria-hidden="true">#</a> rebalance 重平衡</h3><p>允许用户在有需要时重新分配各个节点负责的槽数量，从而使得各个节点的负载压力趋于平衡：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rebalance      host:port					# 指定集群的任意一节点进行平衡集群节点slot数量
    --cluster-weight &lt;node1=w1...nodeN=wN&gt;	# 指定集群节点的权重
    --cluster-use-empty-masters				# 设置可以让没有分配slot的主节点参与，默认不允许
    --cluster-timeout &lt;arg&gt;					# 设置命令的超时时间
    --cluster-simulate						# 模拟rebalance操作，不会真正执行迁移操作
    --cluster-pipeline &lt;arg&gt;				# 定义cluster getkeysinslot命令一次取出的key数量，默认值为10
    --cluster-threshold &lt;arg&gt;				# 迁移的槽阈值超过threshold，执行rebalance操作
    --cluster-replace						# 是否直接replace到目标节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><p>假设我们现在的集群有 30001、30002 和 30003 这 3 个主节点，它们分别被分配了 3000、11384 和 2000 个槽：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster info 127.0.0.1:30001 
127.0.0.1:30001 (7a606264...) -&gt; 0 keys | 3000 slots | 1 slaves.
127.0.0.1:30003 (7ffb7490...) -&gt; 0 keys | 2000 slots | 1 slaves.
127.0.0.1:30002 (b894fa8e...) -&gt; 0 keys | 11384 slots | 1 slaves.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的三个节点的负载不均和，需要重新平衡一下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster rebalance 127.0.0.1:30001
&gt;&gt;&gt; Performing Cluster Check (using node 127.0.0.1:30001)
[OK] All nodes agree about slots configuration.
&gt;&gt;&gt; Check for open slots...
&gt;&gt;&gt; Check slots coverage...
[OK] All 16384 slots covered.
&gt;&gt;&gt; Rebalancing across 3 nodes. Total weight = 3.00
Moving 3461 slots from 127.0.0.1:30002 to 127.0.0.1:30003
#####################################################################################.
.
.
Moving 2462 slots from 127.0.0.1:30002 to 127.0.0.1:30001
#####################################################################################.
.
.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>rebalance 之后重新趋于平衡</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster info 127.0.0.1:30001     
127.0.0.1:30001 (7a606264...) -&gt; 0 keys | 5462 slots | 1 slaves.
127.0.0.1:30003 (7ffb7490...) -&gt; 0 keys | 5461 slots | 1 slaves.
127.0.0.1:30002 (b894fa8e...) -&gt; 0 keys | 5461 slots | 1 slaves.
[OK] 0 keys in 3 masters.
0.00 keys per slot on average.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>rebalance 的其他选项</p><ul><li><code>--cluster-weight &lt;node1=w1...nodeN=wN&gt;</code>：指定集群节点的权重，权重较大的节点将被指派更多槽。就可以让性能更强的节点负担更多负载；（默认权重是 1.0，假如设置为 0 表示不分配槽给它）</li><li><code>--cluster-use-empty-masters</code>：设置可以让没有槽的空节点也分配相应的槽（默认不允许）；</li><li><code>--cluster-timeout &lt;arg&gt;</code>：超时时间；</li><li><code>--cluster-simulate</code>：模拟重平衡操作，并不会真的迁移槽；</li><li><code>--cluster-pipeline &lt;arg&gt;</code>：是否使用 pipeline，定义 cluster getkeysinslot 命令一次取出的 key 数量，默认值为 10；</li><li><code>--cluster-threshold &lt;arg&gt;</code>：rebalance 命令在执行时会根据各个节点目前负责的槽数量以及用户给定的权重计算出每个节点应该负责的槽数量（期望槽数量），如果这个槽数量与节点目前负责的槽数量之间的比率超过了指定的阈值，那么就会触发槽的重分配操作。触发重分配操作的阈值默认为 2.0，也就是期望槽数量与实际槽数量之间不能相差超过两倍，用户也可以通过该选项来指定自己想要的阈值；</li><li><code>--cluster-replace</code>：是否直接 replace 到目标节点；</li></ul><h3 id="add-node-添加节点" tabindex="-1"><a class="header-anchor" href="#add-node-添加节点" aria-hidden="true">#</a> add-node 添加节点</h3><p>添加一个节点到集群中去，指定一个已经在集群中的节点即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>add-node   new_host:new_port existing_host:existing_port
    --cluster-slave
    --cluster-master-id &lt;arg&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：假如现在新增一个 30007 端口的节点到集群中，30001 端口的节点已经在集群中了。</p><p>先启动 30007</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-server redis-30007.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>加入前的集群信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster info 127.0.0.1:30001                        
127.0.0.1:30001 (7a606264...) -&gt; 0 keys | 5462 slots | 1 slaves.
127.0.0.1:30003 (7ffb7490...) -&gt; 0 keys | 2000 slots | 1 slaves.
127.0.0.1:30002 (b894fa8e...) -&gt; 0 keys | 8922 slots | 1 slaves.
[OK] 0 keys in 3 masters.
0.00 keys per slot on average.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加入集群</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster add-node 127.0.0.1:30007 127.0.0.1:30001
&gt;&gt;&gt; Adding node 127.0.0.1:30007 to cluster 127.0.0.1:30001
&gt;&gt;&gt; Performing Cluster Check (using node 127.0.0.1:30001)
M: 7a6062647ca518602bfd4df53aa05e8b91685492 127.0.0.1:30001
   slots:[2461-5460],[6461-8922] (5462 slots) master
   1 additional replica(s)
M: 7ffb74903c1f83e972db6aa4ccbea7d05c78522e 127.0.0.1:30003
   slots:[14384-16383] (2000 slots) master
   1 additional replica(s)
S: 348c9f527752ea19f29ccf662e939d6c6dc10678 127.0.0.1:30004
   slots: (0 slots) slave
   replicates 7ffb74903c1f83e972db6aa4ccbea7d05c78522e
S: 49eb6dbcb6bd920702a8d8c4d4d76b1b621b7b9a 127.0.0.1:30006
   slots: (0 slots) slave
   replicates b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf
M: b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf 127.0.0.1:30002
   slots:[0-2460],[5461-6460],[8923-14383] (8922 slots) master
   1 additional replica(s)
S: e9afac3ecc6ca627830cf24d5fd0834d6b747b31 127.0.0.1:30005
   slots: (0 slots) slave
   replicates 7a6062647ca518602bfd4df53aa05e8b91685492
[OK] All nodes agree about slots configuration.
&gt;&gt;&gt; Check for open slots...
&gt;&gt;&gt; Check slots coverage...
[OK] All 16384 slots covered.
&gt;&gt;&gt; Send CLUSTER MEET to node 127.0.0.1:30007 to make it join the cluster.
[OK] New node added correctly.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加入后的集群信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster info 127.0.0.1:30001               
127.0.0.1:30001 (7a606264...) -&gt; 0 keys | 5462 slots | 1 slaves.
127.0.0.1:30003 (7ffb7490...) -&gt; 0 keys | 2000 slots | 1 slaves.
127.0.0.1:30002 (b894fa8e...) -&gt; 0 keys | 8922 slots | 1 slaves.
127.0.0.1:30007 (3f88a5c9...) -&gt; 0 keys | 0 slots | 0 slaves.
[OK] 0 keys in 4 masters.
0.00 keys per slot on average.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他选项：在默认情况下，add-node 命令添加的新节点将作为主节点存在。如果用户想要添加的新节点为从节点，那么可以在执行命令的同时，通过给定以下两个可选项来将新节点设置为从节点：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>--cluster-slave
--cluster-master-id &lt;arg&gt; # 表示作为那个节点 id 的从节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="del-node-删除节点" tabindex="-1"><a class="header-anchor" href="#del-node-删除节点" aria-hidden="true">#</a> del-node 删除节点</h3><p>从集群中删除一个节点，指定一个已经在集群中的节点即可，node_id 表示要移除的节点 id。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>del-node host:port node_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如：删除刚刚增加的 30007 节点</p><p>删除前的集群信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster info 127.0.0.1:30001                                                
127.0.0.1:30001 (7a606264...) -&gt; 0 keys | 4096 slots | 1 slaves.
127.0.0.1:30003 (7ffb7490...) -&gt; 0 keys | 4096 slots | 1 slaves.
127.0.0.1:30002 (b894fa8e...) -&gt; 0 keys | 4096 slots | 1 slaves.
127.0.0.1:30007 (3f88a5c9...) -&gt; 0 keys | 4096 slots | 0 slaves.
[OK] 0 keys in 4 masters.
0.00 keys per slot on average.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先将 30007 的槽迁移走，使用 rebalance（使用 reshard 也可以）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt;&gt;&gt; Rebalancing across 4 nodes. Total weight = 3.00
Moving 1366 slots from 127.0.0.1:30007 to 127.0.0.1:30001
.
.
.
Moving 1365 slots from 127.0.0.1:30007 to 127.0.0.1:30003
.
.
.
Moving 1365 slots from 127.0.0.1:30007 to 127.0.0.1:30002
.
.
.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>迁移后的集群信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster info 127.0.0.1:30001                                         127.0.0.1:30001 (7a606264...) -&gt; 0 keys | 5462 slots | 1 slaves.
127.0.0.1:30003 (7ffb7490...) -&gt; 0 keys | 5461 slots | 1 slaves.
127.0.0.1:30002 (b894fa8e...) -&gt; 0 keys | 5461 slots | 2 slaves.
[OK] 0 keys in 3 masters.
0.00 keys per slot on average.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster del-node 127.0.0.1:30001 3f88a5c9cdddde757e30d6da6b2aa161c94fe42c&gt;&gt;&gt; Removing node 3f88a5c9cdddde757e30d6da6b2aa161c94fe42c from cluster 127.0.0.1:30001
&gt;&gt;&gt; Sending CLUSTER FORGET messages to the cluster...
&gt;&gt;&gt; Sending CLUSTER RESET SOFT to the deleted node.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除后的集群信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster info 127.0.0.1:30001                                             
127.0.0.1:30001 (7a606264...) -&gt; 0 keys | 5462 slots | 1 slaves.
127.0.0.1:30003 (7ffb7490...) -&gt; 0 keys | 5461 slots | 1 slaves.
127.0.0.1:30002 (b894fa8e...) -&gt; 0 keys | 5461 slots | 1 slaves.
[OK] 0 keys in 3 masters.
0.00 keys per slot on average.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="call-执行命令" tabindex="-1"><a class="header-anchor" href="#call-执行命令" aria-hidden="true">#</a> call 执行命令</h3><p>在整个集群的所有节点上执行给定的命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>call host:port command arg arg .. arg
    --cluster-only-masters  # 仅主节点
    --cluster-only-replicas	# 仅从节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster call 127.0.0.1:30001 ping
&gt;&gt;&gt; Calling ping
127.0.0.1:30001: PONG
127.0.0.1:30003: PONG
127.0.0.1:30004: PONG
127.0.0.1:30006: PONG
127.0.0.1:30002: PONG
127.0.0.1:30005: PONG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者执行 role 命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster call 127.0.0.1:30001 role            
&gt;&gt;&gt; Calling role
127.0.0.1:30001: master
33614
127.0.0.1
30005
33614
127.0.0.1:30003: master
33614
127.0.0.1
30004
33614
127.0.0.1:30004: slave
127.0.0.1
30003
connected
33614
127.0.0.1:30006: slave
127.0.0.1
30002
connected
33614
127.0.0.1:30002: master
33614
127.0.0.1
30006
33614
127.0.0.1:30005: slave
127.0.0.1
30001
connected
33614
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="set-timeout-设置超时时间" tabindex="-1"><a class="header-anchor" href="#set-timeout-设置超时时间" aria-hidden="true">#</a> set-timeout 设置超时时间</h3><p>为集群的所有节点重新设置 cluster-node-timeout 选项的值：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>set-timeout    host:port milliseconds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如：将集群内所有节点的 cluster-node-timeout 选项的值设置为 3000：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster set-timeout 127.0.0.1:30001 3000
&gt;&gt;&gt; Reconfiguring node timeout in every cluster node...
*** New timeout set for 127.0.0.1:30001
*** New timeout set for 127.0.0.1:30003
*** New timeout set for 127.0.0.1:30004
*** New timeout set for 127.0.0.1:30006
*** New timeout set for 127.0.0.1:30002
*** New timeout set for 127.0.0.1:30005
&gt;&gt;&gt; New node timeout set. 6 OK, 0 ERR.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="import-导入数据" tabindex="-1"><a class="header-anchor" href="#import-导入数据" aria-hidden="true">#</a> import 导入数据</h3><p>将给定单机 Redis 服务器的数据导入集群中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import host:port
    --cluster-from &lt;arg&gt;		# 单机 redis 来源
    --cluster-from-user &lt;arg&gt;	
    --cluster-from-pass &lt;arg&gt;
    --cluster-from-askpass
    --cluster-copy				# 复制，保留单机 redis 的数据（不指定会删除单机中的数据）
    --cluster-replace			# 同名键冲突，覆盖同名键（不指定会中断导入操作）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：导入 6379 端口的数据到集群中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-cli --cluster import 127.0.0.1:30001 --cluster-from 127.0.0.1:6379 --cluster-copy --cluster-replace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="backup-备份集群数据" tabindex="-1"><a class="header-anchor" href="#backup-备份集群数据" aria-hidden="true">#</a> backup 备份集群数据</h3><p>备份集群数据，也就是 RDB 文件了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>backup host:port backup_directory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster backup 127.0.0.1:30001 /soft
&gt;&gt;&gt; Performing Cluster Check (using node 127.0.0.1:30001)
M: 7a6062647ca518602bfd4df53aa05e8b91685492 127.0.0.1:30001
   slots:[3827-5460],[6461-8922] (4096 slots) master
   1 additional replica(s)
M: 7ffb74903c1f83e972db6aa4ccbea7d05c78522e 127.0.0.1:30003
   slots:[2731-3826],[5461-5730],[9558-10287],[14384-16383] (4096 slots) master
   1 additional replica(s)
S: 348c9f527752ea19f29ccf662e939d6c6dc10678 127.0.0.1:30004
   slots: (0 slots) slave
   replicates 7ffb74903c1f83e972db6aa4ccbea7d05c78522e
S: 49eb6dbcb6bd920702a8d8c4d4d76b1b621b7b9a 127.0.0.1:30006
   slots: (0 slots) slave
   replicates b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf
M: b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf 127.0.0.1:30002
   slots:[0-2730],[5731-6460],[8923-9557],[10288-14383] (8192 slots) master
   1 additional replica(s)
S: e9afac3ecc6ca627830cf24d5fd0834d6b747b31 127.0.0.1:30005
   slots: (0 slots) slave
   replicates 7a6062647ca518602bfd4df53aa05e8b91685492
[OK] All nodes agree about slots configuration.
&gt;&gt;&gt; Check for open slots...
&gt;&gt;&gt; Check slots coverage...
[OK] All 16384 slots covered.
&gt;&gt;&gt; Node 127.0.0.1:30001 -&gt; Saving RDB...
SYNC sent to master, writing 179 bytes to &#39;/soft/redis-node-127.0.0.1-30001-7a6062647ca518602bfd4df53aa05e8b91685492.rdb&#39;
Transfer finished with success.
&gt;&gt;&gt; Node 127.0.0.1:30003 -&gt; Saving RDB...
SYNC sent to master, writing 179 bytes to &#39;/soft/redis-node-127.0.0.1-30003-7ffb74903c1f83e972db6aa4ccbea7d05c78522e.rdb&#39;
Transfer finished with success.
&gt;&gt;&gt; Node 127.0.0.1:30002 -&gt; Saving RDB...
SYNC sent to master, writing 179 bytes to &#39;/soft/redis-node-127.0.0.1-30002-b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf.rdb&#39;
Transfer finished with success.
Saving cluster configuration to: /soft/nodes.json
[OK] Backup created into: /soft
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行完后，将会在指定的文件夹中找到对应的 RDB 文件和一个 JSON 文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-node-127.0.0.1-30001-7a6062647ca518602bfd4df53aa05e8b91685492.rdb
redis-node-127.0.0.1-30002-b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf.rdb
redis-node-127.0.0.1-30003-7ffb74903c1f83e972db6aa4ccbea7d05c78522e.rdb
nodes.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JSON 文件内容如下</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;7a6062647ca518602bfd4df53aa05e8b91685492&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">30001</span><span class="token punctuation">,</span>
    <span class="token property">&quot;replicate&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">&quot;slots&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">3827</span><span class="token punctuation">,</span><span class="token number">5460</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">6461</span><span class="token punctuation">,</span><span class="token number">8922</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;slots_count&quot;</span><span class="token operator">:</span> <span class="token number">4096</span><span class="token punctuation">,</span>
    <span class="token property">&quot;flags&quot;</span><span class="token operator">:</span> <span class="token string">&quot;master&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;current_epoch&quot;</span><span class="token operator">:</span> <span class="token number">13</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;7ffb74903c1f83e972db6aa4ccbea7d05c78522e&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">30003</span><span class="token punctuation">,</span>
    <span class="token property">&quot;replicate&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">&quot;slots&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">2731</span><span class="token punctuation">,</span><span class="token number">3826</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">5461</span><span class="token punctuation">,</span><span class="token number">5730</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">9558</span><span class="token punctuation">,</span><span class="token number">10287</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">14384</span><span class="token punctuation">,</span><span class="token number">16383</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;slots_count&quot;</span><span class="token operator">:</span> <span class="token number">4096</span><span class="token punctuation">,</span>
    <span class="token property">&quot;flags&quot;</span><span class="token operator">:</span> <span class="token string">&quot;master&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;current_epoch&quot;</span><span class="token operator">:</span> <span class="token number">14</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;348c9f527752ea19f29ccf662e939d6c6dc10678&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">30004</span><span class="token punctuation">,</span>
    <span class="token property">&quot;replicate&quot;</span><span class="token operator">:</span> <span class="token string">&quot;7ffb74903c1f83e972db6aa4ccbea7d05c78522e&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;slots&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;slots_count&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;flags&quot;</span><span class="token operator">:</span> <span class="token string">&quot;slave&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;current_epoch&quot;</span><span class="token operator">:</span> <span class="token number">14</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;49eb6dbcb6bd920702a8d8c4d4d76b1b621b7b9a&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">30006</span><span class="token punctuation">,</span>
    <span class="token property">&quot;replicate&quot;</span><span class="token operator">:</span> <span class="token string">&quot;b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;slots&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;slots_count&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;flags&quot;</span><span class="token operator">:</span> <span class="token string">&quot;slave&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;current_epoch&quot;</span><span class="token operator">:</span> <span class="token number">17</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">30002</span><span class="token punctuation">,</span>
    <span class="token property">&quot;replicate&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">&quot;slots&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2730</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">5731</span><span class="token punctuation">,</span><span class="token number">6460</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">8923</span><span class="token punctuation">,</span><span class="token number">9557</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">10288</span><span class="token punctuation">,</span><span class="token number">14383</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;slots_count&quot;</span><span class="token operator">:</span> <span class="token number">8192</span><span class="token punctuation">,</span>
    <span class="token property">&quot;flags&quot;</span><span class="token operator">:</span> <span class="token string">&quot;master&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;current_epoch&quot;</span><span class="token operator">:</span> <span class="token number">17</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;e9afac3ecc6ca627830cf24d5fd0834d6b747b31&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">30005</span><span class="token punctuation">,</span>
    <span class="token property">&quot;replicate&quot;</span><span class="token operator">:</span> <span class="token string">&quot;7a6062647ca518602bfd4df53aa05e8b91685492&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;slots&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;slots_count&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;flags&quot;</span><span class="token operator">:</span> <span class="token string">&quot;slave&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;current_epoch&quot;</span><span class="token operator">:</span> <span class="token number">13</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,104),l=[i];function d(c,r){return e(),n("div",null,l)}const v=s(t,[["render",d],["__file","Redis_Cluster集群管理工具redis-cli.html.vue"]]);export{v as default};
