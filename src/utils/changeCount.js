const changeCount = function (num) {
  if (num >= 100000000) {
    // toFixed(1)显示一位小数
    return (num / 100000000).toFixed(1) + "亿";
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + "万";
  }
};
export default changeCount;