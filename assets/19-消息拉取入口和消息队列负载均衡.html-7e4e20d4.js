const e=JSON.parse('{"key":"v-cae6c216","path":"/RocketMQ_source/19-%E6%B6%88%E6%81%AF%E6%8B%89%E5%8F%96%E5%85%A5%E5%8F%A3%E5%92%8C%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1.html","title":"19-消息拉取入口和消息队列负载均衡","lang":"zh-CN","frontmatter":{"title":"19-消息拉取入口和消息队列负载均衡","description":"版本 内容 时间 ---- ---- ---------------------- V1 新建 2023年06月23日15:42:44 消息拉取入口 消息拉取入口 前面在分析 MQClientInstance 的时候，MQClientInstance 启动的时候顺带启动了 PullMessageService 这个后台线程服务，这个服务就是消息消费的入...","head":[["meta",{"property":"og:url","content":"https://blog.guosgbin.cn/RocketMQ_source/19-%E6%B6%88%E6%81%AF%E6%8B%89%E5%8F%96%E5%85%A5%E5%8F%A3%E5%92%8C%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1.html"}],["meta",{"property":"og:title","content":"19-消息拉取入口和消息队列负载均衡"}],["meta",{"property":"og:description","content":"版本 内容 时间 ---- ---- ---------------------- V1 新建 2023年06月23日15:42:44 消息拉取入口 消息拉取入口 前面在分析 MQClientInstance 的时候，MQClientInstance 启动的时候顺带启动了 PullMessageService 这个后台线程服务，这个服务就是消息消费的入..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://blog.guosgbin.cn/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-11T11:47:05.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"19-消息拉取入口和消息队列负载均衡"}],["meta",{"property":"article:author","content":"超威蓝猫 Dylan Kwok"}],["meta",{"property":"article:modified_time","content":"2023-07-11T11:47:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"19-消息拉取入口和消息队列负载均衡\\",\\"image\\":[\\"https://blog.guosgbin.cn/\\"],\\"dateModified\\":\\"2023-07-11T11:47:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"超威蓝猫 Dylan Kwok\\",\\"url\\":\\"\\",\\"email\\":\\"guosgbin@163.com\\"}]}"]]},"headers":[{"level":2,"title":"消息拉取入口","slug":"消息拉取入口","link":"#消息拉取入口","children":[{"level":3,"title":"消息拉取入口","slug":"消息拉取入口-1","link":"#消息拉取入口-1","children":[]},{"level":3,"title":"PullRequest 对象","slug":"pullrequest-对象","link":"#pullrequest-对象","children":[]}]},{"level":2,"title":"消息队列负载均衡","slug":"消息队列负载均衡","link":"#消息队列负载均衡","children":[{"level":3,"title":"消息队列负载均衡服务","slug":"消息队列负载均衡服务","link":"#消息队列负载均衡服务","children":[]},{"level":3,"title":"RebalanceImpl 字段分析","slug":"rebalanceimpl-字段分析","link":"#rebalanceimpl-字段分析","children":[]},{"level":3,"title":"负载均衡具体流程","slug":"负载均衡具体流程","link":"#负载均衡具体流程","children":[]},{"level":3,"title":"队列分配策略","slug":"队列分配策略","link":"#队列分配策略","children":[]},{"level":3,"title":"对比消息队列是否变化","slug":"对比消息队列是否变化","link":"#对比消息队列是否变化","children":[]}]}],"git":{"createdTime":1689075413000,"updatedTime":1689076025000,"contributors":[{"name":"Dylan Kwok","email":"guosgbin@163.com","commits":2}]},"readingTime":{"minutes":9.61,"words":2883},"filePathRelative":"RocketMQ_source/19-消息拉取入口和消息队列负载均衡.md","localizedDate":"2023年7月11日","copyright":{"author":"超威蓝猫 Dylan Kwok"},"autoDesc":true}');export{e as data};
