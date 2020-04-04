<template>
  <nav class="nav">
    <router-link to="/practical">Practical application</router-link>
  </nav>
</template>
<script>
export default {
  name: "NavBar"
};
</script>
<style lang="scss" scoped>
nav {
  width: 100%;
  background-color: #ffaf64;
  padding: 20px;
  a {
    color: white;
    font-size: 32px;
    // text-decoration: none;
  }
}
</style>
