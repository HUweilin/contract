<template>
  <div class="record-wrapper">
    <el-form ref="record" :model="recordForm" :rules="rules" label-width="124px" label-position="left" size="mini" hide-required-asterisk>
      <el-form-item label="收退款类型：" v-if="isTerminationRecord">
        <el-radio v-model="recordType" :label="0">收款录入</el-radio>
        <el-radio v-model="recordType" :label="1">退款登记</el-radio>
      </el-form-item>
      <el-form-item prop="amount">
        <template slot="label">本次{{recordType ? '退' : '收'}}款金额：</template>
        <el-input-number v-model="recordForm.amount" :controls="false"></el-input-number>
      </el-form-item>
      <el-form-item label="本次扣减费用：" prop="give_fee">
        <el-input-number v-model="recordForm.give_fee" :controls="false"></el-input-number>
      </el-form-item>
      <el-form-item label="备注：" prop="note">
        <el-input type="textarea" v-model="recordForm.note"></el-input>
      </el-form-item>
      <el-form-item label="终止合同备注：" prop="change_account" v-if="isTerminationRecord">
        <el-input type="textarea" v-model="recordForm.change_account"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancel" size="medium" :disabled="isLoading">取消</el-button>
        <el-button type="primary" @click="onSubmit" :loading="isLoading" size="medium">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'record-form',
  props: {
    record: Object,
    isTerminationRecord: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      recordType: 0,
      recordForm: {
        amount: undefined,
        give_fee: null,
        note: ''
      },
      rules: {
        amount: { required: true, message: '请输入金额', trigger: 'blur' }
      },
      submitData: {}
    }
  },
  created () {
    if (this.record) {
      this.recordForm = Object.assign(this.recordForm, this.record)
    }
    if (this.isTerminationRecord) {
      // 若是 取消/终止合同 的 录入款项 增加key
      this.recordForm['change_account'] = null
    }
  },
  methods: {
    onCancel () {
      this.$emit('on-cancel')
    },
    onSubmit () {
      let that = this
      this.$refs.record.validate((validate) => {
        if (validate) {
          // 退款传负值
          this.submitData = Object.assign(this.submitData, this.recordForm)
          if (that.recordType) {
            that.submitData.amount = -that.submitData.amount
          }
          this.$emit('on-submit', that.submitData)
        } else {
          return false
        }
      })
    },
    clearForm () {
      this.recordForm.amount = undefined
      this.recordForm.give_fee = null
      this.recordForm.note = null
      if (this.isTerminationRecord) {
        this.recordForm['change_account'] = null
      }
    }
  }
}
</script>

<style scoped>
.record-wrapper {
  width: 630px;
}
.el-form >>> .el-form-item__label {
  font-size: 16px;
  font-weight: bold;
}
</style>
