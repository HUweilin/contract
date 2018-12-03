<template>
  <div>
    <h4 class="public_title">待签约客户<template v-if="pagination.total"> (共{{pagination.total}}个)</template></h4>
    <contract-filter
      :isShowPushDate="true"
      :isShowContract="false"
      :autoSearch="true"
      @conditionChanged="onConditionChanged($event)"></contract-filter>
    <table class="table table-bordered table-hover" v-loading="isSearching">
      <thead>
        <tr>
          <th>编号</th>
          <th>所属区域</th>
          <th>商务经理</th>
          <th>商务部门</th>
          <th>签约客户姓名</th>
          <th>签约客户电话</th>
          <th>加盟品牌</th>
          <th>加盟店型</th>
          <th>电销客户姓名</th>
          <th>提交日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody v-if="pagination">
        <tr v-for="(item, index) in pagination.items" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.company_belong_region | regionType}}</td>
          <td>{{item.bus_manager_name}}</td>
          <td>{{item.bus_department_name}}</td>
          <td>{{item.client_name}}</td>
          <td>{{item.client_phone}}</td>
          <td>{{item.brand_signed_name}}</td>
          <td>{{item.shop_signed_type | shopType}}</td>
          <td>{{item.phone_service_name}}</td>
          <td>{{item.contract_bus_add_time | datex}}</td>
          <td>
            <el-button
              size="mini"
              type="primary"
              @click="writeContract(index, item)">录入合同</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(index, item)">打回资料</el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination.sync="pagination" @current-page="pageSelected"></Pagination>
  </div>
</template>

<script>
import { notSignedService } from '../../services/api.js'
import contractFilter from '../shared/contractFilter.vue'
import condition from '../shared/mixins/contract-condition.js'
export default {
  name: 'not-signed-list',
  mixins: [condition],
  components: {
    contractFilter
  },
  data () {
    return {
      isSearching: false,
      pagination: {}
    }
  },
  created () {
    this.getNotSigendList()
  },
  methods: {
    getNotSigendList () {
      this.isSearching = true
      notSignedService.getNotSigendList(this.pagination.currentPage, this.condition).then(pagination => {
        this.pagination = pagination
        this.isSearching = false
      }).catch(() => {
        this.isSearching = false
      })
    },
    onConditionChanged (condition) {
      this.condition = condition
      this.getNotSigendList()
    },
    pageSelected (page) {
      this.getNotSigendList()
    },
    writeContract (index, item) {
      this.$router.push({name: 'contract-write', params: {id: item.id}})
    },
    handleDelete (index, item) {
      let that = this
      this.$confirm(`确定要打回商务经理【${item.bus_manager_name}】提交的合同资料?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        notSignedService.deleteClient(item.id).then(res => {
          that.$message({
            type: 'success',
            message: '打回成功!'
          })
          that.getNotSigendList()
        })
      })
    }
  }
}
</script>

<style scoped>
  .el-button+.el-button {
    margin: 0;
  }
</style>
