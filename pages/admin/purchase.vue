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
          <!--<InputText value="http://pcarp.store/products" placeholder="Purchase endpoint" />-->
          <InputText v-model:value="componentSearch" class="m-4" placeholder="Buscar componente" />
          <div v-for="component in filteredComponents" class="card">
            <p><b>ID: {{ component.id_producto }}</b></p>
            <p>Brand: {{ component.marca }}</p>
            <p>Model: {{ component.modelo }}</p>
            <p>Description: {{ component.descripcion }}</p>
            <p>Quantity: {{ component.stock }}</p>
            <p>Price: {{ component.precio }}</p>
            <Dialog>
              <template v-slot:button>Comprar</template>
              <template v-slot:title>Comprar componente {{ component.id_producto }}</template>
              <template v-slot:form>
                <label for="quantity">Cantidad:</label>
                <InputNumber v-model:value="component.quantity" name="quantity" :max="component.stock" min="0"/>
                <Button @click="purchase(component.id_producto, component.quantity)">Comprar</Button>
              </template>
            </Dialog>
          </div>
          <p v-if="components.length == 0" class="mx-4">No hay componentes.</p>
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
const { data: components } = await useFetch('http://pcarp.store/products', {headers: headers})

const componentSearch = ref('')

const filteredComponents = computed(() => {
  return components.value.filter(component =>
    component.marca.toLowerCase().includes(componentSearch.value.toLowerCase()) ||
    component.modelo.toLowerCase().includes(componentSearch.value.toLowerCase())
  );
})

const status = ref('')

const purchase = async (id, quantity) => {
  if (quantity == undefined) {
    alert('No se ha introducido ningún valor')
  } else {
    const result = await useFetch('http://pcarp.store/buy?id=' + id + '&cantidad=' + quantity, {headers: headers})
    alert('Componente comprado con éxito')
  }
}
</script>