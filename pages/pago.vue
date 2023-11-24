<template>
  <HeaderIn></HeaderIn>
    <Main>
        <!-- Uso de clases de Tailwind, combinadas con flex -->
        <div class="w-full max-w-4xl p-8 flex flex-col items-center">
        <!-- En un futuro el "Ordenador1" cambiarlo por el ID del producto para cambiar según el producto -->
        <div>
            <h1 class="text-center py-4">Pago de producto: Ordenador1</h1>
            <div class="w-full pb-16">Precio= 222€<br>CPU=...<br>Nº Cores=...<br>Más características...</div>
        </div>
        <h1 class="text-center">Método de pago</h1>
        <div class="py-5 w-80 flex flex-col items-center">
            <p class="w-full">Tarjeta de crédito</p>
            <input 
                type="text" 
                class="input_box" 
                placeholder="XXXX-XXXX-XXXX-XXXX" 
                required
            >
            <input 
                type="text" 
                class="input_box" 
                placeholder="MM/DD"
                required
            >
            <input 
                type="password"
                class="input_box" 
                placeholder="CVV"
                required
            >
            <button class="bg-primary p-2.5 my-1 rounded-lg font-bold text-white" @click="confirmacionPago">Pagar</button>
        </div>
<!--         <p>Aún no tengo cuenta, <a href="signup" class="underline text-primary">regístrarme</a>.</p>-->
      </div>
    </Main>
    <Footer></Footer>
  </template>

<!-- Definición de estilos para no reutilizar código -->
<style>
.input_box{
    @apply w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg;
}
</style>

<script setup>
    function confirmacionPago() {
        //alert("Pago exitoso");
    }
</script>