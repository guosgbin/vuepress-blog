const e=JSON.parse('{"key":"v-45a8f5bd","path":"/JDK_source/26-ConcurrentHashMap%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90.html","title":"26-ConcurrentHashMap源码分析","lang":"zh-CN","frontmatter":{"title":"26-ConcurrentHashMap源码分析","description":"版本 内容 时间 ---- ---- ---------------------- V1 新建 2022年12月02日00:23:46 概述 我们知道 HashMap 不是线程安全的，在 JDK1.5 之前JDK 提供的同步的 Map 有 Hashtable 和使用 Collections. synchronizedMap 返回一个同步代理类 Sync...","head":[["meta",{"property":"og:url","content":"https://blog.guosgbin.cn/JDK_source/26-ConcurrentHashMap%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90.html"}],["meta",{"property":"og:title","content":"26-ConcurrentHashMap源码分析"}],["meta",{"property":"og:description","content":"版本 内容 时间 ---- ---- ---------------------- V1 新建 2022年12月02日00:23:46 概述 我们知道 HashMap 不是线程安全的，在 JDK1.5 之前JDK 提供的同步的 Map 有 Hashtable 和使用 Collections. synchronizedMap 返回一个同步代理类 Sync..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://blog.guosgbin.cn/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-04T03:52:42.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"26-ConcurrentHashMap源码分析"}],["meta",{"property":"article:author","content":"超威蓝猫 Dylan Kwok"}],["meta",{"property":"article:modified_time","content":"2023-05-04T03:52:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"26-ConcurrentHashMap源码分析\\",\\"image\\":[\\"https://blog.guosgbin.cn/\\"],\\"dateModified\\":\\"2023-05-04T03:52:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"超威蓝猫 Dylan Kwok\\",\\"url\\":\\"\\",\\"email\\":\\"guosgbin@163.com\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"继承关系","slug":"继承关系","link":"#继承关系","children":[]},{"level":2,"title":"ConcurrentHashMap 的内部结构","slug":"concurrenthashmap-的内部结构","link":"#concurrenthashmap-的内部结构","children":[{"level":3,"title":"各个节点的继承关系","slug":"各个节点的继承关系","link":"#各个节点的继承关系","children":[]},{"level":3,"title":"节点的作用","slug":"节点的作用","link":"#节点的作用","children":[]},{"level":3,"title":"节点的定义","slug":"节点的定义","link":"#节点的定义","children":[]}]},{"level":2,"title":"ConcurrentHashMap 构造方法","slug":"concurrenthashmap-构造方法","link":"#concurrenthashmap-构造方法","children":[]},{"level":2,"title":"ConcurrentHashMap 属性","slug":"concurrenthashmap-属性","link":"#concurrenthashmap-属性","children":[]},{"level":2,"title":"ConcurrentHashMap 的 put 操作","slug":"concurrenthashmap-的-put-操作","link":"#concurrenthashmap-的-put-操作","children":[{"level":3,"title":"懒加载-初始化 table","slug":"懒加载-初始化-table","link":"#懒加载-初始化-table","children":[]},{"level":3,"title":"哈希寻址到的桶位为空","slug":"哈希寻址到的桶位为空","link":"#哈希寻址到的桶位为空","children":[]},{"level":3,"title":"找到 ForwardingNode 节点","slug":"找到-forwardingnode-节点","link":"#找到-forwardingnode-节点","children":[]},{"level":3,"title":"发送哈希冲突了且并未在扩容","slug":"发送哈希冲突了且并未在扩容","link":"#发送哈希冲突了且并未在扩容","children":[]},{"level":3,"title":"ConcurrentHashMap 树化操作","slug":"concurrenthashmap-树化操作","link":"#concurrenthashmap-树化操作","children":[]},{"level":3,"title":"putVal 操作的整体流程图","slug":"putval-操作的整体流程图","link":"#putval-操作的整体流程图","children":[]}]},{"level":2,"title":"ConcurrentHashMap 的计数操作","slug":"concurrenthashmap-的计数操作","link":"#concurrenthashmap-的计数操作","children":[]},{"level":2,"title":"ConcurrentHashMap 的扩容操作","slug":"concurrenthashmap-的扩容操作","link":"#concurrenthashmap-的扩容操作","children":[{"level":3,"title":"扩容的基本原理","slug":"扩容的基本原理","link":"#扩容的基本原理","children":[]},{"level":3,"title":"触发扩容的时机","slug":"触发扩容的时机","link":"#触发扩容的时机","children":[]},{"level":3,"title":"迁移数据的操作","slug":"迁移数据的操作","link":"#迁移数据的操作","children":[]},{"level":3,"title":"迁移数据的流程示例","slug":"迁移数据的流程示例","link":"#迁移数据的流程示例","children":[]}]},{"level":2,"title":"ConcurrentHashMap 的 get 操作","slug":"concurrenthashmap-的-get-操作","link":"#concurrenthashmap-的-get-操作","children":[{"level":3,"title":"TreeBin 的 get 方法","slug":"treebin-的-get-方法","link":"#treebin-的-get-方法","children":[]},{"level":3,"title":"ForwardingNode 的 get 方法","slug":"forwardingnode-的-get-方法","link":"#forwardingnode-的-get-方法","children":[]}]},{"level":2,"title":"ConcurrentHashMap 的 remove 方法","slug":"concurrenthashmap-的-remove-方法","link":"#concurrenthashmap-的-remove-方法","children":[]},{"level":2,"title":"ConcurrentHashMap 小结","slug":"concurrenthashmap-小结","link":"#concurrenthashmap-小结","children":[]}],"git":{"createdTime":1683167164000,"updatedTime":1683172362000,"contributors":[{"name":"Dylan Kwok","email":"guosgbin@163.com","commits":2}]},"readingTime":{"minutes":39.81,"words":11944},"filePathRelative":"JDK_source/26-ConcurrentHashMap源码分析.md","localizedDate":"2023年5月4日","copyright":{"author":"超威蓝猫 Dylan Kwok"},"autoDesc":true}');export{e as data};
