<template>
  <div>
    {{name}}
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent ({
  name: 'Dashboard',
  setup() {
    const nameRef = ref('首页')
    return {
      name: nameRef
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
