<template>
  <div class="home">

    <!-- S 头部banner -->
    <van-col class="container homePage">
      <button class="btn" v-if="!userInfo.name" open-type="getUserInfo" @getuserinfo="getUserInfo">获取用户信息</button>
      <van-row class="pay"><span>{{month}}</span>月•支出</van-row>
      <strong>666</strong>
      <van-col class="bottom">
        <van-row v-if="payInfo.monthQuota">本月可用<span class="pay-text"> {{payInfo.monthQuota - payInfo.monthPay}}</span></van-row>
        <van-row v-else>预算<button class="btn">点此设置</button></van-row>
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

  </div>
</template>

<script>
import { fetchPayInfo, fetchGetUserInfoByCode, fetchCreateUserByCode } from '@/api/users'
import { timeInterval, weappInfo } from '@/utils/constants'
import { sendDateTime } from '@/utils/common'

export default {
  data () {
    return {
      active: 'water',
      month: 7,
      budget: 1000,
      payInfo: {},
      jsCode: '',
      timeInterval,
      userInfo: {}
    }
  },
  onShow () {
    this.setData()
  },
  onLoad () {
    this.login()
    wx.setNavigationBarTitle({
      title: '首页'
    })
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
      const temp = await fetchPayInfo()
      this.payInfo = { ...this.payInfo, ...temp }
    },
    toRecordList (timeInterval) {
      wx.navigateTo({ url: `/pages/order/recordList/main?timeInterval=${timeInterval}` })
    },
    onChange (event) {
      this.active = event
    },
    add () {
      wx.navigateTo({ url: '/pages/order/add/main' })
      // this.$router.push('/order-add')
    },
    async login () {
      let promise = new Promise((resolve, reject) => {
        wx.login({
          async success (res) {
            const userInfo = await fetchGetUserInfoByCode(weappInfo.MANGOGUANG, res.code)
            console.log('获取用户信息----------------------', data)
            resolve({res, userInfo})
          }
        })
      })
      const data = await promise.then(res => {
        console.log('获取用户信息----------------------', data)
        return res
      })
      console.log('获取用户信息----------------------', data)
    },
    async getUserInfo () {
      console.log(this.jsCode)
      const jsCode = this.jsCode
      wx.checkSession({
        success: () => {
          // 查看是否授权
          wx.getSetting({
            success (res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  async success (res) {
                    console.log(11111222233333, jsCode)
                    const userInfo = res.userInfo
                    const { nickName, avatarUrl, gender } = userInfo
                    let params = {
                      jsCode: jsCode,
                      password: '',
                      address: '',
                      userName: userInfo.nickName,
                      phone: '',
                      nickName,
                      avatarUrl,
                      gender
                    }
                    const result = await fetchCreateUserByCode(params)
                    console.log('创建用户：', result)
                  }
                })
              } else {
                console.log('无获取用户信息权限')
              }
            }
          })
        },
        fail (err) {
          console.log(2222222, err)
          // session_key 已经失效，需要重新执行登录流程
          // wx.login() // 重新登录
        }
      })
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
  .pay {
    font-size: 12px;
    // color: #999;
    color: #fff;
  }
  strong {
    font-size: 32px;
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
    font-size: 12px;
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
