<template>
  <Header></Header>
  <Main class="h-screen">
    <div class="w-full h-full flex flex-row">
      <div class="h-full flex-none w-52 flex flex-col border-r">
        <div 
          @click="selected = 'products'"
          class="pl-6 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Productos</div>
        <div 
          @click="selected = 'components'"
          class="pl-6 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Componentes</div>
        <div 
          @click="selected = 'factory'"
          class="pl-6 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Fábrica</div>
        <div 
          @click="selected = 'orders'" 
          class="pl-6 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Pedidos</div>
        <div 
          @click="selected = 'users'" 
          class="pl-6 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Usuarios</div>
      </div>
      <div class="grow p-8 flex flex-wrap">
        <div v-if="selected == 'products'" class="pl-4">
          <p class="pb-2 font-bold mx-4">FORMULARIO DE CREACIÓN DE PRODUCTO:</p>
          <div class="p-2 border-solid border-2 border-black w-52">
            <label for="name">Name:</label><br>
            <InputText v-model:value="formData.name" name="name"/><br>
            <label for="Description">Description:</label>
            <InputText v-model:value="formData.description" name="description"/><br>
            <label for="quantity">Quantity:</label><br>
            <InputText v-model:value="formData.quantity" name="quantity"/><br>
            <label for="price">Price:</label><br>
            <InputText v-model:value="formData.price" name="price"/><br>
            <label for="url">URL:</label><br>
            <InputText v-model:value="formData.url" name="url"/><br>
            <label for="image">Image:</label><br>
            <InputText v-model:value="formData.image" name="image"/><br>
            <Button @click="addProduct()">Añadir producto</Button>
          </div><br>
          <p class="font-bold mx-4">LISTADO DE PRODUCTOS:</p>
          <div v-for="product in products" class="card">
            <p><b>Name: {{ product.name }}</b></p>
            <p>Description: {{ product.description }}</p>
            <p>Quantity: {{ product.quantity }}</p>
            <p>Price: {{ product.price }}</p>
            <p>Url: {{ product.url }}</p>
            <p>Image: {{ product.image }}</p>
            <Button @click="removeProduct(product.id)" class="bg-red-500">Eliminar producto</Button>
          </div>
          <p v-if="products.length == 0">No hay productos.</p>
        </div>
        <div v-if="selected == 'components'" class="card-container">
          <div v-for="component in components" class="card">
            <p><b>Code: {{ component.code }}</b></p>
            <p>Name: {{ component.name }}</p>
            <p>Quantity: {{ component.quantity }}</p>
            <p>Price: {{ component.price }}</p>
            <Button @click="removeComponent(component.code)" class="bg-red-500">Eliminar componente</Button>
          </div>
          <p v-if="components.length == 0">No hay componentes.</p>
        </div>
        <div v-if="selected == 'factory'">
          <p>Qué carajos es esto.</p>
        </div>
        <div v-if="selected == 'orders'">
          <div v-for="order in orders" class="card">
            <p><b>OrderID: {{ order.id }}</b></p>
            <p>User: {{ order.userid }}</p>
            <p>Quantity: {{ order.quantity }}</p>
            <p>Purchase date: {{ order.purchasedate }}</p>
            <p>Purchase time: {{ order.purchasetime }}</p>
            <SelectMenu @change="(status) => updateOrderStatus(order.id, status)" :value="order.status" :options="orderStatusOptions" class="my-2"></SelectMenu>
            <Button @click="removeOrder(order.id)" class="bg-red-500">Eliminar pedido</Button>
          </div>
          <p v-if="orders.length == 0">No hay pedidos.</p>
        </div>
        <div v-if="selected == 'users'" class="card-container">
          <div v-for="user in users" class="card">
            <p><b>UserID: {{ user.id }}</b></p>
            <p>Name: {{ user.name }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Address: {{ user.address }}</p>
            <p>IsAdmin: {{ user.isadmin }}</p>
            <!-- Hacer que entre los dos botones haya una separación. No sé si es por la clase "card" -->
            <Button @click="convertToAdmin(user)">Establecer administrador</Button>
            <Button @click="removeUser(user.id)" class="bg-red-500">Eliminar usuario</Button>
          </div>
          <p v-if="users.length == 0">No hay usuarios.</p>
        </div>
      </div>
    </div>
  </Main>
</template>

<style setup>
.card-container {
  @apply w-full flex flex-wrap content-start;
}

.card {
  @apply w-64 h-fit m-4 p-4 shadow-sm border rounded-lg;
}
</style>

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
const headers = {'Authorization': `Bearer ${token}`}

const formData = ref({
  name: '',
  description: '',
  quantity: '',
  price: '',
  url: '',
  image: ''
})

const selected = ref('users')

// 'Not prepared', 'In preparation', 'Sent', 'Delivered'
const orderStatusOptions = [
  { value: 'Not prepared', text: 'Not prepared', },
  { value: 'In preparation', text: 'In preparation', },
  { value: 'Sent', text: 'Sent', },
  { value: 'Delivered', text: 'Delivered', },
]

const { data: products } = await useFetch('http://localhost:3001/products', {headers: headers})
const { data: components } = await useFetch('http://localhost:3001/components', {headers: headers})
const { data: orders } = await useFetch('http://localhost:3001/orders', {headers: headers})
const { data: users } = await useFetch('http://localhost:3001/users', {headers: headers})

async function convertToAdmin(user) {
  let result = await useFetch('http://localhost:3001/users/' + user.id, {
    method: 'put',
    headers: headers,
    body: {
      name: user.name,
      password: user.password,
      isadmin: true,
      email: user.email, 
      address: user.address
    }
  })
  if (result.status._value == "success") {
    alert('Usuario convertido a administrador')
  }
}

async function addProduct(){
  let result = await useFetch('http://localhost:3001/products', {
    method: 'post',
    headers: headers,
    body: {
      name: formData.value.name,
      description: formData.value.description,
      quantity: formData.value.quantity,
      price: formData.value.price,
      url: formData.value.url,
      image: formData.value.image
    }
  })
  if (result.status._value == "success") {
    alert('Producto añadido exitosamente')
  }
}

async function removeUser(id) {
  await useFetch('http://localhost:3001/users/' + id, {
    method: 'delete',
    headers: headers
  })
  users.value = users.value.filter(user => user.id !== id)
}

// ORDERS
async function updateOrderStatus(id, status) {
  await useFetch('http://localhost:3001/orders/' + id + '/setStatus', {
    method: 'put',
    headers: headers,
    body: {
      id: id,
      status: status
    }
  })
}

async function removeOrder(id) {
  await useFetch('http://localhost:3001/orders/' + id, {
    method: 'delete',
    headers: headers
  })
  orders.value = orders.value.filter(order => order.id !== id);
}

async function removeProduct(id) {
  await useFetch('http://localhost:3001/products/' + id, {
    method: 'delete',
    headers: headers
  })
  products.value = products.value.filter(product => product.id !== id);
}

// No se gestiona que pueda estar incluida en alguna relación por lo que no se puede eliminar realmente
async function removeComponent(code) {
  await useFetch('http://localhost:3001/components/' + code, {
    method: 'delete',
    headers: headers
  })
  components.value = components.value.filter(component => component.code !== code);
}

watch(orders, () => {
  console.log(orders.value)
})
</script>