<template>
  <div class="record-list">
    <!-- S 标题部分 -->
    <van-cell
      title-class="record-list-left"
      value-class="record-list-right"
      class="list-title float-item"
    >
      <van-row slot="title">{{ dayDetail.date }}</van-row>
      <span>收<span> {{dayDetail.income}}</span></span>
      <span> 支<span> {{dayDetail.pay}}</span></span>
      <span> 余<span> {{dayDetail.income - dayDetail.pay}}</span></span>
    </van-cell>
    <!-- E 标题部分 -->

    <!-- S 列表部分 -->
    <view class="detail-list float-item">
      <van-swipe-cell
        v-for="(detail, index) in dayDetail.list"
        :key="index"
        right-width="60"
      >

        <van-cell
          title-class="detail-list-left"
          :value-class="parseInt(detail.orderType) ? 'income-text' : 'pay-text'"
          @click="() => toDetail(detail.id)"
        >
          <view slot="title">
            <van-row>{{ detail.levelTwoName }}</van-row>
            <van-row>{{detail.createTime}} {{ detail.accountName || '' }} {{detail.memberName || ''}}</van-row>
          </view>
          <span>{{detail.money}}</span>
        </van-cell>

        <van-button
          slot="right"
          @click="$emit('deleteOrder', detail.id, [fatherIndex, index])"
          custom-style="height: 100%"
          square
          type="danger"
        >删除</van-button>

      </van-swipe-cell>
    </view>
    <!-- S 列表部分 -->

  </div>
</template>

<script>
export default {
  props: {
    dayDetail: {
      type: Object
    },
    fatherIndex: {
      type: Number
    }
  },
  methods: {
    toDetail (id) {
      wx.navigateTo({ url: `/pages/order/detail/main?id=${id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.record-list {
  .record-list-left {
    :first-child {
      font-size: 14px;
    }
  }
  .record-list-right {
    & > span {
      color: red;
      span {
        font-size: 10px;
        color: #969799;
      }
    }
    & > span:first-child {
      color: #07c160;
    }
    & > span:last-child {
      color: orange;
    }
  }
}
.detail-list {
  margin: 0 16px;
  padding-bottom: 16px;
  color: #969799;
  /deep/ .van-cell {
    padding-top: 5px;
    padding-bottom: 5px;
    background: #f8f8f8;
  }
  .detail-list-left {
    :first-child {
      font-size: 14px;
    }
    :last-child {
      font-size: 10px;
      color: #969799;
    }
  }
  .deleteBtn {
    height: 100%;
  }
}
.pay-text {
  color: #07c160;
}
.income-text {
  color: red;
}
</style>
