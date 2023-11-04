import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const token = ref('')

  /*const setToken = (tkn: string) => {
    token.value = tkn
  }*/

  return { isLoggedIn, token }
})