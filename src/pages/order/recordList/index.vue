<template>
  <div class="order-record-list">

    <scroll-view
      v-if="dayList.length"
      scroll-y="true"
      lower-threshold="50"
      @scrolltolower="onLoad"
      class="record-list"
    >
      <order-list
        v-for="(item, index) in dayList"
        :key="index"
        :fatherIndex="index"
        :dayDetail="item"
        @deleteOrder="deleteOrder"
      />
    </scroll-view>

    <van-empty v-else description="暂无记录" />

    <!-- <loading :show="isLoadingShow" /> -->

    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <van-notify id="van-notify" />

  </div>
</template>

<script>
import Dialog from '@/../static/vant/dialog/dialog'
import Toast from '@/../static/vant/toast/toast'
import Notify from '@/../static/vant/notify/notify'
import orderList from '@/components/order/orderList'
import { timeInterval } from '@/utils/constants'
import { sendDateTime } from '@/utils/common'
import { fetchDelOrder, fetchOrderList } from '@/api/order'
// import Loading from '@/components/common/Loading'
export default {
  name: 'RecordList',
  components: { orderList },
  data () {
    return {
      key: true,
      isLoadingShow: false,
      canScrolltolower: true,
      activeNames: [],
      dayList: [],
      loading: false,
      pageObj: {
        limit: 5,
        page: 0
      },
      timeInterval: timeInterval.DAY
    }
  },
  onLoad (option) {
    this.titleLeft = this.getTitleLeft(option.timeInterval)
    wx.setNavigationBarTitle({
      title: this.titleLeft
    })
    this.canScrolltolower = true
    this.timeInterval = option.timeInterval
    this.onLoad()
  },
  onUnload () {
    this.resetData()
  },
  // async mounted () {
  //   this.onLoad()
  // },
  methods: {
    // 离开页面重置数据
    resetData () {
      this.pageObj = {
        limit: 5,
        page: 0
      }
      this.loading = false
      this.isLoadingShow = false
      this.canScrolltolower = true
      this.dayList = []
    },
    back () {
      wx.navigateBack()
    },

    /**
     * 删除记录确认弹框
     */
    deleteOrder (id, indexArr) {
      Dialog.confirm({
        title: '确定删除吗？'
      }).then(() => {
        this.deleteConfirm(id, indexArr)
      }).catch(() => {
        // on cancel
      })
    },

    /**
     * 确认删除
     */
    deleteConfirm (id, indexArr) {
      let arr = [1, 2, 3]
      arr.splice(0, 1)
      this.isLoadingShow = true
      fetchDelOrder(id).then(() => {
        Notify({ type: 'success', message: '删除成功！' })
        // 循环遍历，删除对用下标元素
        this.dayList.find((item, index) => {
          if (index === indexArr[0]) {
            if (item.list.length === 1) {
              let temp = JSON.parse(JSON.stringify(this.dayList))
              // 如果子列表长度为1，则直接删除父元素
              temp.splice(index, 1)
              this.dayList = temp
            } else {
              let temp = JSON.parse(JSON.stringify(this.dayList))
              // 如果子列表长度不为1，则删除对应下标元素
              temp[index].list.splice(indexArr[1], 1)
              this.dayList = temp
            }
          }
          return index === indexArr[0]
        })
      }).finally(() => { this.isLoadingShow = false })
    },

    /**
     * 上拉加载更多
     */
    onLoad () {
      if (!this.canScrolltolower) return
      console.log(123)
      if (!this.key) return
      this.key = false
      this.loading = true
      const { startTime, endTime } = this.getTimeInterval(this.timeInterval)
      fetchOrderList({
        startTime: startTime,
        endTime: endTime,
        limit: this.pageObj.limit,
        page: ++this.pageObj.page
      }).then(res => {
        this.key = true
        this.dayList = [...this.dayList, ...res]
        this.dayList.forEach(res => {
          res.list.forEach(item => {
            item.createTime = item.createTime.slice(-8, -3)
          })
        })
        // 加载完所有数据，标记完成
        if (res.length < this.pageObj.limit) this.canScrolltolower = false
      }).catch(() => {
        console.log('rror')
        this.key = true
        Toast.fail('加载失败！')
      })
    },

    /**
     * 获取时间间隔
     * @param {string} type - 时间间隔类型
     */
    getTimeInterval (type) {
      let [startTime, endTime] = [null, sendDateTime(new Date(), 'yyyy-MM-dd')]
      const date = new Date()
      switch (type) {
        case timeInterval.DAY:
          startTime = sendDateTime(new Date(), 'yyyy-MM-dd')
          break
        case timeInterval.WEEK: {
          const temp = date.getDay()
          startTime = sendDateTime(new Date(+new Date() - temp * 86400000), 'yyyy-MM-dd')
          break
        }
        case timeInterval.MONTH:
          startTime = sendDateTime(new Date(+new Date() - (date.getDate() - 1) * 86400000), 'yyyy-MM-dd')
          break
        case timeInterval.YEAR:
          startTime = `${date.getFullYear()}-01-01`
          break
        default:
          startTime = sendDateTime(new Date(), 'yyyy-MM-dd')
          break
      }
      return { startTime, endTime }
    },

    /**
     * 获取页面左上角标题
     * @param {string} type - 时间间隔类型(今天：'DAY', 本周：'WEEK'，本月：'MONTH'，今年：'YEAR')
     */
    getTitleLeft (type) {
      let titleLeft = ''
      // console.log(str, timeInterval.DAY, this.$route.params)
      switch (type) {
        case timeInterval.DAY:
          titleLeft = sendDateTime(new Date(), 'yyyy.MM.dd')
          break
        case timeInterval.WEEK: {
          const day = new Date().getDay()
          const startDay = sendDateTime(+new Date() - (day * 24 * 60 * 60), 'yyyy.MM.dd')
          const endDay = sendDateTime(+new Date() + ((7 - day) * 24 * 60 * 60), 'MM.dd')
          titleLeft = `${startDay}-${endDay}`
          break
        }
        case timeInterval.MONTH:
          titleLeft = sendDateTime(new Date(), 'yyyy.MM')
          break
        case timeInterval.YEAR:
          titleLeft = `${new Date().getFullYear()}`
          break
      }
      return titleLeft
    }
  }
}
</script>

<style lang="scss" scoped>
#van-toast {
  width: 30vw;
}
.record-title {
  .van-cell {
    padding: 0;
  }
  .record-title-left {
    :first-child {
      font-size: 20px;
    }
    :last-child {
      font-size: 12px;
      color: #969799;
    }
  }
}
.record-list {
  height: 100vh;
}
</style>
