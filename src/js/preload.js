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
	}, this);
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