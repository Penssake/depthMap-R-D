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
      centerHeight: null,
      centerWidth: null,
    };
  },
  mounted() {
    this.centerWidth = window.innerWidth / 2;
    this.centerHeight = window.innerHeight / 1.43;

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
        this.centerWidth = window.innerWidth / 2;
        this.centerHeight = window.innerHeight / 1.43;
        // to make renderer responsive
        this.renderer.setSize(this.centerWidth, this.centerHeight);
        // reset the cameras aspect ratio
        this.camera.aspect = this.centerWidth / this.centerHeight;
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

      let geometry = new THREE.CircleGeometry(100, 100);
      let material = new THREE.MeshBasicMaterial({ color: "#ffffff" });
      let circle = new THREE.Mesh(geometry, material);
      scene.add(circle);

      let geometryTwo = new THREE.CircleGeometry(40, 100);
      let materialTwo = new THREE.MeshBasicMaterial({ color: "#ffffff" });
      let circleTwo = new THREE.Mesh(geometryTwo, materialTwo);
      circleTwo.position.set(-150, 100, 0);
      scene.add(circleTwo);
    },
    createCamera() {
      // (field of view(FOV), aspect ratio, near plane, far plane)
      const camera = new THREE.PerspectiveCamera(
        75,
        this.centerWidth / this.centerHeight,
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
      renderer.setSize(this.centerWidth, this.centerHeight);
      this.renderer = renderer;
      this.canvas.appendChild(this.renderer.domElement);
    },

    createLighting() {
      // lighting && shadows
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFShadowMap;

      // Define the lights for the scene
      const light = new THREE.PointLight(0xffff);
      light.position.set(0, 0, 15);
      this.scene.add(light);
      let lightAmb = new THREE.AmbientLight(0x000000);
      // add as global to use as a point light
      this.lighting = light;
      this.scene.add(lightAmb);

      var sphereSize = 1;
      var pointLightHelper = new THREE.PointLightHelper(
        this.lighting,
        sphereSize
      );
      this.scene.add(pointLightHelper);
    },
    handleMouse(val) {
      let mouse = new THREE.Vector2();
      if (val === true) {
        event.preventDefault();
        let canvasPosition = this.renderer.domElement.getBoundingClientRect();

        mouse.x = (event.clientX - canvasPosition.left) * 2 - 1;
        mouse.y = -(event.clientY - canvasPosition.top) * 2 + 1;

        // light/mouse movement
        let vector = new THREE.Vector3(mouse.x, mouse.y, 0);
        let direction = vector.sub(this.camera.position).normalize();
        let distance = this.camera.position.z / 2.4;
        let position = this.camera.position
          .clone()
          .add(direction.multiplyScalar(distance));

        this.lighting.position.copy(
          new THREE.Vector3(position.x - 40, position.y + 60, position.z)
        );

        this.threeDObj.position.copy(
          new THREE.Vector3(position.x - 50, position.y + 60, position.z / 3)
        );
      } else {
        this.threeDObj.position.set(0, 0, 0);
        this.canvas.removeEventListener("mousemove", () => {});
        this.canvas.removeEventListener("scroll", () => {});
      }
    },
    animate() {
      requestAnimationFrame(this.animate);
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
  color: #646dff;
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
