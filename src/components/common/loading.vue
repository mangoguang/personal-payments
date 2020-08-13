<template>
  <van-overlay class="loading-container" :show="show">
    <van-loading type="spinner" color="#1989fa" />
  </van-overlay>
</template>

<script>
export default {
  name: 'loading',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .01);
}
</style>
