<template>
  <div>
    {{name}}
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent ({
  name: 'Filter',
  setup() {
    const nameRef = ref('滤镜')
    return {
      name: nameRef
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
