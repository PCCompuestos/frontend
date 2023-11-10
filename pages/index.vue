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
        <h2 class="text-center text-3xl">Configurar</h2>
        <!--<p class="py-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->
        <div>
          <label>CPU</label>
          <Autocomplete :options="cpuOptions" v-model:value="cpuValue"></Autocomplete>
          {{ cpuValue }}
        </div>
        <div>
          <label>RAM</label>
          <input type="range">
        </div>
        <div class="p-20">Hola:</div>
      </section>
    </div>
  </Main>
  <!--<button type="button" background-color=#D3D3D3 onclick="">Buscar...</button>-->
  <Footer></Footer>
</template>

<script setup>
import { IconSearch } from '@tabler/icons-vue';

const cpuValue = ref('intel-core-i7')

const cpuOptions = [
  { value: 'intel-core-i7', text: 'Intel Core I7', },
  { value: 'intel-core-i5', text: 'Intel Core I5', },
  { value: 'amd-ryzen-7', text: 'AMD Ryzen 7', },
  { value: 'intel-core-i9', text: 'Intel Core i9', },
  { value: 'amd-ryzen-5', text: 'AMD Ryzen 5'},
]
</script>