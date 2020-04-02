<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import * as THREE from "three";
import model from "@/assets/models/cartoonPlanets.obj";
import { ObjectLoader } from 'three';

export default {
  name: "Canvas",
  props: {
    msg: String
  },
  mounted() {
    const canvas = document.getElementById("canvas");
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas });

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // model
    ObjectLoader.load(model, function(object3D) {
      console.log("3d model", object3D);
      // scene.add(object3D);
    });

    console.log(renderer);
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
