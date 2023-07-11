const e=JSON.parse('{"key":"v-7d0a32b8","path":"/RocketMQ_source/25-%E5%B9%B6%E5%8F%91%E6%B6%88%E8%B4%B9%E5%8E%9F%E7%90%86.html","title":"25-并发消费原理","lang":"zh-CN","frontmatter":{"title":"25-并发消费原理","description":"版本 内容 时间 ---- ---- ---------------------- V1 新建 2023年06月26日23:58:48 回顾消息拉取流程 消费者消费 topic 的某个 queue，就会发送拉取消息 RPC 到 broker，消费者拿到 broker 返回的消息就会去消费了，这里看下从 broker 正常拉取到消息的分支。 org.ap...","head":[["meta",{"property":"og:url","content":"https://blog.guosgbin.cn/RocketMQ_source/25-%E5%B9%B6%E5%8F%91%E6%B6%88%E8%B4%B9%E5%8E%9F%E7%90%86.html"}],["meta",{"property":"og:title","content":"25-并发消费原理"}],["meta",{"property":"og:description","content":"版本 内容 时间 ---- ---- ---------------------- V1 新建 2023年06月26日23:58:48 回顾消息拉取流程 消费者消费 topic 的某个 queue，就会发送拉取消息 RPC 到 broker，消费者拿到 broker 返回的消息就会去消费了，这里看下从 broker 正常拉取到消息的分支。 org.ap..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-11T11:36:53.000Z"}],["meta",{"property":"article:author","content":"超威蓝猫 Dylan Kwok"}],["meta",{"property":"article:modified_time","content":"2023-07-11T11:36:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"25-并发消费原理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-11T11:36:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"超威蓝猫 Dylan Kwok\\",\\"url\\":\\"\\",\\"email\\":\\"guosgbin@163.com\\"}]}"]]},"headers":[{"level":2,"title":"回顾消息拉取流程","slug":"回顾消息拉取流程","link":"#回顾消息拉取流程","children":[]},{"level":2,"title":"并发消费服务简要分析","slug":"并发消费服务简要分析","link":"#并发消费服务简要分析","children":[{"level":3,"title":"字段分析","slug":"字段分析","link":"#字段分析","children":[]},{"level":3,"title":"并发消费原理","slug":"并发消费原理","link":"#并发消费原理","children":[]}]},{"level":2,"title":"并发消息源码分析","slug":"并发消息源码分析","link":"#并发消息源码分析","children":[{"level":3,"title":"封装任务到消费线程池","slug":"封装任务到消费线程池","link":"#封装任务到消费线程池","children":[]},{"level":3,"title":"线程池消费消息","slug":"线程池消费消息","link":"#线程池消费消息","children":[]}]}],"git":{"createdTime":1689075413000,"updatedTime":1689075413000,"contributors":[{"name":"Dylan Kwok","email":"guosgbin@163.com","commits":1}]},"readingTime":{"minutes":5.76,"words":1728},"filePathRelative":"RocketMQ_source/25-并发消费原理.md","localizedDate":"2023年7月11日","copyright":{"author":"超威蓝猫 Dylan Kwok"},"autoDesc":true}');export{e as data};
