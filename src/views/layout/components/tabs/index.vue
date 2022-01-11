<template>
  <div class="tabs-box">
    <div class="tabs-left">
      <el-tabs
        :model-value="tabActive"
        type="card"
        :closable="tabsList.length > 1 ? true : false"
        @tab-remove="tabRemove"
        @tab-click="tabClick"
      >
        <el-tab-pane
          :key="item.fullPath"
          v-for="item in tabsList"
          :name="item.fullPath"
        >
          <template #label>
            <div class="tab-label">
              <i :class="item.meta.icon"></i>
              <span style="margin-left: 5px">{{
                $t(item.name + "." + item.meta.title)
              }}</span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dropdown placement="bottom-start">
      <div class="tabs-menu">
        <i class="ri-apps-fill" style="font-size: 20px"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            @click="closeCurrent"
            :disabled="tabsList.length > 1 ? false : true"
            >关闭当前</el-dropdown-item
          >
          <el-dropdown-item
            @click="closeOther"
            :disabled="tabsList.length > 1 ? false : true"
            >关闭其他</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();

    onMounted(() => {
      store.dispatch("app/initTabs");
    });

    const keepAliveRoutes = computed(() => {
      return store.state.user.keepAliveRoutes;
    });
    const tabActive = computed(() => {
      return store.state.app.tabActive;
    });
    const tabsList = computed(() => {
      return store.state.app.tabsList;
    });

    // tab点击
    const tabClick = (e) => {
      store.dispatch("app/clickTab", e.index);
    };

    // tab关闭
    const tabRemove = (e) => {
      let keeps = keepAliveRoutes;
      const tabindex = tabsList.value.findIndex((item) => item.fullPath == e);
      let routeName = tabsList.value[tabindex].name;
      const keepindex = keeps.value.findIndex((item) => item == routeName);
      keeps.value.splice(keepindex, 1);
      store.dispatch("user/setKeepAlive", keeps.value);
      if (e == route.fullPath) {
        store.dispatch("app/closeCurrentTab", {
          fullPath: e,
          type: "current",
        });
      } else {
        store.dispatch("app/closeCurrentTab", {
          fullPath: e,
          type: "other",
        });
      }
    };

    // 关闭当前标签
    const closeCurrent = () => {
      if (tabsList.value.length == 1) {
        return ElMessage("最少保留一个标签哦！");
      }
      let keeps = keepAliveRoutes;
      const keepindex = keeps.value.findIndex((item) => item == route.name);
      keeps.value.splice(keepindex, 1);
      store.dispatch("user/setKeepAlive", keeps.value);
      store.dispatch("app/closeCurrentTab", {
        fullPath: route.fullPath,
        type: "current",
      });
    };

    // 关闭其他标签
    const closeOther = () => {
      store.dispatch("user/setKeepAlive", [route.name]);
      store.dispatch("app/closeOtherTabs", {
        fullPath: route.fullPath,
      });
    };

    return {
      tabActive,
      tabsList,
      tabClick,
      tabRemove,
      closeCurrent,
      closeOther,
    };
  },
});
</script>

<style lang="scss" scoped>
.tabs-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  .tabs-left {
    flex: 1;
    overflow: hidden;
    .tab-label {
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      font-size: 13px;
    }
  }
  .tabs-menu {
    padding: 8px 20px 8px 8px;
  }
}
</style>
<style lang="scss">
.tabs-left {
  .el-tabs__nav,
  .el-tabs__item {
    border: none !important;
  }
  .el-tabs__header {
    margin: 0;
    border: none !important;
  }
  .el-tabs__item.is-active,
  .el-tabs__item:hover {
    // -webkit-mask-image: url("@/assets/images/tabs.png");
    -webkit-mask-size: 100% 100%;
    outline: none;
    background: #e6e6e6;
  }
}
</style>
