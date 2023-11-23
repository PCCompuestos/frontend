<template>
  <Header></Header>
  <Main>
    <!-- BANNER -->
    <section class="w-full" style="background-image: url('../images/banner-gaming.jpg'); background-size: cover;">
      <div class="w-full h-96 flex flex-col justify-center">
        <h2 class="text-white text-center text-6xl font-bold">OFERTÓN 20%</h2>
      </div>
    </section>
    <!-- BEST SELLERS-->
    <div class="w-full flex flex-col items-center">
      <section class="w-full max-w-4xl p-8">
        <h2 class="text-center text-4xl">Más Vendidos</h2>
        <div class="py-6 flex flex-row justify-between">
          <div v-for="product in products1_3" class="h-52 w-52 bg-gray-100">
            <a :href="'product/' + product.url">
              <img :src='product.image' alt="Product Image">
              <div class="text-center">
                <h3 class="text-lg font-semibold">{{ product.name }}</h3>
                <p class="text-base">{{ product.quantity }} available</p>
                <p class="text-base">{{ product.price }}€</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    <!-- BUSQUEDA PERSONALIZADA-->
      <section class="w-full max-w-4xl pt-14 pb-28">
        <h2 class="text-center text-4xl pb-6">Búsqueda personalizada</h2>
        <div class="pb-4 px-60">
          <label>CPU:</label>
          <Autocomplete :options="cpuOptions" v-model:value="cpuValue"></Autocomplete>
        </div>
        <div class="pb-4 px-60">
          <label>RAM:</label>
          <Autocomplete :options="ramOptions" v-model:value="ramValue"></Autocomplete>
        </div>
        <div class="pb-4 px-60">
          <label>Graphics:</label>
          <Autocomplete :options="graphicsOptions" v-model:value="graphicsValue"></Autocomplete>
        </div>
        <div class="pb-4 px-60">
          <label>Storage:</label>
          <Autocomplete :options="storageOptions" v-model:value="storageValue"></Autocomplete>
        </div>
        <!-- DISPLAY RESULTADOS -->
        <div class="pt-10">
          <div v-for="product in resultSearch.value" class="h-52 w-52 bg-gray-100">
            <a :href="'product/' + product.url">
              <img :src='product.image' alt="Product Image">
              <div class="text-center">
                <h3 class="text-lg font-semibold">{{ product.name }}</h3>
                <p class="text-base">{{ product.quantity }} available</p>
                <p class="text-base">{{ product.price }}€</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  </Main>
  <Footer></Footer>
</template>

<script setup>
import { IconSearch } from '@tabler/icons-vue';

// const { data: products } = await useFetch('http://localhost:3001/products')
const cpuValue = ref('Intel Core i7')
const ramValue = ref('DDR3 Kingston HyperX 8GB DDR3')
const graphicsValue = ref('NVIDIA GeForce RTX 3060 Ti')
const storageValue = ref('Samsung EVO 500GB SSD')

const cpuOptions = [
  { value: 'Intel Core i7', text: 'Intel Core i7' },
  { value: 'AMD Ryzen 5', text: 'AMD Ryzen 5' },
  { value: 'Intel Core i3', text: 'Intel Core i3' },
  { value: 'AMD Ryzen 7', text: 'AMD Ryzen 7' },
  { value: 'Intel Core i9', text: 'Intel Core i9' },
]

const ramOptions = [
  { value: 'DDR4 Crucial Ballistix 16GB DDR4', text: '16 GB', },
  { value: 'DDR4 Corsair Vengeance LPX 32GB DDR4', text: '32 GB', },
  { value: 'DDR3 Kingston HyperX 8GB DDR3', text: '8 GB', },
]

const graphicsOptions = [
  { value: 'NVIDIA GeForce GTX 1660', text: 'GTX 1660', },
  { value: 'AMD Radeon RX 570', text: 'AMD Radeon RX 570', },
  { value: 'NVIDIA GeForce RTX 3060 Ti', text: 'NVIDIA GeForce RTX 3060 Ti', },
]

const storageOptions = [
  { value: 'WD Blue 1TB HDD', text: '1 TB HDD', },
  { value: 'Samsung EVO 500GB SSD', text: '500 GB SSD' },
  { value: 'Seagate Barracuda 2TB HDD', text: '2 TB HDD', },
]

let products1_3

// Function that fetches products from the API and stores 
// the first 3 in the products1_3 variable slicing the array
// async function fetchProducts() {
let result = await useFetch('http://localhost:3001/products')

if (result.status._value == "success") {
  const dataValue = result.data._value
  products1_3 = dataValue.slice(0, 3)
  // console.log(products1_3)
} else {
  alert('Error al cargar los productos.')
}
// }

const resultSearch = ref('')
async function search() {
  const { data } = await useFetch('http://localhost:3001/products/search', {
    method: 'post',
    body: {
      cpu: cpuValue.value,
      ram: ramValue.value,
      graphics: graphicsValue.value,
      storage: storageValue.value
    }
  })
  resultSearch.value = data
}

watch(cpuValue, () => {
  search()
})

watch(graphicsValue, () => {
  search()
})

watch(ramValue, () => {
  search()
})

watch(storageValue, () => {
  search()
})

</script>