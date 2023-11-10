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
          <!-- Aquí pondremos los ID de los productos con más ventas. Ejemplo: PC_HP_i7 -->
          <a href="product/Ordenador" class="h-52 w-52 bg-gray-100"></a>
          <a href="product/Ordenador" class="h-52 w-52 bg-gray-100"></a>
          <a href="product/Ordenador" class="h-52 w-52 bg-gray-100"></a>
        </div>
      </section>
      <section class="w-full max-w-4xl p-8">
        <h2 class="text-center text-3xl">Búsqueda personalizada</h2>
        <!--<p class="py-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->
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
  <!--<button type="button" background-color=#D3D3D3 onclick="">Buscar...</button>-->
  <Footer></Footer>
</template>

<script setup>
import { IconSearch } from '@tabler/icons-vue';

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

</script>