<template>
  <div id="app">
    <Canvas />
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue'

export default {
  name: 'App',
  components: {
    Canvas
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
