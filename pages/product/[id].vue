<template>
  <Header></Header>
  <Main>
    <div class="w-full max-w-4xl p-8 flex flex-row">
      <div class="w-1/2">
        <!-- <img src="/images/computer.jpg" class="w-full rounded-lg"> -->
        <img :src='productData.image' alt="Product Image">
      </div>
      <div class="w-1/2 pl-8 flex flex-col items-start">
        <h1>{{ productData.name }}</h1>
        <p class="pt-4 leading-9">
          <!-- 
              id: '2',
              name: 'Product2',
              description: 'This is product 2',
              quantity: '5',
              price: '199.99',
              url: 'product2',
              image: 'image1'
           -->
          <b>Descripción</b>: {{productData.description}}<br>
          <b>Unidades disponibles</b>: {{productData.quantity}}<br>
          <b>Precio</b>: {{productData.price}}€<br>
        </p>
        <div class="my-4 flex flex-col">
          <label><b>Cantidad</b></label>
          <input v-model="quantity" type="number" min="1" :max="productData.quantity">
          <!-- <input  type="number" value="1" min="1" max="10"> -->
        </div>
        <!-- <button @onClick="añadirACarrito()">Añadir al carrito</button> -->
        <Button @click="anadirACarrito()">Añadir al carrito</Button>
        <!-- <a href="../carrito" class="bg-primary p-2.5 my-3 rounded-lg font-bold text-white" @onClick="añadirACarrito()">Comprar</a> -->
      </div>
    </div>
    <p v-if="productStatus == 'successNotLoggedIn'" class="text-green-500">Producto añadido al carrito. Para ver tu carrito inicia sesión.</p>
    <p v-if="productStatus == 'success'" class="text-green-500">Producto añadido al carrito.</p>
  </Main>
  <Footer></Footer>
</template>

<script setup>
import { useUserStore } from "~/stores"
const route = useRoute();
const store = useUserStore()

const productStatus = ref()
const quantity = ref(1)

// Access backend
const api = useAppConfig().api

let producto = await useFetch(api + '/products/' + route.params.id)
let productData = producto.data._value
// console.log(producto)
// if (producto.status._value == "success") {
//   const dataValue = producto.data._value
//   console.log(dataValue)
// }

async function anadirACarrito() {
  if (producto.status._value == "success") {
    const dataValue = [productData]; // Wrap dataValue in an array
    store.addToShoppingCart(dataValue);
    if(!store.token) {
      productStatus.value = 'successNotLoggedIn'
      //alert("Producto añadido al carrito. \nPara ver tu carrito inicia sesión.");
    }
    else{
      productStatus.value = 'success'
      //alert("Producto añadido al carrito");
    }
  }
}

</script>