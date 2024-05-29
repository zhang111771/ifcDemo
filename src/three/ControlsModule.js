import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import CameraModule from './CameraModule'
import rendererModule from './rendererModule'
import * as THREE from 'three'
class ControlsModule{
    constructor(){
        this.controls =new OrbitControls(CameraModule.activeCamera,rendererModule.renderer.domElement)
       
        // this.controls.enableDamping=true
    }
}
export default new ControlsModule()