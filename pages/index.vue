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
          <a href="product/Ordenador" class="h-52 w-52 bg-gray-100"></a>
          <a href="product/Ordenador" class="h-52 w-52 bg-gray-100"></a>
          <a href="product/Ordenador" class="h-52 w-52 bg-gray-100"></a>
        </div>
      </section>
      <section class="w-full max-w-4xl p-8">
        <h2 class="text-center text-3xl">Configurar</h2>
        <p class="py-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </section>
    </div>
  </Main>
  <!--<button type="button" background-color=#D3D3D3 onclick="">Buscar...</button>-->
  <Footer></Footer>
</template>

<script>
  import { IconSearch } from '@tabler/icons-vue';
</script>