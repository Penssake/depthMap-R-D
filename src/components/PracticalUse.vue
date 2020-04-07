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
      @mouseenter="handleMouse(true)"
      @mouseleave="handleMouse(false)"
    ></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

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
    // new Promise((resolve, reject) => {
    //   const loader = new OBJLoader();
    //   loader.setPath("./assets/models/");
    //   loader.load("ladybug.obj", function(object3D) {
    //     object3D.translateY(-20);
    //     if (!object3D) {
    //       reject("error loading your 3d object");
    //     } else {
    //       resolve(object3D);
    //     }
    //   });
    // }).then((object3D) => {
    //   this.threeDObj = object3D;
    //   this.createCamera();
    //   this.createRenderer();
    //   // this.createControls();
    //   this.createLighting();
    //   this.animate();
    // });

    window.addEventListener("resize", () => {
      // to make renderer responsive
      this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
      // reset the cameras aspect ratio
      this.camera.aspect = window.innerWidth / 2 / (window.innerHeight / 1.43);
      // needed for every update -- update matrix
      this.camera.updateProjectionMatrix();
    });
  },
  methods: {
    createThreeObj() {
      new Promise((resolve, reject) => {
        const loader = new OBJLoader();
        loader.setPath("./assets/models/");
        loader.load("ladybug.obj", function(object3D) {
          object3D.translateY(-20);
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
      camera.position.z = 100;
      this.camera = camera;
    },
    createRenderer() {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor("#1a1a1f");
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.43);
      this.renderer = renderer;
      this.canvas.appendChild(this.renderer.domElement);
    },
    // createControls() {
    //   // enable orbit control
    //   const controls = new OrbitControls(this.camera, this.renderer.domElement);
    //   controls.enableDamping = true;
    //   controls.campingFactor = 0.25;
    //   controls.enableZoom = true;
    //   this.controls = controls;
    // },
    createLighting() {
      // lighting && shadows
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFShadowMap;

      const spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(0, 500, 300);

      spotLight.castShadow = true;

      spotLight.shadow.mapSize.width = window.innerWidth / 2;
      spotLight.shadow.mapSize.height = window.innerHeight / 1.43;
      this.scene.add(spotLight);
    },
    handleMouse(val) {
      let globalY = 0;
      let currentZ = this.camera.position.z;
      if (val === true) {
        this.controls = new PointerLockControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.autoRotate = true;
        this.canvas.addEventListener("mousemove", () => {
          let x = event.clientX - window.innerWidth / 2;
          let y = event.clientY - window.innerHeight / 1.43;
          this.camera.position.y = y;
          this.camera.position.x = x;
          if (globalY === 0) {
            globalY = y;
          }
          if (y < globalY) {
            this.camera.position.z = currentZ - (globalY - y);
          } else {
            this.camera.position.z = currentZ - (globalY + y);
          }
          globalY = y;
        });
      } else {
        this.canvas.removeEventListener("mousemove", () => {});
        this.canvas.removeEventListener("scroll", () => {});

        this.camera.position.y = 0;
        this.camera.position.x = 0;
        this.camera.position.z = 200;
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
