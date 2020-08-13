<template>
  <div class="order-add-form">

    <!-- S 表单部分 -->
    <div>
      12345
      <span>12312314</span>
      <!-- <van-field
        type="number"
        maxlength="8"
        :formatter="filterMoney"
        format-trigger="onBlur"
        v-model="money"
        placeholder="0.00"
        :autofocus="true"
        size="lager"
        class="money-input"
        custom-style="color: green;"
      >
        <van-uploader
          slot="button"
          :after-read="afterRead"
          :oversize="oversize"
          v-model="uploadImg"
          preview-size="38px"
          max-count="1"
          max-size="1024000"
        />
      </van-field> -->
      <!-- /金额输入框 -->

      <!-- <van-field
        :value="`${classifyType[0]} < ${classifyType[1]}`"
        @click="selectClassifyType"
        label="分类"
        label-width="36px"
        is-link
        clickable
        readonly
        left-icon="like-o"
      /> -->
      <!-- /分类选择列表 -->

      <!-- <van-field
        :value="accountType[1]"
        @click="selectAccountType"
        label="账户"
        label-width="36px"
        is-link
        clickable
        readonly
        left-icon="like-o"
      /> -->
      <!-- /账户选择列表 -->

      <!-- <van-field
        :value="`${changeTime}`"
        @click="selectTime"
        label="时间"
        label-width="36px"
        is-link
        clickable
        readonly
        left-icon="like-o"
      /> -->
      <!-- /时间选择器 -->

      <!-- <van-field
        :value="memberType[1]"
        @click="selectMemberType"
        label="成员"
        label-width="36px"
        is-link
        clickable
        readonly
        left-icon="like-o"
      /> -->
      <!-- /成员选择列表 -->

      <!-- <van-field
        v-model="remark"
        label="备注"
        label-width="36px"
        left-icon="like-o"
        placeholder="..."
      /> -->
      <!-- /备注 -->

    </div>
    <!-- E 表单部分 -->

    <!-- S 支付类型选择器 -->
    <!-- <van-popup
      v-model="isClassifyTypePickerShow"
      position="bottom"
      custom-style="height: 20%;"
      @close="isClassifyTypePickerShow = false"
    >
      <van-picker
        show-toolbar
        :columns="classifyTypeColumns"
        @change="classifyTypeOnChange"
        @cancel="isClassifyTypePickerShow = false"
        @confirm="classifyTypeOnConfirm"
      >
        <span slot="columns-bottom" v-show="isClassifyBtnShow" @click="() => orderType ? addSelect(dictType.INCOME_TYPE) : addSelect(dictType.PAY_TYPE)" class="add-select-btn">+ 添加分类</span>
      </van-picker>
    </van-popup> -->
    <!-- E 支付类型选择器 -->

    <!-- S 账户类型选择器 -->
    <!-- <van-popup
      v-model="isAccountTypePickerShow"
      position="bottom"
      custom-style="height: 20%;"
      @close="isAccountTypePickerShow = false"
    >
      <van-picker
        show-toolbar
        :columns="accountTypeColumns"
        @change="accountTypeOnChange"
        @cancel="isAccountTypePickerShow = false"
        @confirm="accountOnConfirm"
      >
        <span v-show="isAccountBtnShow" @click="() => addSelect(dictType.ACCOUNT_TYPE)" class="add-select-btn">+ 添加账号</span>
      </van-picker>
    </van-popup> -->
    <!-- E 账户类型选择器 -->

    <!-- S 成员类型选择器 -->
    <!-- <van-popup
      v-model="isMemberTypePickerShow"
      position="bottom"
      custom-style="height: 20%;"
      @close="isMemberTypePickerShow = false"
    >
      <van-picker
        show-toolbar
        :columns="memberTypeColumns"
        @change="memberTypeOnChange"
        @cancel="isMemberTypePickerShow = false"
        @confirm="memberOnConfirm"
      >
        <span v-show="isMemberBtnShow" @click="() => addSelect(dictType.MEMBER_TYPE)" class="add-select-btn">+ 添加成员</span>
      </van-picker>
    </van-popup> -->
    <!-- E 成员类型选择器 -->

    <!-- S 时间选择器 -->
    <!-- <van-popup
      v-model="isDatePickerShow"
      position="bottom"
      custom-style="height: 20%;"
      @close="isDatePickerShow = false"
    >
      <van-datetime-picker
        type="datetime"
        v-model="currentDate"
        @change="onChangeTime"
        @confirm="confirmTime"
        @cancel="cancel"
      />
    </van-popup> -->
    <!-- E 时间选择器 -->

  </div>
</template>

<script>
// import { sendDateTime } from '@/utils/common'
// import { fetchDictList } from '@/api/common'
// import { dictType } from '@/utils/constants'
// import { Toast } from 'vant'

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
      // dictType: dictType,
      // isClassifyTypePickerShow: false,
      // isAccountTypePickerShow: false,
      // isMemberTypePickerShow: false,
      // isDatePickerShow: false,
      // uploadImg: [],
      // money: '',
      // classifyType: '',
      // accountType: '',
      // memberType: '',
      // currentDate: new Date(),
      // remark: '',
      // img: null,
      // changeTime: sendDateTime(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      // classifyTypeData: [],
      // accountTypeData: [],
      // memberTypeData: [],
      // classifyTypeColumns: [],
      // accountTypeColumns: [],
      // memberTypeColumns: [],
      // classifyTypeList: [],
      // accountTypeList: [],
      // memberTypeList: [],
      // isClassifyBtnShow: false,
      // isAccountBtnShow: false,
      // isMemberBtnShow: false
    }
  },
  computed: {
    // formData: function () {
    //   const { money, classifyType, accountType, changeTime, memberType, remark } = this
    //   return {
    //     classifyType: classifyType[1],
    //     accountType: accountType[1],
    //     memberType: memberType[1],
    //     date: changeTime,
    //     money,
    //     remark
    //   }
    // }
  },
  watch: {
    // formData: function (value) {
    //   this.$emit('getFormData', value, this.img)
    // },
    // img: function (value) {
    //   this.$emit('getFormData', this.formData, value)
    // }
  },
  async mounted () {
    // this.setSelectData()
  },
  methods: {
    // /**
    //  * 获取数据字典数据，并返回选择器所需数据
    //  * @type 数据字典类型
    //  */
    // async getDataList (type) {
    //   const res = await fetchDictList(type)
    //   if (!res.length) return
    //   const list = []
    //   const texts = [res[0].dictName, res[0].childs[0].dictName]
    //   res.forEach(item => {
    //     list[item.dictName] = Array.from(item.childs.map(temp => temp.dictName))
    //   })
    //   const columns = [{
    //     values: Object.keys(list),
    //     className: 'column1'
    //   },
    //   {
    //     values: list[res[0].dictName],
    //     className: 'column2',
    //     defaultIndex: 0
    //   }]
    //   return { texts, list, columns }
    // },

    // /**
    //  * 初始化选择列表数据
    //  */
    // async setSelectData () {
    //   // 初始化收入/支出选择插件数据
    //   let classifyTypeData = null
    //   if (this.orderType) {
    //     classifyTypeData = await this.getDataList(dictType.INCOME_TYPE)
    //   } else {
    //     classifyTypeData = await this.getDataList(dictType.PAY_TYPE)
    //   }
    //   this.setData(classifyTypeData, 'classifyType')
    //   this.classifyType = classifyTypeData.texts
    //   // 设置选择插件添加按钮的初始显示状态
    //   this.isClassifyBtnShow = classifyTypeData.list[Object.keys(classifyTypeData.list)[0]].length <= 2

    //   // 初始化账号选择插件数据
    //   const accountTypeData = await this.getDataList(dictType.ACCOUNT_TYPE)
    //   this.setData(accountTypeData, 'accountType')
    //   this.accountType = accountTypeData.texts
    //   // 设置选择插件添加按钮的初始显示状态
    //   this.isAccountBtnShow = accountTypeData.list[Object.keys(accountTypeData.list)[0]].length <= 2

    //   // 初始化成员选择插件数据
    //   const memberTypeData = await this.getDataList(dictType.MEMBER_TYPE)
    //   this.setData(memberTypeData, 'memberType')
    //   this.memberType = []
    //   // 设置选择插件添加按钮的初始显示状态
    //   this.isMemberBtnShow = memberTypeData.list[Object.keys(memberTypeData.list)[0]].length <= 2
    // },
    // setData (data, name) {
    //   this[`${name}List`] = data.list
    //   this[`${name}Columns`] = data.columns
    // },

    // /**
    //  * 分类选择
    //  */
    // classifyTypeOnChange (picker, values) {
    //   const list = this.classifyTypeList[values[0]]
    //   const index = list.indexOf(values[1])
    //   this.isClassifyBtnShow = (index >= list.length - 2) || list.length <= 2
    //   picker.setColumnValues(1, this.classifyTypeList[values[0]])
    // },

    // /**
    //  * 账户选择
    //  */
    // accountTypeOnChange (picker, values) {
    //   const list = this.accountTypeList[values[0]]
    //   const index = list.indexOf(values[1])
    //   this.isAccountBtnShow = (index >= list.length - 2) || list.length <= 2
    //   picker.setColumnValues(1, this.accountTypeList[values[0]])
    // },

    // /**
    //  * 成员选择
    //  */
    // memberTypeOnChange (picker, values) {
    //   const list = this.memberTypeList[values[0]]
    //   const index = list.indexOf(values[1])
    //   this.isMemberBtnShow = (index >= list.length - 2) || list.length <= 2
    //   picker.setColumnValues(1, this.memberTypeList[values[0]])
    // },

    // /**
    //  * 格式化输入金额
    //  */
    // filterMoney (value) {
    //   if (!value) return ''
    //   const num = +value
    //   return num.toFixed(2)
    // },
    // afterRead (event) {
    //   console.log('event')
    //   const formData = new FormData()
    //   formData.append('file', event.file)
    //   this.img = formData
    // },
    // oversize () {
    //   Toast.fail('上传图片不能超过1M')
    // },
    // onClose () {
    //   this.classifyTypeColumns = false
    // },
    // selectClassifyType () {
    //   this.isClassifyTypePickerShow = true
    // },
    // selectAccountType () {
    //   this.isAccountTypePickerShow = true
    // },
    // selectMemberType () {
    //   this.isMemberTypePickerShow = true
    // },
    // selectTime () {
    //   this.isDatePickerShow = true
    // },
    // onChangeTime (event) {
    //   // const value = event.getValues()
    //   // this.changeTime = `${value[0]}-${value[1]}-${value[2]} ${value[3]}:${value[4]}:00`
    // },
    // confirmTime (date) {
    //   this.changeTime = sendDateTime(date, 'yyyy-MM-dd hh:mm:ss')
    //   this.isDatePickerShow = false
    // },
    // cancel () {
    //   this.isDatePickerShow = false
    // },
    // classifyTypeOnConfirm (value, index) {
    //   this.classifyType = value
    //   this.isClassifyTypePickerShow = false
    // },
    // accountOnConfirm (value) {
    //   this.accountType = value
    //   this.isAccountTypePickerShow = false
    // },
    // memberOnConfirm (value) {
    //   this.memberType = value
    //   this.isMemberTypePickerShow = false
    // },
    // addSelect (dictType) {
    //   this.$router.push(`/dictionary-add/${dictType}`)
    // }
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: 38px;
  height: 38px;
}
.money-input {
  font-size: 32px;
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
