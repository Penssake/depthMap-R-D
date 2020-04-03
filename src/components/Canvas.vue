<template>
  <div id="canvas" class="canvasContainer"></div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  name: "Canvas",
  mounted() {
    const canvas = document.getElementById("canvas");
    const scene = new THREE.Scene();
    // this camera is most similar to human eye / realism perspective
    const camera = new THREE.PerspectiveCamera(
      // field of view
      75,
      // aspect ration -- I want the browser
      window.innerWidth / 2 / (window.innerHeight / 1.5),
      // near plane
      1,
      // far plane -- depends on how large model is -- then position zed and x || y position of object
      500
    );
    // camera helper for devlopment
    let cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);
    // large model -- need to reposition camera zed
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#5ACC7B");
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.5);
    canvas.appendChild(renderer.domElement);

    // enable orbit control
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.campingFactor = 0.25;
    controls.enableZoom = true;

    // lighting && shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 4000, 300);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = window.innerWidth / 2;
    spotLight.shadow.mapSize.height = window.innerHeight / 1.5;
    scene.add(spotLight);

    // model
    const loader = new OBJLoader();
    let globalObj = null;
    loader.setPath("./assets/models/");
    loader.load("model.obj", function(object3D) {
      globalObj = object3D;
      scene.add(globalObj);
      renderer.render(scene, camera);
    });

    // material

    window.addEventListener("resize", () => {
      // to make renderer responsive
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.5);
      // reset the cameras aspect ratio
      camera.aspect = window.innerWidth / 2 / (window.innerHeight / 1.5);
      // needed for every update -- update matrix
      camera.updateProjectionMatrix();
    });

    var animate = () => {
      requestAnimationFrame(animate);
      controls.update();
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
