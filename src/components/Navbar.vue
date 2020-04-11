<template>
  <nav class="nav">
    <button @click="$emit('prev')">
      <span>prev</span>
    </button>
    <button @click="$emit('next')">
      <span>next</span>
    </button>
  </nav>
</template>
<script>
export default {
  name: "NavBar"
};
</script>
<style lang="scss" scoped>
nav {
  display: flex;
  width: 100vw;
  justify-content: flex-end;
  button {
    position: relative;
    font-size: 18px;
    padding: 17px;
    color: #fff;
    background: #636bff;
    transition: all 300ms ease-in-out;
    margin-right: 40px;
  }

  button > span {
    border-bottom: solid 2px #fff;
  }
  button:hover {
    background: rgba(#636bff, 0.8);
  }
}
</style>
