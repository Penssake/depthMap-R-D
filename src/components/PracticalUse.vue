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

      const spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(0, 500, 300);

      spotLight.castShadow = true;

      spotLight.shadow.mapSize.width = window.innerWidth / 2;
      spotLight.shadow.mapSize.height = window.innerHeight / 1.43;
      this.scene.add(spotLight);
    },
    handleMouse(val) {
      if (val === true) {
        let center = window.innerWidth / 4;
        let currentX = event.clientX - window.innerWidth / 2;
        let currentY = this.threeDObj.rotation.y;

        if (currentX > center + 10) {
          this.threeDObj.rotation.y = currentY += 0.05;
          // this.threeDObj.rotation.x += 0.05;
        } else if (currentX < center + 10) {
          this.threeDObj.rotation.y = currentY -= 0.05;
          // this.threeDObj.rotation.x -= 0.02;
        }
        console.log("center", center);
        console.log("curent", currentX);

        // mouse.x = localX / 2;
        // mouse.y = localY / 2;
        // raycaster.setFromCamera(mouse, this.camera);
        // raycaster.ray.intersectPlane(plane, pointOfIntersection);
        // console.log(pointOfIntersection);
        // this.threeDObj.lookAt(pointOfIntersection);
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
