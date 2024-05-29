import * as THREE from 'three'

class CameraModule{
    constructor(){
        const defaultCamera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1500)
        defaultCamera.position.set(-400,50,-100)
       
        this.cameras={
            default:defaultCamera
        }
        
        this.activeCamera=this.cameras.default
    }

}
export default new CameraModule()