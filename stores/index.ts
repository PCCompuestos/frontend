import { defineStore } from 'pinia'
import { ref } from 'vue'
//import { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const token = useCookie('userToken', { maxAge: 60*60 })
  const user = useCookie('userData', { maxAge: 60*60 })
  const shoppingCart = useCookie('shoppingCart', { maxAge: 60*60 })

  const setToken = (data?: string) => (token.value = data)
  const setUser = (data?: any) => (user.value = data)

  const logout = () => {
    setToken()
    setUser()
    navigateTo('/')
  }

  return { token, user, setToken, setUser, logout }
})