<template>
  <div class="dictionary-add">

    <!-- S 标题栏 -->
    <!-- <van-nav-bar
      :title="`新建${title}`"
      left-text="返回"
      left-arrow
      @click-left="back"
    /> -->
    <!-- E 标题栏 -->

    <!-- S 分类列表 -->
    <van-collapse
      :value="activeName"
      @change="activeChange"
      :accordion="true"
    >
      <van-collapse-item
        v-for="(levelOneItem, levelOneIndex) in list"
        :key="levelOneIndex"
        :title="levelOneItem.dictName"
        :name="levelOneIndex"
        class="dict-list-content"
      >
        <!-- 滑块单元 -->
        <van-swipe-cell
          v-for="(levelTwoItem, index) in levelOneItem.childs"
          :key="index"
          right-width="60"
        >
          <van-cell
            :title="levelTwoItem.dictName"
            :center="true"
            class="dict-item"
          />
          <van-button
            slot="right"
            @click="() => { deleteDict(levelTwoItem.dictCode, [levelOneIndex, index]) }"
            class="deleteBtn"
            square
            type="danger"
            text="删除"
          />
        </van-swipe-cell>
        <!-- /二级分类列表 -->

        <van-cell
          @click='() => { add(levelOneItem) }'
          title="+ 新建"
          color="orange"
          :center="true"
          title-class="add-btn"
          :clickable="true"
          class="dict-item"
        />
        <!-- /新增按钮 -->

      </van-collapse-item>
    </van-collapse>
    <!-- E 分类列表 -->

    <!-- S 新建数据字典弹框 -->
    <van-overlay class="overlay" :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="form-container">
          <van-field
            :value="name"
            @change="inputChange"
            label="分类名称"
            placeholder="输入名称"
          />
          <div style="margin: 16px;">
            <van-button @click="onSubmit" round block type="info" native-type="button">新增</van-button>
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- E 新建数据字典弹框 -->

    <van-toast id="van-toast"/>

  </div>
</template>

<script>
import { fetchDictList, fetchAddDict, fetchDelDict } from '@/api/common'
import { dictType, addDictTitle } from '@/utils/constants'
import Toast from '@/../static/vant/toast/toast'

export default {
  name: 'OrderAdd',
  data () {
    return {
      key: true,
      activeName: 0,
      list: [],
      show: false,
      name: '',
      formData: null,
      title: ''
    }
  },
  async onLoad (options) {
    this.list = await fetchDictList(options.dictType)
    this.title = addDictTitle[options.dictType]
  },
  methods: {
    activeChange (event) {
      this.activeName = event.mp.detail
    },
    inputChange (event) {
      console.log(event.mp.detail)
      this.name = event.mp.detail
    },
    add (data) {
      this.show = true
      this.formData = data
    },

    /**
     * 确认新增
     */
    async onSubmit () {
      if (!this.name) return Toast.fail('请输入名称')
      if (this.key) {
        this.key = false
        this.show = false
        const params = {
          dictName: this.name,
          fatherCode: this.formData.dictCode
        }
        fetchAddDict(params).then(async () => {
          Toast.success('添加成功')
          this.key = true
          this.list = await fetchDictList(dictType.PAY_TYPE)
        }).catch(error => {
          console.log('请求列表失败。', error)
          this.key = true
        })
      }
    },

    /**
     * 删除代码字典
     */
    deleteDict (dictCode, indexArr) {
      this.$dialog.confirm({
        title: '确定删除吗？'
      }).then(() => {
        this.deleteConfirm(dictCode, indexArr)
      }).catch(() => {
        // on cancel
      })
    },

    /**
     * 确认删除
     */
    deleteConfirm (dictCode, indexArr) {
      if (this.key) {
        this.key = false
        fetchDelDict(dictCode).then(() => {
          Toast.success('删除成功！')
          this.key = true
          console.log(dictCode, indexArr)
          // 循环遍历，删除对用下标元素
          this.list.find((item, index) => {
            if (index === indexArr[0]) {
              // 删除对应下标元素
              this.list[index].childs.splice(indexArr[1], 1)
            }
            return index === indexArr[0]
          })
        }).catch(() => { this.key = true })
      }
    },

    back () {
      this.$router.back()
    }

  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  color: orange;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  // background: #fff;
}
.form-container {
  background: #fff;
}
.dict-list-content /deep/ .van-collapse-item__content, .dict-item {
  background: #f8f8f8;
}
.deleteBtn {
  height: 100%;
}
</style>
