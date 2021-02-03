<template>
  <div class="order-add-form">

    <!-- S 表单部分 -->
    <div>
      <van-cell title-width="68vw" value=" " size="large">
        <view slot="title">
          <input
            :value="money"
            @input="moneyChange"
            placeholder="0.00"
            type="digit"
            maxlength="10"
            focus="true"
            class="weui-input money-input"
          />
        </view>
        <view slot="right-icon">
          <van-uploader
            class="upload"
            accept="image"
            @afterRead="afterRead"
            @oversize="oversize"
            @delete="deleteImg"
            :file-list="uploadImg"
            :deletable="true"
            preview-size="76rpx"
            :max-count="1"
            max-size="10240000"
          />
        </view>
      </van-cell>

      <!-- /分类选择列表 -->
      <van-cell title-width="68vw" value="分类" is-link>
        <view slot="title">
          <input
            :value="classifyValue"
            @click="selectClassifyType"
            class="weui-input"
            disabled
          />
        </view>
      </van-cell>

      <!-- /账户选择列表 -->
      <van-cell title-width="68vw" value="账户" is-link>
        <view slot="title">
          <input
            :value="accountType[1]"
            @click="selectAccountType"
            class="weui-input"
            disabled
          />
        </view>
      </van-cell>

      <!-- /时间选择器 -->
      <van-cell title-width="68vw" value="时间" is-link>
        <view slot="title">
          <input
            :value="changeTime"
            @click="selectTime"
            class="weui-input"
            disabled
          />
        </view>
      </van-cell>

      <!-- /成员选择列表 -->
      <van-cell title-width="68vw" value="成员" is-link>
        <view slot="title">
          <input
            :value="memberType[1]"
            @click="selectMemberType"
            class="weui-input"
            disabled
          />
        </view>
      </van-cell>

      <!-- /项目选择列表 -->
      <van-cell title-width="68vw" value="项目" is-link>
        <view slot="title">
          <input
            :value="projectType[1]"
            @click="selectProjectType"
            class="weui-input"
            disabled
          />
        </view>
      </van-cell>

      <!-- /备注 -->
      <van-cell title-width="68vw" value="备注" is-link>
        <view slot="title">
          <input
            :value="remark"
            @input="remakeChange"
            class="weui-input"
            placeholder="..."
          />
        </view>
      </van-cell>

    </div>
    <!-- E 表单部分 -->

    <!-- S 支付类型选择器 -->
    <van-popup
      :show="isClassifyTypePickerShow"
      position="bottom"
      custom-style="height: 50%;"
      @close="isClassifyTypePickerShow = false"
    >
      <span v-show="isclassifyTypeBtnShow" @click="() => {
        isClassifyTypePickerShow = false
        orderType ? addSelect(dictType.INCOME_TYPE) : addSelect(dictType.PAY_TYPE)
      }" class="add-select-btn">+ 添加分类</span>
      <van-picker
        show-toolbar
        :columns="classifyTypeColumns"
        @change="(event) => { change('classifyType', event) }"
        @cancel="isClassifyTypePickerShow = false"
        @confirm="classifyTypeOnConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- E 支付类型选择器 -->

    <!-- S 账户类型选择器 -->
    <van-popup
      :show="isAccountTypePickerShow"
      position="bottom"
      custom-style="height: 40%;"
      @close="isAccountTypePickerShow = false"
    >
      <span v-show="isaccountTypeBtnShow" @click="() => {
        isAccountTypePickerShow = false
        addSelect(dictType.ACCOUNT_TYPE)
      }" class="add-select-btn">+ 添加账号</span>
      <van-picker
        show-toolbar
        :columns="accountTypeColumns"
        @change="(event) => { change('accountType', event) }"
        @cancel="isAccountTypePickerShow = false"
        @confirm="accountOnConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- E 账户类型选择器 -->

    <!-- S 成员类型选择器 -->
    <van-popup
      :show="isMemberTypePickerShow"
      position="bottom"
      custom-style="height: 40%;"
      @close="isMemberTypePickerShow = false"
    >
      <span v-show="ismemberTypeBtnShow" @click="() => {
        isMemberTypePickerShow = false
        addSelect(dictType.MEMBER_TYPE)
      }" class="add-select-btn">+ 添加成员</span>
      <van-picker
        show-toolbar
        :columns="memberTypeColumns"
        @change="(event) => { change('memberType', event) }"
        @cancel="isMemberTypePickerShow = false"
        @confirm="memberOnConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- E 成员类型选择器 -->

    <!-- S 项目类型选择器 -->
    <van-popup
      :show="isProjectTypePickerShow"
      position="bottom"
      custom-style="height: 40%;"
      @close="isProjectTypePickerShow = false"
    >
      <span v-show="isprojectTypeBtnShow" @click="() => {
        isProjectTypePickerShow = false
        addSelect(dictType.PROJECT_TYPE)
      }" class="add-select-btn">+ 添加项目</span>
      <van-picker
        show-toolbar
        :columns="projectTypeColumns"
        @change="(event) => { change('projectType', event) }"
        @cancel="isProjectTypePickerShow = false"
        @confirm="projectOnConfirm"
      >
      </van-picker>
    </van-popup>
    <!-- E 项目类型选择器 -->

    <!-- S 时间选择器 -->
    <van-popup
      :show="isDatePickerShow"
      position="bottom"
      custom-style="height: 40%;"
      @close="isDatePickerShow = false"
    >
      <!-- <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="new Date(2020, 0, 1)"
        :max-date="new Date(2025, 10, 1)"
      /> -->
      <van-datetime-picker
        type="datetime"
        :value="currentDate"
        @change="onChangeTime"
        @confirm="confirmTime"
        @cancel="cancel"
      />
    </van-popup>
    <!-- E 时间选择器 -->

    <van-notify id="van-notify" />
    <!-- 用于压缩图片 -->
    <canvas canvas-id="canvas" :style="{ width: cWidth + 'px', height: cHeight + 'px', position: 'absolute', left: '-2000px', top: '-2000px'}"></canvas>

  </div>
</template>

<script>
import { sendDateTime } from '@/utils/common'
import { fetchDictList } from '@/api/common'
import { dictType } from '@/utils/constants'
import Notify from '@/../static/vant/notify/notify'
export default {
  name: 'orderAddForm',
  props: {
    orderType: {
      type: Number,
      defult: 0
    }
  },
  data () {
    return {
      dictType: dictType,
      isClassifyTypePickerShow: false,
      isAccountTypePickerShow: false,
      isMemberTypePickerShow: false,
      isProjectTypePickerShow: false,
      isDatePickerShow: false,
      uploadImg: [],
      money: '',
      classifyType: '',
      accountType: '',
      memberType: '',
      projectType: '',
      currentDate: +new Date(),
      remark: '',
      img: null,
      changeTime: sendDateTime(new Date(), 'yyyy/MM/dd hh:mm:ss'),
      classifyTypeData: [],
      accountTypeData: [],
      memberTypeData: [],
      classifyTypeColumns: [],
      accountTypeColumns: [],
      memberTypeColumns: [],
      projectTypeColumns: [],
      classifyTypeList: [],
      accountTypeList: [],
      memberTypeList: [],
      projectTypeList: [],
      isclassifyTypeBtnShow: false,
      isaccountTypeBtnShow: false,
      ismemberTypeBtnShow: false,
      isprojectTypeBtnShow: false,
      // 压缩后图片尺寸
      cWidth: 0,
      cHeight: 0
    }
  },
  computed: {
    classifyValue: function () {
      return `${this.classifyType[0]} < ${this.classifyType[1]}`
    },
    formData: function () {
      const { money, classifyType, accountType, changeTime, memberType, projectType, remark } = this
      return {
        classifyType: classifyType[1],
        accountType: accountType[1],
        memberType: memberType[1],
        projectType: projectType[1],
        date: changeTime,
        money,
        remark
      }
    }
  },
  watch: {
    formData: function (value) {
      this.$emit('getFormData', value, this.img)
    },
    img: function (value) {
      this.$emit('getFormData', this.formData, value)
    }
  },
  onLoad () {
    this.setSelectData()
  },
  methods: {
    resetData () {
      this.uploadImg = []
      this.money = ''
      this.memberType = ''
      this.projectType = ''
      this.currentDate = +new Date()
      this.remark = ''
      this.img = null
    },
    moneyChange (e) {
      this.money = e.target.value
    },
    remakeChange (e) {
      this.remark = e.target.value
    },
    /**
     * 获取数据字典数据，并返回选择器所需数据
     * @type 数据字典类型
     */
    async getDataList (type) {
      const res = await fetchDictList(type)
      if (!res.length) return
      const list = []
      let texts = [res[0].dictName, res[0].childs[0].dictName]
      res.forEach(item => {
        list[item.dictName] = Array.from(item.childs.map(temp => temp.dictName))
      })
      let columns = [{
        values: Object.keys(list),
        className: 'column1'
      },
      {
        values: list[res[0].dictName],
        className: 'column2'
      }]
      // 对不同picker插件设置默认值
      switch (type) {
        case dictType.ACCOUNT_TYPE:
          if (this.orderType === 1) {
            // 收入
            columns[1].values = list[res[2].dictName]
            columns[0].defaultIndex = 2
            columns[1].defaultIndex = 0
            texts = [res[2].dictName, res[2].childs[0].dictName] // 默认金融账户-银行卡
          } else {
            columns[1].values = list[res[3].dictName]
            columns[0].defaultIndex = 3
            columns[1].defaultIndex = 2
            texts = [res[3].dictName, res[3].childs[2].dictName] // 默认虚拟账户-现金
          }
          break
        default:
          break
      }
      return { texts, list, columns }
    },

    /**
     * 初始化选择列表数据
     */
    async setSelectData () {
      // 初始化收入/支出选择插件数据
      let classifyTypeData = null
      if (this.orderType) {
        classifyTypeData = await this.getDataList(dictType.INCOME_TYPE)
      } else {
        classifyTypeData = await this.getDataList(dictType.PAY_TYPE)
      }
      this.setData(classifyTypeData, 'classifyType')
      this.classifyType = classifyTypeData.texts
      // 设置选择插件添加按钮的初始显示状态
      this.isclassifyTypeBtnShow = classifyTypeData.list[Object.keys(classifyTypeData.list)[0]].length <= 2

      // 初始化账号选择插件数据
      const accountTypeData = await this.getDataList(dictType.ACCOUNT_TYPE)
      this.setData(accountTypeData, 'accountType')
      this.accountType = accountTypeData.texts
      // 设置选择插件添加按钮的初始显示状态
      this.isaccountTypeBtnShow = accountTypeData.list[Object.keys(accountTypeData.list)[0]].length <= 2

      // 初始化成员选择插件数据
      const memberTypeData = await this.getDataList(dictType.MEMBER_TYPE)
      this.setData(memberTypeData, 'memberType')
      this.memberType = []
      // 设置成员选择插件添加按钮的初始显示状态
      this.ismemberTypeBtnShow = memberTypeData.list[Object.keys(memberTypeData.list)[0]].length <= 2

      // 初始化项目选择插件数据
      const projectTypeData = await this.getDataList(dictType.PROJECT_TYPE)
      this.setData(projectTypeData, 'projectType')
      this.projectType = projectTypeData.texts
      // 设置成员选择插件添加按钮的初始显示状态
      this.isprojectTypeBtnShow = projectTypeData.list[Object.keys(projectTypeData.list)[0]].length <= 2
    },
    setData (data, name) {
      this[`${name}List`] = data.list
      this[`${name}Columns`] = data.columns
    },

    /**
     * picker插件选择更改事件
     */
    change (type, event) {
      const { value } = event.target
      const list = this[`${type}List`][value[0]]
      const index = list.indexOf(value[1])
      this[`is${type}BtnShow`] = (index >= list.length - 2) || list.length <= 2
      let temp = JSON.parse(JSON.stringify(this[`${type}Columns`]))
      temp[1].values = this[`${type}List`][value[0]]
      this[`${type}Columns`] = temp
    },

    async afterRead (event) {
      let _this = this
      const imgUrl = event.target.file.url
      // 根据图片链接获取图片尺寸
      wx.getImageInfo({
        src: imgUrl,
        success: function (res) {
          let width = res.width
          let height = res.height
          // 计算图片尺寸，宽度设置在500～750之间
          while (width > 750) {
            if (width > 1000) {
              width = Math.floor(width / 2)
              height = Math.floor(height / 2)
            } else {
              width = Math.floor(width / 1.5)
              height = Math.floor(height / 1.5)
            }
          }
          _this.cWidth = width
          _this.cHeight = height
          _this.createScreenCanvas(imgUrl, width, height)
        }
      })
    },
    // 生成压缩图片
    createScreenCanvas (imgUrl, canvasWidth, canvasHeight) {
      let _this = this
      var ctx = wx.createCanvasContext('canvas')
      ctx.drawImage(imgUrl, 0, 0, canvasWidth, canvasHeight)
      ctx.draw(false, setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'canvas',
          destWidth: canvasWidth,
          destHeight: canvasHeight,
          success: function (res) {
            _this.img = res.tempFilePath
            _this.uploadImg.push({ url: imgUrl, name: 'picture' })
          },
          fail: function (res) {
            console.log('图片信息错误', res.errMsg)
          }
        })
      }, 100))
    },
    oversize () {
      Notify({ type: 'success', message: '上传图片不能超过1M！' })
    },
    deleteImg (e) {
      const index = e.mp.detail.index
      this.img = null
      this.uploadImg.splice(index, 1)
    },
    onClose () {
      this.isClassifyTypePickerShow = false
    },
    selectClassifyType () {
      this.isClassifyTypePickerShow = true
    },
    selectAccountType () {
      this.isAccountTypePickerShow = true
    },
    selectMemberType () {
      this.isMemberTypePickerShow = true
    },
    selectProjectType () {
      this.isProjectTypePickerShow = true
    },
    selectTime () {
      this.isDatePickerShow = true
    },
    onChangeTime (event) {
      // const value = event.getValues()
      // this.changeTime = `${value[0]}-${value[1]}-${value[2]} ${value[3]}:${value[4]}:00`
    },
    confirmTime (date) {
      this.changeTime = sendDateTime(date.mp.detail, 'yyyy/MM/dd hh:mm:ss')
      this.isDatePickerShow = false
    },
    cancel () {
      this.isDatePickerShow = false
    },
    classifyTypeOnConfirm (event) {
      const { value } = event.target
      this.classifyType = value
      this.isClassifyTypePickerShow = false
    },
    accountOnConfirm (event) {
      const { value } = event.target
      this.accountType = value
      this.isAccountTypePickerShow = false
    },
    memberOnConfirm (event) {
      const { value } = event.target
      this.memberType = value
      this.isMemberTypePickerShow = false
    },
    projectOnConfirm (event) {
      const { value } = event.target
      this.projectType = value
      this.isProjectTypePickerShow = false
    },
    addSelect (dictType) {
      wx.navigateTo({ url: `/pages/dictionary/main?dictType=${dictType}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.money-container {
  padding: 10px 16px;
}
.money-input {
  height: 76rpx;
  color: #07c160;
}
.datePicker {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
}
// .order-add-form {
//   /deep/ .van-uploader__upload {
//     margin: 0;
//   }
//   /deep/ .van-uploader__preview {
//     margin: 0!important;
//     overflow: hidden;
//   }
// }
.add-select-btn{
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 50vw;
  text-align: center;
  color: orange;
  line-height: 2.8em;
}
</style>
