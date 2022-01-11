<template>
  <el-menu-item
    v-if="(!item.children || item.children.length <= 1) && !item.alwaysShow"
    :index="getPath()"
  >
    <i
      :class="item.meta.icon"
      :style="{
        color:
          activeRoute == getPath()
            ? skinChoose.activeColor
            : skinChoose.asideColor,
      }"
    ></i>
    <template #title>
      <span style="margin-left: 10px">{{
        $t(item.name + "." + item.meta.title)
      }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else :index="item.path">
    <template #title>
      <i
        :class="item.meta.icon"
        :style="{
          color:
            activeRoute == getPath()
              ? skinChoose.activeColor
              : skinChoose.asideColor,
        }"
      ></i>
      <span style="margin-left: 10px">{{
        $t(item.name + "." + item.meta.title)
      }}</span>
    </template>
    <template v-for="child in item.children" :key="child.path">
      <menuItem v-if="!child.hidden" :item="child" :parentPath="getPath()" />
    </template>
  </el-sub-menu>
</template>

<script>
import { defineComponent, computed, reactive } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "menuItem",
  props: {
    item: {
      type: Object,
      default: {},
    },
    parentPath: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const item = reactive(props.item)
    const parentPath = reactive(props.parentPath)

    const store = useStore();

    const activeRoute = computed(() => store.state.user.activeRoute);
    const skinChoose = computed(() => store.state.settings.skinChoose);

    const getPath =() =>  {
      if (!item.alwaysShow && item.redirect) {
        return item.redirect;
      } else {
        if (parentPath) {
          return parentPath + "/" + item.path;
        }
        return item.path;
      }
    }

    return {
      activeRoute,
      skinChoose,
      getPath,
      item
    }
  }
})
</script>
