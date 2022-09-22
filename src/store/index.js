import { defineStore } from "pinia";
import { getSongListDetail, getSongListPlayList } from "../api/HomeAPI";

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
        songCount: Number,
        songList: Array,
        creator: {
          name: String,
          avatar: String,
        },
      },
      /**
       * 播放歌单列表
       */
      playList: [],

      /**
       * 当前播放歌曲在播放列表中的index
       */
      curIndex: -1,

      /**
       * 当前播放歌曲
       */
      curPlay: {
        flag: false,
        id: Number,
        name: String,
        authors: Array,
        mv: Number,
        duration:Number,
        album: {
          id: Number,
          name: String,
          picUrl: String,
        },
      },

      /**
       * 当前播放时间
       */
      curTime:Number
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
      if (!this.curSongList || this.curSongList.id == id) return;

      const res = await getSongListDetail(id);
      const data = res.data.playlist;
      console.log(data);
      //歌单信息
      this.curSongList.songCount = data.trackCount;
      this.curSongList.name = data.name;
      this.curSongList.picUrl = data.coverImgUrl;
      this.curSongList.subscribedCount = data.subscribedCount;
      this.curSongList.commentCount = data.commentCount;
      this.curSongList.shareCount = data.shareCount;
      this.curSongList.creator.name = data.creator.nickname;
      this.curSongList.creator.avatar = data.creator.avatarUrl;

      //歌单歌曲信息
      let pl = await getSongListPlayList(id);
      console.log(pl.data.songs);
      this.curSongList.songList = pl.data.songs.map((item) => {
        let t = {};
        let album = {};
        album.id = item.al.id;
        album.name = item.al.name;
        album.picUrl = item.al.picUrl;
        t.album = album;
        t.id = item.id;
        t.name = item.name;
        t.mv = item.mv;
        t.duration = item.dt;
        t.authors = item.ar.map((i) => {
          return { id: i.id, name: i.name };
        });
        return t;
      });
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

    /**
     * 播放歌曲
     */
    playSong(item) {
      this.curPlay = item;
      this.curPlay.flag = true;
      this.curTime=0;
      if (this.curSongList != null) {
        this.playList = this.curSongList.songList;
        this.curIndex = this.playList.indexOf(item);
      }
    },
  },
});
