<template>
  <div id="app" class="app">
    <SectionOne />
    <SectionTwo />
  </div>
</template>

<script>
import SectionOne from "@/components/SectionOne.vue";
import SectionTwo from "@/components/SectionTwo.vue";

export default {
  name: "App",
  components: {
    SectionOne,
    SectionTwo
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
