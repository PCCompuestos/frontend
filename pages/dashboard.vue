<template>
  <Header></Header>
  <Main class="h-screen">
    <div class="w-full h-full flex flex-row">
      <div class="h-full flex-none w-52 flex flex-col border-r">
        <div class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100">Pedidos</div>
        <div class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100">Facturas</div>
        <a href="settings" class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100">Ajustes</a>
      </div>
      <div class="grow p-8 flex flex-row">
        <div class="h-52 w-52 mr-8 bg-gray-100"></div>
        <div class="h-52 w-52 mr-8 bg-gray-100"></div>
        <div class="h-52 w-52 mr-8 bg-gray-100"></div>
      </div>
    </div>
    <p>Token: {{ store.token }}</p>
  </Main>
</template>

<script setup>
import { useUserStore } from "~/stores"
const store = useUserStore()
</script>