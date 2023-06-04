const e=JSON.parse('{"key":"v-f089814e","path":"/Netty_source/07-%E7%BA%BF%E7%A8%8B%E4%BD%93%E7%B3%BB-AbstractScheduledEventExecutor-%E4%BC%98%E5%85%88%E9%98%9F%E5%88%97.html","title":"07-线程体系-AbstractScheduledEventExecutor-优先队列","lang":"zh-CN","frontmatter":{"title":"07-线程体系-AbstractScheduledEventExecutor-优先队列","date":"2022-01-27T15:46:31.000Z","tags":["Netty"],"categories":["Netty"],"description":"版本 内容 时间 ---- --------------------------------- ---------------------- V1 新建 2022年2月13日14:51:20 V2 重构，增加和 JDK 调度执行器的对比 2023年05月17日22:38:53 Netty 调度线程池相关类 AbstractScheduledEventE...","head":[["meta",{"property":"og:url","content":"https://blog.guosgbin.cn/Netty_source/07-%E7%BA%BF%E7%A8%8B%E4%BD%93%E7%B3%BB-AbstractScheduledEventExecutor-%E4%BC%98%E5%85%88%E9%98%9F%E5%88%97.html"}],["meta",{"property":"og:title","content":"07-线程体系-AbstractScheduledEventExecutor-优先队列"}],["meta",{"property":"og:description","content":"版本 内容 时间 ---- --------------------------------- ---------------------- V1 新建 2022年2月13日14:51:20 V2 重构，增加和 JDK 调度执行器的对比 2023年05月17日22:38:53 Netty 调度线程池相关类 AbstractScheduledEventE..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://blog.guosgbin.cn/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-04T09:46:30.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"07-线程体系-AbstractScheduledEventExecutor-优先队列"}],["meta",{"property":"article:author","content":"超威蓝猫 Dylan Kwok"}],["meta",{"property":"article:tag","content":"Netty"}],["meta",{"property":"article:published_time","content":"2022-01-27T15:46:31.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-04T09:46:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"07-线程体系-AbstractScheduledEventExecutor-优先队列\\",\\"image\\":[\\"https://blog.guosgbin.cn/\\"],\\"datePublished\\":\\"2022-01-27T15:46:31.000Z\\",\\"dateModified\\":\\"2023-06-04T09:46:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"超威蓝猫 Dylan Kwok\\",\\"url\\":\\"\\",\\"email\\":\\"guosgbin@163.com\\"}]}"]]},"headers":[{"level":2,"title":"Netty 调度线程池相关类","slug":"netty-调度线程池相关类","link":"#netty-调度线程池相关类","children":[]},{"level":2,"title":"PriorityQueue 接口","slug":"priorityqueue-接口","link":"#priorityqueue-接口","children":[]},{"level":2,"title":"PriorityQueueNode 接口","slug":"priorityqueuenode-接口","link":"#priorityqueuenode-接口","children":[]},{"level":2,"title":"优先队列 DefaultPriorityQueue","slug":"优先队列-defaultpriorityqueue","link":"#优先队列-defaultpriorityqueue","children":[{"level":3,"title":"继承关系","slug":"继承关系","link":"#继承关系","children":[]},{"level":3,"title":"成员属性","slug":"成员属性","link":"#成员属性","children":[]}]},{"level":2,"title":"任务对象 ScheduledFutureTask","slug":"任务对象-scheduledfuturetask","link":"#任务对象-scheduledfuturetask","children":[{"level":3,"title":"ScheduledFutureTask 继承关系","slug":"scheduledfuturetask-继承关系","link":"#scheduledfuturetask-继承关系","children":[]},{"level":3,"title":"成员属性","slug":"成员属性-1","link":"#成员属性-1","children":[]}]},{"level":2,"title":"AbstractScheduledEventExecutor","slug":"abstractscheduledeventexecutor","link":"#abstractscheduledeventexecutor","children":[{"level":3,"title":"继承关系","slug":"继承关系-1","link":"#继承关系-1","children":[]},{"level":3,"title":"成员属性","slug":"成员属性-2","link":"#成员属性-2","children":[]},{"level":3,"title":"成员方法概述","slug":"成员方法概述","link":"#成员方法概述","children":[]},{"level":3,"title":"scheduledTaskQueue：获取优先队列","slug":"scheduledtaskqueue-获取优先队列","link":"#scheduledtaskqueue-获取优先队列","children":[]},{"level":3,"title":"发布任务相关方法","slug":"发布任务相关方法","link":"#发布任务相关方法","children":[]},{"level":3,"title":"cancelScheduledTasks：取消所有任务","slug":"cancelscheduledtasks-取消所有任务","link":"#cancelscheduledtasks-取消所有任务","children":[]},{"level":3,"title":"peekScheduledTask：查看队首任务","slug":"peekscheduledtask-查看队首任务","link":"#peekscheduledtask-查看队首任务","children":[]},{"level":3,"title":"pollScheduledTask：获取队首任务","slug":"pollscheduledtask-获取队首任务","link":"#pollscheduledtask-获取队首任务","children":[]},{"level":3,"title":"队首任务相关时间","slug":"队首任务相关时间","link":"#队首任务相关时间","children":[]}]},{"level":2,"title":"DefaultPriorityQueue 的成员方法","slug":"defaultpriorityqueue-的成员方法","link":"#defaultpriorityqueue-的成员方法","children":[{"level":3,"title":"添加元素到堆中","slug":"添加元素到堆中","link":"#添加元素到堆中","children":[]},{"level":3,"title":"弹出堆顶元素","slug":"弹出堆顶元素","link":"#弹出堆顶元素","children":[]},{"level":3,"title":"从堆中移除元素","slug":"从堆中移除元素","link":"#从堆中移除元素","children":[]}]},{"level":2,"title":"ScheduledFutureTask 的 run 方法","slug":"scheduledfuturetask-的-run-方法","link":"#scheduledfuturetask-的-run-方法","children":[]},{"level":2,"title":"Netty 和 JDK 的调度执行器对比","slug":"netty-和-jdk-的调度执行器对比","link":"#netty-和-jdk-的调度执行器对比","children":[]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1685871990000,"updatedTime":1685871990000,"contributors":[{"name":"Dylan Kwok","email":"guosgbin@163.com","commits":1}]},"readingTime":{"minutes":18.13,"words":5439},"filePathRelative":"Netty_source/07-线程体系-AbstractScheduledEventExecutor-优先队列.md","localizedDate":"2022年1月27日","copyright":{"author":"超威蓝猫 Dylan Kwok"},"autoDesc":true}');export{e as data};
