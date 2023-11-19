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
          @click="selected = 'orders'" 
          class="pl-6 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Pedidos</div>
        <div 
          @click="selected = 'users'" 
          class="pl-6 py-3 border-b cursor-pointer hover:bg-gray-100"
        >Usuarios</div>
      </div>
      <div class="grow p-8 flex flex-wrap overflow-scroll">
        <div v-if="selected == 'products'" class="pl-4 card-container">
          <div class="mx-4 mt-4 mb-2">
            <Dialog>
              <template v-slot:button>Crear producto</template>
              <template v-slot:title>Crear producto</template>
              <template v-slot:form>
                <label for="name">Name:</label><br>
                <InputText v-model:value="productFormData.name" name="name"/><br>
                <label for="Description">Description:</label>
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
              </template>
            </Dialog>
          </div>
          <InputText v-model:value="productSearch" class="m-4" placeholder="Buscar producto" />
          <div v-for="product in filteredProducts" class="card">
            <p><b>Name: {{ product.name }}</b></p>
            <p>Description: {{ product.description }}</p>
            <p>Quantity: {{ product.quantity }}</p>
            <p>Price: {{ product.price }}</p>
            <p>Url: {{ product.url }}</p>
            <p>Image: {{ product.image }}</p>
            <Dialog>
              <template v-slot:button>Editar producto</template>
              <template v-slot:title>Editar producto</template>
              <template v-slot:form>
                <label for="name">Name:</label><br>
                <InputText v-model:value="product.name" name="name"></InputText>
                <label for="Description">Description:</label>
                <InputText v-model:value="product.description" name="description"></InputText>
                <label for="quantity">Quantity:</label><br>
                <InputNumber v-model:value="product.quantity" name="quantity"></InputNumber>
                <label for="price">Price:</label><br>
                <InputNumber v-model:value="product.price" name="price"></InputNumber>
                <label for="url">URL:</label><br>
                <InputText v-model:value="product.url" name="url"></InputText>
                <label for="image">Image:</label><br>
                <InputText v-model:value="product.image" name="image"></InputText>
                <Button @click="editProduct(product)">Editar</Button>
              </template>
            </Dialog>
            <Button @click="removeProduct(product.id)" class="bg-red-500">Eliminar producto</Button>
          </div>
          <p v-if="products.length == 0" class="mx-4">No hay productos.</p>
        </div>
        <div v-if="selected == 'components'" class="card-container">
          <InputText v-model:value="componentSearch" class="m-4" placeholder="Buscar componente" />
          <div v-for="component in filteredComponents" class="card">
            <p><b>ID: {{ component.id }}</b></p>
            <p>Brand: {{ component.brand }}</p>
            <p>Model: {{ component.model }}</p>
            <p>Quantity: {{ component.quantity }}</p>
            <p>Price: {{ component.price }}</p>
            <Button @click="">Editar componente</Button>
            <Button @click="removeComponent(component.code)" class="bg-red-500">Eliminar componente</Button>
          </div>
          <p v-if="components.length == 0" class="mx-4">No hay componentes.</p>
        </div>
        <div v-if="selected == 'orders'" class="card-container">
          <InputText v-model:value="orderSearch" class="m-4" placeholder="Buscar pedido" />
          <div v-for="order in filteredOrders" class="card">
            <p><b>OrderID: {{ order.id }}</b></p>
            <p>User: {{ order.userid }}</p>
            <p>Quantity: {{ order.quantity }}</p>
            <p>Purchase date: {{ order.purchasedate }}</p>
            <p>Purchase time: {{ order.purchasetime }}</p>
            <SelectMenu @change="(status) => updateOrderStatus(order.id, status)" :value="order.status" :options="orderStatusOptions" class="my-2"></SelectMenu>
            <Button @click="removeOrder(order.id)" class="bg-red-500">Eliminar pedido</Button>
          </div>
          <p v-if="orders.length == 0" class="mx-4">No hay pedidos.</p>
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
          <p v-if="users.length == 0" class="mx-4">No hay usuarios.</p>
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

// Get token and set headers for queries
import { useUserStore } from "~/stores"
const store = useUserStore()
const token = store.token
const headers = {'Authorization': `Bearer ${token}`}

// Which option in sidebar is selected?
const selected = ref('users')


// ██████╗░██████╗░░█████╗░██████╗░██╗░░░██╗░█████╗░████████╗░██████╗
// ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║░░░██║██╔══██╗╚══██╔══╝██╔════╝
// ██████╔╝██████╔╝██║░░██║██║░░██║██║░░░██║██║░░╚═╝░░░██║░░░╚█████╗░
// ██╔═══╝░██╔══██╗██║░░██║██║░░██║██║░░░██║██║░░██╗░░░██║░░░░╚═══██╗
// ██║░░░░░██║░░██║╚█████╔╝██████╔╝╚██████╔╝╚█████╔╝░░░██║░░░██████╔╝
// ╚═╝░░░░░╚═╝░░╚═╝░╚════╝░╚═════╝░░╚═════╝░░╚════╝░░░░╚═╝░░░╚═════╝░

const { data: products } = await useFetch('http://localhost:3001/products', {headers: headers})

const productFormData = ref({
  id: '',
  name: '',
  description: '',
  quantity: '',
  price: '',
  url: '',
  image: ''
})

const productSearch = ref('')

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.name.toLowerCase().includes(productSearch.value.toLowerCase()) ||
    product.description.toLowerCase().includes(productSearch.value.toLowerCase())
  );
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
  } else {
    alert('Error')
  }
  //console.log(result.rows[0].id)
  console.log(result.data._rawValue.rows[0].id)
  productFormData.value.id = result.data._rawValue.rows[0].id
  products.value.push(productFormData.value)
}

async function editProduct(product) {
  let result = await useFetch('http://localhost:3001/products/' + product.id, {
    method: 'put',
    headers: headers,
    body: {
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      url: product.url,
      image: product.image
    }
  })
  if (result.status._value == "success") {
    alert('Éxito')
  } else {
    alert('Error')
  }
}

async function removeProduct(id) {
  await useFetch('http://localhost:3001/products/' + id, {
    method: 'delete',
    headers: headers
  })
  products.value = products.value.filter(product => product.id !== id);
}


// ░█████╗░░█████╗░███╗░░░███╗██████╗░░█████╗░███╗░░██╗███████╗███╗░░██╗████████╗░██████╗
// ██╔══██╗██╔══██╗████╗░████║██╔══██╗██╔══██╗████╗░██║██╔════╝████╗░██║╚══██╔══╝██╔════╝
// ██║░░╚═╝██║░░██║██╔████╔██║██████╔╝██║░░██║██╔██╗██║█████╗░░██╔██╗██║░░░██║░░░╚█████╗░
// ██║░░██╗██║░░██║██║╚██╔╝██║██╔═══╝░██║░░██║██║╚████║██╔══╝░░██║╚████║░░░██║░░░░╚═══██╗
// ╚█████╔╝╚█████╔╝██║░╚═╝░██║██║░░░░░╚█████╔╝██║░╚███║███████╗██║░╚███║░░░██║░░░██████╔╝
// ░╚════╝░░╚════╝░╚═╝░░░░░╚═╝╚═╝░░░░░░╚════╝░╚═╝░░╚══╝╚══════╝╚═╝░░╚══╝░░░╚═╝░░░╚═════╝░

const { data: components} = await useFetch('http://localhost:3001/components', {headers: headers})
const componentSearch = ref('')

// 'Not prepared', 'In preparation', 'Sent', 'Delivered'
const orderStatusOptions = [
  { value: 'Not prepared', text: 'Not prepared', },
  { value: 'In preparation', text: 'In preparation', },
  { value: 'Sent', text: 'Sent', },
  { value: 'Delivered', text: 'Delivered', },
]

const filteredComponents = computed(() => {
  return components.value.filter(component =>
    component.brand.toLowerCase().includes(componentSearch.value.toLowerCase()) ||
    component.model.toLowerCase().includes(componentSearch.value.toLowerCase())
  );
})

// No se gestiona que pueda estar incluida en alguna relación por lo que no se puede eliminar realmente
async function removeComponent(code) {
  await useFetch('http://localhost:3001/components/' + code, {
    method: 'delete',
    headers: headers
  })
  components.value = components.value.filter(component => component.code !== code);
}

// ░█████╗░██████╗░██████╗░███████╗██████╗░░██████╗
// ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝
// ██║░░██║██████╔╝██║░░██║█████╗░░██████╔╝╚█████╗░
// ██║░░██║██╔══██╗██║░░██║██╔══╝░░██╔══██╗░╚═══██╗
// ╚█████╔╝██║░░██║██████╔╝███████╗██║░░██║██████╔╝
// ░╚════╝░╚═╝░░╚═╝╚═════╝░╚══════╝╚═╝░░╚═╝╚═════╝░

const { data: orders } = await useFetch('http://localhost:3001/orders', {headers: headers})
const orderSearch = ref('')

const filteredOrders = computed(() => {
  return orders.value.filter(order =>
    order.id.toLowerCase().includes(orderSearch.value.toLowerCase()) ||
    order.userid.toLowerCase().includes(orderSearch.value.toLowerCase())
  );
})

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

// ██╗░░░██╗░██████╗███████╗██████╗░░██████╗
// ██║░░░██║██╔════╝██╔════╝██╔══██╗██╔════╝
// ██║░░░██║╚█████╗░█████╗░░██████╔╝╚█████╗░
// ██║░░░██║░╚═══██╗██╔══╝░░██╔══██╗░╚═══██╗
// ╚██████╔╝██████╔╝███████╗██║░░██║██████╔╝
// ░╚═════╝░╚═════╝░╚══════╝╚═╝░░╚═╝╚═════╝░

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

async function removeUser(id) {
  await useFetch('http://localhost:3001/users/' + id, {
    method: 'delete',
    headers: headers
  })
  users.value = users.value.filter(user => user.id !== id)
}
</script>