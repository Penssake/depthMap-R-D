<template>
  <div
    id="canvasTwo"
    class="canvasContainer"
    @mouseenter="handleMouse(true)"
    @mouseleave="handleMouse(false)"
  ></div>
</template>

<script>
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

export default {
  name: "PointerDrivenControls",
  data() {
    return {
      canvas: null,
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      lightingOne: null,
      lightingTwo: null
    };
  },
  mounted() {
    this.canvas = document.getElementById("canvasTwo");

    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createLighting();

    window.addEventListener("resize", () => {
      this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
      this.camera.aspect = window.innerWidth / 2 / (window.innerHeight / 1.43);
      this.camera.updateProjectionMatrix();
    });

    this.animate();
  },
  methods: {
    createScene() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000);

      const geometry = new THREE.BoxGeometry(40, 40, 40);
      const colorPicker = ["#8AFFAB", "#5acc7b", "#646DFF"];
      for (var i = 0; i < 100; i++) {
        let chosenIndex = Math.floor(Math.random() * colorPicker.length);
        let chosenColor = colorPicker[chosenIndex];

        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(chosenColor)
        });

        let currentCube = new THREE.Mesh(geometry, material);
        currentCube.position.x = Math.floor(Math.random() * 1000 - 500);
        currentCube.position.y = Math.floor(Math.random() * 1000 - 500);
        currentCube.position.z = Math.floor(Math.random() * 500 - 500);
        scene.add(currentCube);
      }
      this.scene = scene;
    },
    createCamera() {
      const camera = new THREE.PerspectiveCamera(75, 1, 1, 1000);
      console.log(camera.position.x, camera.position.y);
      camera.position.z = 200;
      this.camera = camera;
    },
    createRenderer() {
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
      this.canvas.appendChild(renderer.domElement);
      this.renderer = renderer;
    },
    createLighting() {
      const lightOne = new THREE.PointLight();
      lightOne.position.set(450, 200, 200);
      this.scene.add(lightOne);
      this.lightingOne = lightOne;

      const lightTwo = new THREE.PointLight();
      lightTwo.position.set(450, 200, 200);
      this.scene.add(lightTwo);
      this.lightingTwo = lightTwo;
    },
    handleMouse(val) {
      if (val === true) {
        this.canvas.addEventListener("mousemove", () => {
          this.controls = new PointerLockControls(this.camera, this.canvas);
          let xPos = event.clientX - window.innerWidth / 2;
          let yPos = event.clientY - window.innerHeight / 1.43;
          this.camera.position.y = yPos;
          this.camera.position.x = xPos;
        });
      } else {
        this.camera.position.y = 0;
        this.camera.position.x = 0;
        this.camera.position.z = 200;
      }
    },
    animate() {
      requestAnimationFrame(this.animate);
      // controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
<style lang="scss" scoped>
.canvasContainer canvas {
  display: block;
  cursor: pointer;
}
</style>
