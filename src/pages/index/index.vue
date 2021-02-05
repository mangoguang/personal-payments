<template>
  <div class="home">

    <!-- S 头部banner -->
    <van-col class="container homePage">
      <!-- 用户微信头像 -->
      <van-row v-if="userInfo.userName">
        <van-image
          round
          width="16vw"
          height="16vw"
          :src="headerImgUrl"
        />
        <p class="name">{{userInfo.userName}}</p>
      </van-row>
      <button v-else class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">登陆</button>
      <van-row class="pay">
        <van-col>{{month}}</van-col>
        <van-col>月•支出</van-col>
        <van-col><strong>{{payInfo.monthPay}}</strong></van-col>
      </van-row>
      <van-col class="bottom">
        <van-row v-if="payInfo.monthQuota">本月可用<span class="pay-text"> {{payInfo.monthQuota - payInfo.monthPay}}</span><van-icon @click="showMonthQuotaDialog" color="#07c160" name="edit" size="32rpx" /></van-row>
        <van-row v-else><span>可用额度</span><van-icon @click="showMonthQuotaDialog" name="edit" size="32rpx" /></van-row>
        <van-row>本月收入<span class="income-text"> {{ payInfo.monthIncome }}</span></van-row>
      </van-col>
    </van-col>
    <!-- E 头部banner -->

    <!-- S 时间区间列表 -->
    <div class="cell-group">

      <van-cell
        title="今天"
        :label="payInfo.dayScript"
        clickable
        @click="() => toRecordList(timeInterval.DAY)"
        is-link
      >
        <van-row>
          <!-- <span class="income-text">收入</span>/<span class="pay-text">支出</span>: -->
          <div class="income-text">{{ payInfo.dayIncome || '0' }}</div>
          <div class="pay-text">{{ payInfo.dayPay || '0' }}</div>
        </van-row>
      </van-cell>
      <!-- /今天 -->

      <van-cell
        title="本周"
        :label="payInfo.weekScript"
        clickable
        @click="() => toRecordList(timeInterval.WEEK)"
        is-link
      >
        <van-row>
          <!-- <span class="income-text">收入</span>/<span class="pay-text">支出</span>: -->
          <div class="income-text">{{ payInfo.weekIncome || '0' }}</div>
          <div class="pay-text">{{ payInfo.weekPay || '0'}}</div>
        </van-row>
      </van-cell>
      <!-- /本周 -->

      <van-cell
        title="本月"
        :label="payInfo.monthScript"
        clickable
        @click="() => toRecordList(timeInterval.MONTH)"
        is-link
      >
        <van-row>
          <!-- <span class="income-text">收入</span>/<span class="pay-text">支出</span>: -->
          <div class="income-text">{{ payInfo.monthIncome || '0'}}</div>
          <div class="pay-text">{{ payInfo.monthPay || '0'}}</div>
        </van-row>
      </van-cell>
      <!-- /本月 -->

      <van-cell
        title="今年"
        :label="payInfo.yearScript"
        clickable
        @click="() => toRecordList(timeInterval.YEAR)"
        is-link
      >
        <van-row>
          <!-- <span class="income-text">收入</span>/<span class="pay-text">支出</span>: -->
          <div class="income-text">{{ payInfo.yearIncome || '0'}}</div>
          <div class="pay-text">{{ payInfo.yearPay || '0'}}</div>
        </van-row>
      </van-cell>
      <!-- /今年 -->

    </div>
    <!-- E 时间区间列表 -->

    <van-button @click="add" size="normal" class="add" type="primary">记一笔</van-button>

    <page-loading :show="isLoadingShow" @hideLoading="hideLoading" />
    <van-overlay :show="isLoginLoadingShow" @click="hideLoading" class-name="loadingOverlay"><van-loading type="spinner" />登陆中...</van-overlay>
    <van-notify id="van-notify" />

    <!-- 设置每月可用额度弹框 -->
    <van-dialog
      use-slot
      title="额度设置"
      :show="isMonthQuotaDialogShow"
      show-cancel-button
      @close="dialogCloseHandler"
      @confirm="setMonthQuota"
    >
      <van-cell value=" ">
        <view slot="title">
          <input
            @input="monthQuotaChange"
            :value="payInfo.monthQuota"
            placeholder="输入额度"
            type="digit"
            maxlength="10"
            focus="true"
            class="weui-input"
          />
        </view>
      </van-cell>
    </van-dialog>
  </div>
</template>

<script>
import { fetchPayInfo, fetchGetUserInfoByCode, fetchCreateUserByCode, fetchSetMonthQuota } from '@/api/users'
import { timeInterval, weappInfo, localstorageKeys } from '@/utils/constants'
import PageLoading from '@/components/common/loading'
import { sendDateTime, uuid } from '@/utils/common'
import Notify from '@/../static/vant/notify/notify'

export default {
  name: 'Home',
  components: { PageLoading },
  data () {
    return {
      active: 'water',
      month: new Date().getMonth() + 1,
      monthQuota: 0,
      payInfo: {},
      jsCode: '',
      timeInterval,
      userInfo: {},
      headerImgUrl: '',
      isLoadingShow: true,
      isLoginLoadingShow: false,
      // 初次加载页面，onShow钩子不执行setData函数
      isLoadingFlag: false,
      isMonthQuotaDialogShow: false,
      img: ''
    }
  },
  onLoad () {
    this.isLoadingShow = true
    wx.setNavigationBarTitle({
      title: '首页'
    })
    this.login()
  },
  onShow () {
    // 初始化数据
    if (this.isLoadingFlag) this.setData()
    this.isLoadingFlag = true
  },
  // 下拉刷新事件
  onPullDownRefresh () {
    this.isLoadingShow = true
    // 初始化数据
    this.setData()
    // 解决下刷新不自动返回的问题
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: function () {

  },
  methods: {
    /**
     * 初始化数据
     */
    async setData () {
      const date = new Date()
      this.payInfo.dayScript = sendDateTime(date, 'MM月dd日')
      const day = date.getDay()
      this.payInfo.weekScript = `${sendDateTime(new Date(+new Date() - (day * 24 * 60 * 60 * 1000)), 'MM月dd日')}-${sendDateTime(new Date(+new Date() + ((7 - day) * 24 * 60 * 60 * 1000)), 'MM月dd日')}`
      this.payInfo.monthScript = sendDateTime(date, 'yyyy年MM月')
      this.payInfo.yearScript = sendDateTime(date, 'yyyy')
      // 获取用户收支信息
      fetchPayInfo().then(res => {
        for (let item in res) {
          if (typeof res[item] === 'number') res[item] = res[item].toFixed(2)
        }
        this.monthQuota = res.monthQuota
        this.payInfo = { ...this.payInfo, ...res }
        this.isLoadingShow = false
      }).catch(() => this.isLoadingShow = false)
    },

    // 跳转收支记录页面
    toRecordList (timeInterval) {
      wx.navigateTo({ url: `/pages/order/recordList/main?timeInterval=${timeInterval}` })
    },

    // 跳转新增收支记录页面
    add () {
      if (!this.userInfo.userName) return Notify({ type: 'warning', message: '请登陆！' })
      wx.navigateTo({ url: '/pages/order/add/main' })
    },

    // 微信登陆（根据jsCode获取用户信息）
    async login () {
      let _this = this
      let promise = new Promise((resolve, reject) => {
        wx.login({
          async success (res) {
            fetchGetUserInfoByCode({weappName: weappInfo.MANGOGUANG, jsCode: res.code, uuid: uuid()}).then(userInfo => {
              wx.setStorageSync(localstorageKeys.TOKEN, `Bearer ${userInfo.token}`)
              _this.headerImgUrl = userInfo.avatarUrl
              resolve({res, userInfo})
            }).catch(() => {
              resolve({})
            })
          },
          fail () {
            _this.isLoadingShow = false
            // Notify({ type: 'success', message: '登陆成功！' })
          }
        })
      })
      promise.then(res => {
        this.jsCode = res.res && res.res.code
        this.userInfo = res.userInfo
        this.setData()
      }).catch(() => this.isLoadingShow = false)
    },

    // 用户点击微信登陆行为，并根据用户微信数据创建账号
    async getUserInfo () {
      let _this = this
      this.isLoginLoadingShow = true
      let jsCode = ''
      // 登录获取jsCode
      let getJsCodePromise = new Promise((resolve, reject) => {
        wx.login({
          async success (res) {
            jsCode = res.code
            resolve(jsCode)
          },
          fail () {
            _this.isLoginLoadingShow = false
          }
        })
      })
      await getJsCodePromise
      // 查看是否授权
      let getUserInfoPromise = new Promise((resolve, reject) => {
        wx.getSetting({
          success (res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                async success (res) {
                  // 根据jsCode，后台获取用户微信开放数据，并创建账号
                  const userInfo = await fetchCreateUserByCode({ weappName: weappInfo.MANGOGUANG, jsCode, ...res })
                  resolve(userInfo)
                }
              })
            } else {
              console.log('无获取用户信息权限')
            }
          }
        })
      })
      await getUserInfoPromise
      this.isLoginLoadingShow = false
      this.login()
    },

    // 隐藏加载动画
    hideLoading () {
      this.isLoadingShow = false
      this.isLoginLoadingShow = false
    },

    // 显示用户每月可用额度设置弹框
    showMonthQuotaDialog () {
      this.isMonthQuotaDialogShow = true
    },

    // 关闭额度设置弹框
    dialogCloseHandler () {
      this.isMonthQuotaDialogShow = false
    },
    monthQuotaChange (e) {
      this.monthQuota = e.target.value
    },

    // 设置用户每月可用额度
    async setMonthQuota () {
      await fetchSetMonthQuota({ monthQuota: this.monthQuota })
      Notify({ type: 'success', message: '设置成功！' })
      this.setData()
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
}
.homePage{
  align-items: flex-start;
}
.container {
  background:#ccc;
  background-image:url('http://api.cucldk.com/bing.php?key=中国');
  background-repeat: no-repeat;
  background-size:100% 100%;
  color:#fff;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 100vw;
  height: 52vw;
  padding: 3vw 5vw;
  .name {
    width: 16vw;
    text-align: center;
    line-height: 1em;
    padding-bottom: 5px;
    font-size: 16px;
    // color: #999;
    color: #fff;
  }
  .pay {
    width: 16vw;
    line-height: 80rpx;
    font-size: 30rpx;
    color: #fff;
  }
  strong {
    font-size: 64rpx;
    line-height: 80rpx;
    // color: #333;
    color: #fff;
  }
  .btn{
    background:none;
    padding:0;
    color:#fff;
    display: inline-block;
    &:after{
      border:none;
    }
  }
  >>>.bottom {
    font-size: 30rpx;
    // color: #999;
    color: #fff;
  }
}
>>>.cell-group{
  .van-cell__right-icon-wrap{
    color:red;
    height:48px;
  }
}
.add {
  align-self: center;
  position: absolute;
  bottom: 16px;
}
.income-text {
  color: orange;
}
.pay-text {
  color: #07c160;
}
</style>
