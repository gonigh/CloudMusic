import request from "../utils/request";

export function getBanner (type) {
    return request.get('/banner', {
      /* 请求参数 */
      params: {
        type
      }
    })
  }