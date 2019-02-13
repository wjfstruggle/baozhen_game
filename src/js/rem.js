document.body.style.height = window.innerHeight + "px";

/*动态改变根元素字体大小*/
function recalc() {
    // 客户端的宽度
    var clientWidth = document.documentElement.clientWidth;
    if (!clientWidth) return;
    document.documentElement.style.fontSize = 40 * (clientWidth / 750) + 'px';
    // 字体大小   = 1个rem单位表示多少个像素（设备的宽度   /设计宽度）
}

function initRecalc() {
    recalc();
    // if(浏览器支持横竖屏切换的事件){横竖屏事件}else{ resize事件 }
    var resizeEvt = 'osrientationchange' in window ? 'orientationchange' : 'resize';
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
}

initRecalc();