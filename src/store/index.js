import { defineStore } from "pinia";

export const useStore = defineStore("music-store", {
  state: () => {
    return {
      id: 1,
      curPage: 0,
      pages: [{
        key: 0,
        path: "/home",
        icon: "#icon-yinle",
        name: "发现",
        activate:true
      }, {
        key: 1,
        path: "/mv",
        icon: "#icon-PlayIconFilled",
        name: "MV",
        activate:false
      }, {
        key: 2,
        path: "/my",
        icon: "#icon-wode",
        name: "我的",
        activate:false
      }, {
        key: 3,
        path: "/friend",
        icon: "#icon-pengyou",
        name: "朋友",
        activate:false
      }]
    };
  },
  getters: {},
  actions: {
    changePage(item){
      this.pages[this.curPage].activate=false;
      this.pages[item.key].activate=true;
      this.curPage=item.key
    }
  },
});
