<template>
    <div class="card-top">
        <div class="card-left">
            <text>{{props.title}}</text>
        </div>
        <div class="card-right">
            <text>更多</text>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-youjiantou"></use>
            </svg>
        </div>
    </div>
    <div class="card-content">
        <slot></slot>
    </div>

</template>

<script setup>
const props = defineProps({
    title: String,
    dot: {
        type: Boolean,
        default: true
    }
})
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
        align-items: center;
        height: .8rem;
        color: rgb(129, 129, 129);

        text {
            line-height: .8rem;
        }

        svg {
            height: 1em;
            width: 1em;
        }
    }
}

.card-content {
    margin: 0;
    padding: .2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>