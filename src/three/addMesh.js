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
import Colider from './colliderModule'
import { gsap } from "gsap"
class AddMesh {
  constructor(animate) {
    this.animate = animate
    this.composerModule = animate.composerModule
    this.dracoLoader = new DRACOLoader();
    this.gltfLoader = new GLTFLoader();
    this.dracoLoader.setDecoderPath("./draco/");
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
    this.scene = sceneModule.scene;
    //选中物体集合
    this.outlineMeshes = [];
    // this.addHelper()

    this.camera = animate.cameraModule.activeCamera;
    this.rayCaster = new Raycaster(this.camera);

    this.colider=null
    this.addCity();
    this.addSceneBackground();
    this.addLight();
    this.meshNameIndex=['-3楼','-2楼','-1楼','1楼','2楼','3楼','4楼','5楼','6楼','7楼','8楼','9楼','10楼','11楼','12楼','13楼','14楼','15楼','16楼','顶楼']
    eventHub.on("resetFloor", () => {
      eventHub.emit("clearTags")
      ControlsModule.controls.target=new THREE.Vector3(0, 50, 0)
      this.outlineMeshes.map((mesh) => {
    
        mesh.visible = true
        gsap.to(mesh.position,{
          x: mesh.oriPosition.x,
          y: mesh.oriPosition.y,
          z: mesh.oriPosition.z,
          duration: 1.5,
         
        })
        
      })
      gsap.to(this.camera.position, {
        duration: 1.5,
        x:2.8,
        y: 100,
        z: 100,
      }
      )



    })
    eventHub.on("offsetFloor", () => {
      console.log(this.camera)
      let offsetY = 5
      let offsetX=20
      this.outlineMeshes.map((mesh) => {
       
        let position = mesh.position
       
        switch (mesh.name) {
          case "-3楼":
            gsap.to(mesh.position,{            
              x:position.x+offsetX,
              duration:1.5
            })
            break;
          case "-2楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY,
              x:position.x-offsetX,
              duration:1.5
            })
            
            break;
          case "-1楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 2,
              x:position.x+offsetX,
              duration:1.5
            })
         
            break;
          case "1楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 3,
              x:position.x-offsetX,
              duration:1.5
            })
            break;
          case "2楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 4,
              x:position.x+5,
              duration:1.5
            })
            break;
          case "3楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 5,
              x:position.x-offsetX,
              duration:1.5
            })
            break;
          case "4楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 6,
              x:position.x+offsetX,
              duration:1.5
            })
            break;
          case "5楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 7,
              x:position.x-offsetX,
              duration:1.5
            })
            break;
          case "6楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 8,
              x:position.x+offsetX,
              duration:1.5
            })
            break;
          case "7楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 9,
              x:position.x-offsetX,
              duration:1.5
            })
            break;
          case "8楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 10,
              x:position.x+offsetX,
              duration:1.5
            })
            break;
          case "9楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 11,
              x:position.x-offsetX,
              duration:1.5
            })
            break;
          case "10楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 12,
              x:position.x+offsetX,
              duration:1.5
            })
            break;
          case "11楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 13,
              x:position.x-offsetX,
              duration:1.5
            })
            break;
          case "12楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 14,
              x:position.x+offsetX,
              duration:1.5
            })
            break;
          case "13楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 15,
              x:position.x-offsetX,
              duration:1.5
            })
            break;
          case "14楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 16,
              x:position.x+offsetX,
              duration:1.5
            })
            break;
          case "15楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 17,
              x:position.x-offsetX,
              duration:1.5
            })
            break;
          case "16楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 18,
              x:position.x+offsetX,
              duration:1.5
            })
            break;
          case "顶楼":
            gsap.to(mesh.position,{
              y:position.y+offsetY * 19,
              x:position.x-offsetX,
              duration:1.5
            })
            break;
            case "楼外边":
              gsap.to(mesh.position,{
                y:position.y-offsetY *15,
         
                duration:1.5
              })
              break;
        }
      })
    })
  }
  addHelper() {
    this.hlper = new THREE.AxesHelper(50);
    this.scene.add(this.hlper);
  }
  addCity() {
    this.actions = [];
    this.gltfLoader.load("./model/floor3.glb", (gltf) => {
      
     
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
          singleMergeMesh.oriPosition=new THREE.Vector3(child.position.x,child.position.y,child.position.z)
          singleMergeMesh.castShadow = true
          singleMergeMesh.receiveShadow = true
          this.scene.add(singleMergeMesh);
          //外轮廓集合
          this.outlineMeshes.push(singleMergeMesh);
        } else {
          child.oriPosition=new THREE.Vector3(child.position.x,child.position.y,child.position.z)
          // child.castShadow = true
          // child.receiveShadow = true
          //外轮廓集合
          this.outlineMeshes.push(child);
        }
      });
      console.log(this.scene)
      let group=new THREE.Group()
      this.outlineMeshes.map((mesh)=>{
        if(mesh.isMesh){
          group.add(mesh)
        }
      })
      this.scene.add(group)
      this.colider=new Colider(group,this.camera)
      this.animate.addAnimate( this.colider.update.bind(this.colider))
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

    window.addEventListener("dblclick", (event) => {
      eventHub.emit("clearTags")
      if (this.clickTarget) {
        this.outlineMeshes.map((item) => {
          if (item.name != this.clickTarget.name) {
            item.visible = false
          }
        })
        ControlsModule.controls.target = this.clickTarget.position
        gsap.to(this.camera.position, {
          x: this.clickTarget.position.x,
          y: this.clickTarget.position.y + 5,
          z: this.clickTarget.position.z - 5,
          duration: 1.5
        })
      }

    })


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
     1
    );
    this.directionalLight.position.set(0, 20, 50);
    // this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.near = 0.01;
    this.directionalLight.shadow.camera.far = 500;
    this.directionalLight.shadow.camera.right = 30;
    this.directionalLight.shadow.camera.left = - 30;
    this.directionalLight.shadow.camera.top	= 30;
    this.directionalLight.shadow.camera.bottom = - 30;
    this.directionalLight.shadow.mapSize.width = 1024;
    this.directionalLight.shadow.mapSize.height = 1024;
    this.directionalLight.shadow.radius = 4;
    this.directionalLight.shadow.bias = - 0.00006;
    this.scene.add(this.directionalLight);
  }
}
export default AddMesh;
