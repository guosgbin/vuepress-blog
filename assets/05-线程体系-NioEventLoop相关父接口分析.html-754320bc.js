const e=JSON.parse('{"key":"v-df0706e4","path":"/Netty_source/05-%E7%BA%BF%E7%A8%8B%E4%BD%93%E7%B3%BB-NioEventLoop%E7%9B%B8%E5%85%B3%E7%88%B6%E6%8E%A5%E5%8F%A3%E5%88%86%E6%9E%90.html","title":"05-线程体系-NioEventLoop相关接口分析","lang":"zh-CN","frontmatter":{"title":"05-线程体系-NioEventLoop相关接口分析","date":"2022-01-27T11:38:16.000Z","tags":["Netty"],"categories":["Netty"],"description":"版本 内容 时间 ---- ------------------ ---------------------- V1 EventExecutorGroup 2022年1月27日11:38:16 V2 新增相关接口 2022年1月27日12:29:06 V3 重构 2023年05月16日00:12:52 NioEventLoop 继承体系 NioEven...","head":[["meta",{"property":"og:url","content":"https://blog.guosgbin.cn/Netty_source/05-%E7%BA%BF%E7%A8%8B%E4%BD%93%E7%B3%BB-NioEventLoop%E7%9B%B8%E5%85%B3%E7%88%B6%E6%8E%A5%E5%8F%A3%E5%88%86%E6%9E%90.html"}],["meta",{"property":"og:title","content":"05-线程体系-NioEventLoop相关接口分析"}],["meta",{"property":"og:description","content":"版本 内容 时间 ---- ------------------ ---------------------- V1 EventExecutorGroup 2022年1月27日11:38:16 V2 新增相关接口 2022年1月27日12:29:06 V3 重构 2023年05月16日00:12:52 NioEventLoop 继承体系 NioEven..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-04T09:46:30.000Z"}],["meta",{"property":"article:author","content":"超威蓝猫 Dylan Kwok"}],["meta",{"property":"article:tag","content":"Netty"}],["meta",{"property":"article:published_time","content":"2022-01-27T11:38:16.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-04T09:46:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"05-线程体系-NioEventLoop相关接口分析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-01-27T11:38:16.000Z\\",\\"dateModified\\":\\"2023-06-04T09:46:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"超威蓝猫 Dylan Kwok\\",\\"url\\":\\"\\",\\"email\\":\\"guosgbin@163.com\\"}]}"]]},"headers":[{"level":2,"title":"NioEventLoop 继承体系","slug":"nioeventloop-继承体系","link":"#nioeventloop-继承体系","children":[]},{"level":2,"title":"NioEventLoop 父接口","slug":"nioeventloop-父接口","link":"#nioeventloop-父接口","children":[]},{"level":2,"title":"EventExecutorGroup 接口","slug":"eventexecutorgroup-接口","link":"#eventexecutorgroup-接口","children":[{"level":3,"title":"概要","slug":"概要","link":"#概要","children":[]},{"level":3,"title":"接口源码","slug":"接口源码","link":"#接口源码","children":[]},{"level":3,"title":"扩展的方法","slug":"扩展的方法","link":"#扩展的方法","children":[]},{"level":3,"title":"重写的方法","slug":"重写的方法","link":"#重写的方法","children":[]}]},{"level":2,"title":"EventLoopGroup 接口","slug":"eventloopgroup-接口","link":"#eventloopgroup-接口","children":[]},{"level":2,"title":"EventExecutor 接口","slug":"eventexecutor-接口","link":"#eventexecutor-接口","children":[]},{"level":2,"title":"EventLoop 接口","slug":"eventloop-接口","link":"#eventloop-接口","children":[]}],"git":{"createdTime":1685871990000,"updatedTime":1685871990000,"contributors":[{"name":"Dylan Kwok","email":"guosgbin@163.com","commits":1}]},"readingTime":{"minutes":5.01,"words":1503},"filePathRelative":"Netty_source/05-线程体系-NioEventLoop相关父接口分析.md","localizedDate":"2022年1月27日","copyright":{"author":"超威蓝猫 Dylan Kwok"},"autoDesc":true}');export{e as data};
