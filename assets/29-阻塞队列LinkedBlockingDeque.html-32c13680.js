const e=JSON.parse('{"key":"v-f74cd27a","path":"/JDK_source/29-%E9%98%BB%E5%A1%9E%E9%98%9F%E5%88%97LinkedBlockingDeque.html","title":"29-阻塞队列LinkedBlockingDeque","lang":"zh-CN","frontmatter":{"title":"29-阻塞队列LinkedBlockingDeque","description":"版本 内容 时间 ---- ---- ---------------------- V1 新建 2022年12月06日23:52:45 LinkedBlockingDeque概述 LinkedBlockingDeque 是基于双链表的无界阻塞队列，FIFO。 LinkedBlockingDeque 使用 ReentrantLock 实现同步操作。 需要...","head":[["meta",{"property":"og:url","content":"https://blog.guosgbin.cn/JDK_source/29-%E9%98%BB%E5%A1%9E%E9%98%9F%E5%88%97LinkedBlockingDeque.html"}],["meta",{"property":"og:title","content":"29-阻塞队列LinkedBlockingDeque"}],["meta",{"property":"og:description","content":"版本 内容 时间 ---- ---- ---------------------- V1 新建 2022年12月06日23:52:45 LinkedBlockingDeque概述 LinkedBlockingDeque 是基于双链表的无界阻塞队列，FIFO。 LinkedBlockingDeque 使用 ReentrantLock 实现同步操作。 需要..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://blog.guosgbin.cn/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-04T02:26:04.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"29-阻塞队列LinkedBlockingDeque"}],["meta",{"property":"article:author","content":"超威蓝猫 Dylan Kwok"}],["meta",{"property":"article:modified_time","content":"2023-05-04T02:26:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"29-阻塞队列LinkedBlockingDeque\\",\\"image\\":[\\"https://blog.guosgbin.cn/\\"],\\"dateModified\\":\\"2023-05-04T02:26:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"超威蓝猫 Dylan Kwok\\",\\"url\\":\\"\\",\\"email\\":\\"guosgbin@163.com\\"}]}"]]},"headers":[{"level":2,"title":"LinkedBlockingDeque概述","slug":"linkedblockingdeque概述","link":"#linkedblockingdeque概述","children":[]},{"level":2,"title":"LinkedBlockingDeque 继承体系","slug":"linkedblockingdeque-继承体系","link":"#linkedblockingdeque-继承体系","children":[]},{"level":2,"title":"双链表节点对象","slug":"双链表节点对象","link":"#双链表节点对象","children":[]},{"level":2,"title":"LinkedBlockingDeque 成员属性","slug":"linkedblockingdeque-成员属性","link":"#linkedblockingdeque-成员属性","children":[]},{"level":2,"title":"LinkedBlockingDeque 构造函数","slug":"linkedblockingdeque-构造函数","link":"#linkedblockingdeque-构造函数","children":[]},{"level":2,"title":"LinkedBlockingDeque 核心方法","slug":"linkedblockingdeque-核心方法","link":"#linkedblockingdeque-核心方法","children":[{"level":3,"title":"队首阻塞入队 putFirst","slug":"队首阻塞入队-putfirst","link":"#队首阻塞入队-putfirst","children":[]},{"level":3,"title":"队尾阻塞入队 putLast","slug":"队尾阻塞入队-putlast","link":"#队尾阻塞入队-putlast","children":[]},{"level":3,"title":"队首阻塞出队 takeFirst","slug":"队首阻塞出队-takefirst","link":"#队首阻塞出队-takefirst","children":[]},{"level":3,"title":"队尾阻塞出队 takeLast","slug":"队尾阻塞出队-takelast","link":"#队尾阻塞出队-takelast","children":[]}]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1683167164000,"updatedTime":1683167164000,"contributors":[{"name":"Dylan Kwok","email":"guosgbin@163.com","commits":1}]},"readingTime":{"minutes":5.06,"words":1517},"filePathRelative":"JDK_source/29-阻塞队列LinkedBlockingDeque.md","localizedDate":"2023年5月4日","copyright":{"author":"超威蓝猫 Dylan Kwok"},"autoDesc":true}');export{e as data};
