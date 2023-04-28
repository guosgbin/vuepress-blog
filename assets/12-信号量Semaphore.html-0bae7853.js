const e=JSON.parse('{"key":"v-586b4462","path":"/JDK_source/12-%E4%BF%A1%E5%8F%B7%E9%87%8FSemaphore.html","title":"21-线程池体系-ScheduledThreadPoolExecutor","lang":"zh-CN","frontmatter":{"title":"21-线程池体系-ScheduledThreadPoolExecutor","description":"版本 内容 时间 ---- ---- ---------------------- V1 新建 2022年09月19日22:05:38 概述 信号量 Semaphore 是通过 AQS 的共享模式实现的。 在某些时候我们可能需要控制访问某个资源的最大线程数，比如说要对某个服务做限流。 例如 RocketMQ 中生产者、消费者和 nameServer 之...","head":[["meta",{"property":"og:url","content":"https://blog.guosgbin.cn/vuepress-test/JDK_source/12-%E4%BF%A1%E5%8F%B7%E9%87%8FSemaphore.html"}],["meta",{"property":"og:title","content":"21-线程池体系-ScheduledThreadPoolExecutor"}],["meta",{"property":"og:description","content":"版本 内容 时间 ---- ---- ---------------------- V1 新建 2022年09月19日22:05:38 概述 信号量 Semaphore 是通过 AQS 的共享模式实现的。 在某些时候我们可能需要控制访问某个资源的最大线程数，比如说要对某个服务做限流。 例如 RocketMQ 中生产者、消费者和 nameServer 之..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://blog.guosgbin.cn/vuepress-test/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-28T07:25:57.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"21-线程池体系-ScheduledThreadPoolExecutor"}],["meta",{"property":"article:author","content":"超威蓝猫 Dylan Kwok"}],["meta",{"property":"article:modified_time","content":"2023-04-28T07:25:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"21-线程池体系-ScheduledThreadPoolExecutor\\",\\"image\\":[\\"https://blog.guosgbin.cn/vuepress-test/\\"],\\"dateModified\\":\\"2023-04-28T07:25:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"超威蓝猫 Dylan Kwok\\",\\"url\\":\\"\\",\\"email\\":\\"guosgbin@163.com\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"JDK给的案例","slug":"jdk给的案例","link":"#jdk给的案例","children":[]},{"level":2,"title":"构造方法","slug":"构造方法","link":"#构造方法","children":[]},{"level":2,"title":"获取许可证方法","slug":"获取许可证方法","link":"#获取许可证方法","children":[{"level":3,"title":"公平模式","slug":"公平模式","link":"#公平模式","children":[]},{"level":3,"title":"非公平模式","slug":"非公平模式","link":"#非公平模式","children":[]},{"level":3,"title":"获取许可证失败进入等待队列","slug":"获取许可证失败进入等待队列","link":"#获取许可证失败进入等待队列","children":[]},{"level":3,"title":"设置新头节点唤醒后继","slug":"设置新头节点唤醒后继","link":"#设置新头节点唤醒后继","children":[]}]},{"level":2,"title":"释放许可证","slug":"释放许可证","link":"#释放许可证","children":[]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1682666757000,"updatedTime":1682666757000,"contributors":[{"name":"Dylan Kwok","email":"guosgbin@163.com","commits":1}]},"readingTime":{"minutes":8.59,"words":2577},"filePathRelative":"JDK_source/12-信号量Semaphore.md","localizedDate":"2023年4月28日","copyright":{"author":"超威蓝猫 Dylan Kwok"},"autoDesc":true}');export{e as data};
