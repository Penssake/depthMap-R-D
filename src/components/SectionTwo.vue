<template>
  <section class="section-content">
    <div class="header-block">
      <h1>Orbit Control</h1>
      <p>Pointer driven</p>
    </div>
    <div class="canvas-block">
      <PointerDrivenControls />
    </div>
  </section>
</template>
<script>
import PointerDrivenControls from "@/components/PointerDrivenControls";
export default {
  components: {
    PointerDrivenControls,
  },
};
</script>
<style lang="scss" scoped>
.section-content {
  height: 70vh;
  background-color: #fff;
  color: #646dff;
  display: flex;
  h1 {
    font-size: 64px;
  }
  p {
    font-size: 24px;
    line-height: 32px;
    color: #646dff;
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
    background-color: #5acc7b;
    height: 100%;
    width: 50%;
  }
}
</style>
