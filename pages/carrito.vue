<template>
  <Header></Header>
    <Main>
    <!-- Uso de clases de Tailwind, combinadas con flex -->
    <div class="w-full max-w-4xl p-8 flex flex-col items-center">
      <!-- En un futuro el "Ordenador1" cambiarlo por el ID del producto para cambiar según el producto -->
      <div class="text-center">
          <h1 class="text-center py-4">Carrito de la compra:</h1>
          <!-- Ejecutar en un bucle el listado de productos que hay añadidos junto a su precio,
                mostrando al final el precio total a pagar -->
          <div v-for="product in shoppingCart">
            <p>{{ product.name }}: {{ product.price }}€</p>
          </div> <br>
          <!-- Mostrar el precio total de la compra -->
          <p v-if="total == 0" class="font-semibold italic">VACÍO</p>
          <p v-else-if="total > 0" class="font-semibold underline">Precio total: {{ total }}€</p>
          <br>
          <Button v-if="total > 0" @click="store.clearShoppingCart()">Eliminar carrito</Button>
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
                    :value="user.name"
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
                    :value="user.email"
                >
            </div>
            <div class="flex flex-row items-center">
                <label class="pr-4" for="dir">Dirección:</label>
                <input 
                    id="dir"
                    type="text"
                    class="input_box" 
                    placeholder="c/ Maria de Luna, 22, 1ºA"
                    required
                    :value="user.address"
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
            <button class="bg-primary p-2.5 my-1 rounded-lg font-bold text-white" @click="confirmacionPago()">Pagar</button>
        </div>
      </div>
      <p v-if="shoppingCartStatus == 'wrongNumber&Date&Code'" class="text-red-500">Los datos de la tarjeta son incorrectos, prueba de nuevo.</p>
      <p v-if="shoppingCartStatus == 'wrongNumber&Date'" class="text-red-500">El número de tarjeta y la fecha de caducidad son incorrectos, prueba de nuevo.</p>
      <p v-if="shoppingCartStatus == 'wrongNumber&Code'" class="text-red-500">El número de tarjeta y el código de seguridad son incorrectos, prueba de nuevo.</p>
      <p v-if="shoppingCartStatus == 'wrongDate&Code'" class="text-red-500">La fecha de caducidad y el código de seguridad son incorrectos, prueba de nuevo.</p>
      <p v-if="shoppingCartStatus == 'wrongNumber'" class="text-red-500">El número de tarjeta es incorrecto, prueba de nuevo.</p>
      <p v-if="shoppingCartStatus == 'wrongDate'" class="text-red-500">La fecha de caducidad es incorrecta, prueba de nuevo.</p>
      <p v-if="shoppingCartStatus == 'wrongCode'" class="text-red-500">El código de seguridad es incorrecto, prueba de nuevo.</p>
      <p v-if="shoppingCartStatus == 'success'" class="text-green-500">Pago realizado con éxito.</p>
    </div>
  </Main>
  <Footer></Footer>
</template>
  
<!-- Definición de estilos para no reutilizar código -->
<style>
  .input_box{
    @apply  w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg;
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

  

<script setup>

import { useUserStore } from "~/stores"
const store = useUserStore()
const token = store.token
const user = store.user
const shoppingCart = store.shoppingCart

let total = calculateTotalPriceofShoppingCart()

const shoppingCartStatus = ref()


const formData1 = ref({
  cardNumber: '',
  expirationDate: '',
  code: '',
})

function calculateTotalPriceofShoppingCart() {
  let totalPrice = 0
  for (let i = 0; i < shoppingCart.length; i++) {
    totalPrice += parseFloat(shoppingCart[i].price)
  }
  return totalPrice
}


function confirmacionPago() {
  if (formData1.value.cardNumber == '' || formData1.value.expirationDate == '' || formData1.value.code == '') {
    //alert('Rellena todos los campos')
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

    if (wrongNumber && wrongDate && wrongCode) shoppingCartStatus.value = 'wrongNumber&Date&Code' 
    else if (wrongNumber && wrongDate && !wrongCode) shoppingCartStatus.value = 'wrongNumber&Date'
    else if (wrongNumber && !wrongDate && wrongCode) shoppingCartStatus.value = 'wrongNumber&Code'
    else if (!wrongNumber && wrongDate && wrongCode) shoppingCartStatus.value = 'wrongDate&Code'
    else if (wrongNumber && !wrongDate && !wrongCode) shoppingCartStatus.value = 'wrongNumber'
    else if (!wrongNumber && wrongDate && !wrongCode) shoppingCartStatus.value = 'wrongDate'
    else if (!wrongNumber && !wrongDate && wrongCode) shoppingCartStatus.value = 'wrongCode'
    else if (!wrongNumber && !wrongDate && !wrongCode) {
      shoppingCartStatus.value = 'success'
      // doOrderEffective();
      store.clearShoppingCart()
      window.location.href = '/dashboard'
    }
  }
}



</script>