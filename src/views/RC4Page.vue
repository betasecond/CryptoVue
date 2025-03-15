<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { RC4Util } from '../utils/crypto'
import type { ThemeConfig } from '../types/theme'

// 数据模型
const form = ref({
  plaintext: '',
  key: '',
  ciphertext: ''
})

const themeConfig = inject<ThemeConfig>('theme', {
  name: '默认主题',
  primary: '#409EFF',
  secondary: '#f4f4f5',
  background: '#ffffff',
  text: '#213547',
  buttonStyle: 'default',
  menuBackground: '#f4f4f5',
  cardBackground: '#ffffff'
})

// 组件挂载时记录日志
onMounted(() => {
  console.log('RC4页面加载完成')
})

// 生成随机密钥
const generateRandomKey = () => {
  console.log('用户点击生成随机密钥按钮')
  // 生成16位随机字符串作为密钥
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let key = ''
  for (let i = 0; i < 16; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  form.value.key = key
  console.log('已生成随机密钥', { keyLength: key.length })
  ElMessage.success('已生成随机密钥')
}

// 加密操作
const handleEncrypt = () => {
  console.log('用户点击加密按钮')
  try {
    if (!form.value.plaintext) {
      log.warn('加密操作: 未输入明文')
      ElMessage.warning('请输入明文')
      return
    }
    if (!form.value.key) {
      log.warn('加密操作: 未输入密钥')
      ElMessage.warning('请输入密钥')
      return
    }
    
    console.log('开始加密过程', {
      plaintextLength: form.value.plaintext.length,
      keyLength: form.value.key.length 
    })
    
    form.value.ciphertext = RC4Util.encrypt(form.value.plaintext, form.value.key)
    console.log('加密成功', { ciphertextLength: form.value.ciphertext.length })
    ElMessage.success('加密成功')
  } catch (error) {
    console.error('加密过程出现异常', error)
    ElMessage.error('加密失败，请检查输入')
  }
}

// 解密操作
const handleDecrypt = () => {
  console.log('用户点击解密按钮')
  try {
    if (!form.value.ciphertext) {
      log.warn('解密操作: 未输入密文')
      ElMessage.warning('请输入密文')
      return
    }
    if (!form.value.key) {
      log.warn('解密操作: 未输入密钥')
      ElMessage.warning('请输入密钥')
      return
    }
    
    console.log('开始解密过程', {
      ciphertextLength: form.value.ciphertext.length,
      keyLength: form.value.key.length 
    })
    
    form.value.plaintext = RC4Util.decrypt(form.value.ciphertext, form.value.key)
    console.log('解密成功', { plaintextLength: form.value.plaintext.length })
    ElMessage.success('解密成功')
  } catch (error) {
    console.error('解密过程出现异常', error)
    ElMessage.error('解密失败，请检查输入和密钥')
  }
}

// 清空表单
const resetForm = () => {
  console.log('用户点击重置按钮')
  form.value = {
    plaintext: '',
    key: '',
    ciphertext: ''
  }
  console.log('表单已重置')
}
</script>

<template>
  <div class="page-container">
    <h2>RC4加密与解密</h2>
    
    <el-card class="crypto-card" :style="{ backgroundColor: themeConfig.cardBackground }">
      <el-form label-position="top">
        <div class="key-row">
          <el-form-item label="密钥" class="key-item">
            <el-input 
              v-model="form.key" 
              placeholder="请输入RC4密钥" 
              :style="{ borderColor: themeConfig.primary }"
            />
          </el-form-item>
          <el-button 
            type="primary" 
            @click="generateRandomKey"
            class="theme-button"
          >生成随机密钥</el-button>
        </div>
        
        <el-divider />
        
        <div class="input-output-container">
          <div class="input-container">
            <el-form-item label="明文">
              <el-input
                v-model="form.plaintext"
                type="textarea"
                :rows="5"
                placeholder="请输入要加密的明文"
                :style="{ borderColor: themeConfig.primary }"
              />
            </el-form-item>
          </div>
          
          <div class="arrow-container">
            <el-button 
              type="primary" 
              circle 
              @click="handleEncrypt"
              class="theme-button"
            >
              <el-icon><ArrowRight /></el-icon>
            </el-button>
            <div class="arrow-spacer"></div>
            <el-button 
              type="success" 
              circle 
              @click="handleDecrypt"
              class="theme-button"
            >
              <el-icon><ArrowLeft /></el-icon>
            </el-button>
          </div>
          
          <div class="output-container">
            <el-form-item label="密文">
              <el-input
                v-model="form.ciphertext"
                type="textarea"
                :rows="5"
                placeholder="加密后的密文"
                :style="{ borderColor: themeConfig.primary }"
              />
            </el-form-item>
          </div>
        </div>
        
        <div class="button-container">
          <el-button 
            type="info" 
            @click="resetForm"
            class="theme-button"
          >重置</el-button>
        </div>
      </el-form>
    </el-card>

    <el-card class="crypto-desc" :style="{ backgroundColor: themeConfig.cardBackground }">
      <h3>RC4算法简介</h3>
      <p>
        RC4（Rivest Cipher 4）是一种流加密算法，由Ronald Rivest在1987年设计。它生成一个伪随机的密钥流（keystream），
        然后通过XOR运算将密钥流与明文结合产生密文。RC4的特点是算法简单、加解密速度快，曾被广泛应用于SSL/TLS和WEP等协议中。
      </p>
      <p>
        <strong>注意：</strong> 现代应用中，由于RC4存在一些已知的安全弱点，建议在需要高安全性的场景下使用更安全的加密算法，
        如AES或ChaCha20。
      </p>
    </el-card>
  </div>
</template>

<style scoped>
.page-container {
  padding: 20px;
  background-color: v-bind('themeConfig.background');
  min-height: 100%;
}

.crypto-card, .crypto-desc {
  margin-top: 20px;
  transition: background-color 0.3s;
}

.key-row {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.key-item {
  flex: 1;
}

.input-output-container {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin: 20px 0;
}

.input-container, .output-container {
  flex: 1;
}

.arrow-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.arrow-spacer {
  height: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.crypto-desc {
  line-height: 1.6;
}

h3 {
  margin-top: 0;
}

/* 主题按钮样式 */
.theme-button {
  transition: all 0.3s ease;
}

.theme-button:hover {
  transform: scale(1.05);
}
</style>