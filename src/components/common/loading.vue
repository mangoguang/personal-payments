<template>
  <van-overlay :show="show" @click="hideLoading" class-name="loadingOverlay"><van-loading custom-class="pageLoading" type="spinner" /></van-overlay>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    show: {
      type: Boolean,
      default: true,
      require: true
    }
  },
  created () {
    console.log('11223311, ', this.show)
  },
  methods: {
    hideLoading () {
      this.$isPageLoadingShow = true
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
