<template>
  <Header></Header>
  <!-- BANNER -->
  <div class="w-full pt-20" style="background-image: url('../images/banner-gaming.jpg'); background-size: cover;">
    <div class="w-full h-96 flex flex-col justify-center">
      <h2 class="text-white text-center text-6xl font-bold">OFERTÓN 20%</h2>
    </div>
  </div>
  <!-- MOST SOLD -->
  <div class="h-20">
    <IconSearch class="h-20 w-20"/>
  </div>
  <button type="button" background-color=#D3D3D3 onclick="">Buscar...</button>
  <Footer></Footer>
</template>

<script>
  import { IconSearch } from '@tabler/icons-vue';
</script>