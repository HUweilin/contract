<template>
  <div class="search-op">
    <table class="table table-bordered">
      <tr
        v-if="isShowPushDate">
        <td class="title">提交日期</td>
        <td colspan="7">
          <date-range @dateRangeSelected="onSubmittedDateRange($event)"></date-range>
        </td>
      </tr>
      <tr
        v-if="isShowContract">
        <td class="title">签约日期</td>
        <td colspan="7">
          <date-range
            :isShowOtherRange="true"
            @dateRangeSelected="onSignedDateRange($event)"></date-range>
        </td>
      </tr>
      <tr
        v-if="isShowContract">
        <td class="title">商务经理</td>
        <td>
          <el-input size="mini" type="text" v-model="condition.bus_manager_name"></el-input>
        </td>
        <td class="title">品牌</td>
        <td>
          <Select v-model="condition.brand" :options="brandOption"></Select>
        </td>
        <td class="title">合同类型</td>
        <td>
          <Select v-model="condition.contract_type" :options="contractOption"></Select>
        </td>
        <td class="title">客户姓名</td>
        <td>
          <el-input size="mini" type="text" v-model="condition.client_name"></el-input>
        </td>
      </tr>
      <tr
        v-if="isShowContract">
        <td class="title">客户电话</td>
        <td>
          <el-input size="mini" type="text" v-model="condition.client_phone"></el-input>
        </td>
        <!-- <td class="title">新单类型</td>
        <td>
          <Select v-model="condition.document_type" :options="documentTypes"></Select>
        </td> -->
        <td class="title">合同编号</td>
        <td>
          <el-input size="mini" type="text" v-model="condition.contract_no"></el-input>
        </td>
        <td class="title">余款未付清</td>
        <td colspan="3" class="align-left">
          <el-switch v-model="condition.is_leave_fee"></el-switch>
        </td>
      </tr>
      <tr v-if="!autoSearch">
        <td colspan="8">
          <el-button size="mini" type="primary"
            :loading="isSearching"
            @click="onSubmitCondition">查询</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { brandService } from '../../services/api.js'
import DateRange from './dateRange.vue'
import filter from './mixins/contract-filter-mixin.js'
import { CONTRACT_TYPES, DOCUMENT_TYPES } from '../../utils/constant.js'
export default {
  name: 'contract-filter',
  mixins: [filter],
  components: {
    'date-range': DateRange
  },
  props: {
    isShowPushDate: {
      type: Boolean,
      default: false
    },
    isShowContract: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      brandOption: [],
      contractOption: CONTRACT_TYPES,
      documentTypes: DOCUMENT_TYPES
    }
  },
  created () {
    if (this.isShowContract) {
      this.getBrands()
    }
  },
  methods: {
    getBrands () {
      brandService.getBrands().then(brands => {
        this.brandOption = brands
      })
    },
    onSubmittedDateRange (dateRange) {
      this.condition.push_start = dateRange.startOfDateRange
      this.condition.push_end = dateRange.endOfDateRange
      this.dispatchConditionChangedEvent()
    },
    onSignedDateRange (dateRange) {
      this.condition.time_start = dateRange.startOfDateRange
      this.condition.time_end = dateRange.endOfDateRange
      this.dispatchConditionChangedEvent()
    }
  }
}
</script>

<style scoped>
  .search-op {
    margin: 1rem 0 1rem 0;
  }
  .title {
    font-weight: bold;
  }
  .align-left {
    text-align: left;
  }
</style>
