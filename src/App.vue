<script setup lang="ts">
import { ref, watch } from 'vue'
import { Key, Lock, Operation } from "@element-plus/icons-vue"
import { themes } from './utils/themes'
import type { ThemeConfig } from './types/theme'

const currentTheme = ref<string>('default')
const themeConfig = ref<ThemeConfig>(themes[currentTheme.value])

// 监听主题变化并应用样式
watch(currentTheme, (newTheme) => {
  themeConfig.value = themes[newTheme]
  document.documentElement.style.setProperty('--el-color-primary', themeConfig.value.primary)
  document.documentElement.style.backgroundColor = themeConfig.value.background
  document.documentElement.style.color = themeConfig.value.text
})
</script>

<template>
  <div class="container" :class="currentTheme">
    <el-container>
      <el-header>
        <div class="header-content">
          <h1>加密解密工具</h1>
          <div class="theme-selector">
            <el-select v-model="currentTheme" placeholder="选择主题">
              <el-option
                v-for="(theme, key) in themes"
                :key="key"
                :label="theme.name"
                :value="key"
              >
                <div class="theme-option">
                  <div class="color-preview" :style="{ backgroundColor: theme.primary }"></div>
                  {{ theme.name }}
                </div>
              </el-option>
            </el-select>
          </div>
        </div>
      </el-header>
      
      <el-container>
        <el-aside width="200px">
          <el-menu 
            router
            :default-active="$route.path"
            class="menu"
            :style="{ backgroundColor: themeConfig.menuBackground }">
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
  transition: background-color 0.3s, color 0.3s;
}

.container {
  height: 100vh;
  width: 100%;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.theme-selector {
  margin-right: 20px;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-preview {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.el-header {
  background-color: v-bind('themeConfig.primary');
  color: white;
  line-height: 60px;
  transition: background-color 0.3s;
}

.el-aside {
  background-color: v-bind('themeConfig.menuBackground');
  border-right: 1px solid #e6e6e6;
  transition: background-color 0.3s;
}

.menu {
  height: 100%;
  transition: background-color 0.3s;
}

.el-main {
  background-color: v-bind('themeConfig.background');
  transition: background-color 0.3s;
}

h1 {
  margin: 0;
  font-size: 24px;
}

/* 主题特定样式 */
.dark .el-button {
  background: linear-gradient(45deg, v-bind('themeConfig.primary'), v-bind('themeConfig.secondary'));
  border: none;
}

.neon .el-button {
  box-shadow: 0 0 10px v-bind('themeConfig.primary');
  text-shadow: 0 0 5px v-bind('themeConfig.primary');
  border-color: v-bind('themeConfig.primary');
}

.sunset .el-button {
  background: linear-gradient(120deg, v-bind('themeConfig.primary'), v-bind('themeConfig.secondary'));
  border: none;
  color: white;
}

.ocean .el-button {
  position: relative;
  overflow: hidden;
  background: v-bind('themeConfig.primary');
  border: none;
}

.ocean .el-button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: rotate(45deg);
  animation: wave 2s infinite;
}

@keyframes wave {
  0% {
    transform: rotate(45deg) translate(-100%, -100%);
  }
  100% {
    transform: rotate(45deg) translate(100%, 100%);
  }
}
</style>
