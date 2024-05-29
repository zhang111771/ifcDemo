import * as THREE from 'three'
class Renderer{
    constructor(){
        this.renderer=new THREE.WebGLRenderer({antialias:true})
        this.renderer.setSize(window.innerWidth,window.innerHeight)
        this.renderer.shadowMap.enabled=true
        this.renderer.toneMapping=THREE.ACESFilmicToneMapping
        this.renderer.toneMappingExposure=1.5
    }
}
export default new Renderer()