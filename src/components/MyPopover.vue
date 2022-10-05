<template>
    <div class="my-popover">
        <slot name="reference"></slot>
        <div ref="popShadow" class="pop-shadow" @click="clickPopShadow"></div>
        <div v-show="showPopover" :class="['my-pop-show','my-pop-show-position-'+props.position]">
            <slot name="default"></slot>
        </div>
    </div>
</template>
<script setup>
import { emit } from 'process';
import { computed, onMounted, reactive, ref, watch } from 'vue';

const popShadow = ref(null)

const props = defineProps({
    modelValue:Boolean,
    position: Number,
})
const emits = defineEmits(["update:modelValue"])
/**
 * position：
 *   8    1   2
 *    ↖  ↑  ↗
 *  7 ←       →  3
 *    ↙  ↓  ↘
 *   6    5    4
 */

 /**
  * 显示内容
  */
let showPopover = computed({
    get(){
        return props.modelValue
    },
    set(value){
        emits("update:modelValue",value);
    }
})
/**
 * 点击遮罩层事件，关闭播放列表
 * @param {*} e 
 */
const clickPopShadow = (e) => {
    showPopover.value = false;
}

/**
 * 监听播放列表是否打开
 */
watch(() => showPopover.value, (value) => {
    if (value) {
        popShadow.value.style.display = "block";
    } else {
        popShadow.value.style.display = "none";
    }
})

/**
 * 挂载后为遮罩层设置大小
 */
onMounted(() => {
    popShadow.value.style.width = document.documentElement.clientWidth + "px";
    popShadow.value.style.height = document.documentElement.clientHeight + "px";
    if (showPopover.value) {
        popShadow.value.style.display = "block";
    } else {
        popShadow.value.style.display = "none";
    }
})

</script>
<style lang="less" scoped>
.my-popover {
    position: relative;
    z-index: 10;
    .my-pop-show{
        z-index: 3001;
        position: absolute;
    }
    .my-pop-show-position-1{
        bottom:0;
        right: 50%;
        transform: translateX(50%);
        margin-bottom: 150%;
    }
    .my-pop-show-position-2{
        left: 0;
        bottom: 50%;
        transform: translateY(50%);
        margin-left: 150%;
    }
    .my-pop-show-position-2{
        left: 0;
        top: 0;
        margin-left: 150%;
    }
    .my-pop-show-position-8{
        right: 0;
        bottom:0;
        margin-bottom: 150%;
        // transform: translateY(-100%);
    }

}

.pop-shadow {
    position: fixed;
    z-index: 3000;
    bottom: 0;
    right: 0;
}
</style>