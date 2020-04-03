<template>
  <section class="section-content">
    <div class="header-block">
      <h1>Orbit Control</h1>
      <p>Controls:</p>
      <p>left and right mouse</p>
      <p>scroll</p>
    </div>
    <div class="canvas-block">
      <MouseClickControls />
    </div>
  </section>
</template>
<script>
import MouseClickControls from "@/components/MouseClickControls";
export default {
  components: {
    MouseClickControls
  }
};
</script>
<style lang="scss" scoped>
.section-content {
  height: 70vh;
  background-color: rgb(100, 109, 255);
  color: white;
  display: flex;
  h1 {
    font-size: 64px;
  }
  p {
    font-size: 24px;
    line-height: 32px;
    color: #fff;
    text-shadow: 1px 1px #000;
  }
  .header-block {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .canvas-block {
    background-color: #fff;
    height: 100%;
    width: 50%;
  }
}
</style>
