<template>
  <div class="write-wrapper">
    <h4 class="public_title">录入新收合同款项</h4>
    <div class="form">
      <!-- 所有记录 -->
      <record-list ref="recordList" :contract="contract" @on-submit="editRecord" :isLoading="isEditing"></record-list>
      <!-- 新增 -->
      <record-form ref="recordForm" @on-cancel="goBack" @on-submit="addNewRecord" :isLoading="isCreating"></record-form>
    </div>
  </div>
</template>

<script>
import { contractService, contractRecordService } from '../../../services/api.js'
export default {
  name: 'write-record',
  data () {
    return {
      contract: {},
      contractID: '',
      isCreating: false,
      isEditing: false
    }
  },
  created () {
    this.contractID = this.$route.params.id
    this.getContract()
  },
  methods: {
    getContract () {
      contractService.getContract(this.contractID).then(contract => {
        this.contract = contract
      })
    },
    // 修改收款记录
    editRecord (record) {
      this.isEditing = true
      contractRecordService.editRecord(record).then(res => {
        this.isEditing = false
        this.$refs.recordList['onCancel']()
        this.$success(res.msg)
        this.getContract()
      }).catch(() => {
        this.isEditing = false
      })
    },
    addNewRecord (form) {
      this.isCreating = true
      contractRecordService.createRecord(this.contractID, form).then(res => {
        this.isCreating = false
        this.$success(res.msg)
        this.$refs.recordForm['clearForm']()
        this.getContract()
      }).catch(() => {
        this.isCreating = false
      })
    },
    goBack () {
      this.$router.push({name: 'contract-list'})
    }
  }
}
</script>

<style scoped>
  .public_title {
    margin-bottom: 20px;
  }
  .form {
    margin: 30px 0 30px 30px;
  }
</style>
