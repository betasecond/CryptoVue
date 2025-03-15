import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

/**
 * DES加密工具
 */
export const DESUtil = {
  // DES加密
  encrypt(message: string, key: string): string {
    try {
      console.log('开始DES加密操作', { messageLength: message.length, keyLength: key.length })
      const keyHex = CryptoJS.enc.Utf8.parse(key)
      const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      const result = encrypted.toString()
      console.log('DES加密完成', { resultLength: result.length })
      return result
    } catch (error) {
      console.error('DES加密失败', error as Error)
      throw error
    }
  },

  // DES解密
  decrypt(ciphertext: string, key: string): string {
    try {
      console.log('开始DES解密操作', { ciphertextLength: ciphertext.length, keyLength: key.length })
      const keyHex = CryptoJS.enc.Utf8.parse(key)
      const decrypted = CryptoJS.DES.decrypt(ciphertext, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      const result = decrypted.toString(CryptoJS.enc.Utf8)
      console.log('DES解密完成', { resultLength: result.length })
      return result
    } catch (error) {
      console.error('DES解密失败', error as Error)
      throw error
    }
  }
}

/**
 * RSA加密工具
 */
export const RSAUtil = {
  // 生成RSA密钥对
  generateKeyPair() {
    try {
      console.log('生成RSA密钥对')
      const jsencrypt = new JSEncrypt({default_key_size: '2048'})
      const publicKey = jsencrypt.getPublicKey()
      const privateKey = jsencrypt.getPrivateKey()
      
      if (!publicKey || !privateKey) {
        throw new Error('密钥对生成失败')
      }
      
      console.log('RSA密钥对生成完成')
      return { publicKey, privateKey }
    } catch (error) {
      console.error('RSA密钥对生成失败', error as Error)
      throw error
    }
  },
  
  // RSA加密
  encrypt(message: string, publicKey: string): string {
    try {
      console.log('开始RSA加密操作', { messageLength: message.length, publicKeyLength: publicKey.length })
      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(publicKey)
      const encrypted = encrypt.encrypt(message)
      if (!encrypted) {
        throw new Error('加密失败')
      }
      console.log('RSA加密完成', { resultLength: encrypted.length })
      return encrypted
    } catch (error) {
      console.error('RSA加密失败', error as Error)
      throw error
    }
  },
  
  // RSA解密
  decrypt(ciphertext: string, privateKey: string): string {
    try {
      console.log('开始RSA解密操作', { ciphertextLength: ciphertext.length, privateKeyLength: privateKey.length })
      const decrypt = new JSEncrypt()
      decrypt.setPrivateKey(privateKey)
      const decrypted = decrypt.decrypt(ciphertext)
      if (!decrypted) {
        throw new Error('解密失败')
      }
      console.log('RSA解密完成', { resultLength: decrypted.length })
      return decrypted
    } catch (error) {
      console.error('RSA解密失败', error as Error)
      throw error
    }
  }
}

/**
 * RC4加密工具
 */
export const RC4Util = {
  // RC4加密
  encrypt(message: string, key: string): string {
    try {
      console.log('开始RC4加密操作', { messageLength: message.length, keyLength: key.length })
      const encrypted = CryptoJS.RC4.encrypt(message, key)
      const result = encrypted.toString()
      console.log('RC4加密完成', { resultLength: result.length })
      return result
    } catch (error) {
      console.error('RC4加密失败', error as Error)
      throw error
    }
  },
  
  // RC4解密
  decrypt(ciphertext: string, key: string): string {
    try {
      console.log('开始RC4解密操作', { ciphertextLength: ciphertext.length, keyLength: key.length })
      const decrypted = CryptoJS.RC4.decrypt(ciphertext, key)
      const result = decrypted.toString(CryptoJS.enc.Utf8)
      console.log('RC4解密完成', { resultLength: result.length })
      return result
    } catch (error) {
      console.error('RC4解密失败', error as Error)
      throw error
    }
  }
}