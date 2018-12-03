import Vue from 'vue'
import Router from 'vue-router'
// service
// import { userService } from '@/services/api.js'
import tokenService from '@/services/tokenService.js'

import Login from '@/components/Login'
import Home from '@/components/Home'
import NotSignedList from '@/components/contracts/notSignedList'
import ContractList from '@/components/contracts/contract/contractList'
import ContractForm from '@/components/contracts/contract/contractForm'
import WriteRecord from '@/components/contracts/contract/writeRecord'
import ContractView from '@/components/contracts/contract/contractView'
import contractTermination from '@/components/contracts/contract/contractTermination'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/contracts' },
    { path: '/contracts',
      component: Home,
      children: [
        { path: '', redirect: 'not-signed-list' },
        { path: 'not-signed-list', name: 'not-signed-list', component: NotSignedList },
        { path: 'contract-list', name: 'contract-list', component: ContractList },
        // 录入合同
        { path: 'contract/write/:id', name: 'contract-write', component: ContractForm },
        // 合同转正
        { path: 'contract/edit/:id', name: 'contract-edit', component: ContractForm },
        // 复制合同
        { path: 'contract/copy/:id', name: 'contract-copy', component: ContractForm },
        // 录入收款
        { path: 'contract/record-new/:id', name: 'contract-record-new', component: WriteRecord },
        { path: 'contract/:id', name: 'contract-view', component: ContractView },
        { path: 'termination/change/:id', name: 'contract-change-termination', component: contractTermination },
        { path: 'termination/cancel/:id', name: 'contract-cancel-termination', component: contractTermination }
      ]
    },
    { path: '/login', name: 'login', component: Login },
    { path: '*', redirect: '/contracts' }
  ]
})

router.beforeEach((to, form, next) => {
  // 判断token是否过期
  if (tokenService.isOverdue()) {
    if (to.path !== '/login') {
      next({path: '/login'})
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next({path: '/contracts'})
    } else {
      next()
    }
  }
})

export default router
