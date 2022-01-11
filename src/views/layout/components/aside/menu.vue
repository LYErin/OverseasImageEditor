<template>
  <el-menu
    :default-active="activeRoute"
    router
    :collapse="device == 'desktop' ? sidebar : false"
    @select="selectMenu"
    :background-color="skinChoose.asideBackground"
    :text-color="skinChoose.asideColor"
    :active-text-color="skinChoose.activeColor"
  >
    <template v-for="item in routes" :key="item.path">
      <menuItem v-if="!item.hidden" :item="item" />
    </template>
  </el-menu>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import menuItem from "./menuItem.vue";
export default defineComponent({
  components: {
    menuItem,
  },
  setup() {
    const store = useStore();

    const sidebar = computed(() => store.state.app.sidebar);
    const device = computed(() => store.state.app.device);
    const routes = computed(() => store.state.user.routes);
    const activeRoute = computed(() => store.state.user.activeRoute);
    const skinChoose = computed(() => store.state.settings.skinChoose);
    
    return {
      sidebar,
      device,
      routes,
      activeRoute,
      skinChoose,
      selectMenu(index, path) {
        store.dispatch("user/activeRoute", index);
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  text-align: left;
  width: 220px;
}
.el-menu {
  border: none !important;
}
</style>
