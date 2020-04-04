<template>
  <nav class="nav">
    <router-link to="/practical">
      <span>Practical application</span>
    </router-link>
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
    position: relative;
    display: inline-block;
    font-size: 18px;
    padding: 17px;
    text-decoration: none;
    color: #fff;
    background: #636bff;
    transition: all 300ms ease-in-out;
  }

  a > span {
    border-bottom: solid 2px #fff;
  }
  a:hover {
    background: rgba(#636bff, 0.8);
  }
}
</style>
