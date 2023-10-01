<template>
  <Header></Header>
  <div class="w-full pt-20" style="background-image: url('../images/banner-gaming.jpg');">
    <div class="w-full h-96"></div>
    <!--<img src="../public/images/banner-gaming.jpg">-->
  </div>
  <div class="h-20">
    <IconSearch class="h-20 w-20"/>
  </div>
  <button type="button" background-color=#D3D3D3 onclick="">Buscar...</button>
  <Footer></Footer>
</template>

<script>
  import { IconSearch } from '@tabler/icons-vue';
</script>