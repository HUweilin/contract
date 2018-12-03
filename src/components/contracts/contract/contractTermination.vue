<template>
  <div class="termination-wrapper">
    <h4 class="public_title">{{title}}</h4>
    <div class="form">
      <record-list :contract="contract" :isViewPage="true" :isTermination="true"></record-list>
      <record-form :isTerminationRecord="true" :isLoading="isLoading" @on-cancel="goBack" @on-submit="addNewRecord"></record-form>
    </div>
  </div>
</template>

<script>
import { contractService } from '../../../services/api.js'
export default {
  name: 'contract-termination',
  data () {
    return {
      contract: {},
      title: '',
      contractID: '',
      routeName: '',
      funcName: '',
      isLoading: false
    }
  },
  created () {
    this.contractID = this.$route.params.id
    this.routeName = this.$route.name
    if (this.routeName === 'contract-change-termination') {
      this.title = '变更终止合同'
      this.funcName = ['terminateContractOfChange']
    } else {
      this.title = '取消终止合同'
      this.funcName = ['terminateContractOfCancel']
    }
    this.getContract()
  },
  methods: {
    getContract () {
      contractService.getContract(this.contractID).then(contract => {
        this.contract = contract
      })
    },
    goBack () {
      this.$router.push({name: 'contract-view', params: {id: this.contractID}})
    },
    addNewRecord (record) {
      this.isLoading = true
      record.id = this.contractID
      contractService[this.funcName](record).then(res => {
        this.$success('终止成功')
        this.$router.push({name: 'contract-view', params: {id: this.contractID}})
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .form {
    margin: 30px 0 30px 30px;
  }
</style>
