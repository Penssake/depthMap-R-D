<template>
  <div id="canvasTwo" class="canvasContainer"></div>
</template>

<script>
import * as THREE from "three";
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

export default {
  name: "PointerDrivenControls",
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
    this.canvas = document.getElementById("canvasTwo");

    this.createScene();
    this.createCamera();
    this.createRenderer();
    // this.createControls();
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
      scene.background = new THREE.Color(0xaaaaaa);

      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#5acc7b")
      });

      let boxMeshX = 0.3;
      let boxMeshY = 0.3;
      for (let i = 0; i < 10; i++) {
        let boxMesh = new THREE.Mesh(geometry, material);
        boxMesh.translateY(boxMeshY);
        boxMesh.translateX(boxMeshX);
        scene.add(boxMesh);
        boxMeshX = boxMeshX += Math.random() * 2;
        boxMeshY = boxMeshY += Math.random() * 2;
      }
      this.scene = scene;
    },
    createCamera() {
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / 2 / (window.innerHeight / 1.43),
        0.1,
        1000
      );

      camera.position.z = 2;
      this.camera = camera;
    },
    createRenderer() {
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
      this.canvas.appendChild(renderer.domElement);
      this.renderer = renderer;
    },
    createLighting() {
      const light = new THREE.DirectionalLight();
      light.position.set(0, 1, 2);
      this.scene.add(light);
      this.lighting = light;
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
}
</style>
