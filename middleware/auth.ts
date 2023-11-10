import { useUserStore } from "~/stores"

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUserStore()
  if (!store.token) {
    return navigateTo('/login')
  }
})