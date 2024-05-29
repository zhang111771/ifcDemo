<template>
    <div ref="container" id="three-container"></div>
    <SceneLeftAside/>
    <SceneRightAside/>
    <DeviceBox/>
    <div class="handle-btns">

        <button type="button" class="reset-btn" @click="resetFloor">复位大厦</button>
        <button type="button" class="offset-floor" @click="offsetFloor">分离大厦</button>
    </div>
    
</template>
<script setup>
import init from '../three/init'
import {ref,onMounted} from 'vue'
import rendererModule from '../three/rendererModule'
import SceneLeftAside from './SceneLeftAside.vue';
import SceneRightAside from './SceneRightAside.vue';
import DeviceBox from './DeviceBox.vue';
const container=ref(null)
import eventHub from '@/utils/eventHub';

onMounted(()=>{
    container.value.appendChild(rendererModule.renderer.domElement)
    init()
})
const resetFloor=()=>{
    eventHub.emit("resetFloor")
}
const offsetFloor=()=>{
    eventHub.emit("offsetFloor")
}

</script>
<style lang="scss" scoped>
#three-container{
    position: fixed;
    left: 0;
    top:0;
    width:100vw;
    height: 100vh;
}
.handle-btns{
    position: fixed;
    z-index: 10;
    right:450px;
    top:20px;
}
.reset-btn,.offset-floor{
    display: block;
    background-color: #38f;
    padding:5px;
    border-radius: 2px;
    color:#fff;
    border:none;
    margin-bottom:20px;
}
</style>