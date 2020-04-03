<template>
  <div id="canvas" class="canvasContainer"></div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  name: "MouseClickControls",
  data() {
    return {
      renderer: null,
      canvas: null
    };
  },
  mounted() {
    this.canvas = document.getElementById("canvas");
    const scene = new THREE.Scene();
    // this camera is most similar to human eye / realism perspective
    const camera = new THREE.PerspectiveCamera(
      // field of view
      75,
      // aspect ration -- I want the canvas
      window.innerWidth / 2 / (window.innerHeight / 1.43),
      // near plane
      1,
      // far plane -- depends on how large model is -- then position zed and x || y position of object
      500
    );

    camera.position.z = 10;
    this.createRenderer();
    // const renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.setClearColor("#fff");
    // renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
    // canvas.appendChild(renderer.domElement);

    // this.renderer = renderer;

    // enable orbit control
    let controls = new OrbitControls(camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.campingFactor = 0.25;
    controls.enableZoom = true;

    // lighting && shadows
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 4000, 300);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = window.innerWidth / 2;
    spotLight.shadow.mapSize.height = window.innerHeight / 1.43;
    scene.add(spotLight);

    // model
    const loader = new OBJLoader();
    let globalObj = null;
    loader.setPath("./assets/models/");
    loader.load("model.obj", function(object3D) {
      globalObj = object3D;
      globalObj.translateY(-2.5);
      scene.add(globalObj);
    });

    // material

    window.addEventListener("resize", () => {
      // to make renderer responsive
      this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
      // reset the cameras aspect ratio
      camera.aspect = window.innerWidth / 2 / (window.innerHeight / 1.43);
      // needed for every update -- update matrix
      camera.updateProjectionMatrix();
    });

    var animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      if (this.renderer) {
        this.renderer.render(scene, camera);
      }
    };
    animate();
  },
  methods: {
    createRenderer() {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor("#fff");
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
      this.renderer = renderer;
      this.canvas.appendChild(this.renderer.domElement);
    }
  }
};
</script>
<style lang="scss" scoped>
.canvasContainer canvas {
  display: block;
}
</style>
