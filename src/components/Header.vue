<template>
  <header class="header-content">
    <div class="header-block">
      <h1>3D Orbit Control</h1>
    </div>
    <div class="canvas-block">
      <OrbitControls />
    </div>
  </header>
</template>
<script>
import OrbitControls from "@/components/OrbitControls";
export default {
  components: {
    OrbitControls
  }
};
</script>
<style lang="scss" scoped>
.header-content {
  height: 70vh;
  font-size: 64px;
  background-color: rgb(100, 109, 255);
  color: white;
  display: flex;
  .header-block {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .canvas-block {
    background-color: #5acc7b;
    height: 100%;
    width: 50%;
  }
}
</style>
