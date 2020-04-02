<template>
  <div></div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import model from "@/assets/models/cartoonPlanets.obj";

export default {
  name: "Canvas",
  props: {
    msg: String
  },
  mounted() {
    // const canvas = document.getElementById("canvas");
    const scene = new THREE.Scene();
    // this camera is most similar to human eye / realism perspective
    const camera = new THREE.PerspectiveCamera(
      // field of view
      75,
      // aspect ration -- I want the browser
      window.innerWidth / window.innerHeight,
      // near plane
      1,
      // far plane
      1000
    );
    // most complex renderer
    // antialias smooths out result of render
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#32cd32');
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // const color = 0xffffff;
    // const intensity = 1;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(-1, 2, 4);
    // scene.add(light);

    // model
    const loader = new OBJLoader();
    loader.load(model, function(object3D) {
      console.log("3d model", object3D);
      scene.add(object3D);
      renderer.render(scene, camera);
    });
    console.log(renderer);
  },
  methods: {
    addModelToCanvas() {}
  }
};
</script>
<style lang="scss" scoped>

</style>
