<template>
    <svg class="icon" :style="{width:props.width,height:props.width,fill:props.fill}">
        <use :xlink:href="props.icon"></use>
    </svg>
</template>
<script setup>
    const props = defineProps({
        width:String,
        icon:String,
        fill:String
    })
</script>