import { useUserStore } from "~/stores"

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUserStore()
  const user = store.user

  if (!store.token) {
    return navigateTo('/login')
  }
})