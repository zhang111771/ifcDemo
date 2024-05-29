<template>
    <div ref="container" id="three-container"></div>
    <SceneLeftAside/>
    <SceneRightAside/>
    <DeviceBox/>
</template>
<script setup>
import init from '../three/init'
import {ref,onMounted} from 'vue'
import rendererModule from '../three/rendererModule'
import SceneLeftAside from './SceneLeftAside.vue';
import SceneRightAside from './SceneRightAside.vue';
import DeviceBox from './DeviceBox.vue';
const container=ref(null)

onMounted(()=>{
    container.value.appendChild(rendererModule.renderer.domElement)
    init()
})


</script>
<style lang="scss" scoped>
#three-container{
    position: fixed;
    left: 0;
    top:0;
    width:100vw;
    height: 100vh;
}
</style>