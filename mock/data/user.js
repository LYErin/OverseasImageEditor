const login = (data) => {
  const users = {
    token: "admin-token",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    nickname: "Admin",
    group: "admin",
  };
  data = JSON.parse(data.body)
  console.log(data)
  if (data.username !== 'admin' || data.password !== '123456') {
    return {
      code: 0,
      message: "用户名或密码输入有误",
    };
  }

  return {
    code: 1,
    data: users,
  };
};

const loginOut = (params) => {
  return {
    code: 1,
    data: params,
  };
};

const authRoutes = (params) => {
  const routes = [
    {
      path: "/",
      component: "layout/index.vue",
      redirect: "/dashboard",
      meta: {
        title: "home",
        icon: "ri-home-line",
        keepAlive: false,
        tabShow: false,
      },
      alwaysShow: false,
      name: "app",
      children: [
        {
          path: "dashboard",
          component: "dashboard/index.vue",
          name: "dashboard",
          meta: {
            title: "dashboard",
            icon: "ri-home-line",
            keepAlive: true,
            tabShow: true,
          },
          redirect: null,
          alwaysShow: false,
        },
      ],
    },
    {
      path: "/effect",
      component: "layout/index.vue",
      redirect: "/effect/filter",
      meta: {
        title: "effect",
        icon: "ri-file-user-line",
        keepAlive: false,
        tabShow: false,
      },
      alwaysShow: true,
      name: "effect",
      children: [
        {
          path: "filter",
          component: "filter/index.vue",
          name: "filter",
          meta: {
            title: "filter",
            icon: "ri-admin-line",
            keepAlive: true,
            tabShow: true,
          },
          redirect: null,
          alwaysShow: false,
        },
      ],
    },
  ];
  return {
    code: 1,
    data: routes,
  };
};

export { login, loginOut, authRoutes };
