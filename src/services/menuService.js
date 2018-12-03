// 导航菜单

// 管理员
const AdminMenuItems = [
  {
    url: '/admin/staffs',
    title: '用户管理'
  }
]

// 其他角色
const FinanceMenuItems = [
  {
    url: '/contracts/not-signed-list',
    title: '新提交待签约客户'
  },
  {
    url: '/contracts/contract-list',
    title: '签约合同'
  }
]

export default {
  AdminMenuItems,
  FinanceMenuItems
}
