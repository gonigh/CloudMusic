<template>
    <div class="card-top">
        <div class="card-left">
            <text>{{props.title}}</text>
        </div>
        <div class="card-right">
            <slot name="top-right"></slot>
        </div>
    </div>
    <slot></slot>

</template>

<script setup>
const props = defineProps({
    title: String,
    dot: {
        type: Boolean,
        default: true
    }
})
console.log('card:setup')
</script>
<style lang="less" scoped>
.card-top {

    padding: .1rem 0.3rem;
    display: flex;
    justify-content: space-between;

    .card-left {
        height: .8rem;
        font-size: 2em;
        font-weight: bold;

        text {
            line-height: .8rem;
        }
    }

    .card-right {
        display: flex;
        align-items: center;
        height: .8rem;
    }
}
</style>