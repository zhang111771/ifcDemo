import {
    EffectComposer,
    RenderPass,
    SelectiveBloomEffect,
    BlendFunction,
    EffectPass,
    SMAAEffect,
    OutlineEffect,
    ShaderPass ,
    HueSaturationEffect
  } from "postprocessing";


class Composer{
    constructor(sceneModule,renderModule,CameraModule){
        //实例化后期处理效果
        this.composer=new EffectComposer(renderModule.renderer)
        this.composer.addPass(new RenderPass(sceneModule.scene,CameraModule.activeCamera))
     
        // 添加轮毂效果
            this.hoverOutlineEffect = new OutlineEffect(sceneModule.scene, CameraModule.activeCamera, {
                blendFunction: BlendFunction.ADD,
                edgeStrength: 3,
                pulseSpeed: 0,
                visibleEdgeColor: 0xffffff,
                hiddenEdgeColor: 0xffffff,
                blur: false,
                xRay: true,
                usePatternTexture: false,
           
            });
            
            this.clickOutlineEffect = new OutlineEffect(sceneModule.scene, CameraModule.activeCamera, {
                blendFunction: BlendFunction.ADD,
                edgeStrength: 3,
                pulseSpeed: 0,
                visibleEdgeColor: 0x08FFFF,
                hiddenEdgeColor: 0x08FFFF,
                blur: false,
                xRay: true,
                usePatternTexture: false,
           
            });
            console.log(this.clickOutlineEffect)
            this.clickOutlineEffect.selection.layer=11

        //添加outlinePass
        this.outlinePass=new EffectPass(CameraModule.activeCamera,this.hoverOutlineEffect,this.clickOutlineEffect)
        this.composer.addPass(this.outlinePass)


        //添加抗锯齿效果
        this.smaaEffect=new SMAAEffect()
       
        
        // const gui=new dat.GUI()
        let hueSaturationInfo={
            blendFunction:BlendFunction.SET,
            '饱和度':0,
            '色调':0
        }
       
        const hueSaturationEffect=new HueSaturationEffect({
            blendFunction:hueSaturationInfo.blendFunction,
			saturation:hueSaturationInfo.saturation,
			hue: hueSaturationInfo.hue
        })
        // gui.add(hueSaturationInfo,'饱和度',0,1).onChange((e)=>{
        //     hueSaturationEffect.saturation=e
        // })
        // gui.add(hueSaturationInfo,'色调',0,6).onChange((e)=>{
        //     hueSaturationEffect.hue=e
        // })
         //添加效果通道
        this.effectPass=new EffectPass(CameraModule.activeCamera,hueSaturationEffect,this.smaaEffect)
        this.composer.addPass(this.effectPass)
     
    }
}
export default Composer