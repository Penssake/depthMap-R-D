<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import * as THREE from "three";

export default {
  name: "Canvas",
  props: {
    msg: String
  },
  mounted() {    
    const canvas = document.getElementById("canvas");
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({canvas});
    // TODO
    // let mouseX = 0;
    // let mouseY = 0;

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    console.log(scene, renderer, canvas)
  }
};
</script>
<style lang="scss" scoped>
canvas {
  width: 80vw;
  height: 80vh;
  margin: 5% 0 0 10%;
  overflow: hidden;
}
</style>
