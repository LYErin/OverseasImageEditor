<template>
  <div class="ym-imgbox">
    <el-image :src="img404"></el-image>
  </div>
</template>

<script>
import img404 from "@/assets/images/404.png";
import { defineComponent } from "vue";
export default defineComponent({
  name: "404",
  setup() {
    return {
      img404,
    };
  },
});
</script>

<style lang="scss" scoped>
.ym-imgbox {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
