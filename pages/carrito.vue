<!-- Definición de estilos para no reutilizar código -->
<style>
  .input_box{
    @apply  w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg;
  }

  ul.breadcrumb {    /* Estilo de la lista */
    padding: 10px 16px;
    list-style: none;
    background-color: #eee;
  }
  ul.breadcrumb li {  /* Estilo de los elementos de la lista */
    display: inline;
    font-size: 18px;
  }
  ul.breadcrumb li+li:before {   /* Separador de elementos */
    padding: 8px;
    color: black;
    content: "/\00a0";
  }
  ul.breadcrumb li a {   /* Link sin cursor sobre encima */
    color: #0275d8;
    text-decoration: none;
  }
  ul.breadcrumb li a:hover {  /* Link con cursor sobre encima */
    color: #01447e;
    text-decoration: underline;
  }

  .container {
    display: flex;
    background-color: #f2f2f2;
    padding: 5px 20px 15px 20px;
    border: 1px solid lightgrey;
    border-radius: 3px;
  }

  .col-50 {
    flex: 50%;
  }
</style>


<template>
    <Header></Header>
      <Main>
        <ul class="breadcrumb">
        <li><a href="#">Home</a></li>
        <li><a href="#">Productos</a></li>
        <li>Comprar</li>
        </ul>

          <!-- Uso de clases de Tailwind, combinadas con flex -->
          <div class="w-full max-w-4xl p-8 flex flex-col items-center">
          <!-- En un futuro el "Ordenador1" cambiarlo por el ID del producto para cambiar según el producto -->
          <div>
              <h1 class="text-center py-4">Pago de producto: Ordenador1</h1>
              <div class="w-full pb-16">Precio= 222€<br>CPU=...<br>Nº Cores=...<br>Más características...</div>
          </div>
          <h1 class="text-center py-5">Detalles de pago</h1>
          <div class="container">
            <div class="col-50 py-5 px-5 w-80">
                <p class="w-full font-bold">Datos de facturación</p>
                <div class="flex flex-row items-center">
                    <label class="pr-4" for="Nombre">Nombre:</label>
                    <input 
                        id="Nombre"
                        type="text" 
                        class="input_box" 
                        placeholder="Pepito Pérez Ramos" 
                        required
                    >
                </div>
                <div class="flex flex-row items-center">
                    <label class="pr-4" for="email">Mail:</label>
                    <input
                        id="email"
                        type="text" 
                        class="input_box" 
                        placeholder="pepito@gmail.com"
                        required
                    >
                </div>
                <div class="flex flex-row items-center">
                    <label class="pr-4" for="dir">Dirección:</label>
                    <input 
                        id="dir"
                        type="password"
                        class="input_box" 
                        placeholder="c/ Maria de Luna, 22, 1ºA"
                        required
                    >
                </div>
            </div>
            <div class="col-50 py-5 px-5 w-80 flex flex-col items-center">
                <p class="w-full font-bold">Tarjeta de crédito</p>
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
          </div>

  <!--         <p>Aún no tengo cuenta, <a href="signup" class="underline text-primary">regístrarme</a>.</p>-->
        </div>
      </Main>
      <Footer></Footer>
    </template>
  
  
  <script setup>
      function confirmacionPago() {
          alert("Pago exitoso");
      }
  </script>