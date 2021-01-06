<template>
  <div class="order-add-form">

    <!-- S 表单部分 -->
    <div>
      <van-field
        type="number"
        maxlength="8"
        :formatter="filterMoney"
        format-trigger="onBlur"
        :value="money"
        @change="inputChange"
        placeholder="0.00"
        :autofocus="true"
        size="lager"
        input-class="money-input"
      >
        <van-uploader
          slot="button"
          accept="image"
          @afterRead="afterRead"
          @oversize="oversize"
          :file-list="uploadImg"
          :deletable="true"
          preview-size="38px"
          :max-count="1"
          max-size="1024000"
        />
      </van-field>
      <!-- /金额输入框 -->

      <van-field
        :value="classifyValue"
        @click="selectClassifyType"
        label="分类"
        label-width="36px"
        is-link
        clickable
        readonly
        left-icon="like-o"
      />
      <!-- /分类选择列表 -->

      <van-field
        :value="accountType[1]"
        @click="selectAccountType"
        label="账户"
        label-width="36px"
        is-link
        clickable
        readonly
        left-icon="like-o"
      />
      <!-- /账户选择列表 -->

      <van-field
        :value="changeTime"
        @click="selectTime"
        label="时间"
        label-width="36px"
        is-link
        clickable
        readonly
        left-icon="like-o"
      />
      <!-- /时间选择器 -->

      <van-field
        :value="memberType[1]"
        @click="selectMemberType"
        label="成员"
        label-width="36px"
        is-link
        clickable
        readonly
        left-icon="like-o"
      />
      <!-- /成员选择列表 -->

      <van-field
        :value="remark"
        @change="remakeChange"
        label="备注"
        label-width="36px"
        left-icon="like-o"
        placeholder="..."
      />
      <!-- /备注 -->

    </div>
    <!-- E 表单部分 -->

    <!-- S 支付类型选择器 -->
    <van-popup
      :show="isClassifyTypePickerShow"
      position="bottom"
      custom-style="height: 50%;"
      @close="isClassifyTypePickerShow = false"
    >
      <span v-show="isclassifyTypeBtnShow" @click="() => orderType ? addSelect(dictType.INCOME_TYPE) : addSelect(dictType.PAY_TYPE)" class="add-select-btn">+ 添加分类</span>
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
      <van-picker
        show-toolbar
        :columns="accountTypeColumns"
        @change="(event) => { change('accountType', event) }"
        @cancel="isAccountTypePickerShow = false"
        @confirm="accountOnConfirm"
      >
        <span v-show="isaccounttypeBtnShow" @click="() => addSelect(dictType.ACCOUNT_TYPE)" class="add-select-btn">+ 添加账号</span>
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
      <van-picker
        show-toolbar
        :columns="memberTypeColumns"
        @change="(event) => { change('memberType', event) }"
        @cancel="isMemberTypePickerShow = false"
        @confirm="memberOnConfirm"
      >
        <span v-show="isMemberBtnShow" @click="() => addSelect(dictType.MEMBER_TYPE)" class="add-select-btn">+ 添加成员</span>
      </van-picker>
    </van-popup>
    <!-- E 成员类型选择器 -->

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
      <!-- <van-datetime-picker
        type="datetime"
        v-model="currentDate"
        @change="onChangeTime"
        @confirm="confirmTime"
        @cancel="cancel"
      /> -->
    </van-popup>
    <!-- E 时间选择器 -->

  </div>
</template>

<script>
import { sendDateTime } from '@/utils/common'
import { fetchDictList } from '@/api/common'
import { dictType } from '@/utils/constants'
import { Toast } from 'vant'
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
      isDatePickerShow: false,
      uploadImg: [],
      money: '',
      classifyType: '',
      accountType: '',
      memberType: '',
      currentDate: new Date(),
      remark: '',
      img: null,
      changeTime: sendDateTime(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      classifyTypeData: [],
      accountTypeData: [],
      memberTypeData: [],
      classifyTypeColumns: [],
      accountTypeColumns: [],
      memberTypeColumns: [],
      classifyTypeList: [],
      accountTypeList: [],
      memberTypeList: [],
      isclassifyTypeBtnShow: false,
      isaccounttypeBtnShow: false,
      ismemberTypeBtnShow: false
    }
  },
  computed: {
    classifyValue: function () {
      return `${this.classifyType[0]} < ${this.classifyType[1]}`
    },
    formData: function () {
      const { money, classifyType, accountType, changeTime, memberType, remark } = this
      return {
        classifyType: classifyType[1],
        accountType: accountType[1],
        memberType: memberType[1],
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
  onUnload () {
    this.resetData()
  },
  methods: {
    resetData () {
      this.uploadImg = []
      this.money = ''
      this.classifyType = ''
      this.accountType = ''
      this.memberType = ''
      this.currentDate = new Date()
      this.remark = ''
      this.img = null
    },
    inputChange (event) {
      this.money = event.mp.detail
    },
    remakeChange (event) {
      this.remark = event.mp.detail
    },
    /**
     * 获取数据字典数据，并返回选择器所需数据
     * @type 数据字典类型
     */
    async getDataList (type) {
      const res = await fetchDictList(type)
      if (!res.length) return
      const list = []
      const texts = [res[0].dictName, res[0].childs[0].dictName]
      res.forEach(item => {
        list[item.dictName] = Array.from(item.childs.map(temp => temp.dictName))
      })
      const columns = [{
        values: Object.keys(list),
        className: 'column1'
      },
      {
        values: list[res[0].dictName],
        className: 'column2',
        defaultIndex: 0
      }]
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
      this.isaccounttypeBtnShow = accountTypeData.list[Object.keys(accountTypeData.list)[0]].length <= 2

      // 初始化成员选择插件数据
      const memberTypeData = await this.getDataList(dictType.MEMBER_TYPE)
      this.setData(memberTypeData, 'memberType')
      this.memberType = []
      // 设置选择插件添加按钮的初始显示状态
      this.ismemberTypeBtnShow = memberTypeData.list[Object.keys(memberTypeData.list)[0]].length <= 2
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

    /**
     * 格式化输入金额
     */
    filterMoney (value) {
      if (!value) return ''
      const num = +value
      return num.toFixed(2)
    },
    async afterRead (event) {
      this.uploadImg.push({ url: event.target.file.path, name: 'picture3' })
      // const res = await fetchFileUpload(event.target.file.path)
      // this.img = JSON.parse(res.data).data.url
      this.img = event.target.file.path
    },
    oversize () {
      Toast.fail('上传图片不能超过1M')
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
    selectTime () {
      this.isDatePickerShow = true
    },
    onChangeTime (event) {
      // const value = event.getValues()
      // this.changeTime = `${value[0]}-${value[1]}-${value[2]} ${value[3]}:${value[4]}:00`
    },
    confirmTime (date) {
      this.changeTime = sendDateTime(date, 'yyyy-MM-dd hh:mm:ss')
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
    addSelect (dictType) {
      console.log('dictType:', dictType)
      wx.navigateTo({ url: `/pages/dictionary/main?dictType=${dictType}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: 38px;
  height: 38px;
}
.datePicker {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
}
.order-add-form {
  /deep/ .van-uploader__upload {
    width: 38px;
    height: 38px;
  }
}
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
