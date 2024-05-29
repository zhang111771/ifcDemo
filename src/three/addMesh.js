import * as THREE from "three";
import sceneModule from "./sceneModule";
import ControlsModule from "./ControlsModule";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import CameraModule from "./CameraModule";
import { getMouseXY } from "../utils/utils";
import Raycaster from "./rayCaster";
import animate from "./animate";
import eventHub from "@/utils/eventHub";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";
import Composer from './composerModule'
class AddMesh {
  constructor(animate) {
    this.animate=animate
    this.composerModule=animate.composerModule
    this.dracoLoader = new DRACOLoader();
    this.gltfLoader = new GLTFLoader();
    this.dracoLoader.setDecoderPath("./draco/");
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
    this.scene = sceneModule.scene;
    //选中物体集合
    this.outlineMeshes = [];
    // this.addHelper()
    console.log(ControlsModule);
    this.camera = animate.cameraModule.activeCamera;
    this.rayCaster = new Raycaster(this.camera);

    this.addCity();
    this.addSceneBackground();
    this.addLight();
  }
  addHelper() {
    this.hlper = new THREE.AxesHelper(50);
    this.scene.add(this.hlper);
  }
  addCity() {
    this.actions = [];
    this.gltfLoader.load("./model/floor1.glb", (gltf) => {
      this.outlineMeshes=gltf.scene.children
      gltf.scene.children.map((child) => {
        //组需要做特殊处理
        if (child.isGroup) {
          child.visible = false;
          let geometryArray = [];
          let materialArray = [];

          child.traverse((item) => {
            if (item.isMesh) {
              item.geometry.deleteAttribute('uv')
              geometryArray.push(item.geometry);
              materialArray.push(item.material);
            }
          });
          const mergedGeometries = BufferGeometryUtils.mergeGeometries(
            geometryArray,
            true
          );
          const singleMergeMesh = new THREE.Mesh(
            mergedGeometries,
            materialArray
          );
          singleMergeMesh.position.copy(child.position);
          singleMergeMesh.scale.copy(child.scale);
          singleMergeMesh.rotation.copy(child.rotation);

          // singleMergeMesh.name = child.name + 'merge'
          singleMergeMesh.name = child.name;

          this.scene.add(singleMergeMesh);
          //外轮廓集合
          this.outlineMeshes.push(singleMergeMesh);
        } else {
          //外轮廓集合
          this.outlineMeshes.push(child);
        }
      });

      this.cityAnimations = gltf.animations;

      this.mixer = new THREE.AnimationMixer(gltf.scene);
      for (let i = 0; i < this.cityAnimations.length; i++) {
        const asction = this.mixer.clipAction(this.cityAnimations[i]);
        asction.loop = THREE.LoopRepeat;
        this.actions.push(asction);
      }
      this.actions.forEach((item) => {
        item.play();
      });
      this.animate.addAnimate(({ elapsedTime, deltaTime }) => {
        this.mixer.update(deltaTime + 0.01);
      });
      this.park = gltf.scene;
      this.scene.add(this.park);
      this.picker()
    });
  }
  picker() {
    //射线拾取设置外轮廓
    let isClick = false; // 标记是否为单击事件
    window.addEventListener("mousedown", () => {
      isClick = true; // 按下时为单击事件
      setTimeout(function () {
        isClick = false; // 按住一段时间后不再视为单击事件
      }, 300); // 设置一个时间阈值，超过该时间将不再视为单击事件
    });
    window.addEventListener("mouseup", (event) => {
      if (isClick) {
        let container = document.getElementById("three-container");
        let mouse = getMouseXY(event, container);
       
        let getIntersectObjects = this.rayCaster.getIntersectObjects(mouse, [
          ...this.outlineMeshes,
        ]);
       
        if (getIntersectObjects.length > 0) {
          let object = getIntersectObjects[0].object;
          this.clickTarget = object;
          console.log(object);
          this.composerModule.clickOutlineEffect.selection.set([object]);

          eventHub.emit("selectMesh", {
            name: object.name,
            threejsName: object.name,
            mouse: { x: event.clientX, y: event.clientY },
          
            cameraPos: this.camera.position,
          });
        }
      }
    });
  }
  addSceneBackground() {
    this.rgbeLoader = new RGBELoader();
    this.rgbeLoader
      .loadAsync("./textures/hdr/cloud_sky.hdr")
      .then((texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.background = texture;
        this.scene.environment = texture;
      });
  }
  addLight() {
    this.directionalLight = new THREE.DirectionalLight(
      (0xfffffff).toExponential,
      0.5
    );
    this.directionalLight.position.set(100, 20, 50);
    this.directionalLight.castShadow = true;
    // this.directionalLight.shadow.camera.near = 0.01;
    // this.directionalLight.shadow.camera.far = 500;
    // this.directionalLight.shadow.camera.right = 30;
    // this.directionalLight.shadow.camera.left = - 30;
    // this.directionalLight.shadow.camera.top	= 30;
    // this.directionalLight.shadow.camera.bottom = - 30;
    // this.directionalLight.shadow.mapSize.width = 1024;
    // this.directionalLight.shadow.mapSize.height = 1024;
    // this.directionalLight.shadow.radius = 4;
    // this.directionalLight.shadow.bias = - 0.00006;
    this.scene.add(this.directionalLight);
  }
}
export default  AddMesh;
