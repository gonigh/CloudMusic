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

      lazyDom: {
        pageName: [
          {
            dom: HTMLElement,
            url: String,
          },
        ],
      },
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
    updateSize(width, height) {
      this.clientHeight = height;
      this.clientWidth = width;
    },

    /**
     * 主页面标签页跳转
     * @param {*} value
     */
    updateHomeActive(value) {
      this.homeActive = value;
    },

    addLazyImg(value) {
      if (this.lazyDom[this.homeActive]) {
        this.lazyDom[this.homeActive].push(value);
      } else {
        this.lazyDom[this.homeActive] = [value];
      }
    },

    loadLazyImg() {
      while (this.lazyDom[this.homeActive] && this.lazyDom[this.homeActive].length != 0) {
        let dom = this.lazyDom[this.homeActive][0].dom;
        if (dom.getBoundingClientRect().top < this.clientHeight*1.5) {
          dom.src = this.lazyDom[this.homeActive][0].url;
          this.lazyDom[this.homeActive].shift();
        } else {
          break;
        }
      }
    },
  },
});
