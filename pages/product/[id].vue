<template>
  <Header></Header>
  <Main>
    <div class="w-full max-w-4xl p-8 flex flex-row">
      <div class="w-1/2">
        <img src="/images/computer.jpg" class="w-full rounded-lg">
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
  </Main>
  <Footer></Footer>
</template>

<script setup>
import { useUserStore } from "~/stores"
const route = useRoute();
const store = useUserStore()


const quantity = ref(1)

let producto = await useFetch('http://localhost:3001/products/' + route.params.id)
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
    alert("Producto añadido al carrito");
  }
}

</script>