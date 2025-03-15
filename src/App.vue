<script setup lang="ts">
// 不需要引入HelloWorld组件，我们将使用路由导航
import {Key, Lock, Operation} from "@element-plus/icons-vue";
</script>

<template>
  <div class="container">
    <el-container>
      <el-header>
        <div class="header-content">
          <h1>加密解密工具</h1>
        </div>
      </el-header>
      
      <el-container>
        <el-aside width="200px">
          <el-menu 
            router
            :default-active="$route.path"
            class="menu">
            <el-menu-item index="/des">
              <el-icon><Lock /></el-icon>
              <span>DES加密解密</span>
            </el-menu-item>
            <el-menu-item index="/rsa">
              <el-icon><Key /></el-icon>
              <span>RSA加密解密</span>
            </el-menu-item>
            <el-menu-item index="/rc4">
              <el-icon><Operation /></el-icon>
              <span>RC4加密解密</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        
        <el-main>
          <!-- 路由视图 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

.container {
  height: 100vh;
  width: 100%;
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.el-header {
  background-color: #409EFF;
  color: white;
  line-height: 60px;
}

.el-aside {
  background-color: #f4f4f5;
  border-right: 1px solid #e6e6e6;
}

.menu {
  height: 100%;
}

h1 {
  margin: 0;
  font-size: 24px;
}
</style>
