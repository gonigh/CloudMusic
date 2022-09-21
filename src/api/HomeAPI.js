import request from "../utils/request";

/**
 * 获取轮播图信息
 * @param {*} type 设备类型,0：pc; 1:android; 2:iphone; 3:ipad
 * @returns
 */
export function getBanner(type) {
  return request.get("/banner", {
    /* 请求参数 */
    params: {
      type,
    },
  });
}

/**
 * 推荐歌单
 * @param {*} limit 数量限制
 * @returns
 */
export function getRecommendSongList(limit) {
  return request.get("/personalized", {
    params: {
      limit,
    },
  });
}

/**
 * 搜索
 * @param {*} keywords  关键词
 * @param {*} limit 数量限制
 * @param {*} offset 偏移，用于分页
 * @param {*} type 搜索类型，1 单曲；10 专辑；100 歌手；1000 歌单；1002 用户；1004 MV；1006 歌词；1009 电台；1014 视频；1018：综合；2000声音
 * @returns
 */
export function searchSong(keywords, limit = 30, offset = 0, type = 1) {
  return request.get("/cloudSearch", {
    params: {
      keywords,
      limit,
      offset,
      type,
    },
  });
}
