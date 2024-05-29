<template>
    <div class="scene-right-aside" @mousedown.stop="" @mouseup.stop="">
        <div class="barcharts" ref="scattercharts"></div>
        <div class="barcharts" ref="piecharts"></div>
        <div class="barcharts" ref="radarcharts"></div>



    </div>
</template>
<script setup>
import { ref, nextTick, onMounted, watch,onUnmounted } from 'vue'
import { scatterDemo1,pieDemo1,radarDemo } from "@/utils/echarts";

const props = defineProps({

})
const radarcharts=ref(null)
const scattercharts =ref(null)
const piecharts=ref(null)



nextTick(()=>{
    scatterDemo1(scattercharts.value)
    pieDemo1(piecharts.value)
    radarDemo(radarcharts.value)
})


</script>
<style lang="scss" scoped>
@keyframes rotation{
    0%{
        transform: rotate(0);
    }
    0%{
        transform: rotate(360deg);
    }
}
.barcharts{
    width:300px;
    height: 280px;

}
.scene-right-aside {
    top:0;
    position: fixed;
    padding-right: 24px;
    right: 0;
    padding-top: 30px;
    padding-left: 120px;
    z-index: 104;

    height: 100vh;
    background: url(../assets/image/QjjcBgR.png) no-repeat;
    background-size: cover;
    pointer-events: none;

    
}
</style>