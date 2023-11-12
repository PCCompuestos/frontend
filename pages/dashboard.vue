<template>
  <Header></Header>
  <Main class="h-screen">
    <div class="w-full h-full flex flex-row">
      <div class="h-full flex-none w-52 flex flex-col border-r">
        <div 
          @click="selected = 'info'" 
          class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Información personal</div>
        <div 
          @click="selected = 'deliveries'" 
          class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Pedidos</div>
        <div 
          @click="selected = 'facturas'"        
          class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Facturas</div>
        <a href="settings" class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100">Ajustes</a>
      </div>
      <div class="grow p-8 flex flex-col">
        <h1 class="pb-5">¡Hola {{ user.name }}!</h1>
        <div class="grow flex">
          <div class="h-52 w-52 mr-8 bg-gray-100"></div>
          <div class="h-52 w-52 mr-8 bg-gray-100"></div>
          <div class="h-52 w-52 mr-8 bg-gray-100"></div>
        </div>
      </div>
      <!-- IFS PARA MOSTRAR UNA COSA U OTRA -->
      <div class="grow p-8 flex flex-col">
        <div v-if="selected == 'info'" class="card">
          <!-- 
          <p>ID: {{ store.user.id }}</p>
          <p>Nombre: {{ store.user.name }}</p>
          <p>Password: {{ store.user.password }}</p>
          <p>isAdmin: {{ store.user.isAdmin }}</p>
          <p>email: {{ store.user.email }}</p>
          <p>address: {{ store.user.address }}</p>
          -->
        </div>
        <div v-if="selected == 'deliveries'" class="card">
        </div>
        <div v-if="selected == 'facturas'" class="card">
        </div>
        <!-- Ajustes se gestiona en otra página -->
      </div>
    </div>
    <p>Token: {{ token }}</p>
  </Main>
</template>

<script setup>
// Protect route against not logged users
definePageMeta({
  middleware: [
    'auth',
  ],
})

import { useUserStore } from "~/stores"
const store = useUserStore()
const token = store.token
const user = store.user
const headers = {'Authorization': `Bearer ${token}`}

const selected = ref('users')

/*const { data: users } = await useFetch('http://localhost:3001/users', {headers: headers})
console.log(users)*/
</script>