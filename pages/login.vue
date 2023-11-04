<template>
  <Header></Header>
  <Main>
    <div class="w-full max-w-4xl p-8 flex flex-col items-center">
      <h1 class="text-center">Iniciar sesión</h1>
      <div class="py-5 w-80 flex flex-col items-center">
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
        <button class="bg-primary p-2.5 my-1 rounded-lg font-bold text-white" @click="login">Entrar</button>
      </div>
      <p>Aún no tengo cuenta, <a href="signup" class="underline text-primary">regístrarme</a>.</p>
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
      store.isLoggedIn = true
      store.token = dataValue
      console.log(store.token)
      alert('Has iniciado sesión correctamente.')
      await navigateTo('/dashboard')
    }
  } else {
    alert('Error al iniciar sesión.')
  }
}
/*let userIndex = 0;

// Function to check if a user with the given email exists
async function userExists(email) {
  const { data: users } = await useFetch('http://localhost:3001/users');

  for (let i = 0; i < users._rawValue.length; i++) {
    if (users._rawValue[i].email == email) {
      userIndex = i;
      return true; // User with the given email exists
    }
  }

  return false; // User does not exist
}

async function passwordMatches(password) {
  const { data: users } = await useFetch('http://localhost:3001/users');

  if (users._rawValue[userIndex].password == password) {
    return true; // Password matches
  }

  return false; // Password does not match
}

// Function to check if the user is an admin
async function checkIfAdmin() {
  const { data: users } = await useFetch('http://localhost:3001/users');

  if (users._rawValue[userIndex].isadmin) {
    return true; // User is an admin
  }

  return false; // User is not an admin or password does not match
}

// Function to handle the login process
async function handleLogin() {
  let email = document.querySelector('input[type="text"]').value;
  let password = document.querySelector('input[type="password"]').value;

  if (await userExists(email)) {
    if (await passwordMatches(password)){
      // User exists, check if admin and password matches
      if (await checkIfAdmin(email, password)) {
        window.location.href = 'admin';
      } else {
        window.location.href = 'dashboard';
      }
    }
    else {
      // Password does not match, show alert
      alert('La contraseña no coincide. Por favor, inténtalo de nuevo.');
    }
  } else {
    // User does not exist, show alert
    alert('El usuario no existe. Por favor, regístrate.');
  }
}

// Call the handleLogin function when needed, e.g., on button click
// Example: <button @click="handleLogin">Iniciar sesión</button>*/
</script>