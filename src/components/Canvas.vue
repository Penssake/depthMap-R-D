<template>
  <div id="canvas" class="canvasContainer"></div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
// import model from "@/assets/models/cartoonPlanets.obj";

export default {
  name: "Canvas",
  props: {
    msg: String
  },
  mounted() {
    const canvas = document.getElementById("canvas");
    const scene = new THREE.Scene();
    // this camera is most similar to human eye / realism perspective
    const camera = new THREE.PerspectiveCamera(
      // field of view
      75,
      // aspect ration -- I want the browser
      window.innerWidth / window.innerHeight,
      // near plane
      1,
      // far plane -- depends on how large model is -- then positionzed and x || y position of object
      10000
    );
    // large model -- need to reposition camara zed
    camera.position.z = 4000;
    // most complex renderer
    // antialias smooths out result of render
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#32cd32');
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
      // to make renderer responsive
      renderer.setSize(window.innerWidth, window.innerHeight);
      // reset the cameras aspect ratio
      camera.aspect = window.innerWidth / window.innerHeight;
      // needed for every update -- update matrix
      camera.updateProjectionMatrix();
    })
    // come back to lighting

    // model
    const loader = new OBJLoader();
    loader.setPath('./assets/models/')
    loader.load('cartoonPlanets.obj', function(object3D) {
      console.log("3d model", object3D);
      scene.add(object3D);
      object3D.position.x -= 4000;
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
// remove scroll bars?? not working
html, body {
  margin: 0;
  height: 100vh;
  box-sizing: border-box;
  -webkit-box-sizing:border-box; 
}
.canvasContainer canvas {
  display: block;
}
</style>
