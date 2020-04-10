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
      mouseY: null,
      mouseX: null,
      canvasPosition: null
    };
  },
  mounted() {
    THREE.Cache.enabled = true;

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
      }).then(object3D => {
        this.threeDObj = object3D;
        this.threeDObj.castShadow = true;
        this.threeDObj.receiveShadow = true;
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
        this.canvasPosition = this.renderer.domElement.getBoundingClientRect();

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
        2000
      );

      camera.position.set(0, 0, 200);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.camera = camera;

      // let helper = new THREE.CameraHelper(camera);
      // this.scene.add(helper);
    },
    createRenderer() {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor("#1a1a1f");
      renderer.setSize(this.centerWidth, this.centerHeight);
      renderer.shadowMap.enabled = false;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.shadowMap.needsUpdate = true;
      this.renderer = renderer;
      this.canvas.appendChild(this.renderer.domElement);
      this.canvasPosition = this.renderer.domElement.getBoundingClientRect();
    },

    createLighting() {
      // lighting

      // Define the lights for the scene
      const light = new THREE.PointLight(0xffff);
      light.position.set(0, 0, 15);
      light.castShadow = true;

      this.scene.add(light);
      let lightAmb = new THREE.AmbientLight(0x000000);
      // add as global to use as a point light
      this.lighting = light;
      this.scene.add(lightAmb);

      // var sphereSize = 1;
      // var pointLightHelper = new THREE.PointLightHelper(
      //   this.lighting,
      //   sphereSize
      // );
      // this.scene.add(pointLightHelper);
    },
    handleMouse(val) {
      let mouse = new THREE.Vector2();
      if (val === true) {
        event.preventDefault();

        mouse.x = event.clientX - this.canvasPosition.left;
        mouse.y = -(event.clientY - this.canvasPosition.top);

        this.mouseX = mouse.x;
        this.mouseY = mouse.y;

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

        this.camera.position.x = this.camera.position.x * 0.05;
        this.camera.position.y = -(this.camera.position.y * 0.05);
        // this.threeDObj.lookAt(this.scene.position);

        this.threeDObj.position.copy(
          new THREE.Vector3(position.x - 50, position.y + 60, position.z / 3)
        );
        this.threeDObj.lookAt(this.lighting.position);

        if (this.mouseX > this.centerWidth / 2) {
          this.threeDObj.rotation.y += this.threeDObj.rotation.y += 0.07;
          this.threeDObj.rotation.z += this.threeDObj.rotation.z += 0.07;
        }
        if (this.mouseX < this.centerWidth / 2) {
          this.threeDObj.rotation.y += this.threeDObj.rotation.y -= 0.5;
          this.threeDObj.rotation.z -= this.threeDObj.rotation.z -= 0.07;
        }
        if (this.mouseY > this.centerHeight / 2.43) {
          this.threeDObj.rotation.x += this.threeDObj.rotation.x += 0.05;
        }
        if (this.mouseY < this.centerHeight / 2.43) {
          this.threeDObj.rotation.x += this.threeDObj.rotation.x -= 0.05;
        }
      } else {
        // this.camera.lookAt(this.scene.position);
        this.threeDObj.position.set(0, 0, 0);
        this.threeDObj.rotation.set(0, 0, 0);
        this.canvas.removeEventListener("mousemove", () => {});
        this.canvas.removeEventListener("scroll", () => {});
      }
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    }
  }
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
