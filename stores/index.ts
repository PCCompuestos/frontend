import { defineStore } from 'pinia'
import { ref } from 'vue'
//import { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const token = useCookie('userToken', { maxAge: 60*60 })

  interface UserData {
    ID: number;
    name: string;
    password: string;
    isAdmin: boolean;
    email: string;
    address: string;
  }

  // const user = useCookie('userData', { maxAge: 60*60 })
  const user = useCookie<UserData>('userData', { maxAge: 60*60 })
  const shoppingCart = useCookie('shoppingCart', 
    { 
      default: () => [] as any[],
      maxAge: 60*60 
    }
  )
  const adminSelected = useCookie('adminSelected', { maxAge: 60*60 })

  

  const setToken = (data?: string) => (token.value = data)
  const setUser = (data?: any) => (user.value = data)
  const setAdminSelected = (data?: any) => (adminSelected.value = data)
  const addToShoppingCart = (data?: any) =>  {
    // if (Array.isArray(data)){
      shoppingCart.value = [...shoppingCart.value, ...data]
    // }
  }
  const clearShoppingCart = () => (shoppingCart.value = [])


  const logout = () => {
    setToken()
    setUser()
    clearShoppingCart()
    navigateTo('/')
  }

  return { 
    token, 
    user, 
    shoppingCart, 
    adminSelected, 
    setToken, 
    setUser, 
    addToShoppingCart, 
    setAdminSelected, 
    clearShoppingCart, 
    logout 
  }
})
