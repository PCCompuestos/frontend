import { useUserStore } from "~/stores"

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUserStore()

  if (!store.token) {
    return navigateTo('/login')
  }

  // Redirigir a la página de admin si el usuario tiene el valor isAdmin en true
  if (to.name == "dashboard" && store.user.isAdmin) {
    return navigateTo('/admin')
  }
})
