/**
 * 节流函数
 * @param {*} fn 
 * @param {*} threshhold 
 */
 const throttle = function (fn, threshold = 100) {
    let timer;
    let start = new Date();
    return function () {
        const current = new Date();
        timer && clearTimeout(timer);
        if (current - start >= threshold) {
            fn.call(this, ...arguments);
            start = current;
        }
    }
}

export default throttle;