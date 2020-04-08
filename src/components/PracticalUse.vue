<template>
  <div class="container">
    <div class="header-block">
      <h1>Title of application</h1>
      <h2>Lorem ipsum</h2>
      <p>lorem tale of a bug in a bugs life</p>
    </div>
    <div
      id="practical"
      class="practical"
      @mouseleave="handleMouse(false)"
    ></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

export default {
  name: "Practical",
  data() {
    return {
      canvas: null,
      threeDObj: null,
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      lighting: null,
    };
  },
  mounted() {
    this.canvas = document.getElementById("practical");
    this.createThreeObj();
    this.handleListeners();
  },
  methods: {
    createThreeObj() {
      new Promise((resolve, reject) => {
        const loader = new OBJLoader();
        loader.setPath("./assets/models/");
        loader.load("ladybug.obj", function(object3D) {
          // object3D.translateY(-20);
          if (!object3D) {
            reject("error loading your 3d object");
          } else {
            resolve(object3D);
          }
        });
      }).then((object3D) => {
        this.threeDObj = object3D;
        this.createScene();
        this.createCamera();
        this.createRenderer();
        // this.createControls();
        this.createLighting();
        this.animate();
      });
    },
    handleListeners() {
      window.addEventListener("resize", () => {
        // to make renderer responsive
        this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
        // reset the cameras aspect ratio
        this.camera.aspect =
          window.innerWidth / 2 / (window.innerHeight / 1.43);
        // needed for every update -- update matrix
        this.camera.updateProjectionMatrix();
      });

      this.canvas.addEventListener("mousemove", () => {
        this.handleMouse(true);
      });
    },
    createScene() {
      const scene = new THREE.Scene();
      scene.add(this.threeDObj);
      this.scene = scene;
    },
    createCamera() {
      // (field of view(FOV), aspect ratio, near plane, far plane)
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / 2 / (window.innerHeight / 1.43),
        1,
        1000
      );
      camera.position.set(0, 0, 200);
      this.camera = camera;

      let helper = new THREE.CameraHelper(camera);
      this.scene.add(helper);
    },
    createRenderer() {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor("#1a1a1f");
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
      this.renderer = renderer;
      this.canvas.appendChild(this.renderer.domElement);
    },

    createLighting() {
      // lighting && shadows
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFShadowMap;

      // const spotLight = new THREE.SpotLight(0xffffff);
      // spotLight.position.set(0, 0, 0);

      // spotLight.castShadow = true;

      // spotLight.shadow.mapSize.width = window.innerWidth / 2;
      // spotLight.shadow.mapSize.height = window.innerHeight / 1.43;
      // this.lighting = spotLight;
      // this.scene.add(spotLight);

      // Define the lights for the scene
      const light = new THREE.PointLight(0xffff);
      light.position.set(0, 0, 15);
      this.scene.add(light);
      var lightAmb = new THREE.AmbientLight(0x000000);
      this.lighting = light;
      this.scene.add(lightAmb);
    },
    handleMouse(val) {
      // var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      if (val === true) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth / 2) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight / 1.43) * 2 + 1;

        // Make the sphere follow the mouse
        var vector = new THREE.Vector3(mouse.x, mouse.y, 200);
        vector.unproject(this.camera);
        var dir = vector.sub(this.camera.position).normalize();
        var distance = -this.camera.position.z / dir.z;
        var pos = this.camera.position
          .clone()
          .add(dir.multiplyScalar(distance));

        this.lighting.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 2));
      } else {
        this.canvas.removeEventListener("mousemove", () => {});
        this.canvas.removeEventListener("scroll", () => {});
      }
    },
    animate() {
      requestAnimationFrame(this.animate);
      // this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>
<style lang="scss" scoped>
.header-block {
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(100, 109, 255);
  padding-left: 8%;
  h1 {
    font-size: 64px;
    padding-bottom: 20px;
  }
  h2 {
    font-size: 34px;
    padding-bottom: 20px;
  }
}
.container {
  height: 70vh;
  color: white;
  display: flex;
}
.practical {
  color: white;
  font-size: 32px;
}
</style>
