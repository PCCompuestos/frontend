<template>
  <HeaderIn></HeaderIn>
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
      <div class="grow p-8 flex flex-col">
        <!--<div class="h-52 w-52 mr-8 bg-gray-100"></div>
        <div class="h-52 w-52 mr-8 bg-gray-100"></div>
        <div class="h-52 w-52 mr-8 bg-gray-100"></div>-->
        <div v-if="selected == 'products'" class="pl-4">
          <p class="pb-2 font-bold">FORMULARIO DE CREACIÓN DE PRODUCTO:</p>
          <div class="p-2 border-solid border-2 border-black w-52">
            <label for="Name">Name:</label><br>
            <input type="text" id="Name" name="Name" class="border-solid border-2 border-black"
            v-model="formData.name"><br>
            <label for="Description">Description:</label>
            <input type="text" id="Description" name="Description" class="border-solid border-2 border-black"
            v-model="formData.description"><br>
            <label for="Quantity">Quantity:</label><br>
            <input type="text" id="Quantity" name="Quantity" class="border-solid border-2 border-black"
            v-model="formData.quantity"><br>
            <label for="Price">Price:</label><br>
            <input type="text" id="Price" name="Price" class="border-solid border-2 border-black"
            v-model="formData.price"><br><br>
            <button class="w-full bg-primary text-center cursor-pointer" @click="addProduct()">Añadir producto</button>
          </div><br>
          <p class="font-bold">LISTADO DE PRODUCTOS:</p>
          <div v-for="product in products" class="card">
            <p>Name: {{ product.name }}</p>
            <p>Description: {{ product.description }}</p>
            <p>Quantity: {{ product.quantity }}</p>
            <p>Price: {{ product.price }}</p>
            <button class="bg-primary cursor-pointer" @click="removeProduct(product.id)">Eliminar producto</button>
          </div>
        </div>
        <div v-if="selected == 'components'" v-for="component in components" class="card">
          <p>Code: {{ component.code }}</p>
          <p>Name: {{ component.name }}</p>
          <p>Quantity: {{ component.quantity }}</p>
          <p>Price: {{ component.price }}</p>
          <button class="bg-primary cursor-pointer" @click="removeComponent(component.code)">Eliminar componente</button>
        </div>
        <div v-if="selected == 'orders'" v-for="order in orders" class="card">
          <p>OrderID: {{ order.id }}</p>
          <p>User: {{ order.userid }}</p>
          <p>Quantity: {{ order.quantity }}</p>
          <p>Purchase date: {{ order.purchasedate }}</p>
          <p>Purchase time: {{ order.purchasetime }}</p>
          <button class="bg-primary cursor-pointer" @click="removeOrder(order.id)">Eliminar pedido</button>
        </div>
        <div v-if="selected == 'users'" v-for="user in users" class="card" >
          <p>UserID: {{ user.id }}</p>
          <p>Name: {{ user.name }}</p>
          <p>Email: {{ user.email }}</p>
          <p>Address: {{ user.address }}</p>
          <p>IsAdmin: {{ user.isadmin }}</p>
          <!-- Hacer que entre los dos botones haya una separación. No sé si es por la clase "card" -->
          <Button @click="convertToAdmin(user)">Establecer administrador</Button>
          <Button @click="removeUser(user.id)">Eliminar usuario</Button>
        </div>
      </div>
    </div>
  </Main>
</template>

<style setup>
.card {
  @apply w-72 h-fit m-2 p-4 border shadow rounded-lg;
}
</style>

<script setup>
import { useUserStore } from "~/stores"
const store = useUserStore()
const token = store.token

const formData = ref({
  name: '',
  description: '',
  quantity: '',
  pricerice: ''
})

const selected = ref('users')
const { data: products } = await useFetch('http://localhost:3001/products')
const { data: components } = await useFetch('http://localhost:3001/components')
const { data: orders } = await useFetch('http://localhost:3001/orders')
const { data: users } = await useFetch('http://localhost:3001/users')


async function convertToAdmin(user) {
  let result = await useFetch('http://localhost:3001/users/' + user.id, {
    method: 'put',
    headers: {
      'Authorization': `Bearer ${token}`
    },
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
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: {
      name: formData.value.name,
      description: formData.value.description,
      quantity: formData.value.quantity,
      price: formData.value.price
    }
  })
  if (result.status._value == "success") {
    alert('Producto añadido exitosamente')
  }
}

async function removeUser(id) {
  await useFetch('http://localhost:3001/users/' + id, {
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  users.value = users.value.filter(user => user.id !== id)
}

async function removeOrder(id) {
  await useFetch('http://localhost:3001/orders/' + id, {
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  orders.value = orders.value.filter(order => order.id !== id);
}

async function removeProduct(id) {
  await useFetch('http://localhost:3001/products/' + id, {
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  products.value = products.value.filter(product => product.id !== id);
}

// No se gestiona que pueda estar incluida en alguna relación por lo que no se puede eliminar realmente
async function removeComponent(code) {
  await useFetch('http://localhost:3001/components/' + code, {
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  components.value = components.value.filter(component => component.code !== code);
}

</script>