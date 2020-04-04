<template>
  <div id="app" class="app">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style>
@import "./reset.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.app {
  background-color: #1a1a1f;
  height: 100vh;
  margin: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
</style>
