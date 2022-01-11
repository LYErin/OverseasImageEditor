import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import store from "../store";
import { filterAsyncRoutes, sameLevelRoutes } from "../utils/index";
import i18n from "../lang/index";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

// 定义常量路由
export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    meta: { title: "login", icon: "el-icon-menu" },
    component: () => import("@/views/login/index.vue"),
    hidden: true,
  },
  {
    path: "/401",
    name: "401",
    meta: { title: "401", icon: "el-icon-menu" },
    component: () => import("@/views/401/index.vue"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    meta: { title: "404", icon: "el-icon-menu" },
    component: () => import("@/views/404/index.vue"),
    hidden: true,
  },
];

// 配置router 使用历史模式
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

// 设置白名单
const WhiteList = ["login", "401", "404"];

// 设置全局导航守卫
router.beforeEach(async (to, from) => {
  NProgress.start();
  // 动态修改网页标题
  if (to.meta.title) {
    const { t } = i18n.global;
    document.title = t(`${to.meta.title}.${to.meta.title}`);
  }
  // 登录鉴权 && 白名单判断
  if (!Cookies.get("token")) {
    NProgress.done();
    if (WhiteList.indexOf(to.name) !== -1 || to.path == "/login") {
      return;
    } else {
      return "/login";
    }
  }
  // 已登录，如果地址为login执行跳转至控制台
  if (to.path == "/login") {
    NProgress.done();
    return "/dashboard";
  }
  //是否已同步路由规则
  if (!store.state.user.getIsDynamicRoute) {
    //获取用户对应菜单权限
    const accessRoutes = await store.dispatch("user/getUserRoutes");
    if (!accessRoutes || accessRoutes.length <= 0) {
      console.log("异步路由为空");
    }
    let routes = filterAsyncRoutes(accessRoutes);
    // 将三级及以上路由数据拍平成二级
    routes.map((item) => {
      if (item.children) {
        item.children = sameLevelRoutes(item.children, [
          {
            path: item.path,
            title: item.meta.title,
          },
        ]);
      }
    });
    //根据权限添加路由
    routes.forEach((item) => {
      router.addRoute(item);
    });
  }
  //添加之前判断要跳转的路由是否存在
  let has_route = router.hasRoute(to.name);
  //判断是否存在执行重定向避免刷新页面404
  if (has_route) {
    NProgress.done();
    return;
  } else {
    //判断最新路由数组中是否含有当前即将跳转页面
    if (
      router.getRoutes().findIndex((value) => value.path === to.fullPath) == -1
    ) {
      NProgress.done();
      //不存在，返回404页面
      return "/404";
    } else {
      NProgress.done();
      //重定向
      return to.fullPath;
    }
  }
});

// 后置守卫：路由跳转之后
router.afterEach((to, from) => {
  if (to.meta.tabShow) {
    store.dispatch("app/addTabs", {
      fullPath: to.fullPath,
      name: to.name,
      meta: to.meta,
    });
  }
  store.dispatch("user/activeRoute", to.fullPath);
  //恢复原始keepalive
  store.dispatch("user/getKeepAlive");
});

export default router;
