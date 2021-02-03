<template>
  <div class="order-add">

    <!-- S 内容部分 -->
    <van-tabs
      :color="titleLineColor"
      @change="orderTypeChangeHandler"
      line-height="1px"
      swipeable
    >

      <van-tab title="支出" class="pay">
        <order-add-form
          :orderType="0"
          @getFormData="getPayFormData"
          ref="payForm"
        />
        <van-cell class="bottomBox">
          <van-button
            type="primary"
            @click="paySave"
            size="large"
          >保存</van-button>
        </van-cell>
      </van-tab>
      <!-- /支出表单 -->

      <van-tab title="收入" class="income">
        <order-add-form
          :orderType="1"
          @getFormData="getIncomeFormData"
          ref="incomeForm"
        />
        <van-cell class="bottomBox">
          <van-button
            type="primary"
            @click="incomeSave"
            size="large"
            color="orange"
          >保存</van-button>
        </van-cell>
      </van-tab>
      <!-- /收入表单 -->

    </van-tabs>
    <!-- E 内容部分 -->

    <van-notify id="van-notify" />
    <van-overlay :show="isLoadingShow" @click="hideLoading" class-name="loadingOverlay"><van-loading type="spinner" /></van-overlay>

  </div>
</template>

<script>
import OrderAddForm from '@/components/order/AddForm'
import { fetchAddOrder } from '@/api/order'
import { fetchFileUpload } from '@/api/common'
import Notify from '@/../static/vant/notify/notify'
import { orderType } from '@/utils/constants'

export default {
  name: 'OrderAdd',
  components: { OrderAddForm },
  data () {
    return {
      key: true,
      payFormData: null,
      incomeFormData: null,
      payImg: null,
      incomeImg: null,
      orderType: orderType.PAY,
      isLoadingShow: false
    }
  },
  computed: {
    titleLineColor: function () {
      return this.orderType ? 'orange' : '#07c160'
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '记一笔'
    })
    this.$refs.payForm.resetData()
    this.$refs.incomeForm.resetData()
  },
  methods: {

    /**
     * 新增支出
     */
    async paySave () {
      if (this.key) {
        this.isLoadingShow = true
        this.key = false
        if (!this.payFormData.money) {
          this.key = true
          this.isLoadingShow = false
          return Notify({ type: 'warning', message: '请输入金额!' })
        }

        // 上传图片
        let imgUrl = null
        if (this.payImg) {
          fetchFileUpload(this.payImg).then(res => {
            imgUrl = JSON.parse(res.data).data.url
          }).catch(() => {
            this.key = true
            this.isLoadingShow = false
            return Notify({ type: 'warning', message: '图片上传失败!' })
          })
        }

        // 生成订单
        const params = { ...this.payFormData, orderType: 0, imgUrl }
        fetchAddOrder(params).then(() => {
          this.key = true
          Notify({ type: 'success', message: '新增成功！' })
          setTimeout(() => {
            this.back()
          }, 600)
        }).catch(() => {
          Notify({ type: 'warning', message: '新增失败！' })
          this.key = true
        })
      }
    },

    /**
     * 新增收入
     */
    async incomeSave () {
      if (this.key) {
        this.isLoadingShow = true
        this.key = false
        if (!this.incomeFormData.money) {
          this.key = true
          this.isLoadingShow = false
          return Notify({ type: 'warning', message: '图片上传失败!' })
        }

        // 上传图片
        let imgUrl = null
        if (this.incomeImg) {
          fetchFileUpload(this.incomeImg).then(res => {
            imgUrl = JSON.parse(res.data).data.url
          }).catch(() => {
            this.key = true
            this.isLoadingShow = false
            Notify({ type: 'warning', message: '新增失败！' })
          })
        }

        const params = { ...this.incomeFormData, orderType: 1, imgUrl }
        fetchAddOrder(params).then(() => {
          this.key = true
          Notify({ type: 'success', message: '新增成功!' })
          setTimeout(() => {
            this.back()
          }, 600)
        }).catch(() => {
          this.key = true
          Notify({ type: 'warning', message: '新增失败！' })
        })
      }
    },

    // 返回页面
    back () {
      wx.navigateBack({
        delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      })
    },

    // 获取支出表单数据
    getPayFormData (data, img) {
      this.payFormData = data
      this.payImg = img
    },

    // 获取收入表单数据
    getIncomeFormData (data, img) {
      this.incomeFormData = data
      this.incomeImg = img
    },

    // 切换支出/收入表单
    orderTypeChangeHandler (event) {
      this.orderType = event.target.name
    }
  }
}
</script>

<style lang="scss">
.pay {
  .money-input {
    font-size: 24px;
    color: #07c160!important;
  }
  .money-input::-webkit-input-placeholder {
    color: #07c160!important;
  }
  .money-input:-moz-placeholder {
    color: #07c160!important;
  }
  .money-input::-moz-placeholder {
    color: #07c160!important;
  }
  .money-input:-ms-input-placeholder {
    color: #07c160!important;
  }
}
.income {
  .money-input {
    font-size: 24px;
    color: orange!important;
  }
  .money-input::-webkit-input-placeholder {
    color: orange!important;
  }
  .money-input:-moz-placeholder {
    color: orange!important;
  }
  .money-input::-moz-placeholder {
    color: orange!important;
  }
  .money-input:-ms-input-placeholder {
    color: orange!important;
  }
}
</style>
