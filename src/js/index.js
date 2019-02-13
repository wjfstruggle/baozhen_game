// 游戏载入界面loading
	//创建对象
	var queue = new createjs.LoadQueue()
	//监听进度
	queue.on('progress', function(e) {
		// 加载图片
		$("#loading").find('.loading_bg_top').attr('src', 'images/' + 'loading_bg_top' + '.png');
		$("#loading").find('.loading_txt').attr('src', 'images/' + 'loading_txt' + '.png');
		$("#loading").find('.loading_bg_bottom').attr('src', 'images/' + 'loading_bg_bottom' + '.png');
		//获取百分比
		var percent = parseInt(e.progress * 100) + '%';
		$('#loading_txt').text(percent);
	}, this)

	//监听完成
	queue.on('complete', function(e) {
		// 隐藏界面
		$("#loading").hide();
		// 显示游戏开始界面
		 $("#game_wrapper").show();
		init_game()
	}, this);

	// 主游戏初始化
	let first_time;
	let power; //蓄力时增加的能量
	let flyScore; //飞行距离分数
	let maxScore = 0; //最高记录分数
	let timer_bg = null; // 背景移动定时器
	function init_game() {
		$("#info").find(".tips1").show(); // 提示显示隐藏
		$("#info").find(".tips2").hide(); //
		first_time = true;// 判读是否是第一次起飞
		power = 0;
		flyScore = 0;
		$("#again_paodao").css({"marginLeft": 0 +'%'})
		$("#end_paodao").css({"marginLeft": 100 +'%'})
		$("#game_wrapper .paodao_bg1").css({'left':0+"%"})
		$("#game_wrapper .paodao_bg1_clone").css({'left':100+"%"})
		$("#game_wrapper .paodao_bg2").css({'left':100+"%"})
		$("#game_wrapper .paodao_bg2_clone").css({'left':200+"%"})
		$("#sky1").css({'left':100+"%"})
		$("#sky2").css({'left':200+"%"})
		$("#engr").fadeIn();
		$("#numPower").fadeIn();
		$("#zhentou_wrapper").css({'left': -24+'%'});
		$("#zhentou_wrapper").css({'top': -140+'px'});
		$("#zhentou_wrapper").animate({'top': 332 +"px"}, 1500,"linear", function() {
			addPower();
		})
		for(let j = 0;j <= 12; j++){
			$('.paodao'+j).css({'left':100+"%"})
		}
		// 显示抽奖隐藏
		$("#progress").css({"display": "none"})
	};
	// 长按屏幕能量条增加，小熊起飞
	function addPower() {
		let timer2; // 长按屏幕能量条增加定时器
		let timer3; // 小熊飞行时能量增加定时器
		// 游戏界面添加事件，并且只能长按一次
		$("#game_wrapper").one('touchstart', () => {
			timer2 = setInterval(() => {
				power += 1;// 能量递增
				$("#engr").find('img').css({
					"width": power + '%'
				})
				$("#numPower").text(power)
				// 由于margin-left初始值不为零，所以需要调整margin-left的变化长度。
				// 达到与能量槽宽度一致
				$("#numPower").css({"marginLeft": power*2 + 57})
				if(power >= 100) {
					clearInterval(timer2);
					// 阻止右键菜单事件
					$("#game_wrapper").unbind("touchstart").bind("contextmenu", function(e) {
						e.preventDefault();
						return false;
					});
				}
			}, 10)
		})
		// 长按结束后小熊获得加速度
		$("#game_wrapper").one('touchend', () => {
			$("#info").find(".tips1").hide(); // 提示显示隐藏
			setTimeout(() => {
				$("#info").find(".tips2").fadeIn();
			}, 2000)
			clearInterval(timer2);
			$("#numPower").text('');
			dump(power);
			powerChange();
			runBg();
		})
	};
	// 游戏开始后，能量条变化
	function powerChange() {
		timer3 = setInterval(() => {
			power += 1;
			$("#engr").find('img').css({
				"width": power + '%'
			})
			setTimeout(() => {
				$("#info").find(".tips2").fadeOut();
			}, 5000)
			if(power >= 100) {
				clearInterval(timer3)
				power = 100;
				$("#engr").find('img').css({
					"width": power + '%'
				})
			}
		}, 500)
		$("#game_wrapper").on('touchstart', touchFly);
	};
	// 点击
	function touchFly() {
		power -= 12; // 每点击一次，能量减少
		if(power <= 0) {
			power = 0;
			$("#engr").find('img').css({
				"width": power + '%'
			})
			clearInterval(timer3);// 清除小熊飞行定时器
			// 清除点击屏幕事件
			$("#game_wrapper").off('touchstart', touchFly);
		} else {
			$("#engr").find('img').css({
				"width": power + '%'
			})
		}
		dump(30);
	};
	// 上下跳跃函数
	function dump(v0) { // v0初速度
		// 上下边界
		var top_t = 10; // 不超出距离顶部10px
		var bottom = 116; // 游戏结束距离底部116px
		var again_ = 200; // 初始位置
		var v0 = -(v0 * 0.3); // 出初始的加速度
		var bear_top = getZhenTouTop(); // 240px
		now_top = bear_top + v0; // 起飞后达到的高度
		// 不超出页面边界
		if(now_top <= top_t) {
			now_top = top_t;
		}
		if(first_time == false) { //
			// 起飞的高度
			clearInterval(timer1)
			$("#zhentou_wrapper").stop().animate({
				"top": now_top
			}, 500, function() {
				first_time = false;
				timer1 = setInterval(() => {
					now_top = now_top * 1.05; // 下降加速度
					// 判断着陆,着陆了滑行一段距离
					if(now_top >= 407) {// 407着陆地点
						endGame();// 游戏结束，执行滑行动画
						
					} else {
						$("#zhentou_wrapper").css({
							"top": now_top
						})
					}
				}, 20)
			})
		}
		// 能量条100%，第一次起飞
		if(first_time == true) {
			$("#zhentou_wrapper").stop().animate({
				"top": now_top
			}, 700, function() {
				first_time = false;
				timer1 = setInterval(() => {
					now_top = now_top * 1.05;
					if(now_top >= 407) {
						endGame();
						
					} else {
						$("#zhentou_wrapper").css({
							"top": now_top
						})
					}
				}, 20)
			})
		}
	};
	// 获取熊距离顶部的高度
	function getZhenTouTop() {
		let bear_zhentou_top = $("#zhentou_wrapper").css("top").split("px", 1)[0];
		let game_wrapper = $("#game_wrapper").css("height").split("px", 1)[0];
		let position_top = Math.ceil(bear_zhentou_top / game_wrapper * 100);
		return position_top;
	};
	// 游戏结束后，显示在玩一次+抽奖界面
	function gameOver() {
		// 显示抽奖界面
		$("#progress").css({"display": "block"})
		// 计算移动的距离
		if (flyScore > maxScore) {
			maxScore = flyScore;
			// 本地存储
			window.localStorage.setItem('max', maxScore)
			var a = window.localStorage.getItem('max');
		}
		$("#progress").find(".resent").text(flyScore);
		$("#progress").find(".hot_year").text(flyScore);
		// 最大距离
		$("#progress").find(".history").text(a);
		$("#progress").find(".random").text(parseInt(Math.random()*10 + 80) +'%');
		// 返回界面，在玩一次
		$("#progress").find(".btn").on('click',(e)=>{
			if(e.target.className.indexOf("again")!=-1){
			window.location.href = "index.html"
			}
		})
	};
		// 游戏界面，背景图的移动
	// 背景滚动
	function runBg() {
		var flag = true; // 判断是否过了出发点
		var xing1Speed = 0; // 星一速度
		var xing1SpeedClone = 0; // 星一克隆速度
		var xing2Speed = 0; // 星二速度
		var xing2SpeedClone = 0; // 星二克隆速度
		var bgImgLeft = 0; // 背景结束标志
		var sky1Speed = 0;//云朵一的移动速度
		var sky2Speed = 0;//云朵二的移动速度
		let i = 1;
		clearInterval(timer_bg);
		timer_bg = setInterval(() => {
			flyScore += 9; // 分数变化
			bgImgLeft += 0.1;
			// 分数显示，并出现对应的分数
			if (flyScore >= 5000*i) {
				$(".paodao" + i).animate({"left": -150 +'%'},3500, "linear");
				i+=1; // 循环显示跑道
			}
			// 结束跑道滑行距离
			if(bgImgLeft>20){
				flag=false;
			}
			if(flag == false) {
				// 开始跑道隐藏
				$("#again_paodao").css({
					'marginLeft': -100 + '%'
				})
			} else {
				// 开始跑道滑行
				$("#again_paodao").css({
					'marginLeft': -bgImgLeft*10 + '%'
				})
			}
			// 星一的速度
			xing1Speed += 0.024;
			xing1SpeedClone += 0.024;
			// 星一滑动距离快慢
			if (xing1Speed >= 10) {
				xing1Speed = -10;
			}
			// 星一克隆滑动距离快慢
			if (xing1Speed >= 20) {
				xing1Speed = 0;
			}
			$("#game_wrapper .paodao_bg1").css({
				"left": -xing1Speed *10 + "%"
			})
			$("#game_wrapper .paodao_bg1_clone").css({
				"left": 100 - xing1SpeedClone*10 + "%"
			})
			// 星二的速度
			xing2Speed += 0.07;
			xing2SpeedClone += 0.07;
			// 星二滑动距离快慢
			if (xing2Speed >=20) {
				xing2Speed = 0;
			}
			// 星二克隆滑动距离快慢
			if (xing2Speed >=30) {
				xing2Speed = 10;
			}
			$("#game_wrapper .paodao_bg2").css({
				"left": 100 - xing2Speed *10 + "%"
			})
			$("#game_wrapper .paodao_bg2_clone").css({
				"left": 200 - xing2SpeedClone*10 + "%"
			})
			// 云朵速度
			sky1Speed+=0.045;
			sky2Speed+=0.045;
			if(sky1Speed>=10){
				sky1Speed=-10;
			}
			if(sky2Speed>=20){
				sky2Speed=0;
			}
			$("#game_wrapper #sky1").css({'left': 100-sky1Speed*10+"%"})
			$("#game_wrapper #sky2").css({'left':200-sky2Speed*10+"%"})

			// 懒加载
			$("#normal_paodao img").lazyload({
				// 触发事件
               event : 'touchstart',
			   // 偏移量
			    threshold: 50
			 })
		}, 10)
	}
	// 游戏结束滑行
	function endGame() {
		clearInterval(timer1);
		clearInterval(timer3);
		clearInterval(timer_bg);
		// 跑道滑行动画
		$("#end_paodao").animate({marginLeft:0+"%"},2000);
		// 云朵一移动
		$("#sky1").animate({
			"left": parseInt($("#sky1").css("left").split("px",1)[0]-200 + 'px')
		}, 2000)
		// 云朵二移动
		$("#sky2").animate({
			"left": parseInt($("#sky2").css("left").split("px",1)[0]-200 + 'px')
		}, 2000)
		// 星星一移动
		$("#game_wrapper .paodao_bg1").animate({
			"left": parseInt($("#game_wrapper .paodao_bg1").css("left").split("px",1)[0]-50 + 'px')
		}, 2000)
		// 星星一克隆移动
		$("#game_wrapper .paodao_bg1_clone").animate({
			"left": parseInt($("#game_wrapper .paodao_bg1_clone").css("left").split("px",1)[0]-50 + 'px')
		}, 2000)
		// 星星一移动
		$("#game_wrapper .paodao_bg2").animate({
			"left": parseInt($("#game_wrapper .paodao_bg2").css("left").split("px",1)[0]-200 + 'px')
		}, 2000)
		// 星星一克隆移动
		$("#game_wrapper .paodao_bg2_clone").animate({
			"left": parseInt($("#game_wrapper .paodao_bg2_clone").css("left").split("px",1)[0]-200 + 'px')
		}, 2000)
		// 清除动画
		// 能量条清零
		$("#engr").find("img").css({"width": 0 +'%'})
		// 小熊滑行动画
		$("#zhentou_wrapper").animate({
			"left": 20 + "%"
		}, 2500, function() {
			gameOver();// 显示抽奖和再玩一次界面
		})
		// 结束跑到出现
		$("#game_wrapper").off("touchstart", touchFly); // 清除点击
		$("#engr").fadeOut("slow") // 能量条隐藏

	}
	$("#progress .btn").find(".Lucky_draw").on("click", function() {
		$("#warp").css({"display": "block"})
	})
	// 点击抽奖红包的动画
	$("#red_bg").on('touchstart', function() {
		$(this).addClass('animated scale redBag');
		setTimeout(() => {
			$("#ball").css({
				"display": "block"
			}).addClass('animated ball ');
			// 一秒后跳转到中奖界面
			setTimeout(() => {
				$("#warp_win").css({
					"display": "block"
				})
			}, 1000)
		}, 2000)
	})
	// 点击邀请好友分享界面
	$("#warp_win").find(".button #share").on('click', function() {
		$("#share_mask").css({
			"display": "block"
		})
		setTimeout(() => {
			$("#warp_product").css({
				"display": "block"
			})
		}, 1000)
	})
	// 点击确定，返回游戏界面
	$("#submit").on("click", function() {
		location.href = "index.html"
	})
	init_game();

	// 轮播图
//	new Carousel({
//		element: "#show"
//	})
queue.loadManifest([{
			id: "bg_back",
			src: "images/bg_back.jpg"
		}, /*游戏背景*/
		{
			id: "logo",
			src: "images/logo.png"
		}, /*LOGO*/
		{
			id: "xingxing_bg",
			src: "images/xingxing_bg.png"
		}, /*天空星星背景*/
		{
			id: "begin_paodao_bg",
			src: "images/begin_paodao_bg.png"
		}, /*跑道开始背景*/
		{
			id: "end_paodao_bg",
			src: "images/end_paodao_bg.png"
		}, /*跑道结束背景*/
		{
			id: "paodao_bg1",
			src: "images/paodao_bg1.png"
		}, /*跑道平时背景1*/
		{
			id: "paodao_bg2",
			src: "images/paodao_bg2.png"
		}, /*跑道平时背景2*/
		{
			id: "sky_bg1",
			src: "images/sky_bg1.png"
		}, /*天空云朵背景1*/
		{
			id: "sky_bg2",
			src: "images/sky_bg2.png"
		}, /*天空云朵背景2*/
		{
			id: "zhentou1",
			src: "images/zhentou1.png"
		}, /*枕头*/
		{
			id: "zhentou2",
			src: "images/zhentou2.png"
		}, /*枕头*/
		{
			id: "zhentou3",
			src: "images/zhentou3.png"
		}, /*枕头*/
		{
			id: "zhentou4",
			src: "images/zhentou4.png"
		}, /*枕头*/
		{
			id: "zhentou_bg",
			src: "images/zhentou_bg.png"
		}, /*枕头光环*/
		{
			id: "pao1",
			src: "images/pao1.png"
		}, /*途经地方1*/
		{
			id: "pao2",
			src: "images/pao2.png"
		}, /*途经地方2*/
		{
			id: "pao3",
			src: "images/pao3.png"
		}, /*途经地方3*/
		{
			id: "pao4",
			src: "images/pao4.png"
		}, /*途经地方4*/
		{
			id: "pao5",
			src: "images/pao5.png"
		}, /*途经地方5*/
		{
			id: "pao6",
			src: "images/pao6.png"
		}, /*途经地方6*/
		{
			id: "pao7",
			src: "images/pao7.png"
		}, /*途经地方7*/
		{
			id: "pao8",
			src: "images/pao8.png"
		}, /*途经地方8*/
		{
			id: "pao9",
			src: "images/pao9.png"
		}, /*途经地方9*/
		{
			id: "pao10",
			src: "images/pao10.png"
		}, /*途经地方10*/
		{
			id: "pao11",
			src: "images/pao11.png"
		}, /*途经地方11*/
		{
			id: "pao12",
			src: "images/pao12.png"
		}, /*途经地方12*/
		{
			id: "pao13",
			src: "images/pao8.png"
		}, /*途经地方13*/
		{
			id: "pao14",
			src: "images/pao8.png"
		}, /*途经地方14*/
		{
			id: "tips1",
			src: "images/tips1.png"
		}, /*提示1*/
		{
			id: "tips2",
			src: "images/tips2.png"
		}, /*提示2*/
		{
			id: "tips3",
			src: "images/tips3.png"
		}, /*提示3*/
		{
			id: "power_wrap",
			src: "images/power_wrap.png"
		}, /*能量槽外框*/
		{
			id: "power",
			src: "images/power.png"
		}, /*能量槽条状*/
		{
			id: "new",
			src: "images/new.png"
		}, /*新纪录图标*/
		{
			id: "num_0",
			src: "images/num_0.png"
		}, /*数字0*/
		{
			id: "num_1",
			src: "images/num_1.png"
		},
		{
			id: "num_2",
			src: "images/num_2.png"
		},
		{
			id: "num_3",
			src: "images/num_3.png"
		},
		{
			id: "num_4",
			src: "images/num_4.png"
		},
		{
			id: "num_5",
			src: "images/num_5.png"
		},
		{
			id: "num_6",
			src: "images/num_6.png"
		},
		{
			id: "num_7",
			src: "images/num_7.png"
		},
		{
			id: "num_8",
			src: "images/num_8.png"
		},
		{
			id: "num_9",
			src: "images/num_9.png"
		}, /*数字9*/
		{
			id: "repeat_play_btn",
			src: "images/repeat_play_btn.png"
		}, /*再玩一次按钮*/
		{
			id: "lottery_btn",
			src: "images/lottery_btn.png"
		}, /*抽奖按钮*/
		{
			id: "result_bg",
			src: "images/result_bg.jpg"
		},
		{
			id: "label_txt_2",
			src: "images/label_txt_2.jpg"
		}
	])
	// 枕头滑动