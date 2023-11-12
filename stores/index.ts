import { defineStore } from 'pinia'
import { ref } from 'vue'
//import { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const token = useCookie('userToken', { maxAge: 60*60 })
  const user = useCookie('userData', { maxAge: 60*60 })
  const shoppingCart = useCookie('shoppingCart', 
    { 
      default: () => [] as any[],
      maxAge: 60*60 
    }
  )

  const setToken = (data?: string) => (token.value = data)
  const setUser = (data?: any) => (user.value = data)
  const addToShoppingCart = (data?: any) =>  (shoppingCart.value = [...shoppingCart.value, ...data]) 
  

  // const addToShoppingCart = (data?: any) => {
  //   if (data) {
  //     // Check if the data is an array and use spread operator if true
  //     if (Array.isArray(data)) {
  //       shoppingCart.value.push(...data);
  //     } else {
  //       shoppingCart.value.push(data);
  //     }
  //   }
  // }

  // const addToShoppingCart = (data?: any) => (showData())

  // function showData() {
  //   console.log(shoppingCart.value)
  // }

  const logout = () => {
    setToken()
    setUser()
    navigateTo('/')
  }

  return { token, user, shoppingCart, setToken, setUser, addToShoppingCart, logout }
})
