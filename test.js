let firstTime;//判断是否第一次飞
let power;//蓄力时增加的能量
let bgTimer;//背景移动定时器
let flyScore;//飞行距离分数
let maxScore=0;//最高记录分数
var pn=location.search.split("?pn=")[1];
//初始化函数
function init(){
	$("#pillow>img").attr("src","img/game/zhentou"+pn+".png")
	$("#tip1").show();//提示一显示
	$("#tip2").hide();//提示二隐藏
	firstTime=true;
	power=0;//蓄力时增加的能量
	flyScore=0;//分数置0
	$("#beginImg").css({marginLeft:0+"%"})
	$("#endImg").css({marginLeft:100+"%"})
	$("#star1Img").css({left:0+"%"})
	$("#star1ImgClone").css({left:100+"%"})
	$("#star2Img").css({left:100+"%"})
	$("#star2ImgClone").css({left:200+"%"})
	$("#sky1Img").css({left:0+"%"})
	$("#sky2Img").css({left:100+"%"})
	$("#bearAndPillow").css({left:10+"%"})
	$("#bearAndPillow").css({top:-10+"%"})
	for(let i=0;i<13;i++){
		$('#pao'+i).css({left:100+"%"})
	}
	$("#bearAndPillow").animate({top:60+"%"},1500,function(){
		addPower()
	})
}

//蓄力函数
function addPower(){
	let t1;//蓄力时能量增加的定时器
	let t2;//飞行时能量条增加定时器
	$("body").one("touchstart",function(){	//长按蓄力
		t1=setInterval(()=>{
			power=power+1;	//蓄力
			$("#powerEnergy").css({width:power+"%"});//能量条长度增加
			$("#powerNum").html(power);
			$("#powerNum").css({marginLeft:power+"%"})
			if(power>=100){	//超过100就不增加了
				clearInterval(t1);
			}
		},10)
	})
	$("body").one("touchend",function(){	//松手
		$("#tip1").fadeOut("slow");//提示一隐藏
		$("#tip2").fadeIn("slow");//提示二显示
		clearInterval(t1);//松手时后就不加能量了
		$("#powerNum").html("")
		barChange();	
		bearFly(power);
		bgMove()
	})

}


//能量条变化函数
function barChange(){
	t2=setInterval(()=>{	//飞行时能量条会一直增加
		power=power+1;
		$("#powerEnergy").css({width:power+"%"})
		if(power>=100){	//能力超过100就按100算
			power=100;
			$("#powerEnergy").css({width:power+"%"})
		}
	},500)
	$("body").on("touchstart",touchFun)	//点击往上飞
//	$("body").on("click",touchFun)	//点击往上飞
}

//点击函数
function touchFun(){
	power-=5;//每点击一次，消耗10能量
	if(power<=0){	//能力小于0时，按0算
		power=0;
		$("#powerEnergy").css({width:power+"%"})
		clearInterval(t2);	//小于0清楚飞行时增加的定时器
		$("body").off("touchstart",touchFun);	//消除touchstart的监听
//		$("body").off("click",touchFun);	//消除mousedown的监听
	}else{
		$("#powerEnergy").css({width:power+"%"})
	}
	bearFly(20);	//每点击一次，给熊和枕头一个往上的加速度
}

//熊飞函数
function bearFly(first_speed){
	var first_speed=-(first_speed*0.3);	//加速度
	var bearAndPillow=getTop();	//获取当前熊和枕头的高度
	now_top=bearAndPillow+first_speed;//获取当前熊和枕头的高度+加速度后，会到达的高度
	if(now_top<=20){	//防止破天
		now_top=20;
	}
	if(firstTime==false){	//非第一次飞
		$("#tip2").fadeOut("slow");//提示二隐藏
		clearInterval(t3);
		$("#bearAndPillow").stop().animate({top:now_top+"%"},500,function(){	//先让熊飞到指定高度， 再递减
			firstTime=false;
			t3=setInterval(()=>{
				now_top=now_top*1.009;	//
				if(now_top>=75){	//着陆了
					endSlide()
				}else{
					$("#bearAndPillow").css({top:now_top+"%"});
				}
			},20)
		});
	}
	if(firstTime==true){	//第一次飞
		$("#bearAndPillow").stop().animate({top:now_top+"%"},700,function(){
			firstTime=false
			t3=setInterval(()=>{
				now_top=now_top*1.01;
				if(now_top>=75){
					endSlide()
				}else{
					$("#bearAndPillow").css({top:now_top+"%"});
				}
			},20)
		});
	}
}


//获取熊当前高度函数
function getTop(){
	let bearAndPillow_top=$("#bearAndPillow").css("top").split("px",1)[0]  
	let FlyingBear_top=$("#FlyingBear").css("height").split("px",1)[0]  
	let position_top=Math.ceil(bearAndPillow_top/FlyingBear_top*100)
	return position_top;
}

//结束处理函数
function gameOverDetail(){
	if(flyScore>maxScore){
		maxScore=flyScore;
	}
	$(".nowScore").html(flyScore);
	$(".historyScore").html(maxScore);
	$('#myModal').modal('toggle');
	$("body").one("click","button",function(e){
		if(e.target.className.indexOf("playAgain")!=-1){
			init()
		}
		if(e.target.className.indexOf("luckyDraw")!=-1){
			window.location.href="luckyDraw.html?pn="+pn
		}
	})
}


//背景移动函数
function bgMove(){
	var flag=true;//判断是否过了出发点
	var beginAndEnd=0;//开始和结束
	var star1Speed=0;//星星一的移动速度
	var star1CloneSpeed=0;//克隆星星一的移动速度
	var star2Speed=0;//星星二的移动速度
	var star2CloneSpeed=0;//克隆星星二的移动速度
	var sky1Speed=0;//云一的移动速度
	var sky2Speed=0;//云二的移动速度
	let i=1;
	bgTimer=setInterval(()=>{
		//分数增加出现啊相应的星球
		flyScore+=9;//分数增加
		if(flyScore>=5000*i){
			$('#pao'+i).animate({left:-150+"%"},3500,'linear')
			i+=1;
		}
		//处理开始标志
		beginAndEnd+=0.1;
		if(beginAndEnd>20){
			flag=false;
		}
		if(flag==false){	//如果开始标志超出了屏幕，就让开始标志的“隐藏”
			$("#beginImg").css({marginLeft:-100+"%"})
		}else{	//否则就让开始标志慢慢向左移动
			$("#beginImg").css({marginLeft:-beginAndEnd*10+"%"})
		}
		
		//处理星星一
		star1Speed+=0.025;
		star1CloneSpeed+=0.025;
		if(star1Speed>=10){
			star1Speed=-10;
		}
		if(star1CloneSpeed>=20){
			star1CloneSpeed=0;
		}
		$("#star1Img").css({left:-star1Speed*10+"%"})
		$("#star1ImgClone").css({left:100-star1CloneSpeed*10+"%"})
		
		//处理星星二
		star2Speed+=0.08;
		star2CloneSpeed+=0.08;
		if(star2Speed>=20){
			star2Speed=0;
		}
		if(star2CloneSpeed>=30){
			star2CloneSpeed=10;
		}
		$("#star2Img").css({left:100-star2Speed*10+"%"})
		$("#star2ImgClone").css({left:200-star2CloneSpeed*10+"%"})
		
		//处理云
		sky1Speed+=0.045;
		sky2Speed+=0.045;
		if(sky1Speed>=10){
			sky1Speed=-10;
		}
		if(sky2Speed>=20){
			sky2Speed=0;
		}
		$("#sky1Img").css({left:-sky1Speed*10+"%"})
		$("#sky2Img").css({left:100-sky2Speed*10+"%"})
	},10)
}


//结束滑行处理
function endSlide(){
	clearInterval(t3);
	clearInterval(t2);
	$("#sky1Img").animate({left:parseInt($("#sky1Img").css("left").split("px",1)[0])-100+"px"},2000)
	$("#sky2Img").animate({left:parseInt($("#sky2Img").css("left").split("px",1)[0])-100+"px"},2000)
	$("#star1Img").animate({left:parseInt($("#star1Img").css("left").split("px",1)[0])-50+"px"},2000)
	$("#star1ImgClone").animate({left:parseInt($("#star1ImgClone").css("left").split("px",1)[0])-50+"px"},2000)
	$("#star2Img").animate({left:parseInt($("#star2Img").css("left").split("px",1)[0])-200+"px"},2000)
	$("#star2ImgClone").animate({left:parseInt($("#star2ImgClone").css("left").split("px",1)[0])-200+"px"},2000)
	$("#powerEnergy").animate({width:0+"%"},2000)	//能量条清0
	clearInterval(bgTimer);
	$("#endImg").animate({marginLeft:0+"%"},2000)
	$("#bearAndPillow").animate({left:50+"%"},2500,function(){//着陆后再往前滑行一段距离
		gameOverDetail();
	})	
	$("body").off("touchstart",touchFun);	//清楚点击事件监听
//	$("body").off("click",touchFun);	//清楚点击事件监听
}
init()
