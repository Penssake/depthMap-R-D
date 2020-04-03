<template>
  <div id="canvas" class="canvasContainer"></div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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
      // far plane -- depends on how large model is -- then position zed and x || y position of object
      10000
    );

    // camera helper for devlopment
    let cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);

    // large model -- need to reposition camera zed
    camera.position.z = 5000;
    // most complex renderer
    // antialias smooths out result of render
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#32cd32");
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);

    // enable orbit control
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.campingFactor = 0.25;
    controls.enableZoom = true;

    window.addEventListener("resize", () => {
      // to make renderer responsive
      renderer.setSize(window.innerWidth, window.innerHeight);
      // reset the cameras aspect ratio
      camera.aspect = window.innerWidth / window.innerHeight;
      // needed for every update -- update matrix
      camera.updateProjectionMatrix();
    });

    // lighting

    // ambient light, shaped will be flat
    // let light = new THREE.AmbientLight(0xffffff, 0.5);

    // pointed light, light from a point, shapes shown
    // let light = new THREE.HemisphereLight(0xffffff, 0x0808dd, 1)

    // scene.add(light)

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 4000, 300);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = window.innerWidth;
    spotLight.shadow.mapSize.height = window.innerHeight;

    // spotLight.shadow.camera.near = 500;
    // spotLight.shadow.camera.far = 4000;
    // spotLight.shadow.camera.fov = 30;
    // can have a bottom/top/side mesh to recieve shadow as well as cast shadow from 3D object

    scene.add(spotLight);

    // model
    const loader = new OBJLoader();
    loader.setPath("./assets/models/");
    loader.load("cartoonPlanets.obj", function(object3D) {
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
.canvasContainer canvas {
  display: block;
}
</style>
