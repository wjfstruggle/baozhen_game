// 初始化
let timer1; // 小熊飞行定时器
function init_game() {
	timer1 = null; // 小熊飞行定时器
}
init_game()
$("#game_wrapper").on('touchstart', jump)

// 小熊上下跳跃函数
function jump(v0) {
	var top_t = 10; // 不超出顶部距离
	var bottom = 184; // 游戏结束距离底部184px
	var again_ = 100// 游戏初始位置
	var v0 = -(20*0.3) // 初速度
	var bear_top = getZhenTouTop(); // 15px
	var now_top = bear_top + 20;// 起飞后达到的高度
	clearInterval(timer1);
	$("#zhentou_wrapper").stop().animate({
		"top": now_top
	},500,function() {
		timer1 = setInterval(()=> {
			now_top = now_top * 1.05
		},20)
	})
}

// 获取熊距离顶部的高度
function getZhenTouTop() {
	let bear_zhentou_top = $("#zhentou_wrapper").css("top").split("px", 1)[0];
	let game_wrapper = $("#game_wrapper").css("height").split("px", 1)[0];
	let position_top = Math.ceil(bear_zhentou_top / game_wrapper * 100);
	return position_top;
};
