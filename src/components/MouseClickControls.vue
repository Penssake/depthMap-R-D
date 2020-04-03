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
      canvas: null,
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      lighting: null
    };
  },
  mounted() {
    this.canvas = document.getElementById("canvas");

    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createControls();
    this.createLighting();

    window.addEventListener("resize", () => {
      // to make renderer responsive
      this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
      // reset the cameras aspect ratio
      this.camera.aspect = window.innerWidth / 2 / (window.innerHeight / 1.43);
      // needed for every update -- update matrix
      this.camera.updateProjectionMatrix();
    });

    this.animate();
  },
  methods: {
    createScene() {
      // this in reference to vues this, does not exist inside of your model loader
      const scene = new THREE.Scene();
      const loader = new OBJLoader();
      loader.setPath("./assets/models/");
      loader.load("model.obj", function(object3D) {
        object3D.translateY(-2.5);
        scene.add(object3D);
      });
      this.scene = scene;
    },
    createCamera() {
      // (field of view(FOV), aspect ratio, near plane, far plane)
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / 2 / (window.innerHeight / 1.43),
        1,
        500
      );
      camera.position.z = 10;
      this.camera = camera;
    },
    createRenderer() {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor("#fff");
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
      this.renderer = renderer;
      this.canvas.appendChild(this.renderer.domElement);
    },
    createControls() {
      // enable orbit control
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.enableDamping = true;
      controls.campingFactor = 0.25;
      controls.enableZoom = true;
      this.controls = controls;
    },
    createLighting() {
      // lighting && shadows
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFShadowMap;

      const spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(0, 4000, 300);

      spotLight.castShadow = true;

      spotLight.shadow.mapSize.width = window.innerWidth / 2;
      spotLight.shadow.mapSize.height = window.innerHeight / 1.43;
      this.scene.add(spotLight);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
<style lang="scss" scoped>
.canvasContainer canvas {
  display: block;
}
</style>
