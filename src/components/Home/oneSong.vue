<template>
    <div class="one-song">
        <div class="one-song-left">
            <slot name="left"></slot>
        </div>
        <div class="one-song-content">
            <div class="one-song-name">{{props.name}}</div>
            <div class="one-song-info">
                {{songInfo}}
            </div>
            <div class="one-song-line"></div>
        </div>
        <div class="one-song-right">
            <MyIcon icon="#icon-gengduo-shuxiang" fill="rgb(148,148,148)" width=".6rem"></MyIcon>
        </div>
    </div>
</template>
<script setup>
import MyIcon from '../MyIcon.vue';
const props = defineProps({
    id: Number,
    name: String,
    authors: Array,
    albumName: String
})

let songInfo = "";
props.authors.forEach((item, i) => {
    songInfo = songInfo.concat(item.name)
    if (i != props.authors.length - 1) {
        songInfo = songInfo.concat('/');
    }
})
songInfo = songInfo.concat(" - ");
songInfo = songInfo.concat(props.albumName);
</script>
<style lang="less" scoped>
.one-song {
    height: 1.2rem;
    display: flex;
    align-items: center;
    position: relative;

    .one-song-left {
        width: .4rem;
        margin-right: .2rem;
    }

    .one-song-content {
        flex: 1;
        position: relative;
        padding: .1rem 0;
        .one-song-name {
            line-height: .6rem;
            font-size: .36rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }

        .one-song-info {
            font-size: .2rem;
            color: rgb(148, 148, 148);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }
        .one-song-line{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 250%;
            margin-left: -62.5%;
            border-bottom: 1px solid rgb(148, 148, 148);
            transform: scale(0.5);
        }
    }

    .one-song-right {
        width: .4rem;
    }
}
</style>