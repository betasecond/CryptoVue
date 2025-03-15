<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { DESUtil } from '../utils/crypto'

// 数据模型
const form = ref({
  plaintext: '',
  key: '',
  ciphertext: ''
})

// 组件挂载时记录日志
onMounted(() => {
  console.log('DES页面加载完成')
})

// 加密操作
const handleEncrypt = () => {
  console.log('用户点击DES加密按钮')
  try {
    if (!form.value.plaintext) {
      log.warn('DES加密操作: 未输入明文')
      ElMessage.warning('请输入明文')
      return
    }
    if (!form.value.key || form.value.key.length < 8) {
      log.warn('DES加密操作: 密钥长度不足8位', { keyLength: form.value.key.length })
      ElMessage.warning('请输入至少8位密钥')
      return
    }
    
    console.log('开始DES加密过程', {
      plaintextLength: form.value.plaintext.length,
      keyLength: form.value.key.length 
    })
    
    form.value.ciphertext = DESUtil.encrypt(form.value.plaintext, form.value.key)
    console.log('DES加密成功', { ciphertextLength: form.value.ciphertext.length })
    ElMessage.success('加密成功')
  } catch (error) {
    console.error('DES加密过程出现异常', error)
    ElMessage.error('加密失败，请检查输入')
  }
}

// 解密操作
const handleDecrypt = () => {
  console.log('用户点击DES解密按钮')
  try {
    if (!form.value.ciphertext) {
      log.warn('DES解密操作: 未输入密文')
      ElMessage.warning('请输入密文')
      return
    }
    if (!form.value.key || form.value.key.length < 8) {
      log.warn('DES解密操作: 密钥长度不足8位', { keyLength: form.value.key.length })
      ElMessage.warning('请输入至少8位密钥')
      return
    }
    
    console.log('开始DES解密过程', {
      ciphertextLength: form.value.ciphertext.length,
      keyLength: form.value.key.length 
    })
    
    form.value.plaintext = DESUtil.decrypt(form.value.ciphertext, form.value.key)
    console.log('DES解密成功', { plaintextLength: form.value.plaintext.length })
    ElMessage.success('解密成功')
  } catch (error) {
    console.error('DES解密过程出现异常', error)
    ElMessage.error('解密失败，请检查输入和密钥')
  }
}

// 清空表单
const resetForm = () => {
  console.log('用户点击DES重置按钮')
  form.value = {
    plaintext: '',
    key: '',
    ciphertext: ''
  }
  console.log('DES表单已重置')
}
</script>

<template>
  <div class="page-container">
    <h2>DES加密与解密</h2>
    
    <el-card class="crypto-card">
      <el-form label-position="top">
        <el-form-item label="密钥 (至少8位)">
          <el-input v-model="form.key" placeholder="请输入DES密钥，至少8个字符" />
        </el-form-item>
        
        <el-divider />
        
        <div class="input-output-container">
          <div class="input-container">
            <el-form-item label="明文">
              <el-input
                v-model="form.plaintext"
                type="textarea"
                :rows="5"
                placeholder="请输入要加密的明文"
              />
            </el-form-item>
          </div>
          
          <div class="arrow-container">
            <el-button type="primary" circle @click="handleEncrypt">
              <el-icon><ArrowRight /></el-icon>
            </el-button>
            <div class="arrow-spacer"></div>
            <el-button type="success" circle @click="handleDecrypt">
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
              />
            </el-form-item>
          </div>
        </div>
        
        <div class="button-container">
          <el-button type="info" @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.page-container {
  padding: 20px;
}

.crypto-card {
  margin-top: 20px;
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
</style>