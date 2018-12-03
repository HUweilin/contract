<template>
  <el-tabs v-model="currentName" :before-leave="beforeLeave" @tab-remove="removeTab">
    <el-tab-pane
      v-for="(item) in contractTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      :closable="contractTabs.length !== 1"
    >
      <div class="contract-msg" v-if="item.contract">
        <div class="operation">
          <el-button type="primary" size="mini" v-if="contract.contract_relation_before_no" @click="getFrontContract">查看变更前合同</el-button>
          <el-button type="primary" size="mini" v-if="contract.contract_relation_back_no" @click="getNewContract">查看新合同</el-button>
          <el-button type="primary" size="mini" v-if="contract.contract_status === 5 && !contract.contract_relation_back_no" @click="copyContract">复制合同</el-button>
          <el-button v-if="contract.contract_type === 1 && contract.contract_status === 1"
            type="primary" size="mini"
            @click="terminationOfChange">变更终止</el-button>
          <el-button v-if="contract.contract_status === 1"
            type="primary" size="mini"
            @click="terminationOfCancel">取消终止</el-button>
          <el-button v-if="contract.contract_type !== 1 && contract.contract_status === 1"
            type="primary" size="mini" @click="turnToOfficial">转正合同</el-button>
        </div>
        <table class="table">
          <tr class="title">
            <td colspan="3">基本信息</td>
          </tr>
          <tr>
            <td>
              <div class="item">
                <span class="name">商务经理：</span>
                <span class="value">
                  {{contract.bus_manager_name}}
                  <span v-if="contract.bus_department_name">({{contract.bus_department_name}})</span>
                </span>
              </div>
            </td>
            <td>
              <div class="item">
                <span class="name">所属公司：</span>
                <span class="value">
                  {{contract.client_visit_company}}
                </span>
              </div>
            </td>
            <td>
              <div class="item">
                <span class="name">合同状态：</span>
                <span class="value">
                  {{contract.contract_status | contractStatus}}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="item">
                <span class="name">电销经理：</span>
                <span class="value">
                  {{contract.phone_service_name}}
                  <span v-if="contract.phone_service_group">({{contract.phone_service_group}})</span>
                </span>
              </div>
            </td>
            <td>
              <div class="item">
                <span class="name">考察品牌：</span>
                <span class="value">
                  {{contract.brand_inspection_name}}
                </span>
              </div>
            </td>
            <td>
              <div class="item">
                <span class="name">成交方式：</span>
                <span class="value">
                  {{contract.contract_signed_type | signedType}}
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="contract.change_account">
            <td colspan="3">
              <div class="item">
                <span class="name">合同变更说明：</span>
                <span class="value">
                  {{contract.change_account}}
                </span>
              </div>
            </td>
          </tr>
          <tr class="title">
            <td colspan="3">加盟基本信息</td>
          </tr>
          <tr>
            <td>
              <div class="item">
                <span class="name">合同类型：</span>
                <span class="value">
                  {{contract.contract_type | contractType}}
                </span>
              </div>
            </td>
            <td colspan="2">
              <div class="item">
                <span class="name">合同编号：</span>
                <span class="value">
                  {{contract.contract_no}}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="item">
                <span class="name">签约客户姓名：</span>
                <span class="value">
                  {{contract.client_name}}
                </span>
              </div>
            </td>
            <td>
              <div class="item">
                <span class="name">性别：</span>
                <span class="value">
                  {{contract.client_sex | sexType}}
                </span>
              </div>
            </td>
            <td>
              <div class="item">
                <span class="name">年龄：</span>
                <span class="value">
                  {{contract.client_age || '未知'}}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="item">
                <span class="name">联系电话：</span>
                <span class="value">
                  {{contract.client_phone}}
                </span>
              </div>
            </td>
            <td colspan="2">
              <div class="item">
                <span class="name">身份证号码：</span>
                <span class="value">
                  {{contract.client_identity_no}}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div class="item">
                <span class="name">身份证复印件：</span>
                <span class="value">
                  <img v-show="contract.client_identity_copy_url" :src="contract.client_identity_copy_url">
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="item">
                <span class="name">联系地址：</span>
                <span class="value">
                  <region-select :value="contract.client_addr" :isReadOnly="true"></region-select>
                </span>
              </div>
            </td>
            <td colspan="2">
              <div class="item">
                <span class="name">详细地址：</span>
                <span class="value">
                  <span class="value">{{contract.client_addr_detail}}</span>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="item">
                <span class="name">签约品牌：</span>
                <span class="value">
                  {{contract.brand_signed_name}}
                </span>
              </div>
            </td>
            <td colspan="2">
              <div class="item">
                <span class="name">签约店型：</span>
                <span class="value">
                  {{contract.shop_signed_type | shopType}}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="item">
                <span class="name">店面地址：</span>
                <span class="value">
                  <region-select :value="contract.shop_addr" :isReadOnly="true"></region-select>
                </span>
              </div>
            </td>
            <td colspan="2">
              <div class="item">
                <span class="name">店面名称：</span>
                <span class="value">
                  {{contract.shop_name}}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div class="item">
                <span class="name">合同起止日期：</span>
                <span class="value">
                  {{contract.contract_valid_start | datex}} 至 {{contract.contract_valid_end | datex}}
                </span>
              </div>
            </td>
          </tr>
          <tr class="title">
            <td colspan="3">加盟费用相关信息</td>
          </tr>
          <tr>
            <td>
              <div class="item">
                <span class="name">品牌使用费：</span>
                <span class="value">
                  {{contract.brand_use_fee}} 元
                </span>
              </div>
            </td>
            <td>
              <div class="item">
                <span class="name">管理费：</span>
                <span class="value">
                  {{contract.brand_manage_first_fee}} 元
                </span>
              </div>
            </td>
            <td>
              <div class="item">
                <span class="name">保证金：</span>
                <span class="value">
                  {{contract.brand_deposit_fee}} 元
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div class="item">
                <span class="name">应收金额<i>(小计:品牌使用费+管理费+保证)：</i></span>
                <span class="value">
                  {{contract.brand_amount_fee}} 元
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="item">
                <span class="name">签约时付款金额：</span>
                <span class="value">
                  {{contract.brand_signing_fee}} 元
                </span>
              </div>
            </td>
            <td>
              <div class="item">
                <span class="name">是否全款：</span>
                <span class="value">
                  {{contract.is_full_fee | msgTransform}}
                </span>
              </div>
            </td>
            <td>
              <div class="item">
                <span class="name">赠送店面：</span>
                <span class="value">
                  {{contract.shop_give_type | shopType}}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="item">
                <span class="name">扣减费用：</span>
                <span class="value">
                  {{contract.shop_give_eq_fee}} 元
                </span>
              </div>
            </td>
            <td colspan="2">
              <div class="item">
                <span class="name">赠送扣减备注：</span>
                <span class="value">
                  {{contract.shop_give_note}}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="item">
                <span class="name">管理费用(第2年)：</span>
                <span class="value">
                  {{contract.brand_manage_second_fee}} 元
                </span>
              </div>
            </td>
            <td>
              <div class="item">
                <span class="name">管理费用(第3年)：</span>
                <span class="value">
                  {{contract.brand_manage_thirdly_fee}} 元
                </span>
              </div>
            </td>
            <td>
              <div class="item">
                <span class="name">提供资质：</span>
                <span class="value">
                  {{contract.is_provide_qualification | msgTransform}}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div class="item">
                <span class="name">担任代理商：</span>
                <span class="value">
                  {{contract.is_agent | msgTransform}}
                </span>
              </div>
            </td>
          </tr>
          <template v-if="contract.is_agent === 1">
            <tr>
              <td>
                <div class="item">
                  <span class="name">代理授权级别：</span>
                  <span class="value">
                    {{contract.agent_level | agentLevel}}
                  </span>
                </div>
              </td>
              <td colspan="2">
                <div class="item">
                  <span class="name">代理授权区域范围：</span>
                  <span class="value">
                    <region-select :value="contract.agent_addr" :isReadOnly="true"></region-select>
                    {{contract.agent_addr_detail}}
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="3">
                <div class="item">
                  <span class="name">授权期限：</span>
                  <span class="value">
                    {{contract.agent_valid_start | datex}} 至 {{contract.agent_valid_end | datex}}
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="item">
                  <span class="name">乙方独发的加盟商(甲:乙)：</span>
                  <span class="value">
                    {{contract.shop_dev_income_ratio1}}%
                    <span class="box"></span>
                    {{contract.shop_dev_income_ratio2}}%
                  </span>
                </div>
              </td>
              <td>
                <div class="item">
                  <span class="name">甲方独发的加盟商(甲:乙)：</span>
                  <span class="value">
                    {{contract.own_dev_income_ratio1}}%
                    <div class="box"></div>
                    {{contract.own_dev_income_ratio2}}%
                  </span>
                </div>
              </td>
              <td>
                <div class="item">
                  <span class="name">管理费(甲:乙)：</span>
                  <span class="value">
                    {{contract.agent_manager_fee1}}%
                    <div class="box"></div>
                    {{contract.agent_manager_fee2}}%
                  </span>
                </div>
              </td>
            </tr>
          </template>
          <tr>
            <td colspan="3">
              <div class="item">
                <span class="name">合同原件：</span>
                <span class="value">
                  <img v-show="contract.contract_original_url" :src="contract.contract_original_url">
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div class="item">
                <span class="name">签约时间：</span>
                <span class="value">
                  {{contract.contract_signing_time | datex}}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div class="item">
                <record-list :contract="contract" :isViewPage="true"></record-list>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from 'axios'
import { contractService } from '../../../services/api.js'
import RegionSelect from '../../shared/regionSelect.vue'
export default {
  name: 'contract-info',
  components: {
    RegionSelect
  },
  data () {
    return {
      contract: {},
      contractID: '',
      contractTabs: [],
      currentName: '',
      tabIndex: 0,
      baseImgUrl: ''
    }
  },
  created () {
    this.contractID = this.$route.params.id
    this.baseImgUrl = axios.defaults.baseURL + '/images/'
    this.getContract(this.contractID)
  },
  methods: {
    getContract (id) {
      contractService.getContract(id).then(contract => {
        this.processContractInfo(contract)
        this.addTab()
      }).catch(() => {
        this.$router.push({name: 'contract-list'})
      })
    },
    // 查看变更前合同
    getFrontContract () {
      if (this.hasShownContract('before')) {
        return
      }
      contractService.getFrontContract(this.contractID).then(contract => {
        this.processContractInfo(contract)
        this.addTab()
      }).catch(() => {
        this.$router.push({name: 'contract-list'})
      })
    },
    // 查看新合同
    getNewContract () {
      if (this.hasShownContract('after')) {
        return
      }
      contractService.getNewContract(this.contractID).then(contract => {
        this.processContractInfo(contract)
        this.addTab()
      }).catch(() => {
        this.$router.push({name: 'contract-list'})
      })
    },
    processContractInfo (contract) {
      this.contract = contract
      if (contract.client_identity_copy_url) {
        this.contract.client_identity_copy_url = this.baseImgUrl + this.contract.client_identity_copy_url
      }
      if (contract.contract_original_url) {
        this.contract.contract_original_url = this.baseImgUrl + this.contract.contract_original_url
      }
    },
    // 复制合同
    copyContract () {
      this.$router.push({name: 'contract-copy', params: {id: this.contractID}})
    },
    hasShownContract (status) {
      let that = this
      let param = status === 'before' ? 'contract_relation_before_no' : 'contract_relation_back_no'
      let selectedTab = this.contractTabs.find(tab => {
        if ( tab.contract.contract_no === that.contract[param]) {
          return true
        }
        return false
      })
      if (selectedTab) {
        that.currentName = selectedTab.name
        that.contract = selectedTab.contract
        return true
      }
      return false
    },
    addTab () {
      let newTabName = ++this.tabIndex + ''
      let title = ''
      switch (this.contract.contract_status) {
        case 1:
          title = '生效合同'
          break
        case 4:
          title = '到期合同'
          break
        case 5:
          title = '变更终止合同'
          break
        case 6:
          title = '取消终止合同'
          break
        default:
          title = '合同'
          break
      }
      this.contractTabs.push({
        title: title,
        name: newTabName,
        contract: this.contract
      })
      this.currentName = newTabName
    },
    beforeLeave (activeName, oldActiveName) {
      if (!+activeName) {
        return false
      }
      if (activeName !== oldActiveName) {
        let tab = this.contractTabs.find(tab => tab.name === activeName)
        this.contract = tab['contract']
        this.contractID = tab['contract'].id
      }
      return true
    },
    removeTab (targetName) {
      let tabs = this.contractTabs
      let activeName = this.currentName
      if (tabs.length === 1) {
        return
      }
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              this.contractID = nextTab.contract.id
            }
          }
        })
      }
      this.currentName = activeName
      this.contractTabs = tabs.filter(tab => tab.name !== targetName)
    },
    // 变更终止
    terminationOfChange () {
      this.$router.push({name: 'contract-change-termination', params: {id: this.contractID}})
    },
    // 取消终止
    terminationOfCancel () {
      this.$router.push({name: 'contract-cancel-termination', params: {id: this.contractID}})
    },
    // 转正合同
    turnToOfficial () {
      this.$router.push({name: 'contract-edit', params: {id: this.contractID}})
    },
    // 检查该合同是否已展示
    checkIsExist () {}
  }
}
</script>

<style scoped>
  .el-tab-pane {
    margin: 0 10px 3px;
  }
  .contract-msg {
    padding: 15px;
    margin-top: 3px;
    border-radius: 15px;
    background-color: #fff;
    -webkit-box-shadow: 0 1px 5px 0 rgba(0,0,0,.1);
    box-shadow: 0 1px 5px 0 rgba(0,0,0,.3);
  }
  .operation {
    text-align: right;
    font-size: 0;
  }
  .table {
    width: 100%;
  }
  .table td {
    border: none;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .contract-msg tr, .contract-msg td {
    text-align: left;
    padding: 10px 0;
  }
  tr td:first-child {
    padding-left: 20px;
  }
  tr.title td {
    padding-left: 0;
  }
  .name.count {
    text-align: left;
  }
  .name.count .value {
    font-weight: normal;
    padding-left: 10px;
  }
  .name i {
    font-weight: normal;
    font-style: normal;
    font-size: 14px;
  }
  .value {
    font-size: 14px;
  }
  .value img {
    display: inline-block;
    max-height: 200px;
    text-align: center;
    overflow: hidden;
    vertical-align: middle;
  }
  .box {
    display: inline-block;
    width: 5px;
    height: 2px;
  }
  .name {
    font-size: 16px;
    font-weight: bold;
  }
</style>
