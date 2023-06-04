const e=JSON.parse('{"key":"v-772e28e2","path":"/Netty_source/02-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%90%AF%E5%8A%A8%E6%B7%BB%E5%8A%A0ChannelInitializer%E5%88%B0%E7%AE%A1%E9%81%93.html","title":"02-服务端启动添加ChannelInitializer到管道","lang":"zh-CN","frontmatter":{"title":"02-服务端启动添加ChannelInitializer到管道","date":"2022-03-08T08:47:52.000Z","tags":["Netty"],"categories":["Netty"],"description":"版本 内容 时间 ---- -------- ---------------------- V1 新建 2022年3月8日08:47:52 V2 增加图片 2022年03月16日15:08:42 V3 重构内容 2023年05月10日21:36:49 服务端启动流程回顾 接着上篇文章：在创建完 ServerBootstrap 对象后，会调到 Abstr...","head":[["meta",{"property":"og:url","content":"https://blog.guosgbin.cn/Netty_source/02-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%90%AF%E5%8A%A8%E6%B7%BB%E5%8A%A0ChannelInitializer%E5%88%B0%E7%AE%A1%E9%81%93.html"}],["meta",{"property":"og:title","content":"02-服务端启动添加ChannelInitializer到管道"}],["meta",{"property":"og:description","content":"版本 内容 时间 ---- -------- ---------------------- V1 新建 2022年3月8日08:47:52 V2 增加图片 2022年03月16日15:08:42 V3 重构内容 2023年05月10日21:36:49 服务端启动流程回顾 接着上篇文章：在创建完 ServerBootstrap 对象后，会调到 Abstr..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-04T09:46:30.000Z"}],["meta",{"property":"article:author","content":"超威蓝猫 Dylan Kwok"}],["meta",{"property":"article:tag","content":"Netty"}],["meta",{"property":"article:published_time","content":"2022-03-08T08:47:52.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-04T09:46:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"02-服务端启动添加ChannelInitializer到管道\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-08T08:47:52.000Z\\",\\"dateModified\\":\\"2023-06-04T09:46:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"超威蓝猫 Dylan Kwok\\",\\"url\\":\\"\\",\\"email\\":\\"guosgbin@163.com\\"}]}"]]},"headers":[{"level":2,"title":"服务端启动流程回顾","slug":"服务端启动流程回顾","link":"#服务端启动流程回顾","children":[]},{"level":2,"title":"ChannelInitializer类继承体系","slug":"channelinitializer类继承体系","link":"#channelinitializer类继承体系","children":[]},{"level":2,"title":"ChannelPipeline添加处理器简要分析","slug":"channelpipeline添加处理器简要分析","link":"#channelpipeline添加处理器简要分析","children":[]},{"level":2,"title":"添加任务到单链表","slug":"添加任务到单链表","link":"#添加任务到单链表","children":[]},{"level":2,"title":"Channel 注册完成后消费任务","slug":"channel-注册完成后消费任务","link":"#channel-注册完成后消费任务","children":[]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1685871990000,"updatedTime":1685871990000,"contributors":[{"name":"Dylan Kwok","email":"guosgbin@163.com","commits":1}]},"readingTime":{"minutes":6.7,"words":2011},"filePathRelative":"Netty_source/02-服务端启动添加ChannelInitializer到管道.md","localizedDate":"2022年3月8日","copyright":{"author":"超威蓝猫 Dylan Kwok"},"autoDesc":true}');export{e as data};
