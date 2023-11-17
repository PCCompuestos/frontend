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
const cpuValue = ref('intel-core-i7')
const ramValue = ref('4-GB')
const graphicsValue = ref('geforce-rtx-4070-series')
const storageValue = ref('1-tb-ssd')

const cpuOptions = [
  { value: 'intel-core-i7', text: 'Intel Core I7', },
  { value: 'intel-core-i5', text: 'Intel Core I5', },
  { value: 'amd-ryzen-7', text: 'AMD Ryzen 7', },
  { value: 'intel-core-i9', text: 'Intel Core i9', },
  { value: 'amd-ryzen-5', text: 'AMD Ryzen 5'},
]

const ramOptions = [
  { value:  '4-GB', text:  '4 GB', },
  { value:  '8-GB', text:  '8 GB', },
  { value: '16-GB', text: '16 GB', },
  { value: '32-GB', text: '32 GB', },
]

const graphicsOptions = [
  { value:  'geforce-rtx-4070-series', text:  'GeForce RTX 4070 Series', },
  { value:  'geforce-rtx-3060-series', text:  'GeForce RTX 3060 Series', },
  { value:  'geforce-rtx-4060-series', text:  'GeForce RTX 4060 Series', },
  { value:  'geforce-rtx-3050-series', text:  'GeForce RTX 3050 Series', },
  { value:                 'gtx-1650', text:                 'GTX 1650', },
]

const storageOptions = [
  { value:    '1-tb-ssd', text:    '1 TB SSD', },
  { value:    '2-tb-ssd', text:    '2 TB SSD', },
  { value:  '512-gb-ssd', text:  '512 GB SSD', },
  { value:  '500-gb-ssd', text:  '500 GB SSD', },
  { value:  '256-gb-ssd', text:  '256 GB SSD', },
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