import { defineUserConfig } from "vuepress";
import { hopeTheme, photoSwipe } from "vuepress-theme-hope";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";


export default defineUserConfig({
  base: "/",

  // 设置正在使用的语言
  lang: "zh-CN",

  theme: hopeTheme(
    {
      // 当前网站部署到的域名。
      hostname: "https://blog.guosgbin.cn",
      // 全局作者信息
      author: {
        "name": "超威蓝猫 Dylan Kwok",
        "url": "",
        "email": "guosgbin@163.com",
      },
      // 站点图标
      favicon: "小熊猫.svg",
      // 导航栏
      // navbar: ["/zh/guide/README.md", "/zh/config/README.md", "/zh/faq.md"],
      navbar: [
        // {
        //   text: "JDK源码分析",
        //   link: "/JDK_source/README.md",
        //   icon: "",
        // },
        // { text: "Netty",
        //   link: "/zh/config/README.md", 
        //   icon: "" 
        // }
      ],
      // 是否在导航栏中显示图标
      navbarIcon: true,
      // 导航栏布局设置
      navbarLayout: { 
        start: ["Brand"], 
        center: ["Links"], 
        end: ["Language", "Repo", "Outlook", "Search"]
      },
      // 导航栏图标
      logo: "小熊猫.png",
      // 夜间模式下导航栏图标
      logoDark: "",
      // 仓库链接
      repo: "",
      // 是否在导航栏显示仓库链接。
      repoDisplay: true,
      // 导航栏仓库按钮的无障碍标签
      repoLabel: "",
      // 是否在向下滚动时自动隐藏导航栏。
      navbarAutoHide: "none",
      // 是否在移动视图下隐藏站点名称。
      hideSiteNameOnMobile: false,
      // sidebar: ["/JDK_source/12-信号量Semaphore.md"],
      sidebar: {
        "/JDK_source": "structure",
        "/Redis": "structure",
        "/Netty_source": "structure",
        "/Mybatis_source": "structure",
        "/RocketMQ_source": "structure",
        "/Java_base": "structure",
        "/EffectiveJava_note": "structure",
      },
      // 是否在侧边栏显示图标
      sidebarIcon: true,
      // 侧边栏嵌套的标题深度。
      headerDepth: 3,
      themeColor: true,
      plugins: {
        // 用 false 禁止复制代码
        copyCode: false,
        // 图片预览插件配置
        photoSwipe: true,
        // 版权信息插件配置
        copyright: {
          global: true,
          disableCopy: true,
        },
      }
    },
    {
      // 主题行为选项 (可选)
    },
  ),


  // Enable it with pwa
  // shouldPrefetch: false,
  
});
