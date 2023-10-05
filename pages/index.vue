<template>
  <Header></Header>
  <Main>
    <!-- BANNER -->
    <section class="w-full" style="background-image: url('../images/banner-gaming.jpg'); background-size: cover;">
      <div class="w-full h-96 flex flex-col justify-center">
        <h2 class="text-white text-center text-6xl font-bold">OFERTÓN 20%</h2>
      </div>
    </section>
    <!-- BEST SELLERS -->
    <div class="w-full flex flex-col items-center">
      <section class="w-full max-w-4xl p-8">
        <h2 class="text-center text-3xl">Más Vendidos</h2>
        <div class="py-6 flex flex-row justify-between">
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
        </div>
      </section>
      <section class="w-full max-w-4xl p-8">
        <h2 class="text-center text-3xl">Configurar</h2>
        <div class="flex flex-row">
          <label for="volume">RAM</label>
          <input type="range" id="volume" name="volume" min="0" max="11" />
        </div>
        <div>
          <label for="cowbell">SSD</label>
          <input type="range" id="cowbell" name="cowbell" min="0" max="100" value="90" step="10" />
          </div>
      </section>
    </div>
  </Main>
  <!--<button type="button" background-color=#D3D3D3 onclick="">Buscar...</button>-->
  <Footer></Footer>
</template>

<style>
.box {
  @apply h-52 w-52 bg-gray-100;
}
</style>

<script>
  import { IconSearch } from '@tabler/icons-vue';
</script>