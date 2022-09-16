function remSize () {
    /* 获取设备宽度 */
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth
    let deviceHeight = document.documentElement.clientHeight || window.innerHeight
    let deviceBasis = deviceHeight > deviceWidth?deviceHeight:deviceWidth;
    /* 设计稿宽度 */
    if (deviceBasis <= 750) {
      deviceBasis = 750
    }
    if (deviceBasis >= 1200) {
      deviceBasis = 1200
    }
    /* 设置rem，
    750px--> 1rem=100px
    */
    document.documentElement.style.fontSize = (deviceBasis / 23.6) + 'px'
    /* 设置字体大小 */
    document.querySelector('body').style.fontSize = 0.2 + 'rem'
  }
  remSize()
  /* 当窗口发生变化 */
  window.onresize = function () {
    remSize()
  }
  