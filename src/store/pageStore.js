import { defineStore } from "pinia";

export const usePageStore = defineStore("page-store", {
  state: () => {
    return {
      /**
       * 当前所在主页面
       */
      curPage: 0,
      /**
       * 页面信息，控制激活状态
       */
      pages: [
        {
          key: 0,
          path: "/",
          icon: "#icon-yinle",
          name: "发现",
          activate: true,
        },
        {
          key: 1,
          path: "/mv",
          icon: "#icon-PlayIconFilled",
          name: "MV",
          activate: false,
        },
        {
          key: 2,
          path: "/my",
          icon: "#icon-wode",
          name: "我的",
          activate: false,
        },
        {
          key: 3,
          path: "/friend",
          icon: "#icon-pengyou",
          name: "朋友",
          activate: false,
        },
      ],

      clientWidth: Number,
      clientHeight: Number,

      homeActive: "recommend",
    };
  },
  actions: {
    /**
     * 页面跳转
     * @param {*} item
     */
    changePage(item) {
      this.pages[this.curPage].activate = false;
      this.pages[item.key].activate = true;
      this.curPage = item.key;
    },

    /**
     * 更新窗口大小
     * @param {*} width 
     * @param {*} height 
     */
    updateSize(width,height){
      this.clientHeight=height;
      this.clientWidth=width;
    },

    /**
     * 主页面标签页跳转
     * @param {*} value 
     */
    updateHomeActive(value){
      console.log(value)
      this.homeActive = value;
    }
  },
});
