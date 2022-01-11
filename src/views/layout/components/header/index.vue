<template>
  <div class="layout-header">
    <div class="header-left">
      <div class="header-tool" @click="outSide">
        <i
          class="ri-indent-decrease"
          style="font-size: 18px"
          :style="{ color: skinChoose.navColor }"
        ></i>
      </div>
      <div class="header-refresh" @click="refRoute">
        <i
          class="ri-refresh-line"
          style="font-size: 18px"
          :style="{ color: skinChoose.navColor }"
        ></i>
      </div>
    </div>
    <div class="header-right">
      <i
        class="ri-fullscreen-fill"
        @click="toScreenfull"
        :style="{ color: skinChoose.navColor }"
      ></i>
      <el-dropdown>
        <span :style="{ color: skinChoose.navColor }">
          {{ language == "en" ? "English" : "中文" }}
          <el-icon :color="skinChoose.navColor"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="setLang('zh-cn')">中文</el-dropdown-item>
            <el-dropdown-item @click="setLang('en')">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown>
        <span :style="{ color: skinChoose.navColor }">
          {{ userinfo && userinfo.nickname }}
        </span>
        <el-icon :color="skinChoose.navColor"><arrow-down /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item @click="toProfile()">{{
              $t("userDropdown.userinfo")
            }}</el-dropdown-item> -->
            <el-dropdown-item @click="loginOut()">{{
              $t("userDropdown.loginout")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- <div class="header-set" @click="changeShowSet">
        <i class="ri-settings-fill" :style="{ color: skinChoose.navColor }"></i>
      </div> -->
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ArrowDown } from "@element-plus/icons-vue";
import screenfull from "screenfull";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "Header",
  components: {
    ArrowDown,
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const { locale } = useI18n()

    const sidebar = computed(() => {
      return store.state.app.sidebar;
    });
    const showSet = computed(() => {
      return store.state.app.showSet;
    });
    const language = computed(() => {
      return store.state.app.language;
    });
    const skinChoose = computed(() => {
      return store.state.settings.skinChoose;
    });
    const userinfo = computed(() => {
      return store.state.user.userinfo;
    });
    
    return {
      sidebar,
      language,
      skinChoose,
      userinfo,
      outSide() {
        store.dispatch("app/toggleSidebar", !sidebar.value);
      },
      loginOut() {
        store.dispatch("user/loginOutSet");
        router.replace("login");
      },
      refRoute() {
        emit("refRoute");
      },
      changeShowSet() {
        store.dispatch("app/setShowSet", !showSet.value);
      },
      setLang(language) {
        locale.value = language;
        store.dispatch("app/setLanguage", language);
      },
      toScreenfull() {
        screenfull.toggle();
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .header-tool {
    padding-right: 20px;
  }
  .header-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
  }
  .header-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    .header-set {
      margin-left: 20px;
    }
  }
}
</style>
