<template>
  <div class="accountBook">
    <div class="head">
      <swiper class="swiper" indicator-dots="true">
        <div class="headWidow">
          <swiper-item class="headPage">
            <van-row class="surplus"><span>结余</span></van-row>
            <van-row><strong>-1.00</strong></van-row>
            <van-row class="surplus" gutter="8">
              <van-col><span>收入 1.00</span></van-col>
              <van-col> | </van-col>
              <van-col><span>支出 1.00</span></van-col>
            </van-row>
          </swiper-item>  
          <swiper-item class="headPage">
            <div class="headPage">2</div>
          </swiper-item>
        </div>  
      </swiper> 
    </div>
    <div class="body">
      <van-collapse :value="activeNames" @change="onChange">
        <van-collapse-item title="有赞微商城" name="1">
          提供多样店铺模板，快速搭建网上商城
        </van-collapse-item>
        <van-collapse-item title="有赞零售" name="2">
          网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeNames: ['1']
    }
  },
  onChange (event) {
    console.log(event)
    this.setData({
      activeNames: event.detail
    })
  },
  methods: {
    chang (event) {
      console.log(event)
      this.activeNames = event.detail
    }
  }
}
</script>

<style scoped lang="scss">
.accountBook{
  background:#000;
  color:#fff;
  min-height:100vh;
  >>>.head{
    background:#ccc;
    background-image:url('http://api.cucldk.com/bing.php?key=中国');
    background-repeat: no-repeat;
    background-size:100% 100%;
    color:#fff;
    width: 100vw;
    height: 30vw;
    padding: 3vw 5vw 0 5vw;
    box-sizing:border-box;
    .swiper{
      height:100%;
      .wx-swiper-dots{
        // position:relative;
        // left: unset!important;
        // bottom:0;
        top:24vw;
      }
      .headWidow{
        height:24vw;
        overflow: hidden;
        display:inline-block;       
        .headPage{
          height:100%;
          width:90vw;
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
          padding-bottom:4vw;
          box-sizing: border-box;
          .surplus{
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>