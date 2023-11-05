<template>
  <div>
    <div id="sidebar" :style="{ width: sidebarWidth + 'px' }">
      <a href="#" class="closebtn" @click="toggleNav()">x</a>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Contact</a>
    </div>

    <div id="main" :style="{ marginLeft: mainMargin + 'px' }">
      <span style="font-size:30px;cursor:pointer" @click="toggleNav()">☰</span>
    </div>
  </div>
</template>

<script setup>
let sidebarWidth = 0;
let mainMargin = 0;

function toggleNav() {
  if (sidebarWidth === 0) {
    sidebarWidth = 250;
    mainMargin = 250;
  } else {
    sidebarWidth = 0;
    mainMargin = 0;
  }
}
</script>

  
<style scoped>
  body {
    font-family: "Arial", sans-serif;
    margin: 0;
    padding: 0;
  }
  
  #sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }
  
  #sidebar a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 18px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }
  
  #sidebar a:hover {
    color: #f1f1f1;
  }
  
  #sidebar .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }
  
  #main {
    transition: margin-left 0.5s;
    padding: 16px;
  }
  
  @media screen and (max-height: 450px) {
    #sidebar {
      padding-top: 15px;
    }
    #sidebar a {
      font-size: 14px;
    }
  }
</style>
  