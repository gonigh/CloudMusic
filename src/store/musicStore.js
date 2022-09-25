import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getSongListDetail,
  getSongListPlayList,
  getSongUrl,
} from "../api/HomeAPI";
import changeTime from "../utils/changeTime";

export const useMusicStore = defineStore("music-store", {
  state: () => {
    return {
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
        duration: Number,
        album: {
          id: Number,
          name: String,
          picUrl: String,
        },
      },

      /**
       * 当前播放时间
       */
      curTime: Number,

      /**
       * 定时器
       */
      timer: Number,

      /**
       * 音频播放器元素
       */
      audio: ref(null),

      /**
       * 播放方式列表及当前播放方式
       */
      playType: ["#icon-shunxubofang", "#icon-suijibof", "#icon-danquxunhuan"],
      playTypeIndex: 0,

      /**
       * 右侧是否弹出
       */
      rightOpen: false,

      /**
       * 底部弹出音乐界面
       */
      bottomOpen: false,
    };
  },
  getters: {
    formatCurTime: (state) => {
      return changeTime(state.curTime);
    },
    formatDuration: (state) => {
      return changeTime(state.curPlay.duration);
    },
    authors: (state) => {
      if (state.curIndex != -1)
        return state.curPlay.authors.map((i) => i.name).join("/");
      else return null;
    },
  },
  actions: {
    /**
     * 记录播放器元素
     */
    setAudio(audio) {
      this.audio = audio;
    },

    /**
     * 打开歌单
     */
    async openSongList(id) {
      if (!this.curSongList || this.curSongList.id == id) return;

      const res = await getSongListDetail(id);
      const data = res.data.playlist;
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
    closeSongList() {
      this.rightOpen = false;
      this.curSongList = null;
    },

    /**
     * 播放歌曲
     */
    async playSong(item) {
      this.curPlay = item;
      this.curPlay.flag = true;
      this.curTime = 0;

      //获取歌曲url
      let res = await getSongUrl(item.id);
      this.curPlay.url = res.data.data[0].url;
      if (this.curSongList != null) {
        this.playList = this.curSongList.songList;
        this.curIndex = this.playList.indexOf(item);
      }
      // 设置定时器获取当前播放时间
      this.timer = setInterval(() => {
        this.curTime = this.audio.currentTime * 1000;

        // 播放结束自动播放下一首
        if (this.curPlay.duration - this.curTime <= 260) {
          this.nextSong();
        }
      }, 250);
    },

    /**
     * 播放/暂停
     */
    playOrStop() {
      if (this.curPlay.flag) {
        this.audio.pause();
        clearInterval(this.timer);
      } else {
        this.audio.play();
        this.timer = setInterval(() => {
          this.curTime = this.audio.currentTime * 1000;
        }, 250);
      }
      this.curPlay.flag = !this.curPlay.flag;
    },

    /**
     * 跳转播放
     */
    playGo(value) {
      this.curTime = value;
      this.audio.currentTime = value / 1000;
    },

    /**
     * 切换播放方式
     */
    changePlayType() {
      this.playTypeIndex = (this.playTypeIndex + 1) % this.playType.length;
    },

    /**
     * 下一首
     */
    nextSong() {
      if (this.playTypeIndex == 0) {
        let nextIndex = (this.curIndex + 1) % this.playList.length;
        this.playSong(this.playList[nextIndex]);
      } else if (this.playTypeIndex == 1) {
        let nextIndex = parseInt(Math.random() * this.playList.length);
        this.playSong(this.playList[nextIndex]);
      } else {
        this.audio.currentTime = 0;
      }
    },
    /**
     * 上一首
     */
    preSong() {
      if (this.playTypeIndex == 0 || this.playTypeIndex == 1) {
        let preIndex =
          (this.playList.length + this.curIndex - 1) % this.playList.length;
        this.playSong(this.playList[preIndex]);
      }
    },
  },
});
