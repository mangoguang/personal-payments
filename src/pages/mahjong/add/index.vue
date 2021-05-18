<template>
  <div class="order-add">

    <!-- S 内容部分 -->

    <!-- S 表单部分 -->
    <div class="form">
      <van-cell title="地点：八仔家（凯旋华府）" icon="location-o" />
      <!-- 成员选择列表 -->
      <van-cell title-class="no-title">
        <van-field
          value="小薇"
          left-icon="user-o"
          title-width="5vw"
          label="东："
          :border="false"
          readonly
          use-button-slot
        >
          <van-icon name="arrow-down" @click="selectPlayer" slot="button" />
        </van-field>
        <van-field
          label="金额:"
          title-width="10vw"
          value="3000"
          left-icon="gold-coin-o"
          :border="false"
        >
        </van-field>

      </van-cell>
      <van-cell icon="user-o">
        <view slot="title">
          <van-row class="content">
          <van-col span="3">南：</van-col>
          <van-col span="4">八仔</van-col>
          <van-col span="16">-1000</van-col>
        </van-row>
        </view>
      </van-cell>
      <van-cell icon="user-o">
        <view slot="title">
          <van-row class="content">
          <van-col span="3">西：</van-col>
          <van-col span="4">温舒</van-col>
          <van-col span="16">-1000</van-col>
        </van-row>
        </view>
      </van-cell>
      <van-cell icon="user-o">
        <view slot="title">
          <van-row class="content">
          <van-col span="3">北：</van-col>
          <van-col span="4">桂梅</van-col>
          <van-col span="16">-1000</van-col>
        </van-row>
        </view>
      </van-cell>
      <!-- /成员选择列表 -->

    </div>
    <!-- E 表单部分 -->
    <!-- E 内容部分 -->

    <!-- S 玩家选择器 -->
    <van-popup
      :show="isPlayerPickerShow"
      position="bottom"
      custom-style="height: 40%;"
      @close="isPlayerPickerShow = false"
    >
      <span v-show="true" @click="() => {
        isPlayerPickerShow = false
        addSelect(dictType.MEMBER_TYPE)
      }" class="add-select-btn">+ 新增玩家</span>
      <van-picker
        show-toolbar
        :columns="playerColumns"
        @change="(event) => { change('projectType', event) }"
        @cancel="isPlayerPickerShow = false"
        @confirm="playerOnConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- E 玩家选择器 -->

    <van-notify id="van-notify" />
    <!-- <page-loading :show="isLoadingShow" @hideLoading="hideLoading" /> -->

  </div>
</template>

<script>
import OrderAddForm from '@/components/order/AddForm'
import { dictType } from '@/utils/constants'
// import { fetchAddOrder } from '@/api/order'
// import { fetchFileUpload } from '@/api/common'
import PageLoading from '@/components/common/loading'
// import Notify from '@/../static/vant/notify/notify'

export default {
  name: 'MahjongAdd',
  components: { OrderAddForm, PageLoading },
  data () {
    return {
      key: true,
      players: ['小薇'],
      isPlayerPickerShow: true,
      playerColumns: ['小薇', '八仔', '温舒', '桂梅']
    }
  },
  computed: {
    titleLineColor: function () {
      return this.orderType ? 'orange' : '#07c160'
    }
  },
  created () {
    this.dictType = dictType
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '记一笔'
    })
    this.$refs.payForm.resetData()
    this.$refs.incomeForm.resetData()
  },
  methods: {
    getPlayer () {

    },
    selectPlayer () {
      console.log('xunze')
    },
    /**
     * picker插件选择更改事件
     */
    change (type, event) {
      console.log(type, event)
      // const { value } = event.target
      // const list = this[`${type}List`][value[0]]
      // const index = list.indexOf(value[1])
      // this[`is${type}BtnShow`] = (index >= list.length - 2) || list.length <= 2
      // let temp = JSON.parse(JSON.stringify(this[`${type}Columns`]))
      // temp[1].values = this[`${type}List`][value[0]]
      // this[`${type}Columns`] = temp
    },
    playerOnConfirm () {
      console.log('选择玩家。')
    },
    addSelect (dictType) {
      wx.navigateTo({ url: `/pages/dictionary/main?dictType=${dictType}` })
    }
  }
}
</script>

<style lang="scss">

</style>
