<template>
  <div class="layout">
    <el-config-provider :locale="locale">
      <el-container style="height: 100%">
        <asideLayout />
        <el-container>
          <el-header :style="{'background':skinChoose.navBackground}">
            <headerLayout @refRoute="freshRoute" />
          </el-header>
          <tabsLayout />
          <el-main>
            <router-view v-slot="{ Component , route }">
              <transition appear name="fade-transform" mode="out-in">
                <keep-alive :include="keepAliveRoutes">
                  <component :is="Component" :key="route.fullPath===RoutePathRef?'':route.fullPath" />
                </keep-alive>
              </transition>
            </router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-config-provider>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref, computed, watch, nextTick} from 'vue'
import {useRoute} from "vue-router"
import { useStore } from "vuex";
import headerLayout from "./components/header/index.vue";
import asideLayout from "./components/aside/index.vue";
import tabsLayout from "./components/tabs/index.vue";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";
export default defineComponent ({
  name: "layout",
  components: {
    headerLayout,
    asideLayout,
    tabsLayout,
  },
  setup(){
    const route = useRoute()
    const store = useStore()
    const levelListRef = ref([])
    const RoutePathRef = ref(null)

    // 获取面包屑
    const getBreadcrumb =() => {
      let matched = route.matched;
      levelListRef.value = matched;
    }
    
    // 路由变化
    watch(route, () => {
      getBreadcrumb()
    })

    onMounted(() => {
      getBreadcrumb()
    })

    const skinChoose = computed(() => {
      return store.state.settings.skinChoose
    })
    const keepAliveRoutes = computed(() => {
      return store.state.user.keepAliveRoutes
    })

    // 刷新当前页
    const freshRoute = () => {
      let keeps = keepAliveRoutes.value;
      const keepindex = keeps.findIndex((item) => item == route.name);
      if (keepindex > -1) {
        keeps.splice(keepindex, 1);
        store.dispatch("user/setKeepAlive", keeps);
      }
      RoutePathRef.value = route.fullPath;
      nextTick(() => {
        RoutePathRef.value = "";
        if (keepindex > -1) {
          store.dispatch("user/getKeepAlive");
        }
      });
    }
    
    return {
      locale: zhLocale,
      levelList: levelListRef,
      freshRoute,
      keepAliveRoutes,
      skinChoose,
      RoutePathRef
    }
  }
})
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  height: 100%;
  width: 100%;
}

.el-main {
  background-color: #e9eef3;
  padding: 15px;
}
</style>
<style>
.is-horizontal {
  display: none !important;
}
.el-dropdown {
  font-size: 12px;
  margin-left: 20px;
}
</style>