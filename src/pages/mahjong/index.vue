<template>
  <div class="mahjong">
    <!-- <van-collapse accordion="false" :value="activeName" @change="onChange">
        <van-collapse-item title="有赞微商城" name="1">
            提供多样店铺模板，快速搭建网上商城
        </van-collapse-item>
        <van-collapse-item title="有赞零售" name="2">
            网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
        </van-collapse-item>
        <van-collapse-item title="有赞美业" name="3">
            线上拓客，随时预约，贴心顺手的开单收银
        </van-collapse-item>
    </van-collapse> -->

    <van-button @click="add" icon="plus" type="info"></van-button>
  </div>
</template>

<script>
// import { formatTime } from '@/utils/indx'
// import card from '@/components/card'

export default {
  components: {

  },

  data () {
    return {
      activeName: '1'
    }
  },

  created () {

  },
  methods: {
    add () {
      wx.navigateTo({ url: '/pages/mahjong/add/main' })
    }
  }
}
</script>

<style>
.mahjong {
  position: relative;
  display: flex;
  flex-direction: column;
}
.add-btn {
  align-self: center;
  position: absolute;
  bottom: 16px;
}
</style>
