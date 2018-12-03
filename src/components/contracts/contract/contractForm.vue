<template>
  <div class="contract-wrapper">
    <h4 class="public_title">录入合同</h4>
    <el-form ref="contractForm" :model="contract" :rules="rules" label-width="125px" label-position="left" size="mini">
      <div class="base-title title">基本信息</div>
      <div class="base-info">
        <div class="row">
          <div class="col-4">
            <span class="name">商务经理：</span>
            <span class="value">
              {{contract.bus_manager_name}}
              <span v-if="contract.bus_department_name">({{contract.bus_department_name}})</span>
            </span>
          </div>
          <div class="col-4">
            <span class="name">所属公司：</span>
            <span class="value">{{contract.client_visit_company}}</span>
          </div>
          <div class="col-4">
            <span class="name">合同状态：</span>
            <span class="value">{{contract.contract_status | contractStatus}}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <span class="name">电销客服：</span>
            <span class="value">
              {{contract.phone_service_name}}
              <span v-if="contract.phone_service_group">({{contract.phone_service_group}})</span>
            </span>
          </div>
          <div class="col-4">
            <span class="name">考察品牌：</span>
            <span class="value">{{contract.brand_inspection_name}}</span>
          </div>
          <div class="col-4">
            <span class="name">成交方式：</span>
            <span class="value">{{contract.contract_signed_type | signedType}}</span>
          </div>
        </div>
      </div>
      <div class="title">加盟基本信息</div>
      <div class="info">
        <div class="row">
          <div class="col-4">
            <el-form-item label="合同类型" prop="contract_type">
              <Select
                name="contract_type"
                :clearable="false"
                returnBy="id"
                v-model="contract.contract_type"
                :options="contractOptions"></Select>
            </el-form-item>
          </div>
          <div class="col-5">
            <el-form-item label="合同编号" prop="contract_no">
              <el-input name="contract_no" v-model="contract.contract_no"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <el-form-item label="签约客户姓名" prop="client_name">
              <el-input name="client_name" v-model="contract.client_name"></el-input>
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item prop="client_sex">
              <template slot="label"><span class="sex-label">性别</span></template>
              <el-radio-group v-model="contract.client_sex">
                <el-radio name="client_sex" :label="1">男</el-radio>
                <el-radio name="client_sex" :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item label="年龄" prop="client_age">
              <el-input class="input-number-item fixed-width" name="client_age" v-model.number="contract.client_age" controls-position="right" :precision="0"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <el-form-item label="联系电话" prop="client_phone">
              <el-input name="client_phone" v-model="contract.client_phone"></el-input>
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item label="身份证号码" prop="client_identity_no">
              <el-input name="client_identity_no" v-model="contract.client_identity_no"></el-input>
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item label="身份证复印件" required>
              <div>
                <el-upload class="upload-demo"
                  action=""
                  accept=".jpg,.jpeg,.png,.bmp,.gif"
                  :limit="1"
                  :file-list="IDFileList"
                  :auto-upload="false"
                  :on-change="handleSelectFile"
                  :on-remove="handleRemoveID">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
                <div v-if="routeName !== 'contract-write' && !imgOptions.IDImgSrc" class="img-wrapper">
                  <img v-if="contract.client_identity_copy_url" class="img" :src="baseImgUrl + contract.client_identity_copy_url">
                </div>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <el-form-item label="联系地址" prop="client_addr">
              <region-select v-model="contract.client_addr"></region-select>
            </el-form-item>
          </div>
          <div class="col-6">
            <el-form-item label="详细地址" prop="client_addr_detail">
              <el-input name="client_addr_detail" v-model="contract.client_addr_detail"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <el-form-item label="签约品牌" prop="brand_signed_name">
              <Select
                name="brand_signed_name"
                :clearable="false"
                returnBy="name"
                v-model="contract.brand_signed_name"
                :options="brandOptions"></Select>
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item label="签约店型" prop="shop_signed_type">
              <Select
                name="shop_signed_type"
                :clearable="false"
                returnBy="id"
                v-model="contract.shop_signed_type"
                :options="shopSignedOptions"></Select>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <el-form-item label="店面地址" prop="shop_addr">
              <region-select v-model="contract.shop_addr"></region-select>
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item label="店面名称" prop="shop_name">
              <el-input name="shop_name" v-model="contract.shop_name"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="合同起止日期" required>
              <el-form-item prop="contract_valid_start" class="rate">
                <el-date-picker
                  name="contract_valid_start"
                  v-model="contract.contract_valid_start"
                  placeholder="生效日期"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
               至
              <el-form-item prop="contract_valid_end" class="rate">
                <el-date-picker
                  name="contract_valid_end"
                  placeholder="终止日期"
                  v-model="contract.contract_valid_end"
                  @change="endDateSetting($event, 'contract_valid_end')"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="title">加盟费用相关信息</div>
      <div class="info">
        <div class="row">
          <div class="col-4">
            <el-form-item label="品牌使用费" prop="brand_use_fee">
              <el-input-number class="input-number-item" name="brand_use_fee" v-model.number="contract.brand_use_fee" :controls="false"  @change="calculateAmountFee"></el-input-number> 元
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item label="管理费" prop="brand_manage_first_fee">
              <el-input-number class="input-number-item" name="brand_manage_first_fee" v-model.number="contract.brand_manage_first_fee" :controls="false" @change="calculateAmountFee"></el-input-number> 元
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item label="保证金" prop="brand_deposit_fee">
              <el-input-number class="input-number-item" name="brand_deposit_fee" v-model.number="contract.brand_deposit_fee" :controls="false" @change="calculateAmountFee"></el-input-number> 元
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="calculate col">
            <span>应收金额（小计：品牌使用费 + 管理费 +保证）</span>
            {{contract.brand_amount_fee || 0}} 元
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <el-form-item label="签约时付款金额" prop="brand_signing_fee">
              <el-input-number class="input-number-item" name="brand_signing_fee" v-model.number="contract.brand_signing_fee" :controls="false"></el-input-number> 元
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item label="全款" prop="is_full_fee">
              <el-switch name="is_full_fee" v-model="contract.is_full_fee" :active-value="selectStatus.TRUE" :inactive-value="selectStatus.FALSE"></el-switch>
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item label="赠送店面" prop="shop_give_type">
              <Select
                name="shop_give_type"
                returnBy="id"
                v-model="contract.shop_give_type"
                :options="shopSignedOptions"></Select>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <el-form-item label="扣减费用" prop="shop_give_eq_fee">
              <el-input-number class="input-number-item" name="shop_give_eq_fee" v-model.number="contract.shop_give_eq_fee" :controls="false"></el-input-number> 元
            </el-form-item>
          </div>
          <div class="col-6">
            <el-form-item label="赠送扣减备注" prop="shop_give_note">
              <el-input name="shop_give_note" v-model="contract.shop_give_note"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <el-form-item label="管理费(第2年)" prop="brand_manage_second_fee">
              <el-input-number class="input-number-item" name="brand_manage_second_fee" v-model.number="contract.brand_manage_second_fee" :controls="false"></el-input-number> 元
            </el-form-item>
          </div>
          <div class="col-4">
            <el-form-item label="管理费(第3年)" prop="brand_manage_thirdly_fee">
              <el-input-number class="input-number-item" name="brand_manage_thirdly_fee" v-model.number="contract.brand_manage_thirdly_fee" :controls="false"></el-input-number> 元
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="提供资质" prop="is_provide_qualification">
              <el-checkbox
                name="is_provide_qualification"
                label="营业执照、商标、委托书"
                v-model="contract.is_provide_qualification"
                :true-label="selectStatus.TRUE"
                :false-label="selectStatus.FALSE"></el-checkbox>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="合同条款" prop="contract_term_note">
              <el-input name="contract_term_note" type="textarea" v-model="contract.contract_term_note"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="担任代理商" prop="is_agent">
              <el-switch name="is_agent" v-model="contract.is_agent" :active-value="selectStatus.TRUE" :inactive-value="selectStatus.FALSE">
              </el-switch>
            </el-form-item>
          </div>
        </div>
        <div v-if="contract.is_agent === selectStatus.TRUE" class="row">
          <div class="col-12">
            <el-form-item label="代理授权级别" prop="agent_level">
              <Select
                name="agent_level"
                :clearable="false"
                returnBy="id"
                v-model="contract.agent_level"
                :options="agentLevels"></Select>
            </el-form-item>
          </div>
          <div class="col-12">
            <el-form-item label="代理授权区域范围" prop="agent_addr">
              <region-select v-model="contract.agent_addr"></region-select>
              <el-input name="agent_addr_detail" v-if="contract.agent_level > 3" v-model="contract.agent_addr_detail" placeholder="街道、镇、村代理详细信息"></el-input>
            </el-form-item>
          </div>
          <div class="col-12">
            <el-form-item label="授权期限" required>
              <el-form-item prop="agent_valid_start" class="rate">
                <el-date-picker
                  name="agent_valid_start"
                  placeholder="开始日期"
                  v-model="contract.agent_valid_start"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
               至
              <el-form-item prop="agent_valid_end" class="rate">
                <el-date-picker
                  name="agent_valid_end"
                  placeholder="结束日期"
                  v-model="contract.agent_valid_end"
                  @change="endDateSetting($event, 'agent_valid_end')"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
          </div>
          <div class="col-12">
            <el-form-item label="乙方独发的加盟商(甲:乙)" label-width="170px" required>
              <el-form-item prop="shop_dev_income_ratio1" class="rate">
                <el-input-number
                  class="input-number-item fixed-width"
                  name="shop_dev_income_ratio1"
                  v-model.number="contract.shop_dev_income_ratio1"
                  :controls="false" :min="0" :max="100 - contract.shop_dev_income_ratio2"></el-input-number> %
              </el-form-item>
              <el-form-item prop="shop_dev_income_ratio2" class="rate">
                <el-input-number
                  class="input-number-item fixed-width"
                  name="shop_dev_income_ratio2"
                  v-model.number="contract.shop_dev_income_ratio2"
                  :controls="false" :min="0" :max="100 - contract.shop_dev_income_ratio1"></el-input-number> %
              </el-form-item>
            </el-form-item>
          </div>
          <div class="col-12">
            <el-form-item label="甲方独发的加盟商(甲:乙)" label-width="170px" required>
              <el-form-item prop="own_dev_income_ratio1" class="rate">
                <el-input-number
                  class="input-number-item fixed-width"
                  name="own_dev_income_ratio1"
                  v-model.number="contract.own_dev_income_ratio1"
                  :controls="false" :min="0" :max="100 - contract.own_dev_income_ratio2"></el-input-number> %
              </el-form-item>
               <el-form-item prop="own_dev_income_ratio2" class="rate">
                <el-input-number
                  class="input-number-item fixed-width"
                  name="own_dev_income_ratio2"
                  v-model.number="contract.own_dev_income_ratio2"
                  :controls="false" :min="0" :max="100 - contract.own_dev_income_ratio1"></el-input-number> %
               </el-form-item>
            </el-form-item>
          </div>
          <div class="col-12">
            <el-form-item label="管理费(甲:乙)" label-width="170px" required>
              <el-form-item prop="agent_manager_fee1" class="rate">
                <el-input-number
                  class="input-number-item fixed-width"
                  name="agent_manager_fee1"
                  v-model.number="contract.agent_manager_fee1"
                  :controls="false" :min="0" :max="100 - contract.agent_manager_fee2"></el-input-number> %
              </el-form-item>
              <el-form-item prop="agent_manager_fee2" class="rate">
                <el-input-number
                  class="input-number-item fixed-width"
                  name="agent_manager_fee2"
                  v-model.number="contract.agent_manager_fee2"
                  :controls="false" :min="0" :max="100 - contract.agent_manager_fee1"></el-input-number> %
              </el-form-item>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="合同原件" required>
              <div>
                <el-upload class="upload-demo"
                  action=""
                  accept=".jpg,.jpeg,.png,.bmp,.gif"
                  :limit="1"
                  :auto-upload="false"
                  :file-list="contractFileList"
                  :on-change="handleContractFile"
                  :on-remove="handleRemoveContract">
                  <el-button slot="trigger" size="small" type="primary">上传合同</el-button>
                </el-upload>
                <div v-if="routeName !== 'contract-write' && !imgOptions.contractImgSrc" class="img-wrapper">
                  <img v-if="contract.contract_original_url" class="img" :src="baseImgUrl + contract.contract_original_url">
                </div>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="签约时间" prop="contract_signing_time">
              <el-date-picker
                name="contract_signing_time"
                v-model="contract.contract_signing_time"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="endDateSetting($event, 'contract_signing_time')">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item>
              <el-button @click="onCancel" :disabled="isSaving">取消</el-button>
              <el-button type="primary" :loading="isSaving" @click="onSubmit">保存</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { brandService, notSignedService, contractService } from '../../../services/api.js'
import RegionSelect from '../../shared/regionSelect.vue'
import { CONTRACT_TYPES, SHOP_SIGNED_TYPES, SELECT_STATUS, AGENT_LEVELS, CONTRACT_DATA, AGENT_DATA } from '../../../utils/constant.js'
import { processDateString } from '../../../utils/utils.js'
import formMixin from '../../shared/mixins/common/contract-form.js'
export default {
  name: 'contract-form',
  mixins: [formMixin],
  components: {
    RegionSelect
  },
  data () {
    return {
      isSaving: false,
      rules: {
        contract_type: { required: true, message: '请选择合同类型', trigger: 'change' },
        contract_no: { required: true, message: '请输入合同编号', trigger: 'blur' },
        client_name: { required: true, message: '请输入客户姓名', trigger: 'blur' },
        client_sex: { required: true, message: '请选择性别', trigger: 'change' },
        client_age: [
          { required: true, message: '年龄不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数值', trigger: 'blur' }
        ],
        client_phone: { required: true, message: '请输入联系电话', trigger: 'blur' },
        client_identity_no: { required: true, message: '请输入身份证号', trigger: 'blur' },
        client_addr: { required: true, message: '请输入联系地址', trigger: 'change' },
        brand_signed_name: { required: true, message: '请选择签约品牌', trigger: 'change' },
        shop_signed_type: { required: true, message: '请选择签约店型', trigger: 'change' },
        contract_valid_start: { required: true, message: '请选择开始日期', trigger: 'change' },
        contract_valid_end: { required: true, message: '请选择结束日期', trigger: 'change' },
        brand_use_fee: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数值', trigger: 'blur' }
        ],
        brand_manage_first_fee: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数值', trigger: 'blur' }
        ],
        brand_deposit_fee: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数值', trigger: 'blur' }
        ],
        brand_signing_fee: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数值', trigger: 'blur' }
        ],
        contract_term_note: { required: true, message: '请输入合同条款', trigger: 'blur' },
        agent_level: { required: true, message: '请选择授权级别', trigger: 'change' },
        agent_addr: { required: true, message: '授权范围', trigger: 'change' },
        agent_valid_start: { required: true, message: '请选择授权期限', trigger: 'change' },
        agent_valid_end: { required: true, message: '请选择授权期限', trigger: 'change' },
        shop_dev_income_ratio1: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为百分比', trigger: 'blur' }
        ],
        shop_dev_income_ratio2: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为百分比', trigger: 'blur' }
        ],
        own_dev_income_ratio1: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为百分比', trigger: 'blur' }
        ],
        own_dev_income_ratio2: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为百分比', trigger: 'blur' }
        ],
        agent_manager_fee1: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为百分比', trigger: 'blur' }
        ],
        agent_manager_fee2: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为百分比', trigger: 'blur' }
        ],
        contract_signing_time: { required: true, message: '请选择签约时间', trigger: 'change' }
      },
      contractID: null,
      routeName: null,
      baseImgUrl: '',
      imgOptions: {
        IDImgSrc: '',
        contractImgSrc: ''
      },
      IDFileList: [],
      contractFileList: [],
      contractOptions: CONTRACT_TYPES,
      brandOptions: [],
      shopSignedOptions: SHOP_SIGNED_TYPES,
      selectStatus: SELECT_STATUS,
      agentLevels: AGENT_LEVELS
    }
  },
  created () {
    this.getBrands()
    this.contractID = this.$route.params.id
    this.routeName = this.$route.name
    this.baseImgUrl = axios.defaults.baseURL + '/images/'
    if (this.routeName === 'contract-write') {
      // 录入合同状态
      notSignedService.getNotSignedContract(this.contractID).then(contract => {
        this.contract = contract
        this.contract.contract_signing_time = this.contract.contract_bus_add_time
        this.calculateAmountFee()
      })
    } else if (this.routeName === 'contract-edit' || this.routeName === 'contract-copy') {
      // 转正合同 或 复制合同
      contractService.getContract(this.contractID).then(contract => {
        this.contract = contract
        this.contract.contract_signing_time = this.contract.contract_bus_add_time
      })
    }
  },
  methods: {
    getBrands () {
      brandService.getBrands().then(brands => {
        this.brandOptions = brands
      })
    },
    // 读取身份证复印件
    handleSelectFile (file, fileList) {
      let that = this
      let reader = new window.FileReader()
      // 文件读取完成后触发
      reader.onload = (e) => {
        that.imgOptions.IDImgSrc = e.target.result
      }
      // 将文件读取为DataURL
      reader.readAsDataURL(file.raw)
      return false
    },
    // 读取合同文件
    handleContractFile (file, fileList) {
      let that = this
      let reader = new window.FileReader()
      // 文件读取完成后触发
      reader.onload = (e) => {
        that.imgOptions.contractImgSrc = e.target.result
      }
      // 将文件读取为DataURL
      reader.readAsDataURL(file.raw)
      return false
    },
    handleRemoveID (file, fileList) {
      this.imgOptions.IDImgSrc = ''
    },
    handleRemoveContract (file, fileList) {
      this.imgOptions.contractImgSrc = ''
    },
    // 计算应收金额
    calculateAmountFee () {
      this.contract.brand_amount_fee =
        ((this.contract.brand_use_fee || 0) * 100 +
        (this.contract.brand_manage_first_fee || 0) * 100 +
        (this.contract.brand_deposit_fee || 0) * 100) / 100
    },
    onSubmit () {
      this.$refs['contractForm'].validate((valid) => {
        if (valid) {
          // 录入合同需判断
          if (this.routeName === 'contract-write') {
            if (!this.imgOptions.IDImgSrc) {
              this.$error('请上传身份证复印件')
              return false
            }
            if (!this.imgOptions.contractImgSrc) {
              this.$error('请上传合同原件')
              return false
            }
          }
          // 非录入合同 可不传
          this.contract.client_identity_copy_url = this.imgOptions.IDImgSrc || this.contract.client_identity_copy_url
          this.contract.contract_original_url = this.imgOptions.contractImgSrc || this.contract.contract_original_url
          for (let key in CONTRACT_DATA) {
            if (this.contract[key] !== null) {
              this.formData.set(key, this.contract[key])
            }
          }
          // 若选中代理商
          if (this.contract.is_agent === 1) {
            for (let key in AGENT_DATA) {
              this.formData.set(key, this.contract[key])
            }
          } else {
            for (let key in AGENT_DATA) {
              this.formData.delete(key)
            }
          }
          this.isSaving = true

          let operateTip = ''
          let funcName
          // 录入合同
          if (this.routeName === 'contract-write') {
            this.formData.set('id', this.contractID)
            operateTip = '合同录入成功'
            funcName = 'signedContract'
          } else if (this.routeName === 'contract-edit') {
            // 合同转正
            this.formData.set('id', this.contractID)
            operateTip = '合同转正成功'
            funcName = 'turnToOfficial'
          } else if (this.routeName === 'contract-copy') {
            // 复制合同
            operateTip = '合同复制成功'
            funcName = 'copyContract'
          }
          contractService[funcName](this.contractID, this.formData).then(contract => {
            this.$success(operateTip)
            this.isSaving = false
            this.$router.push({name: 'contract-list'})
          }).catch(() => {
            this.isSaving = false
          })
        } else {
          return false
        }
      })
    },
    onCancel () {
      this.$router.push({name: 'not-signed-list'})
    },
    endDateSetting (date, name) {
      date = new Date(date)
      date.setHours(23, 59, 59)
      this.contract[name] = processDateString(date)
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
}
.base-title {
  font-weight: normal;
}
.base-info, .info {
  padding: 0 20px;
}
.base-info > div  {
  margin-top: 15px;
  margin-bottom: 15px;
}
.base-info .name {
  font-size: 14px;
  font-weight: bold;
}
.el-form-item >>> .el-form-item__label {
  padding: 0;
}
.input-number-item {
  max-width: 88%;
}
.input-number-item.fixed-width {
  width: 80px;
}
.sex-label {
  display: inline-block;
  vertical-align: top;
  margin-top: -3px;
}
.rate {
  display: inline-block;
}
.upload-demo {
  display: inline-block;
  vertical-align: top;
  margin-bottom: 5px;
}
.calculate {
  margin: 0 0 15px;
  text-align: left;
}
.img-wrapper {
  display: inline-block;
}
.img {
  display: inline-block;
  max-width: 200px;
}
</style>
