import * as THREE from 'three'

// import CameraModule from './cameraModule'
class Raycaster{
    constructor(activeCamera){
        this.raycaster=new THREE.Raycaster()
        this.activeCamera=activeCamera
    }
    getIntersectObject(mouse,mesh){
        if(this.activeCamera){
            this.raycaster.setFromCamera(mouse,this.activeCamera)
            const getIntersectObject=this.raycaster.intersectObject(mesh)
            return getIntersectObject
        }else{
            return []
        }
      
    }
    getIntersectObjects(mouse,meshArray){
        if(this.activeCamera){
            this.raycaster.setFromCamera(mouse,this.activeCamera)
            const getIntersectObjects=this.raycaster.intersectObjects(meshArray,false)
            return getIntersectObjects
        }else {
            return []
        }
        
    }
}
export default Raycaster