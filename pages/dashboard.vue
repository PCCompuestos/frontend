<template>
  <Header></Header>
  <Main class="h-screen">
    <div class="w-full h-full flex flex-row">
      <div class="h-full flex-none w-52 flex flex-col border-r">
        <div 
          @click="selected = 'info'"
          :class="{ 'bg-gray-200': selected == 'info' }"
          class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-200"
        >Información personal</div>
        <div 
          @click="selected = 'deliveries'" 
          :class="{ 'bg-gray-200': selected == 'deliveries' }"
          class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-200"
        >Pedidos</div>
        <a href="settings" class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-200">Ajustes</a>
      </div>
      <div class="grow p-8 flex flex-col">
        <h1 class="pb-5">¡Hola {{ user.name }}!</h1>
      <!-- IFS PARA MOSTRAR UNA COSA U OTRA -->
        <div v-if="selected == 'info'" class="card">
          <p>Nombre: {{ user.name }}</p>
          <p>email: {{ user.email }}</p>
          <p>address: {{ user.address }}</p>
        </div>
        <div v-if="selected == 'deliveries'">
          <div v-for="order in orders" class="card">
            <!-- Muestra solamente las órdenes que tienen como atributo userID el mismo que user.id -->
            <!-- {{console.log(order)}} -->
            <p>Order ID: {{ order.id }}</p>
            <p>Fecha y hora de compra: {{ order.purchasedate }}</p>
            <p>Estado: {{ order.status }}</p>
            <p>Dirección: {{ user.address }}</p>
          </div>
        </div>      
      </div>
      <!-- Ajustes se gestiona en otra página -->
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

const selected = ref('info')

// Consulta para almacenar en "orders" los pedidos del usuario loggeado
const { data: orders } = await useFetch('http://localhost:3001/orders/' + user.id, {headers: headers})

// console.log(orders)
/*const { data: users } = await useFetch('http://localhost:3001/users', {headers: headers})
console.log(users)*/
</script>
