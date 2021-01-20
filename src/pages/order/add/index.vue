<template>
  <div class="order-add">

    <!-- S 标题栏 -->
    <!-- <van-nav-bar
      title="记一笔"
      left-text="返回"
      left-arrow
      @click-left="back"
    /> -->
    <!-- E 标题栏 -->

    <!-- S 内容部分 -->
    <van-tabs
      :color="titleLineColor"
      @change="onClick"
      line-height="1px"
      swipeable
    >

      <van-tab title="支出" class="pay">
        <order-add-form
          :orderType="0"
          @getFormData="getPayFormData"
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

    <van-toast id="van-toast" />
    <van-notify id="van-notify" />

  </div>
</template>

<script>
import OrderAddForm from '@/components/order/AddForm'
import { fetchAddOrder } from '@/api/order'
import { fetchFileUpload } from '@/api/common'
import Toast from '@/../static/vant/toast/toast'
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
      orderType: orderType.PAY
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
  },
  methods: {

    /**
     * 新增支出
     */
    async paySave () {
      if (this.key) {
        this.key = false
        if (!this.payFormData.money) {
          this.key = true
          return Toast.fail('请输入金额')
        }

        // 上传图片
        let imgUrl = null
        if (this.payImg) {
          const res = await fetchFileUpload(this.payImg)
          imgUrl = JSON.parse(res.data).data.url
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
        this.key = false
        if (!this.incomeFormData.money) return Toast.fail('请输入金额')

        // 上传图片
        let imgUrl = null
        if (this.incomeImg) {
          const res = await fetchFileUpload(this.incomeImg)
          imgUrl = JSON.parse(res.data).data.url
        }

        const params = { ...this.incomeFormData, orderType: 1, imgUrl }
        fetchAddOrder(params).then(() => {
          this.key = true
          Toast.success('新增成功！')
          setTimeout(() => {
            this.back()
          }, 600)
        }).catch(() => {
          this.key = true
        })
      }
    },
    back () {
      wx.navigateBack({
        delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      })
    },
    getPayFormData (data, img) {
      this.payFormData = data
      this.payImg = img
    },
    getIncomeFormData (data, img) {
      this.incomeFormData = data
      this.incomeImg = img
    },
    onClick (event) {
      this.orderType = event.target.name
    },
    async upload () {
      const file = this.$refs.fileid.files[0]
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetchFileUpload(formData)
      console.log(res)
    }
  }
}
</script>

<style lang="scss">
// .bottomBox {
//   position: fixed;
//   bottom: 10;
// }
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
