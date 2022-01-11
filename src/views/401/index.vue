<template>
  <div class="ym-imgbox">
    <el-image :src="img401"></el-image>
  </div>
</template>

<script>
import img401 from "@/assets/images/401.png";
import { defineComponent } from 'vue'
export default defineComponent({
  name:"401",
  setup() {
    return {
      img401
    }
  }
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