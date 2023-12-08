<template>
  <Header></Header>
  <Main>
    <div class="w-full max-w-4xl p-8 flex flex-col items-center">
      <h1 class="text-center">Registrarse</h1>
      <div class="py-5 w-80 flex flex-col items-center">
        <InputText placeholder="Nombre" v-model:value="formData.name"/>
        <InputText placeholder="Email" v-model:value="formData.email"/>
        <InputText type="password" placeholder="Contraseña" v-model:value="formData.password"/>
        <Button @click="signup">Registrarme</Button>
      </div>
      <p>Ya tengo cuenta, <a href="login" class="underline text-primary">iniciar sesión</a>.</p>
    </div>
  </Main>
  <Footer></Footer>
</template>

<script setup>
// Access backend
const api = useAppConfig().api

const formData = ref({
  name: '',
  password: '',
  email: '',
  address: '',
})

async function signup() {
  let result = await useFetch(api + '/users', {
    method: 'post',
    body: {
      name: formData.value.name,
      password: formData.value.password,
      email: formData.value.email,
      address: formData.value.address
    }
  })
  if (result.status._value == "success") {
    //alert('Te has registrado exitosamente')
    window.location.href = 'login';
  }
}
</script>