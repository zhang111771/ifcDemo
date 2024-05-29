<template>
    <div class="scene-left-aside">
        <div class="barcharts" ref="barcharts"></div>
        <div class="barcharts" ref="linecharts"></div>
    
        <div class="barcharts" ref="barcharts2"></div>


    </div>
</template>
<script setup>
import { ref, nextTick, watch,onUnmounted } from 'vue'
import { barChartsDemo1,barchartsDemo2,lineDemo1 } from "@/utils/echarts";

import eventHub from '@/utils/eventHub';
const props = defineProps({
    
})
const barcharts=ref(null)
const barcharts2=ref(null)
const linecharts=ref(null)


nextTick(()=>{
    barChartsDemo1(barcharts.value)
    barchartsDemo2(barcharts2.value)
    lineDemo1(linecharts.value)

})
let charts = null


</script>
<style lang="scss" scoped>
@keyframes warnAnimate {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0.6;
    }
}
.barcharts{
    width:300px;
    height: 280px;

}
.scene-left-aside {
    top:0;
    position: fixed;
    padding-left: 24px;
    padding-right: 120px;
    padding-top: 30px;
    z-index: 104;
    left: 0;
    height: 100vh;
    background: url(../assets/image/QjjcBgL.png) no-repeat;
    background-size: cover;
    // pointer-events: none;

    

    
}</style>