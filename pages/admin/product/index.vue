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
          <h2 class="w-full m-4 text-2xl font-bold">Crear producto</h2>
          <div class="mx-4 mb-2">
            <label for="name">Name:</label><br>
            <InputText v-model:value="productFormData.name" name="name"/><br>
            <label for="description">Description:</label>
            <InputText v-model:value="productFormData.description" name="description"/><br>
            <label for="quantity">Quantity:</label><br>
            <InputNumber v-model:value="productFormData.quantity" name="quantity"/><br>
            <label for="price">Price:</label><br>
            <InputNumber v-model:value="productFormData.price" name="price"/><br>
            <label for="url">URL:</label><br>
            <InputText v-model:value="productFormData.url" name="url"/><br>
            <label for="image">Image:</label><br>
            <InputText v-model:value="productFormData.image" name="image"/><br>
            <Button @click="addProduct()">Crear</Button>
          </div>
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

const productFormData = ref({
  id: '',
  name: '',
  description: '',
  quantity: '',
  price: '',
  url: '',
  image: ''
})

async function addProduct(){
  let result = await useFetch('http://localhost:3001/products', {
    method: 'post',
    headers: headers,
    body: {
      name: productFormData.value.name,
      description: productFormData.value.description,
      quantity: productFormData.value.quantity,
      price: productFormData.value.price,
      url: productFormData.value.url,
      image: productFormData.value.image
    }
  })
  if (result.status._value == "success") {
    alert('Producto añadido exitosamente')
    navigateTo('/admin')
  } else {
    alert('Error')
  }
}
</script>