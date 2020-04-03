<template>
  <div id="app" class="app">
    <Header />
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
@import "./reset.css";

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
}
</style>
