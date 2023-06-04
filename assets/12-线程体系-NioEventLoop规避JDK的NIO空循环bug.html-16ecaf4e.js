const e=JSON.parse('{"key":"v-3989e90d","path":"/Netty_source/12-%E7%BA%BF%E7%A8%8B%E4%BD%93%E7%B3%BB-NioEventLoop%E8%A7%84%E9%81%BFJDK%E7%9A%84NIO%E7%A9%BA%E5%BE%AA%E7%8E%AFbug.html","title":"12-线程体系-NioEventLoop规避JDK的NIO空循环bug","lang":"zh-CN","frontmatter":{"title":"12-线程体系-NioEventLoop规避JDK的NIO空循环bug","date":"2022-02-23T18:38:06.000Z","tags":["Netty"],"categories":["Netty"],"description":"版本 内容 时间 ---- ---- ---------------------- V1 新建 2022年2月23日18:38:06 V2 重构 2023年05月22日21:22:17 NioEventLoop#run 方法回顾 在前面的文章中已经详细分析了 NioEventLoop#run 方法的处理流程，这里简单回顾下： 检查是否有 I/O 事件就...","head":[["meta",{"property":"og:url","content":"https://blog.guosgbin.cn/Netty_source/12-%E7%BA%BF%E7%A8%8B%E4%BD%93%E7%B3%BB-NioEventLoop%E8%A7%84%E9%81%BFJDK%E7%9A%84NIO%E7%A9%BA%E5%BE%AA%E7%8E%AFbug.html"}],["meta",{"property":"og:title","content":"12-线程体系-NioEventLoop规避JDK的NIO空循环bug"}],["meta",{"property":"og:description","content":"版本 内容 时间 ---- ---- ---------------------- V1 新建 2022年2月23日18:38:06 V2 重构 2023年05月22日21:22:17 NioEventLoop#run 方法回顾 在前面的文章中已经详细分析了 NioEventLoop#run 方法的处理流程，这里简单回顾下： 检查是否有 I/O 事件就..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-04T09:46:30.000Z"}],["meta",{"property":"article:author","content":"超威蓝猫 Dylan Kwok"}],["meta",{"property":"article:tag","content":"Netty"}],["meta",{"property":"article:published_time","content":"2022-02-23T18:38:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-04T09:46:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"12-线程体系-NioEventLoop规避JDK的NIO空循环bug\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-23T18:38:06.000Z\\",\\"dateModified\\":\\"2023-06-04T09:46:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"超威蓝猫 Dylan Kwok\\",\\"url\\":\\"\\",\\"email\\":\\"guosgbin@163.com\\"}]}"]]},"headers":[{"level":2,"title":"NioEventLoop#run 方法回顾","slug":"nioeventloop-run-方法回顾","link":"#nioeventloop-run-方法回顾","children":[]},{"level":2,"title":"Netty 规避空循环 bug","slug":"netty-规避空循环-bug","link":"#netty-规避空循环-bug","children":[{"level":3,"title":"检查空循环 bug 的发生","slug":"检查空循环-bug-的发生","link":"#检查空循环-bug-的发生","children":[]},{"level":3,"title":"规避空循环 bug，重建 Selector","slug":"规避空循环-bug-重建-selector","link":"#规避空循环-bug-重建-selector","children":[]}]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1685871990000,"updatedTime":1685871990000,"contributors":[{"name":"Dylan Kwok","email":"guosgbin@163.com","commits":1}]},"readingTime":{"minutes":5.2,"words":1559},"filePathRelative":"Netty_source/12-线程体系-NioEventLoop规避JDK的NIO空循环bug.md","localizedDate":"2022年2月23日","copyright":{"author":"超威蓝猫 Dylan Kwok"},"autoDesc":true}');export{e as data};
