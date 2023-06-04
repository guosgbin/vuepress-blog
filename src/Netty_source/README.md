---
title: Netty源码分析
---



本次重构自己写的第一版的 Netty 源码阅读笔记。

**第一版地址：https://www.yuque.com/guosgbin/netty**



本次源码分析基于 Netty 4.1.69.Final-SNAPSHOT 版本的，主要分析以下的核心源码：

- Netty 服务端的启动流程；
- Netty 客户端的启动流程；
- Netty 的线程体系；
- Netty pipeline 相关的核心源码分析；
- Netty 进出站处理器相关核心源码分析；
- Netty 处理 I/O 事件源码分析；

下面的源码第二版的笔记还未更新，见第一版的：**https://www.yuque.com/guosgbin/netty**

- Netty 内存池源码分析；
- Netty 编解码源码分析；
- Netty 是如何检查资源泄漏的；

注意：本篇源码分析不会解释 Netty 相关组件的概念，以及它们是如何使用的，默认你已经了解 Netty 的使用。

<AutoCatalog base='/Netty_source/' />

