<template>
  <HeaderIn></HeaderIn>
  <Main class="h-screen">
    <div class="w-full h-full flex flex-row">
      <div class="h-full flex-none w-52 flex flex-col border-r">
        <div 
          @click="selected = 'components'"
          class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Componentes</div>
        <div 
          @click="selected = 'factory'"
          class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Fábrica</div>
        <div 
          @click="selected = 'orders'" 
          class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Pedidos</div>
        <div 
          @click="selected = 'users'" 
          class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Usuarios</div>
      </div>
      <div class="grow p-8 flex flex-col">
        <!--<div class="h-52 w-52 mr-8 bg-gray-100"></div>
        <div class="h-52 w-52 mr-8 bg-gray-100"></div>
        <div class="h-52 w-52 mr-8 bg-gray-100"></div>-->
        <div v-if="selected == 'orders'" v-for="order in orders" class="card">
          <p>OrderID: {{ order.id }}</p>
          <p>User: {{ order.userid }}</p>
          <p>Quantity: {{ order.quantity }}</p>
          <p>Purchase date: {{ order.purchasedate }}</p>
          <p>Purchase time: {{ order.purchasetime }}</p>
        </div>
        <div v-if="selected == 'users'" v-for="user in users" class="card">
          <p>UserID: {{ user.id }}</p>
          <p>Name: {{ user.name }}</p>
          <p>Email: {{ user.email }}</p>
          <p>Address: {{ user.address }}</p>
          <p>IsAdmin: {{ user.isadmin }}</p>
        </div>
      </div>
    </div>
  </Main>
</template>

<style setup>
.card {
  @apply w-52 h-fit m-5;
}
</style>

<script setup>
import { ref } from 'vue'

const selected = ref('users')
const { data: orders } = await useFetch('http://localhost:3001/orders')
const { data: users } = await useFetch('http://localhost:3001/users')
</script>