<template>
  <el-drawer
    custom-class="menudrawer"
    :model-value="sidebar"
    direction="ltr"
    :size="220"
    :show-close="false"
    :withHeader="false"
    :before-close="handleClose"
    destroy-on-close
    v-if="device == 'mobile'"
  >
    <el-aside :width="sidebar ? 'auto' : '220px'" class="ym-el-aside-mobile">
      <div class="ym-logo" :style="{ background: skinChoose.logoBackground }">
        <span :style="{ color: skinChoose.logoColor }">{{ appName }}</span>
      </div>
      <el-scrollbar
        class="ym-menu-box"
        :style="{ background: skinChoose.asideBackground }"
      >
        <MenuLayout />
      </el-scrollbar>
    </el-aside>
  </el-drawer>
  <el-aside :width="sidebar ? 'auto' : '220px'" class="ym-el-aside-pc" v-else>
    <div :style="{ background: skinChoose.navBackground }">
      <div class="ym-logo" :style="{ background: skinChoose.logoBackground }">
        <span v-if="!sidebar" :style="{ color: skinChoose.logoColor }">{{
          appName
        }}</span>
        <span v-else :style="{ color: skinChoose.logoColor }">{{
          logogram
        }}</span>
      </div>
    </div>
    <el-scrollbar
      class="ym-menu-box"
      :style="{ background: skinChoose.asideBackground }"
    >
      <MenuLayout />
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import MenuLayout from "./menu.vue";
export default defineComponent({
  components: { MenuLayout },
  setup() {
    const store = useStore();
    
    const appName = computed(() => store.state.settings.appName);
    const logogram = computed(() => store.state.settings.logogram);
    const sidebar = computed(() => store.state.app.sidebar);
    const device = computed(() => store.state.app.device);
    const skinChoose = computed(() => store.state.settings.skinChoose);
    return {
      appName,
      logogram,
      sidebar,
      device,
      skinChoose,
      handleClose() {
        store.dispatch("app/toggleSidebar", false);
      },
    };
  },
});
</script>
<style lang="scss">
.el-drawer__body {
  padding: 0;
}
.menudrawer {
  background-color: transparent !important;
  // aside圆角效果
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
<style lang="scss" scoped>
.el-aside {
  overflow-x: hidden !important;
}
.ym-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  // aside圆角效果
  border-top-right-radius: 20px;
}
.ym-el-aside-mobile {
  height: calc(100vh);
  overflow: hidden;
}
.ym-el-aside-pc {
  height: calc(100vh);
  overflow: hidden;
  background-color: #e9eef3;
}
.ym-menu-box {
  height: calc(100vh - 60px);
  // aside圆角效果
  border-bottom-right-radius: 20px;
}
</style>
