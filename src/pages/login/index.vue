<template>
  <div class="login">
    
    <form class="login-form">
      <!-- 账号 -->
      <van-field
        v-model="account"
        @change="accountChange"
        name="userName"
        placeholder="请输入账号"
      />
      <!-- 密码 -->
      <van-field
        v-model="password"
        @change="passwordChange"
        name="password"
        type="password"
        placeholder="清输入密码"
        :rules="[{ passwordRule, message: '密码格式错误' }]"
      />
      <!-- 登录按钮 -->
      <div class="login-btn">
        <van-button @click="onSubmit" type="info" round block native-type="button">登录</van-button>
      </div>
    </form>

  </div>
</template>

<script>
import { localstorageKeys } from '@/utils/constants'
import { fetchLogin } from '@/api/common'

export default {
  data () {
    return {
      account: 'mangoguang',
      password: 'admin123',
      passwordRule: /\d{12}/
    }
  },

  components: {

  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '登录'
    })
  },
  methods: {
    // 异步校验函数返回 Promise
    asyncUserName (userName) {
      // return new Promise((resolve) => {
      //   fetchUserCheck(userName).then(res => {
      //     if (res) {
      //       localStorage.setItem(localstorageKeys.OPERATOR, JSON.stringify(res))
      //       resolve(true)
      //     } else {
      //       resolve(false)
      //     }
      //   }).catch(() => {
      //     resolve(false)
      //   })
      // })
    },
    accountChange (event) {
      this.account = event.mp.detail
    },
    passwordChange (event) {
      this.password = event.mp.detail
    },
    async onSubmit () {
      let data = await fetchLogin({ userName: this.account })
      wx.setStorageSync(localstorageKeys.TOKEN, `Bearer ${data.token}`)
      wx.switchTab({ url: '/pages/index/main' })
    }
  }
}
</script>

<style scoped lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    // .toast {
    //   width: 40vw;
    //   height: 40vw;
    // }
    .login-form {
      width: 90vw;
      height: 50vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .input-box {

      }
      .login-btn {
        width: 100%;
        margin-top: 20vw;
      }
    }
    .form-box {
      width: 90vw;
      height: 50vh;
    }
  }
</style>
