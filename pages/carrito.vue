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
        <!-- <ul class="breadcrumb">
        <li><a href="#">Home</a></li>
        <li><a href="#">Productos</a></li>
        <li>Comprar</li>
        </ul> -->

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
                  v-model="formData1.cardNumber"
                >
                <input 
                  type="text" 
                  class="input_box" 
                  placeholder="MM/DD"
                  required
                  v-model="formData1.expirationDate"
                >
                <input 
                  type="password"
                  class="input_box" 
                  placeholder="CVV"
                  required
                  v-model="formData1.code"
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

const formData1 = ref({
  cardNumber: '',
  expirationDate: '',
  code: '',
})

function confirmacionPago() {
  if (formData1.value.cardNumber == '' || formData1.value.expirationDate == '' || formData1.value.code == '') {
    alert('Rellena todos los campos')
  } else {
    let wrongNumber = false
    let wrongDate = false
    let wrongCode = false

    // Verificar que los datos de tarjeta son 19 carácteres, y a su vez son números los carácteres 1-4, 6-9, 11-14, 16-19.
    // Formato: XXXX-XXXX-XXXX-XXXX
    if (formData1.value.cardNumber.length != 19) {
      wrongNumber = true
      // console.log("1")
    } else {
      let first = formData1.value.cardNumber.substring(0, 4)
      let firstDash = formData1.value.cardNumber.substring(4, 5)
      let second = formData1.value.cardNumber.substring(5, 9)
      let secondDash = formData1.value.cardNumber.substring(9, 10)
      let third = formData1.value.cardNumber.substring(10, 14)
      let thirdDash = formData1.value.cardNumber.substring(14, 15)
      let fourth = formData1.value.cardNumber.substring(15, 19)

      if (isNaN(first) || isNaN(second) || isNaN(third) || isNaN(fourth) || firstDash != '-' || secondDash != '-' || thirdDash != '-') {
        // console.log("2")
        wrongNumber = true
      }
    }

    // Verificar que la fecha de caducidad son dos números [1-12], una barra y dos números [1-31]
    if (formData1.value.expirationDate.length != 5) {
      wrongDate = true
    } else {
      let month = formData1.value.expirationDate.substring(0, 2)
      let day = formData1.value.expirationDate.substring(3, 5)
      if (isNaN(month) || isNaN(day)) {
        wrongDate = true
      } else {
        if (month < 1 || month > 12 || day < 1 || day > 31) {
          wrongDate = true
        }
      }
    }

    if (formData1.value.code.length != 3) {
      wrongCode = true
    }

    if (wrongNumber == true) {
      alert('Número de tarjeta incorrecto. Formato: XXXX-XXXX-XXXX-XXXX')
      // console.log(wrongNumber)
    }

    if (wrongDate) {
      alert('Fecha de caducidad incorrecta. Formato: MM/DD')
    }

    if (wrongCode) {
      alert('Código de seguridad incorrecto. Formato: XXX')
    }

    if (!wrongNumber && !wrongDate && !wrongCode){
      alert('Pago realizado con éxito')
    }
  }
}


</script>