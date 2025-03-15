import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/des'
  },
  {
    path: '/des',
    name: 'DES',
    component: () => import('../views/DESPage.vue'),
    meta: {
      title: 'DES加密与解密'
    }
  },
  {
    path: '/rsa',
    name: 'RSA',
    component: () => import('../views/RSAPage.vue'),
    meta: {
      title: 'RSA加密与解密'
    }
  },
  {
    path: '/rc4',
    name: 'RC4',
    component: () => import('../views/RC4Page.vue'),
    meta: {
      title: 'RC4加密与解密'
    }
  }
]

export default routes