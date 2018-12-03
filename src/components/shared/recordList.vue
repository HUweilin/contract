<template>
  <div class="records-wrapper">
    <div class="receivable-amount item" v-if="!isViewPage || isTermination">
     <span class="title">应收金额(小计：品牌使用费 + 管理费 +保证)：</span>
     {{contract.brand_amount_fee}}元
    </div>
    <div class="records item">
      <span class="title">收/退款情况：</span>
      <div class="table-wrapper">
      <table border="1" class="table table-bordered table-hover" v-if="contract.contractLogs">
        <tr>
          <th>序号</th>
          <th>收/退款金额</th>
          <th>扣减费用</th>
          <th class="note">备注</th>
          <th class="time">登记时间</th>
          <th class="time">最后更新时间</th>
          <th v-if="!isViewPage">操作</th>
        </tr>
        <tr v-for="(item, index) in contract.contractLogs" :key="index">
          <td>{{recordLength - index}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.give_fee}}</td>
          <td>{{item.note}}</td>
          <td>{{item.created_at | datex}}</td>
          <td>{{item.updated_at | datex}}</td>
          <td v-if="!isViewPage">
            <el-button size="mini" @click="editRecord(item)">修改</el-button>
          </td>
        </tr>
      </table>
      </div>
    </div>
    <div class="not-paid-amount item">
      <span class="title">待付金额：</span>
      {{contract.brand_unfinished_fee}}
    </div>
    <el-dialog v-if="dialogFormVisible" title="修改收款信息" :visible.sync="dialogFormVisible">
      <div class="dialog-container">
        <record-form v-if="currentEditRecord" :record="currentEditRecord" @on-cancel="onCancel" @on-submit="onSubmit" :isLoading="isLoading"></record-form>
      </div>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'record-list',
  props: {
    contract: {
      type: Object,
      default () {
        return {}
      }
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isViewPage: {
      type: Boolean,
      default: false
    },
    isTermination: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      currentEditRecord: null
    }
  },
  created () {
  },
  methods: {
    editRecord (record) {
      this.dialogFormVisible = true
      this.currentEditRecord = record
    },
    onCancel () {
      this.dialogFormVisible = false
      this.currentEditRecord = null
    },
    onSubmit (record) {
      this.$emit('on-submit', record)
    }
  },
  computed: {
    recordLength () {
      if (this.contract.contractLogs && this.contract.contractLogs.length) {
        return this.contract.contractLogs.length
      }
      return 0
    }
  }
}
</script>

<style scoped>
  .records-wrapper .title {
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
  }
  .item {
    margin: 15px 0;
  }
  .table-wrapper {
    margin-left: 20px;
    margin-top: 15px;
  }
  .note {
    max-width: 340px;
  }
  td, th {
    padding: 2px;
  }
  .dialog-container .record-wrapper {
    margin: 0 auto;
    width: 100%;
  }
  .dialog-footer {
    display: none;
  }
</style>
