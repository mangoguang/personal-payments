<template>
  <div class="accountBook">
    <div class="head">
      <swiper class="swiper" indicator-dots="true">
        <div class="headWidow">
          <swiper-item class="headPage">
            <van-row class="surplus"><span>结余</span></van-row>
            <van-row><strong>{{ record.allIncome - record.allCustomer }}</strong></van-row>
            <van-row class="surplus" gutter="8">
              <van-col><span>收入 {{ record.allIncome }}</span></van-col>
              <van-col> | </van-col>
              <van-col><span>支出 {{ record.allCustomer }}</span></van-col>
            </van-row>
          </swiper-item>  
          <swiper-item class="headPage">
            <div class="headPage">2</div>
          </swiper-item>
        </div>  
      </swiper> 
    </div>

    <div class="body">
      <van-collapse accordion :border="false" :value="activeNames" @change="onChange($event,'0')">
        <van-collapse-item name="1" class="custom-class">
          <div slot="title" class="title">
            <div class="title-year">{{ record.year }}年</div>
            <div class="title-surplus">
              <div class="surplus-show"><span class="surplus-big">{{ record.allIncome - record.allCustomer }}</span> 结余</div>
              <div class="surplus-income">
                <span class="coral">收入</span>{{ record.allIncome }}
                <span class="endLine">|</span>
              <span class="green">支出</span>{{ record.allCustomer }}</div>
            </div>
          </div>
          <van-collapse 
            :border="false" 
            v-for="(item,index) in record.detailed" 
            :key="index"
            :value="activeIndex"
            @change="onChange($event,'11',index)"
          >
            <van-collapse-item :name="index" class="subCustom-class">
              <div slot="title">
                <span class="subTitle-month">{{ item.month }}月</span>
                <span>.2021</span>
                <span class="subTitle-surplus">结余{{ item.expend }}</span>
              </div>
              <van-row
                v-for="(value, i) in item.day"
                :key="i"
                class="subTitle-row"
                gutter="10"
              >
                <van-col :span="3" :offset="2">
                  <div class="day">{{ setDay[index][i].day }}</div>
                  <div>{{ setDay[index][i].week }}</div>
                </van-col>
                <van-col :span="3">
                  <image src="../../static/images/dinner.png" class="img"></image>
                </van-col>
                <van-col :span="10" :offset="1" class="dinner">
                  <div>{{ value.type }}</div>
                  <div>{{ setDay[index][i].time }}-{{ value.payment }}</div>
                </van-col>
                <van-col :span="3">
                  <div class="green subTitle-text">{{ value.customer }} </div>
                </van-col>
              </van-row>         
            </van-collapse-item>
          </van-collapse>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div class="tabs">
      <van-dropdown-menu direction="up">
        <van-dropdown-item :value="text1" :options="option1" @change="tabChange($event, 1)"/>
        <van-dropdown-item :value="text2" :options="option2" @change="tabChange($event, 2)"/>
        <van-dropdown-item :value="text3" :options="option3" @change="tabChange($event, 3)"/>
        <van-dropdown-item :value="text4" :options="option4" @change="tabChange($event, 4)"/>
        <van-dropdown-item :value="text5" :options="option5" @change="tabChange($event, 5)"/>
      </van-dropdown-menu>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      record: {
        year: '2021',
        allIncome: '30', // 收益
        allCustomer: '70', // 花费
        detailed: [
          {
            month: '1',
            expend: '-10',
            income: '10', // 月收入
            day: [
              {
                date: '2021-01-07 19:36',
                customer: '15', // 花费
                type: '早午晚餐', // 餐费类型
                payment: '现金' // 支付方式
              },
              {
                date: '2021-01-09 09:36',
                customer: '5', // 花费
                type: '早午晚餐', // 餐费类型
                payment: '现金' // 支付方式
              }
            ]
          },
          {
            month: '2',
            expend: '-15',
            income: '10', // 月收入
            day: [
              {
                date: '2021-02-17 19:36',
                customer: '15', // 花费
                type: '早午晚餐', // 餐费类型
                payment: '现金' // 支付方式
              },
              {
                date: '2021-02-25 15:36',
                customer: '10', // 花费
                type: '早午晚餐', // 餐费类型
                payment: '现金' // 支付方式
              }
            ]
          },
          {
            month: '3',
            expend: '-5',
            income: '10', // 月收入
            day: [
              {
                date: '2021-03-03 08:36',
                customer: '15', // 花费
                type: '早午晚餐', // 餐费类型
                payment: '现金' // 支付方式
              }
            ]
          }
        ]
      },
      activeNames: '',
      key: false,
      activeIndex: ['1'],
      active: 0,
      option1: [
        { text: '时间', value: 'time' },
        { text: '年', value: 'year' },
        { text: '季', value: 'quarter' },
        { text: '月', value: 'month' }
      ],
      option2: [
        { text: '分类', value: 'sort' },
        { text: '一级', value: 'one' },
        { text: '二级', value: 'two' }
      ],
      option3: [
        { text: '账户', value: 'account' }
      ],
      option4: [
        { text: '项目', value: 'project' }
      ],
      option5: [
        { text: '更多', value: 'more' },
        { text: '成员', value: 'prople' },
        { text: '商家', value: 'business' }
      ],
      text1: 'time',
      text2: 'sort',
      text3: 'account',
      text4: 'project',
      text5: 'more'
    }
  },
  computed: {
    setVarible () {
      const arr = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
      return arr
    },
    setDay () {
      // const day = this.record.detailed.map(item => item.day).map(value => this.getRuler(value.date)[2])
      const arr = this.record.detailed.map(item => item.day)
      let list = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let day = []
      day = arr.map(item => {
        return item.map(chileItem => ({
          'day': this.getRuler(chileItem.date)[2],
          'time': this.getRuler(chileItem.date)[3],
          'week': list[new Date(chileItem.date).getDay()]
        }))
      })
      console.log('day', day)
      return day
    }
  },
  methods: {
    getRuler (v) {
      return v.replace(' ', ':').replace(':', '-').split('-')
    },
    onChange (event, type, index) {
      console.log('event', event)
      switch (type) {
        case '0':
          this.activeNames = event.mp.detail
          break
        case '11':
          this.childName = event.mp.detail
          // if (this.activeIndex === index) {
          //   this.activeIndex = ''
          //   return
          // }
          // this.activeIndex = index
          this.activeIndex = event.mp.detail
          break
      }
    },
    check (event) {
      this.active = event.detail
    },
    tabChange (value, index) {
      console.log('value', value.mp.detail)
      if (index === 1) {
        this.text1 = value.mp.detail
        this.text2 = this.$options.data().text2
        this.text5 = this.$options.data().text5
      }
      if (index === 2) {
        this.text2 = value.mp.detail
        this.text1 = this.$options.data().text1
        this.text5 = this.$options.data().text5
      }
      if (index === 5) {
        this.text5 = value.mp.detail
        this.text1 = this.$options.data().text1
        this.text2 = this.$options.data().text2
      }
    }
  }
}
</script>

<style scoped lang="scss">
.img{
  width:40px;
  height:40px;
}
.big{
  font-size:18px;
}
.accountBook{
  background:rgb(49, 49, 49);
  // background:yellow;
  color:#fff;
  height:calc(100vh - 50Px);
  overflow-y: scroll;
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
  >>>.body {
    .van-cell {
      background:rgba(15, 15, 15, 0.5);
      color:#fff;
      &:after{
        right:0;
        left:0;
        border-bottom: 0;
      }
    }
    .van-collapse-item__content {
      background:rgba(29, 28, 28, 0.5);
      color:#fff;
      padding:0;
    }
    .custom-class {
      font-size: 16px;
      .title{
        display: flex;
        .title-year {
          font-size: 18px;
          line-height: 40px;
        }
        .title-surplus {
          margin-left: 20px;
          .surplus-show{
            font-size:12px;
            height:20px;
            .surplus-big{
              font-size:16px;
            }
          }
          .surplus-income{
            font-size:12px;
            height:20px;
          }
        }
      }
      .subCustom-class{
        font-size:14px;
        .subTitle-month{
          font-size:18px;
        }
        .subTitle-surplus{
          margin-left: 20px;
        }
      }
      .subTitle-row{
        font-size:12px;
        .subTitle-text{
          line-height:45px;
          font-size:18px;
        }
        .day{
          font-size:16px;
        }
        .van-col{
        }
      }
    }
  }
  >>>.tabs{ //弹框组件
    position: fixed;
    bottom:0;
    width:100vw;
    .van-dropdown-menu{
      background:rgba(49, 49, 49, 0.5);
      .van-dropdown-menu__title{
        color:#fff;
        ._van-dropdown-item{
          background:yellow;
        }
      }
    }
  }
}
</style>