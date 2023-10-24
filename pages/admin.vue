<template>
  <HeaderIn></HeaderIn>
  <Main class="h-screen">
    <div class="w-full h-full flex flex-row">
      <div class="h-full flex-none w-52 flex flex-col border-r">
        <div class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100">Componentes</div>
        <div class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100">Fábrica</div>
        <div class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100">Pedidos</div>
        <div class="pl-8 py-3 border-b cursor-pointer hover:bg-gray-100">Usuarios</div>
      </div>
      <div class="grow p-8 flex flex-row">
        <!--<div class="h-52 w-52 mr-8 bg-gray-100"></div>
        <div class="h-52 w-52 mr-8 bg-gray-100"></div>
        <div class="h-52 w-52 mr-8 bg-gray-100"></div>-->
        <div v-for="user in users">
          <p>ID: {{ user.id }}</p>
          <p>Name: {{ user.name }}</p>
          <p>Email: {{ user.email }}</p>
          <p>Address: {{ user.address }}</p>
          <p>IsAdmin: {{ user.isadmin }}</p>
        </div>
      </div>
    </div>
  </Main>
</template>

<script setup>
const { data: users } = await useFetch('http://localhost:3001/users')
</script>