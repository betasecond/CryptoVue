<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { RSAUtil } from '../utils/crypto'
import type { ThemeConfig } from '../types/theme'

// 数据模型
const form = ref({
  plaintext: '',
  publicKey: '',
  privateKey: '',
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

// 在组件加载时生成RSA密钥对
onMounted(() => {
  console.log('RSA页面加载完成')
  generateKeyPair()
})

// 生成RSA密钥对
const generateKeyPair = () => {
  console.log('开始生成RSA密钥对')
  try {
    const keyPair = RSAUtil.generateKeyPair()
    form.value.publicKey = keyPair.publicKey
    form.value.privateKey = keyPair.privateKey
    console.log('RSA密钥对生成成功', {
      publicKeyLength: keyPair.publicKey.length,
      privateKeyLength: keyPair.privateKey.length
    })
    ElMessage.success('已生成RSA密钥对')
  } catch (error) {
    console.error('RSA密钥对生成失败', error)
    ElMessage.error('生成密钥对失败')
  }
}

// 加密操作
const handleEncrypt = () => {
  console.log('用户点击RSA加密按钮')
  try {
    if (!form.value.plaintext) {
      log.warn('RSA加密操作: 未输入明文')
      ElMessage.warning('请输入明文')
      return
    }
    if (!form.value.publicKey) {
      log.warn('RSA加密操作: 未生成公钥')
      ElMessage.warning('请先生成密钥对')
      return
    }
    
    console.log('开始RSA加密过程', {
      plaintextLength: form.value.plaintext.length,
      publicKeyLength: form.value.publicKey.length 
    })
    
    form.value.ciphertext = RSAUtil.encrypt(form.value.plaintext, form.value.publicKey)
    console.log('RSA加密成功', { ciphertextLength: form.value.ciphertext.length })
    ElMessage.success('加密成功')
  } catch (error) {
    console.error('RSA加密过程出现异常', error)
    ElMessage.error('加密失败，请检查输入')
  }
}

// 解密操作
const handleDecrypt = () => {
  console.log('用户点击RSA解密按钮')
  try {
    if (!form.value.ciphertext) {
      log.warn('RSA解密操作: 未输入密文')
      ElMessage.warning('请输入密文')
      return
    }
    if (!form.value.privateKey) {
      log.warn('RSA解密操作: 未生成私钥')
      ElMessage.warning('请先生成密钥对')
      return
    }
    
    console.log('开始RSA解密过程', {
      ciphertextLength: form.value.ciphertext.length,
      privateKeyLength: form.value.privateKey.length 
    })
    
    form.value.plaintext = RSAUtil.decrypt(form.value.ciphertext, form.value.privateKey)
    console.log('RSA解密成功', { plaintextLength: form.value.plaintext.length })
    ElMessage.success('解密成功')
  } catch (error) {
    console.error('RSA解密过程出现异常', error)
    ElMessage.error('解密失败，请检查输入和密钥')
  }
}

// 清空表单
const resetForm = () => {
  console.log('用户点击RSA重置按钮')
  form.value = {
    plaintext: '',
    publicKey: '',
    privateKey: '',
    ciphertext: ''
  }
  console.log('RSA表单已重置')
}
</script>

<template>
  <div class="page-container">
    <h2>RSA加密与解密</h2>
    
    <el-card class="crypto-card" :style="{ backgroundColor: themeConfig.cardBackground }">
      <el-form label-position="top">
        <div class="key-container">
          <el-form-item label="公钥">
            <el-input 
              v-model="form.publicKey" 
              placeholder="生成的RSA公钥" 
              :rows="3"
              type="textarea"
              readonly
              :style="{ borderColor: themeConfig.primary }"
            />
          </el-form-item>

          <el-form-item label="私钥">
            <el-input 
              v-model="form.privateKey" 
              placeholder="生成的RSA私钥" 
              :rows="3"
              type="textarea"
              readonly
              :style="{ borderColor: themeConfig.primary }"
            />
          </el-form-item>
        </div>
        
        <div class="button-container">
          <el-button 
            type="primary" 
            @click="generateKeyPair"
            class="theme-button"
          >生成新的密钥对</el-button>
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
  </div>
</template>

<style scoped>
.page-container {
  padding: 20px;
  background-color: v-bind('themeConfig.background');
  min-height: 100%;
}

.crypto-card {
  margin-top: 20px;
  transition: background-color 0.3s;
}

.key-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
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

/* 主题按钮样式 */
.theme-button {
  transition: all 0.3s ease;
}

.theme-button:hover {
  transform: scale(1.05);
}
</style>