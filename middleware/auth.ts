import { useUserStore } from "~/stores"

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUserStore()
  const user = store.user

  if (!store.token) {
    return navigateTo('/login')
  }
  // Redirigir a la página de admin si el usuario tiene el valor isAdmin en true
  /*if (user.isAdmin) {
    return navigateTo('/admin')
  }*/
})
