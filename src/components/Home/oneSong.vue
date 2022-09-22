<template>
    <div class="one-song">
        <div class="one-song-left">
            <slot name="left"></slot>
        </div>
        <div class="one-song-content">
            <div class="one-song-name">{{props.song.name}}</div>
            <div class="one-song-info">
                {{songInfo}}
            </div>
            <!-- <div class="one-song-line"></div> -->
        </div>
        <div class="one-song-right">
            <div class="one-song-has-mv" v-show="props.song.mv && props.song.mv!=0">
                <MyIcon icon="#icon-shipinbofang1" fill="rgb(148,148,148)" width=".6rem"></MyIcon>
            </div>
            <div class="one-song-more">
                <MyIcon icon="#icon-gengduo-shuxiang" fill="rgb(148,148,148)" width=".6rem"></MyIcon>
            </div>
        </div>
    </div>
</template>
<script setup>
import MyIcon from '../MyIcon.vue';
const props = defineProps({
    song: Object
})
console.log(props.song.mv)

let songInfo = "";
props.song.authors.forEach((item, i) => {
    songInfo = songInfo.concat(item.name)
    if (i != props.song.authors.length - 1) {
        songInfo = songInfo.concat('/');
    }
})
songInfo = songInfo.concat(" - ");
songInfo = songInfo.concat(props.song.albumName);
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

        .one-song-line {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 220%;
            margin-left: -60%;
            border-bottom: 1px solid rgb(148, 148, 148);
            transform: scale(0.5);
        }

    }

    .one-song-right {
        width: 1.4rem;
        height: 100%;
        position: relative;
        
        .one-song-has-mv {
            position: absolute;
            top: 50%;
            margin-top: -.3rem;
            left: 0;
        }
        .one-song-more{
            position: absolute;
            top: 50%;
            margin-top: -.3rem;
            right: 0;
        }
    }
}
</style>