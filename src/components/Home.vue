<template>
  <el-container>
    <el-header>
      <div class="msg-wrapper">
        <i class="user-img"></i>
        <span class="name">{{username}}</span>，欢迎您
        <a href="javascript:void(0);" @click="logut">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="160px">
        <el-menu class="menu-list" router :default-active="currentPath">
          <el-menu-item v-for="(item, index) in menuItems" :key="index" :index="item.url">
            <template slot="title">
              <span>{{item.title}}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <transition name="fadeInUp" mode="out-in">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { userService } from '../services/api.js'
import menuService from '../services/menuService.js'
export default {
  name: 'Name',
  data () {
    return {
      currentPath: '',
      menuItems: [],
      username: ''
    }
  },
  methods: {
    logut () {
      userService.logout()
      this.$router.push({name: 'login'})
    }
  },
  created () {
    this.currentPath = this.$route.path
    this.menuItems = menuService.FinanceMenuItems
  },
  mounted () {
    this.username = userService.getUserName()
  },
  watch: {
    '$route' () {
      this.currentPath = this.$route.path
    }
  }
}
</script>

<style>

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate(0, 30px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp-enter-active {
  animation: fadeInUp .8s;
}

.el-header {
  line-height: 60px;
  background-color: rgb(88, 165, 245);
  -webkit-box-shadow: 0 1px 5px 0 rgba(0,0,0,.1);
  box-shadow: 0 1px 5px 0 rgba(0,0,0,.3);
  z-index: 999;
}
.el-header .msg-wrapper {
  height: 60px;
  text-align: right;
}
.el-container {
  min-height: 100%;
}
.user-img {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-size: 100%;
  background-image: url('../assets/images/user.png');
  vertical-align: top;
  margin-top: 17.5px;
  margin-right: 3px;
  border-radius: 50%;
}
.msg-wrapper .name {
  font-size: 16px;
  font-weight: bold;
}
.msg-wrapper a {
  margin-left: 10px;
  color: #fff;
}
.menu-list {
  min-height: 100%;
  border-right: 1px solid #e6e6e6;
}
.menu-list .el-menu-item {
  border-bottom: 1px solid #e6e6e6;
}
.el-aside {
  color: #333;
}
.el-main {
  color: #333;
  height: 100%;
  overflow: unset;
  min-width: 820px;
  padding-right: 10px;
}
.el-footer {
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
