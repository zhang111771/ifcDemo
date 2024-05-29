<template>
    <div class="dialog_wrap"  v-if="showInfoBox" @mousedown.stop="" @mouseenter="mouseenter"
        @mouseout="mouseout"
        :style="{ left: ((infoData.mouse.x - 200) > 1490 ? 1490 : (infoData.mouse.x - 200)) + 'px', top: ((infoData.mouse.y - 180) > 0 ? (infoData.mouse.y - 180) : 0) + 'px' }">
        <div class="info-box dialog_content">
            <div class="info-title dialog_header">
                <div class="title">
                    <span class="title-name"> {{ infoData.name }}</span>

                </div>
                <span @click="closeInfoBox" class="close-btn" @mousedown.stop="" @mouseup.stop="" @mousemove.stop=""
                    @click.stop=""></span>
            </div>
            <div class="info-content">
                <div class="info-item" v-for="item in currentInfoData">
                    <span class="item-label" v-if="item.value">{{ item.label }}：</span>
                    <span class="item-value" v-if="item.value">{{ item.value }}</span>
                </div>
            </div>


        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import eventHub from '@/utils/eventHub';

const props = defineProps({
    ssId: String,
    modeType: String //是正常模式还是自定义视角模式
})
//当前弹窗数据
const currentInfoData = ref([])
const title = ref('')
const showInfoBox = ref(false)

const infoData = ref({
    mouse: {
        x: 0,
        y: 0
    }
})
//切换场景清除弹窗
eventHub.on('clearTags', () => {
    closeInfoBox()
})
eventHub.on('selectMesh', (e) => {

    infoData.value = e
    showInfoBox.value=true
    console.log(e)
 


})

const closeInfoBox = () => {
    showInfoBox.value = null
    eventHub.emit('removeClickOutline')
    infoData.value = {
        mouse: {
            x: 0,
            y: 0
        },
        threejsName:''
    }
}


</script>
<style lang="scss" scoped>
.info-content {
    font-size: 14px;
    font-family: SourceHanSansSC-Normal, SourceHanSansSC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 20px;
    min-height: 78px;

    .info-item {

        .item-label {
            margin-bottom: 6px;
            display: inline-block;
            width: 115px;
            text-align: right;
        }

        .item-value {
            margin-bottom: 6px;
        }
    }
}

.dialog_wrap {
    position: fixed;
    z-index: 110;
    left: calc(50% - 168px);
    top: calc(50% - 110.5px);

}

.dialog_content {
    position: fixed;
    z-index: 110;
}

.info-box {
    position: fixed;
    width: 336px;



    padding: 14px 17px 19px 14px;
    box-sizing: border-box;
    background-size: 100% 100%;
    z-index: 105;
    background-repeat: no-repeat;
    background-image: url(../assets/image/TcBgGjcl04.png);




    .info-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // background-image: url(../assets/image/TcBgKg04.png);
        height: 35px;
        background-repeat: no-repeat;
        // padding-left: 43px;
        margin-bottom: 16px;

        .title {
            display: flex;
            justify-content: space-between;
            flex: 1;
        }



        .title-name {
            font-size: 16px;
            line-height: 16px;
            font-weight: 500;
            color: #E4F3FF;
        }


    }

    .close-btn {
        cursor: pointer;
    }
}

.close-btn {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-image: url(../assets/image/TcIconClosed.png);
    background-repeat: no-repeat;
    background-position: center center;
}

.info-box {


    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;

    }

}
</style>