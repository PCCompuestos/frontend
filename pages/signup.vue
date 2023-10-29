<template>
  <Header></Header>
  <Main>
    <div class="w-full max-w-4xl p-8 flex flex-col items-center">
      <h1 class="text-center">Regístrarse</h1>
      <div class="py-5 w-80 flex flex-col items-center">
        <input 
          type="text" 
          class="w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg " 
          placeholder="Nombre" 
          required
          v-model="formData.name"
        >
        <input 
          type="text" 
          class="w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg " 
          placeholder="Email" 
          required
          v-model="formData.email"
        >
        <input 
          type="password" 
          class=" w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg" 
          placeholder="Contraseña" 
          required
          v-model="formData.password"
        >
        <button class="bg-primary p-2.5 my-1 rounded-lg font-bold text-white" @click="signup">Regístrarme</button>
      </div>
      <p>Ya tengo cuenta, <a href="login" class="underline text-primary">iniciar sesión</a>.</p>
    </div>
  </Main>
  <Footer></Footer>
</template>

<script setup>
const formData = ref({
  name: '',
  password: '',
  email: '',
  address: '',
})

async function signup() {
  //window.location.href = 'dashboard';
  let result = await useFetch('http://localhost:3001/users', {
    method: 'post',
    body: {
      name: formData.value.name,
      password: formData.value.password,
      email: formData.value.email,
      address: formData.value.address
    }
  })
  if (result.status._value == "success") {
    alert('Te has registrado exitosamente')
  }
}
</script>