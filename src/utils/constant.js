export const USER_TOKEN = 'USER_TOKEN'
export const APP_REGIONS = 'app_regions'
// 合同类型
export const CONTRACT_TYPES = [
  {id: 1, name: '正式合同'},
  {id: 2, name: '书面协议'},
  {id: 3, name: '口头协议'}
]
// 合同状态
export const CONTRACT_STATUS = [
  {id: -1, name: '删除'},
  {id: 1, name: '已生效'},
  {id: 2, name: '已取消'},
  {id: 3, name: '已提交待签约'},
  {id: 4, name: '合同到期'},
  {id: 5, name: '变更终止'},
  {id: 6, name: '取消终止'}
]
// 单据类型
export const DOCUMENT_TYPES = [
  {id: 1, name: '新单'},
  {id: 2, name: '订购单'},
  {id: 3, name: '基础单'},
  {id: 4, name: '标准单'},
  {id: 5, name: '全款单'}
]
// 成交方式
export const CONTRACT_SIGNED_TYPES = [
  {id: 1, name: '当面成交'},
  {id: 2, name: '远程合作'}
]
// 店面类型
export const SHOP_SIGNED_TYPES = [
  {id: 1, name: '橱窗小型'},
  {id: 2, name: '中型店铺'},
  {id: 3, name: '大型店铺'}
]
// 代理级别
export const AGENT_LEVELS = [
  {id: 1, name: '省代理'},
  {id: 2, name: '市代理'},
  {id: 3, name: '区/县代理'},
  {id: 4, name: '街道/镇代理'},
  {id: 5, name: '村代理'}
]
// 是否选中
export const SELECT_STATUS = {
  'TRUE': 1,
  'FALSE': 2
}
// 专属区域
export const REGION_GROUPS = [
  {id: 1, name: '华南地区'},
  {id: 2, name: '华东地区'},
  {id: 3, name: '西南地区'},
  {id: 4, name: '其他地区'}
]

// 合同要提交的表单数据
export const CONTRACT_DATA = {
  // 基本信息
  bus_manager_name: null,
  bus_department_name: null,
  phone_service_name: null,
  phone_service_group: null,
  brand_inspection_name: null,
  client_visit_company: null,
  contract_signed_type: null,
  // 加盟基本信息
  contract_type: null,
  contract_no: null,
  client_id: null,
  client_name: null,
  client_sex: null,
  client_age: undefined,
  client_phone: null,
  client_identity_no: null,
  client_identity_copy_url: null,
  client_addr: null,
  client_addr_detail: null,
  brand_signed_name: null,
  shop_signed_type: null,
  shop_addr: null,
  shop_name: null,
  contract_valid_start: null,
  contract_valid_end: null,
  // 加盟费用信息
  brand_use_fee: undefined,
  brand_manage_first_fee: undefined,
  brand_deposit_fee: undefined,
  brand_amount_fee: null,
  brand_signing_fee: undefined,
  is_full_fee: 2,
  shop_give_type: null,
  shop_give_eq_fee: undefined,
  shop_give_note: null,
  brand_manage_second_fee: undefined,
  brand_manage_thirdly_fee: undefined,
  is_provide_qualification: 2,
  contract_term_note: null,
  is_agent: 2,
  contract_original_url: null,
  contract_signing_time: null
}
// 代理商数据 表单提交使用
export const AGENT_DATA = {
  agent_level: null,
  agent_addr: null,
  agent_valid_start: null,
  agent_valid_end: null,
  shop_dev_income_ratio1: undefined,
  shop_dev_income_ratio2: undefined,
  own_dev_income_ratio1: undefined,
  own_dev_income_ratio2: undefined,
  agent_manager_fee1: undefined,
  agent_manager_fee2: undefined
}
