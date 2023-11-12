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
      <p>Aún no tengo cuenta, <a href="signup" class="underline text-primary">registrarme</a>.</p>
    </div>
  </Main>
  <Footer></Footer>
</template>

<script setup>
import { useUserStore } from "~/stores"
const store = useUserStore()

const formData = ref({
  email: '',
  password: ''
})

async function login() {
  let result = await useFetch('http://localhost:3001/users/login', {
    method: 'post',
    body: {
      email: formData.value.email,
      password: formData.value.password
    }
  })
  if (result.status._value == "success") {
    const dataValue = result.data._value
    if (dataValue == 'incorrect email or password') {
      alert('Email o contraseña incorrectos.')
    } else {
      // Sucessful log in
      store.setToken(dataValue.token)
      store.setUser(dataValue.user)
      console.log(store.user)
      alert('Has iniciado sesión correctamente.')
      await navigateTo('/dashboard')
    }
  } else {
    alert('Error al iniciar sesión.')
  }
}
</script>
