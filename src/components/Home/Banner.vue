<template>
    <div class="content">
        <ul id="banner"></ul>
        <ul id="dots"></ul>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { getBanner } from '../../api/HomeAPI';

onMounted(() => {
    let dom = document.getElementById("banner");
    dom.style.position = "relative";
    dom.style.height = "3.7rem";
    dom.style.width = "100%"
    let allWidth = dom.style.width;
    console.log(allWidth)
    let dots = document.getElementById("dots");
    let cur_dot;
    let sz = new Array();
    getBanner(3).then(res => {
        // console.log(res.data);
        const data = res.data;
        let zi=10;
        data.banners.forEach(item => {
            let cur_li = document.createElement("li");
            let cur_img = document.createElement("img");
            let cur_title = document.createElement("div");
            cur_title.innerText = item.typeTitle

            cur_title.style.color = "white"
            cur_title.style.width = "1.4rem"
            cur_title.style.borderTopLeftRadius = ".7rem";
            cur_title.style.borderBottomLeftRadius = ".7rem";
            cur_title.style.fontSize = "0.4em"
            cur_title.style.textAlign = "center";
            cur_title.style.position = "absolute";
            cur_title.style.bottom = "8px";
            cur_title.style.right = "-2px"
            cur_title.style.backgroundColor = item.titleColor;

            cur_img.src = item.pic;
            cur_img.style.width = "8rem";
            cur_img.style.height = "3rem";
            cur_li.appendChild(cur_img);
            cur_li.appendChild(cur_title);
            dom.appendChild(cur_li);
            sz.push(cur_li);
            // 把每一张都先放中间
            sz[sz.length - 1].style.zIndex = zi++;
            sz[sz.length - 1].style.left = "0";
            sz[sz.length - 1].style.transitionDuration = "0.4s";
            sz[sz.length - 1].style.position = "absolute";

            //增加一个小点
            let dot = document.createElement("li");
            dot.style.height = ".2rem";
            dot.style.width = ".2rem";
            dot.style.backgroundColor = "#919191";
            dot.style.borderRadius = ".1rem";
            dots.appendChild(dot);
        });
        let len = sz.length - 1;
        // 左移34em

        sz[len - 1].style.left="50%",
        sz[len - 1].style.marginLeft = "-4rem";
        sz[len - 1].style.zIndex = 100;
        sz[len - 1].style.transform = "scale(1.3)";
        sz[len].style.left="unset"
        sz[len].style.right="0"

        cur_dot=len-1;
        dots.children[cur_dot].style.backgroundColor= "red"
        setInterval(next, 4000);

    })

    const next = function () {
        let len = sz.length - 1;
        let give_up = sz[len];
        sz.pop();
        sz.unshift(give_up);
        for (let i = 0; i <= len; i++) {
            let zi = parseInt(sz[i].style.zIndex)+1;
            if(zi>10+len) sz[i].style.zIndex = 10;
            dots.children[i].style.backgroundColor = "#919191"
        }
        
        // 左移20em
        sz[0].style.right="unset";
        sz[0].style.left="0";

        sz[len - 1].style.left="50%",
        sz[len - 1].style.marginLeft = "-4rem";
        sz[len - 1].style.zIndex = 100;
        sz[len - 1].style.transform = "scale(1.3)";
        sz[len].style.marginLeft="0";
        sz[len].style.transform = "unset";
        sz[len].style.left="unset"
        sz[len].style.right="0"

        cur_dot = (cur_dot+1)%sz.length;
        dots.children[cur_dot].style.backgroundColor= "red"
    }

    // const pre = function(){
    //     let len = sz.length-1;
    //     let give_up=sz[0];
    //     sz.shift();
    //     sz.push(give_up);
    //     for(let i=0;i<=len;i++){
    //         sz[i].style.zIndex = i;
    //         sz[i].style.left = "50%";
    //         sz[i].style.transform="scale(1)";
    //         sz[i].style.marginLeft=0;
    //     }
    //     // 左移20em
    //     sz[len - 2].style.marginLeft = "-34em";
    //     sz[len - 1].style.zIndex = 100;
    //     sz[len - 1].style.marginLeft = "-14em";
    //     sz[len - 1].style.transform = "scale(1.3)";
    //     sz[len].style.marginLeft = "6em";
    // }

})

</script>
<style lang="less" scoped>
.content {
    width: 100%;
    padding: 3em 1em;
    // background-color: aqua;
}

#dots {
    width: 4rem;
    margin-left: -2rem;
    position: absolute;
    display: flex;
    justify-content: space-around;
    left: 50%;
}
</style>