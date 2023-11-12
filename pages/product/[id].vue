<template>
  <Header></Header>
  <Main>
    <div class="w-full max-w-4xl p-8 flex flex-row">
      <div class="w-1/2">
        <img src="/images/computer.jpg" class="w-full rounded-lg">
      </div>
      <div class="w-1/2 pl-8 flex flex-col items-start">
        <h1>{{ $route.params.id }}</h1>
        <p class="pt-4 leading-9">
          <b>Gráfica Series</b>: GeForce RTX 3060 Series<br>
          <b>Almacenamiento</b>: 500 GB SSD<br>
          <b>Procesador</b>: Intel Core I5<br>
          <b>Memoria Ram</b>: 16GB RAM<br>
          <b>Modelo Sistema Operativo</b>: Sin Sistema operativo <br>
        </p>
        <div class="my-4 flex flex-col">
          <label><b>Cantidad</b></label>
          <input type="number" value="1" min="1" max="10">
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


async function anadirACarrito() {
  let result = await useFetch('http://localhost:3001/products/' + route.params.id)
  if (result.status._value == "success") {
    const dataValue = [result.data._value]; // Wrap dataValue in an array
    store.addToShoppingCart(dataValue);
    console.log(store.shoppingCart);
  }
}

</script>