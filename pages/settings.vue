<template>
  <HeaderIn></HeaderIn>
  <Main>
    <div class="w-full max-w-4xl p-8 flex flex-col items-center">
      <h1 class="text-center">Ajustes</h1>
      <div class="py-5 w-80 flex flex-col items-center">
        <div class="w-full justify-start">Cambio username</div>
        <input 
          type="text" 
          class="w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg " 
          placeholder="Nombre de usuario" 
          required
          v-model="formData1.name"
        >
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
      </div>      
      <div class="py-5 w-80 flex flex-col items-center">
        <div class="w-full justify-start">Cambio contraseña</div>
        <input 
          type="text" 
          class="w-full p-2.5 my-1 border-0 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary text-gray-900 rounded-lg " 
          placeholder="Nombre de usuario" 
          required
          v-model="formData2.name"
        >
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
      </div>
    </div>
  </Main>
</template>

<script setup>
const formData1 = ref({
  name: '',
  password: '',
  newUserName: '',
})

const formData2 = ref({
  name: '',
  password: '',
  newPassword: '',
})

let userIndex = 0;

async function userExists(user) {
  const { data: users } = await useFetch('http://localhost:3001/users', {
    method: 'get',
    body: {
      name: formData1.value.name,
      name: formData2.value.name,
      password: formData1.value.password,
      password: formData2.value.password,
    }
  });

  for (let i = 0; i < users._rawValue.length; i++) {
    if (users._rawValue[i].name == user) {
      userIndex = i;
      console.log(userIndex);
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


// Function to handle the username change
async function handleUsernameChange() {
  const username = formData1.name;
  const password = formData1.password;
  const newUsername = formData1.newUserName;


  // Check if the username exists and the password matches
  if (await userExists(username)) {
    if (await passwordMatches(password)) {
      console.log(`Changing username from ${username} to ${newUsername}`);
      // return true;
    } else {
      // Display an alert for incorrect username or password
      alert('Usuario o contraseña incorrectos. Por favor, verifica e intenta de nuevo.');
    }
  } else {
    // Display an alert for incorrect username 
    // alert('No existe ningún usuario con ese username/email.');
  }

}


// Function changeUsername() that uses the previous function handleUsernameChange(), 
// if it returns true, makes effectives the changes in the database
// async function changeUsername() {
//   if (await handleUsernameChange()) {
//     const { data: users } = await useFetch('http://localhost:3001/users');
//     const user = users._rawValue[userIndex];
//     user.name = newUsernameInput.value;
//     await useFetch('http://localhost:3001/users/' + user.id, {
//       method: 'put',
//       body: JSON.stringify(user)
//     })
//   }
// }

// Function to handle the password change
async function handlePasswordChange() {
  const username = usernameChangeInput.value;
  const password = passwordChangeInput.value;
  const newPassword = newPasswordInput.value;

  // Perform the verification logic here
  // You can use the fetched data from the server to verify the username and password

  // Example: Fetch user data from the server
  const { data: users } = await useFetch('http://localhost:3001/users');

  // Check if the username exists and the password matches
  const user = users._rawValue.find(user => (user.email === username || user.name === username) && user.password === password);

  if (user) {
    // Username and password are correct, you can proceed with the password change logic
    console.log(`Changing password for user ${username}`);
  } else {
    // Display an alert for incorrect username or password
    alert('Usuario o contraseña incorrectos. Por favor, verifica e intenta de nuevo.');
  }
}
</script>
