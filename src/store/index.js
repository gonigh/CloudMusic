import { defineStore } from "pinia";
import { getSongListDetail } from "../api/HomeAPI";

export const useStore = defineStore("music-store", {
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
      /**
       * 右侧是否弹出
       */
      rightOpen: false,

      /**
       * 当前打开歌单
       */
      curSongList: {
        id: Number,
        name: String,
        picUrl: String,
        subscribedCount: Number,
        commentCount: Number,
        shareCount: Number,
        songList: Array,
        creator:{
          name: String,
          avatar: String
        }
      },
      /**
       * 播放歌单列表
       */
      playList: [],
    };
  },
  getters: {},
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
     * 打开歌单
     */
    async openSongList(id) {
      console.log(this.rightOpen);
      
      if (!this.curSongList || this.curSongList.id == id) return;
      
      const res = await getSongListDetail(id);
      console.log(res.data.playlist);
      const data = res.data.playlist;
      this.curSongList.name = data.name;
      this.curSongList.picUrl = data.coverImgUrl;
      this.curSongList.subscribedCount = data.subscribedCount;
      this.curSongList.commentCount = data.commentCount;
      this.curSongList.shareCount = data.shareCount;
      this.curSongList.creator.name = data.creator.nickname;
      this.curSongList.creator.avatar = data.creator.avatarUrl;
      this.rightOpen = true;
      this.curSongList.id = id;
    },

    /**
     * 关闭歌单
     */
    closeSongList(item) {
      this.rightOpen = false;
      this.curSongList = null;
    },
  },
});
