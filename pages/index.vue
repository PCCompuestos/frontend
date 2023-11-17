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
        <h2 class="text-center text-3xl">Más Vendidos</h2>
        <div class="py-6 flex flex-row justify-between">
          <!-- La idea es poner de manera estática los 3 primeros productos de nuestra BD, con su imagen como link -->
<!--          <a href="products.value.url[0]" class="h-52 w-52"><img src="products.value.image[0]"></a>   -->
<!--          <a href="products.value.url[1]" class="h-52 w-52"><img src="products.value.image[1]"></a>   -->
<!--          <a href="products.value.url[2]" class="h-52 w-52"><img src="products.value.image[2]"></a>   -->
          <a href="product/Ordenador" class="h-52 w-52 bg-gray-100"></a>
          <a href="product/Ordenador" class="h-52 w-52 bg-gray-100"></a>
          <a href="product/Ordenador" class="h-52 w-52 bg-gray-100"></a>
        </div>
      </section>
      <section class="w-full max-w-4xl p-8">
        <h2 class="text-center text-3xl">Búsqueda personalizada</h2>
        <div>
          <label>CPU:</label>
          <Autocomplete :options="cpuOptions" v-model:value="cpuValue"></Autocomplete>
        </div>
        <div>
          <label>RAM:</label>
          <Autocomplete :options="ramOptions" v-model:value="ramValue"></Autocomplete>
        </div>
        <div>
          <label>Graphics:</label>
          <Autocomplete :options="graphicsOptions" v-model:value="graphicsValue"></Autocomplete>
        </div>
        <div>
          <label>Storage:</label>
          <Autocomplete :options="storageOptions" v-model:value="storageValue"></Autocomplete>
        </div>
        <!-- <div>
          <label>RAM</label>
          <input type="range">
        </div> -->
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
  { value: 'Intel Core i5', text: 'Intel Core i5' },
  { value: 'Intel Core i7', text: 'Intel Core i7' },
  { value: 'Intel Core i9', text: 'Intel Core i9' },
  { value: 'AMD Ryzen 5',   text: 'AMD Ryzen 5' },
  { value: 'AMD Ryzen 7',   text: 'AMD Ryzen 7' },
]

const ramOptions = [
  { value: 'DDR3 Kingston HyperX 8GB DDR3',        text: '8 GB', },
  { value: 'DDR4 Crucial Ballistix 16GB DDR4',     text:  '16 GB', },
  { value: 'DDR4 Corsair Vengeance LPX 32GB DDR4', text:  '32 GB', },
]

const graphicsOptions = [
  { value: 'NVIDIA GeForce RTX 3060 Ti', text: 'NVIDIA GeForce RTX 3060 Ti', },
  { value: 'AMD Radeon RX 570', text: 'AMD Radeon RX 570', },
  { value: 'NVIDI GeForce GTX 1660',  text: 'GTX 1660', },
]

const storageOptions = [
  { value: 'Samsung EVO 500GB SSD', text: '500 GB SSD' },
  { value: 'WD Blue 1TB HDD', text: '1 TB HDD', },
  { value: 'Seagate Barracuda 2TB HDD', text:  '2 TB HDD', },
]

async function fetchProducts() {
  let result = await useFetch('http://localhost:3001/products')
  
}

async function search() {
  console.log('Buscar')
  let result = await useFetch('http://localhost:3001/products/search', {
    method: 'post',
    body: {
      cpu: cpuValue.value,
      ram: ramValue.value,
      graphics: graphicsValue.value,
      storage: storageValue.value
    }
  })
  console.log(result)
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