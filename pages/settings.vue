<template>
  <Header></Header>
  <Main>
    <div class="w-full max-w-4xl p-8 flex flex-col items-center">
      <h1 class="text-center">Ajustes</h1>
      <div class="py-5 w-80 flex flex-col items-center">
        <div class="w-full justify-start">Cambio username</div>
        <input 
          type="password" 
          class=" w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg" 
          placeholder="Contraseña" 
          required
          v-model="formData1.password"
        >
        <input 
          type="text" 
          class="w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg " 
          placeholder="Nuevo nombre de usuario"
          required
          v-model="formData1.newUserName"
        >
        <button class="bg-primary p-2.5 my-1 rounded-lg font-bold text-white" @click="handleUsernameChange()">Aplicar</button>
        <br>
        <p v-if="settingsStatus == 'usernameChangedSuccessfully'" class="text-green-500">Cambio de username exitoso.</p>
        <p v-if="settingsStatus == 'incorrectPassword1'" class="text-red-500">La contraseña no coincide, prueba de nuevo.</p>
      </div>      
      <div class="py-5 w-80 flex flex-col items-center">
        <div class="w-full justify-start">Cambio contraseña</div>
        <input 
          type="password" 
          class=" w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg" 
          placeholder="Contraseña" 
          required
          v-model="formData2.password"
        >
        <input 
          type="password" 
          class=" w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg" 
          placeholder="Nueva contraseña" 
          required
          v-model="formData2.newPassword"
        >
        <button class="bg-primary p-2.5 my-1 rounded-lg font-bold text-white" @click="handlePasswordChange()">Aplicar</button>
        <br>
        <p v-if="settingsStatus == 'passwordChangedSuccessfully'" class="text-green-500">Cambio de contraseña exitoso.</p>
        <p v-if="settingsStatus == 'incorrectPassword2'" class="text-red-500">La contraseña no coincide, prueba de nuevo.</p>

      </div>
    </div>
  </Main>
</template>

<script setup>
//FALTA IMPLEMENTAR QUE EL CAMBIO SE HAGA EFECTIVO EN LA BD

import { useUserStore } from "~/stores"
const store = useUserStore()
const token = store.token
const user = store.user
const headers = {'Authorization': `Bearer ${token}`}
const { data: usuario } = await useFetch('http://localhost:3001/users/' + user.id, {headers: headers})

const formData1 = ref({
  password: '',
  newUserName: '',
})

const formData2 = ref({
  password: '',
  newPassword: '',
})

const settingsStatus = ref()


// async function userExists(user) {

//   for (let i = 0; i < users._rawValue.length; i++) {
//     if (users._rawValue[i].name == user) {
//       userIndex = i;
//       // console.log(userIndex);
//       return true; // User with the given email exists
//     }
//   }
//   return false; // User does not exist
// }

async function passwordMatches(password) {
  let realPassword = usuario._rawValue.password
  return password == realPassword; // Password does not match
}

async function updateUsername(newUsername){
  console.log(newUsername);
  // console.log(users._rawValue[userIndex].id)
  let result = await useFetch('http://localhost:3001/users/' + user.id + '/setName', {
    method: 'put',
    headers: headers,
    body: {
      name: newUsername
    }
  })
  
  if(result.status._value == "success"){
    settingsStatus.value = 'usernameChangedSuccessfully'
    // console.log("Cambio de username exitoso");
    //alert(`¡Username changed successfully!`)
    // //alert(`Changing username from ${username} to ${newUsername}`)
  } else {
    //alert('Error changing username')
  }
}

// Function to handle the username change
async function handleUsernameChange() {
  const password = formData1.value.password;
  const newUsername = formData1.value.newUserName;

  // console.log(username);
  // console.log(password);
  // console.log(newUsername);

  // Check if the username exists and the password matches
  // if (await userExists(username)) {
  if (await passwordMatches(password)) {
    updateUsername(newUsername);
  } else {
    settingsStatus.value = 'incorrectPassword1'
    // Display an //alert for incorrect username or password
    //alert('Contraseña incorrecta. Por favor, verifica e intenta de nuevo.');
  }
  // } else {
    // Display an //alert for incorrect username 
    // //alert('No existe ningún usuario con ese username.');
  // }
}

async function updatePassword(newPassword){
  let result = await useFetch('http://localhost:3001/users/' + user.id + '/setPassword', {
    method: 'put',
    headers: headers,
    body: {
      password: newPassword
    }
  })
  
  if(result.status._value == "success"){
    settingsStatus.value = 'passwordChangedSuccessfully'
    console.log("Cambio de contraseña exitoso");
    //alert(`¡Username changed successfully!`)
    // //alert(`Changing username from ${username} to ${newUsername}`)
  } else {
    //alert('Error changing username')
  }

}

// Function to handle the password change
async function handlePasswordChange() {
  const password = formData2.value.password;
  const newPassword = formData2.value.newPassword;

  // Perform the verification logic here
  // You can use the fetched data from the server to verify the username and password

  // Check if the username exists and the password matches
  // if (await userExists(username)) {
    if (await passwordMatches(password)) {
      updatePassword(newPassword);
      //alert(`¡Password changed successfully!`)
      // //alert(`Changing password from ${password} to ${newPassword}`)
      // return true;
    } else {
      settingsStatus.value = 'incorrectPassword2'
      // Display an //alert for incorrect username or password
      //alert('Contraseña incorrecta. Por favor, verifica e intenta de nuevo.');
    }
  // } else {
    // Display an //alert for incorrect username 
    //alert('No existe ningún usuario con ese username.');
  // }
}
</script>
