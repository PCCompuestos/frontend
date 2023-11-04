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
        <div v-if="selected == 'productsCreation'" class="card">
          <!-- Formulario para añadir los distintos campos que tiene un producto: ID, Name, Description, Quantity, Price -->
        </div>
        <div v-if="selected == 'products'" class="pl-4">
          <p class="pb-2 font-bold">FORMULARIO DE CREACIÓN DE PRODUCTO:</p>
          <form class="p-2 border-solid border-2 border-black w-52">
            <label for="Name">Name:</label><br>
            <input type="text" id="Name" name="Name" class="border-solid border-2 border-black"
            v-model="formData.Name"><br>
            <label for="Description">Description:</label>
            <input type="text" id="Description" name="Description" class="border-solid border-2 border-black"
            v-model="formData.Description"><br>
            <label for="Quantity">Quantity:</label><br>
            <input type="text" id="Quantity" name="Quantity" class="border-solid border-2 border-black"
            v-model="formData.Quantity"><br>
            <label for="Price">Price:</label><br>
            <input type="text" id="Price" name="Price" class="border-solid border-2 border-black"
            v-model="formData.Price"><br><br>
            <button class="w-full bg-primary text-center cursor-pointer" @click="addProduct()">Añadir producto</button>
          </form><br>
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
          <button class="bg-primary cursor-pointer" @click="convertToAdmin(user)">Establecer administrador</button>
          <button class="bg-primary cursor-pointer" @click="removeUser(user.id)">Eliminar usuario</button>
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

const formData = ref({
  Name: '',
  Description: '',
  Quantity: '',
  Price: ''
})


const selected = ref('users')
const { data: products } = await useFetch('http://localhost:3001/products')
const { data: components } = await useFetch('http://localhost:3001/components')
const { data: orders } = await useFetch('http://localhost:3001/orders')
const { data: users } = await useFetch('http://localhost:3001/users')


async function convertToAdmin(user) {
  let result = await useFetch('http://localhost:3001/users/' + user.id, {
    method: 'put',
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
    body: {
      name: formData.value.Name,
      description: formData.value.Description,
      quantity: formData.value.Quantity,
      price: formData.value.Price
    }
  })
  if (result.status._value == "success") {
    alert('Producto añadido exitosamente')
  }
}

async function removeUser(id) {
  await useFetch('http://localhost:3001/users/' + id, {
    method: 'delete'
  })
  users.value = users.value.filter(user => user.id !== id)
}

async function removeOrder(id) {
  await useFetch('http://localhost:3001/orders/' + id, {
    method: 'delete'
  })
  orders.value = orders.value.filter(order => order.id !== id);
}

async function removeProduct(id) {
  await useFetch('http://localhost:3001/products/' + id, {
    method: 'delete'
  })
  products.value = products.value.filter(product => product.id !== id);
}

// No se gestiona que pueda estar incluida en alguna relación por lo que no se puede eliminar realmente
async function removeComponent(code) {
  await useFetch('http://localhost:3001/components/' + code, {
    method: 'delete'
  })
  components.value = components.value.filter(component => component.code !== code);
}

</script>