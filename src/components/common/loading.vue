<template>
  <van-overlay :show="show" @click="hideLoading"><van-loading type="spinner" /></van-overlay>
</template>

<script>
export default {
  name: 'loading',
  props: {
    show: {
      type: Boolean,
      default: true,
      require: true
    }
  },
  methods: {
    hideLoading () {

    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ ._van-loading {
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
}
</style>
