<template>
  <div>
    <h4 class="public_title">签约合同列表</h4>
    <contract-filter
      :isSearching="isSearching"
      @conditionSelected="onconditionSelected($event)"></contract-filter>
    <table class="table table-bordered" v-loading="isSearching">
      <thead>
        <tr>
          <th>合同编号</th>
          <th>签约客户姓名</th>
          <th>签约客户电话</th>
          <th>加盟品牌</th>
          <th>合同状态</th>
          <th>合同类型</th>
          <th>应收款</th>
          <th>实收金额</th>
          <th>招商尾款</th>
          <th>首日收款金额</th>
          <th>所属区域</th>
          <th>商务经理</th>
          <th>签约日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody v-if="pagination">
        <tr v-for="(item, index) in pagination.items" :key="index">
          <td class="contract_no" @click="selectedContract(item)">{{item.contract_no}}</td>
          <td>{{item.client_name}}</td>
          <td>{{item.client_phone}}</td>
          <td>{{item.brand_signed_name}}</td>
          <td>{{item.contract_status | contractStatus}}</td>
          <td>{{item.contract_type | contractType}}</td>
          <td>{{item.brand_amount_fee}}</td>
          <td>{{item.brand_actual_income_fee}}</td>
          <td>{{item.brand_unfinished_fee}}</td>
          <td>{{item.brand_signing_fee}}</td>
          <td>{{item.company_belong_region | regionType}}</td>
          <td>{{item.bus_manager_name}}</td>
          <td>{{item.contract_signing_time | datex}}</td>
          <td>
            <el-button v-show="item.contract_status === 1" size="mini" type="primary"
              @click="writeCollection(item)">录入收款</el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination.sync="pagination" @current-page="pageSelected"></Pagination>
  </div>
</template>

<script>
import { contractService } from '../../../services/api.js'
import contractFilter from '../../shared/contractFilter.vue'
import condition from '../../shared/mixins/contract-condition.js'
export default {
  name: 'contract-list',
  components: {
    contractFilter
  },
  mixins: [condition],
  data () {
    return {
      isSearching: false,
      pagination: {}

    }
  },
  created () {
    this.getContractList()
  },
  methods: {
    getContractList () {
      this.isSearching = true
      contractService.getContractList(this.pagination.currentPage, this.condition).then(pagination => {
        this.pagination = pagination
        this.isSearching = false
      }).catch(() => {
        this.isSearching = false
      })
    },
    onconditionSelected (condition) {
      this.condition = condition
      this.getContractList()
    },
    selectedContract (item) {
      this.$router.push({name: 'contract-view', params: {id: item.id}})
    },
    writeCollection (item) {
      this.$router.push({name: 'contract-record-new', params: {id: item.id}})
    },
    pageSelected (page) {
      this.getContractList()
    }
  }
}
</script>

<style scoped>
  .contract_no {
    color: #409EFF;
    cursor: pointer;
  }
  .contract_no:hover {
    background-color: rgba(0, 0, 0, 0.075);
  }
</style>
