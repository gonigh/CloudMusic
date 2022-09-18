<template>
    <div :id="props.id" class="song-list">
        <img :src="props.pic" />
        <div class="song-list-play-count">
            <svg class="icon" style="height:10px" aria-hidden="true">
                <use xlink:href="#icon-24gf-headphones"></use>
            </svg>
            <text>{{playCount}}</text>
        </div>
        <div class="song-list-name">{{props.name}}</div>
    </div>
</template>
<script setup>
import { onMounted, watch } from 'vue';
import changeCount from '../../utils/changeCount'

const props = defineProps({
    name: String,
    pic: String,
    playCount: Number,
    id: String,
    cardWidth: String
})
const playCount = changeCount(props.playCount);
/**
 * 设置歌单宽度
 */
onMounted(()=>{
    let dom = document.getElementById(props.id);
    let img = dom.children[0];
    let name = dom.children[2];
    img.style.width=props.cardWidth;
    name.style.width=props.cardWidth;
})
/**
 * 监听宽度变化，窗口宽度改变后歌单宽度随之改变
 */
watch(()=>props.cardWidth,(newValue,oldValue)=>{
    let dom = document.getElementById(props.id);
    let img = dom.children[0];
    let name = dom.children[2];
    img.style.width=props.cardWidth;
    name.style.width=props.cardWidth;
})
</script>
<style lang="less" scoped>
    
.song-list{
    height: 5.4rem;
    padding: .1rem;
    position: relative;
    overflow: hidden;
    .song-list-play-count{
        position: absolute;
        top: .1rem;
        right: .1rem;
        background-image: linear-gradient(to right, rgba(255,255,255,0) , rgba(200,200,200,.5));
        text{
            color: white;
            text-align: center;
        }
    }
    .song-list-name{
        font-size: 1.5em;
    }
    
}
</style>