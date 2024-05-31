import rendererModule from './rendererModule'
import SceneModule from './sceneModule'
import CameraModule from './CameraModule'
import ControlsModule from './ControlsModule'
import ComposerModule from './composerModule'
import * as THREE from 'three'
class Animate{
    constructor(){
       this.fns=[]
        
        this.rendererModule=rendererModule
        this.sceneModule=SceneModule
        this.cameraModule=CameraModule
        this.composerModule=new ComposerModule(this.sceneModule,this.rendererModule,this.cameraModule)
        this.animateUpdate()
    }
    animateUpdate(){
        
        const clock=new THREE.Clock()
       
        const animate= ()=>{
            const elapsedTime= clock.getElapsedTime()
            const deltaTime=clock.getDelta()
            // rendererModule.renderer.render(SceneModule.scene,CameraModule.activeCamera)
        
            this.composerModule.composer.render()
            // ControlsModule.controls.update()
      
            this.animateCall({elapsedTime,deltaTime})
            requestAnimationFrame(animate)
        }
        animate()
      
    }
    animateCall({elapsedTime,deltaTime}){

        this.fns.forEach((fn)=>{
            fn({elapsedTime,deltaTime})
        })
    }
    addAnimate(fn){
        this.fns.push(fn)
    }
   
}
export default Animate