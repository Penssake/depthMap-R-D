<template>
  <div id="canvasTwo" class="canvasContainer"></div>
</template>

<script>
import * as THREE from "three";
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

export default {
  name: "PointerDrivenControls",
  mounted() {
    const canvas = document.getElementById("canvasTwo");
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

    const light = new THREE.DirectionalLight();
    light.position.set(0, 1, 2);
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 2 / (window.innerHeight / 1.43),
      0.1,
      1000
    );

    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
    canvas.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
      camera.aspect = window.innerWidth / 2 / (window.innerHeight / 1.43);
      camera.updateProjectionMatrix();
    });

    let animate = () => {
      requestAnimationFrame(animate);
      // controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }
};
</script>
<style lang="scss" scoped>
.canvasContainer canvas {
  display: block;
}
</style>
