<template>
  <header class="w-full h-16 flex justify-center bg-white border-0 ring-1 ring-inset ring-gray-200 fixed z-10">
    <div class="w-full px-8 flex flex-row items-center justify-between"  :class="{'max-w-4xl': !store.token}">
      <a href="/" class="font-bold">PCCompuestos</a>
      <div class="flex flex-row items-center">
        <a v-if="!store.token" href="login">Iniciar sesión</a>        
        <a v-if="store.token" href="dashboard" class="pr-6"><IconUserCircle v-if="store.token" stroke-width="1.25" class="h-10 w-10"></IconUserCircle></a>
        <a v-if="store.token" href="carrito" class="pr-6"><IconShoppingCart v-if="store.token" stroke-width="1.25" class="h-10 w-10"></IconShoppingCart></a>
        <a v-if="store.token" href="#" @click="logout">Cerrar sesión</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { IconUserCircle } from '@tabler/icons-vue';
import { IconShoppingCart } from '@tabler/icons-vue';
import { useUserStore } from "~/stores"
const store = useUserStore()

const logout = () => {
  store.logout()
  window.location.href = '/login'
}
</script>