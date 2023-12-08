<template>
  <Header></Header>
  <Main class="h-screen">
    <div class="w-full h-full flex flex-row">
      <div class="h-full flex-none w-52 flex flex-col border-r">
        <div 
          @click="selected = 'products'"
          :class="{ 'bg-gray-100': selected == 'products' }"
          class="pl-6 py-3 border-b cursor-pointer hover:bg-gray-200"
        >Productos</div>
        <div 
          @click="selected = 'components'"
          :class="{ 'bg-gray-100': selected == 'components' }"
          class="pl-6 py-3 border-b cursor-pointer hover:bg-gray-200"
        >Componentes</div>
        <div 
          @click="selected = 'orders'"
          :class="{ 'bg-gray-100': selected == 'orders' }"
          class="pl-6 py-3 border-b cursor-pointer hover:bg-gray-200"
        >Pedidos</div>
        <div 
          @click="selected = 'users'" 
          :class="{ 'bg-gray-100': selected == 'users' }"
          class="pl-6 py-3 border-b cursor-pointer hover:bg-gray-200"
        >Usuarios</div>
      </div>
      <div class="grow p-8 flex flex-wrap overflow-scroll">
        <div class="card-container">
          <h2 class="w-full m-4 text-2xl font-bold">Comprar componentes</h2>
          <InputText value="https://pcarp.onrender.com/products" placeholder="Purchase endpoint" />
          <InputText v-model:value="componentSearch" class="m-4" placeholder="Buscar usuario" />
          <div v-for="component in components" class="card">
            <p><b>ID: {{ component.id }}</b></p>
            <p>Brand: {{ component.brand }}</p>
            <p>Model: {{ component.model }}</p>
            <p>Description: {{ component.description }}</p>
            <p>Quantity: {{ component.quantity }}</p>
            <p>Price: {{ component.price }}</p>
            <Button @click="purchase(component)">Comprar</Button>
          </div>
          <p v-if="users.length == 0" class="mx-4">No hay componentes.</p>
        </div>
      </div>
    </div>
  </Main>
</template>

<script setup>
// Protect route against not logged users
definePageMeta({
  middleware: [
    'auth',
  ],
})

// Access backend
const api = useAppConfig().api

// Get token and set headers for queries
import { useUserStore } from "~/stores"
const store = useUserStore()
const token = store.token
const headers = {'Authorization': `Bearer ${token}`}

// Which option in sidebar is selected?
const selected = ref(store.adminSelected)

watch(selected, (newValue) => {
  store.setAdminSelected(newValue)
  navigateTo('/admin')
})

// Fetch components
//const { data: components } = await useFetch(api + '/components', {headers: headers})
const components = ref('sdf')

const productFormData = ref({
  id: '',
  name: '',
  description: '',
  quantity: '',
  price: '',
  url: '',
  image: ''
})
</script>