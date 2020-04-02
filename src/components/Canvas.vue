<template>
  <div></div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "Canvas",
  props: {
    msg: String
  },
  mounted() {    
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // let mouseX = 0;
    // let mouseY = 0;

    const canvas = document.getElementById("canvas");
    console.log(scene, renderer, canvas)
  }
};
</script>
<style lang="scss" scoped>
.canvas {
  background: limegreen;
  width: 80vw;
  height: 80vh;
  margin: 5% 0 0 10%;
  overflow: hidden;
}
</style>
