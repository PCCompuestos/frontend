<template>
  <Header></Header>
  <Main>
    <div class="w-full max-w-4xl p-8 flex flex-col items-center">
      <h1 class="text-center">Iniciar sesión</h1>
      <div class="py-5 w-80 flex flex-col items-center">
        <InputText placeholder="Email" v-model:value="formData.email"></InputText>
        <InputText type="password" placeholder="Contraseña" v-model:value="formData.password"></InputText>
        <Button @click="login">Entrar</Button>
      </div>
      <p class="mb-4">Aún no tengo cuenta, <a href="signup" class="underline text-primary">registrarme</a>.</p>
      <p v-if="loginStatus == 'success'" class="text-green-500">Has iniciado sesión correctamente.</p>
      <p v-if="loginStatus == 'incorrectData'" class="text-red-500">Email o contraseña incorrectos</p>
      <p v-if="loginStatus == 'error'" class="text-red-500">
        Error al iniciar sesión. Vuelve a intentarlo de nuevo.
      </p>
    </div>
  </Main>
  <Footer></Footer>
</template>

<script setup>
import { useUserStore } from "~/stores"
const store = useUserStore()

// Access backend
const api = useAppConfig().api

const formData = ref({
  email: '',
  password: ''
})

const loginStatus = ref()

async function login() {
  let result = await useFetch(api + '/users/login', {
    method: 'post',
    body: {
      email: formData.value.email,
      password: formData.value.password
    }
  })
  if (result.status._value == "success") {
    const dataValue = result.data._value
    if (dataValue == 'Password does not match') {
      loginStatus.value = 'incorrectData'
    } else {
      // Sucessful log in
      store.setToken(dataValue.token)
      store.setUser(dataValue.user)
      store.setAdminSelected('users')
      loginStatus.value = 'success'
      await navigateTo('/dashboard')
    }
  } else {
    loginStatus.value = 'error'
  }
}
</script>
