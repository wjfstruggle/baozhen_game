let zhentou=1;//枕头序号
//轮播初始化
function init_zhentou(){
	zhentou=1;
	//各枕头的初始化位置
	$("#banner1").css({left:"50%"})
	$("#banner2").css({left:"150%"})
	$("#banner3").css({left:"150%"})
	$("#banner4").css({left:"150%"})
	bannerSlide()
	bannerDetail()
	bannerImg()
}
//轮播图点击
function bannerImg(){
	let flag=true;//防抖开关
	$("#prev").on("touchstart",function(){
		if(flag){//防止touchstart触发太多次
			flag=false;
			if(zhentou>1){
				zhentou--;//枕头序号-1
			}
			$("#banner"+zhentou).animate({left:"50%"},500)//上一个枕头向左移动来到屏幕中间
			$("#banner"+(zhentou+1)).animate({left:"150%"},500,function(){//当前枕头向右移动超出屏幕
				flag=true;
			})
			bannerDetail()
		}
	})
	$("#next").on("touchstart",function(){
		if(flag){
			flag=false;
			if(zhentou<4){
				zhentou++;//枕头序号+1
			}
			$("#banner"+zhentou).animate({left:"50%"},500)//当前枕头向左移动超出屏幕
			$("#banner"+(zhentou-1)).animate({left:"-50%"},500,function(){//下一个枕头向右移动来到屏幕中间
				flag=true;
			})
			bannerDetail()
		}
	})
}

//左右滑动枕头
function bannerSlide(){
	let PageX1;
	let PageX2;
	let PageY;
	$("#warp_product").on("touchstart",function(e){
		PageX1=e.originalEvent.targetTouches[0].pageX;//获取触屏时按下的pageX
		PageY=e.originalEvent.targetTouches[0].pageY;//获取触屏时按下的pageY
	})
	$("#warp_product").on("touchend",function(e){
		PageX2=e.originalEvent.changedTouches[0].pageX;//获取触屏手离开时的pageX
		if(PageX1-PageX2>20 && PageY>75 && PageY<350){//如果pageY在75-350，并且触屏时按下的和离开的记录超过了20，则判定滑动了（这里为右滑）
			if(zhentou<4){
				zhentou++;//枕头序号+1
				$("#banner"+(zhentou-1)).animate({left:"-50%"},500)//当前枕头向左移动超出屏幕
				$("#banner"+zhentou).animate({left:"50%"},500)//下一个枕头向右移动来到屏幕中间
				bannerDetail();
			}
		}
		if(PageX1+20<PageX2 && PageY>75 && PageY<350){//(这里为左滑)
			if(zhentou>1){
				zhentou--;//枕头序号-1
				$("#banner"+(zhentou)).animate({left:"50%"},500)//上一个枕头向左移动来到屏幕中间
				$("#banner"+(zhentou+1)).animate({left:"150%"},500)//当前枕头向右移动超出屏幕
				bannerDetail();
			}
		}
	})

}
// 显示产品详情
// $("#show li").on('touchstart',()=> {
// 	$("#product_detail").css({'display': "block"});
// })
// $("#product_detail .clone").on('touchstart',()=> {
// 	$("#product_detail").css({'display': "none"});
// })
//点击查看详情
function bannerDetail(){
	let bannerPageX1;//触屏时的pageX
	let bannerPageX2;//触屏离开时的PageX
	let touchOneFlag=true;//防止touchstart触发太多次
	$("#banner"+zhentou).on("touchstart",touchPage_x)
	$("#banner"+zhentou).on("touchend",touchEndPage_x)
	$("#product_detail .close").on("touchstart",function(){
		$("#banner"+zhentou).off("touchstart",touchPage_x)
		$("#banner"+zhentou).off("touchend",touchEndPage_x)
		$("#product_detail").css({'display': "none"}); // 隐藏当前页
		touchOneFlag=true;
	})

	function touchPage_x(e){
		bannerPageX1=e.originalEvent.targetTouches[0].pageX;//触屏时的pageX
	}
	function touchEndPage_x(e){
		bannerPageX2=e.originalEvent.changedTouches[0].pageX;//触屏离开时的PageX
		if(Math.abs(bannerPageX1-bannerPageX2)<5){//如果两次的间距小于5，则判定为点击，而不是滑动
			if(touchOneFlag=true){
				touchOneFlag=false;
				$("#product_detail .pro_pic > img").attr("src","images/zhentou"+zhentou+".png")//更换图片
				//进行信息的替换
				if(zhentou==1){
					$("#product_detail h3").html("[泰迪枕]")
					$("#product_detail p").html("来自优质赛诺太空棉的温感慢回弹，配合人体工学曲线造型，帮助您保持颈椎自然曲线，给您整晚的呵护与健康。可爱的泰迪熊刺绣，代表温暖、忠诚和守护")
				}
				if(zhentou==2){
					$("#product_detail h3").html("[雅典梦幻枕]")
					$("#product_detail p").html("优质赛诺太空棉，护颈、护肩、双层可调节，中部凹陷设计，自然牵引头部、稳定睡姿。有效填充颈下空间，提供整晚舒适承托，仰睡舒适，侧卧也安逸")
				}
				if(zhentou==3){
					$("#product_detail h3").html("[安琪儿枕]")
					$("#product_detail p").html("优质赛诺太空棉，慢回弹特质，舒缓肩颈压力。人体工学的枕面设计，紧密贴合头颈曲线，维护颈椎健康。精美安琪儿刺绣，代表快乐、灵气和可爱")
				}
				if(zhentou==4){
					$("#product_detail h3").html("[太空智能枕]")
					$("#product_detail p").html("太空棉技术全面升级，透气性能大幅提升。棉芯采用崭新有机发泡技术，异形切割枕型紧密贴合颈椎曲线，更添加有机大豆油及负离子成分，清新自然守护")
				}
				$("#product_detail").css({'display': "block"});
			}
		}
	}
}


init_zhentou()
