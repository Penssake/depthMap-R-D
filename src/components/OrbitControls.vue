<template>
  <div ref="orbitControls" class="orbitControls">
    <Canvas />
  </div>
</template>

<script>
import Canvas from "@/components/Canvas";
export default {
  name: "OrbitControls",
  components: {
    Canvas
  }
};
</script>

<style>
.orbitControls {
  width: 100%;
  width: 100%;
}
</style>
