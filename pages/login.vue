<template>
  <Header></Header>
  <Main>
    <div class="w-full max-w-4xl p-8 flex flex-col items-center">
      <h1 class="text-center">Iniciar sesión</h1>
      <div class="py-5 w-80 flex flex-col items-center">
        <input 
          type="text" 
          class="w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg" 
          placeholder="Email o nombre de usuario" 
          required
        >
        <input 
          type="password" 
          class=" w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg" 
          placeholder="Contraseña" 
          required
        >
        <button class="bg-primary p-2.5 my-1 rounded-lg font-bold text-white" @click="goToDashboard">Entrar</button>
      </div>
      <p>Aún no tengo cuenta, <a href="signup" class="underline text-primary">regístrarme</a>.</p>
    </div>
  </Main>
  <Footer></Footer>
</template>

<script setup>
function goToDashboard() {
  window.location.href = 'dashboard';
}
</script>