<template>
  <header class="w-full h-16 flex justify-center bg-white border-0 ring-1 ring-inset ring-gray-200 fixed z-10">
    <div class="w-full px-8 flex flex-row items-center justify-between"  :class="{'max-w-4xl': !store.token}">
      <a href="/" class="font-bold">PCCompuestos</a>
      <div>
        <a v-if="!store.token" href="login">Iniciar sesión</a>
        <a v-if="store.token" href="dashboard" class="pr-6">Mi cuenta</a>
        <a v-if="store.token" href="#" @click="logout">Cerrar sesión</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from "~/stores"
const store = useUserStore()

const logout = () => {
  store.logout()
  window.location.href = '/login'
}
</script>