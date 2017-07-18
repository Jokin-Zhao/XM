$(function(){ 
	//banner导航
	$("#banner ol>li").hover(function(){
		$(this).children("ul").show();
	},function(){
		$(this).children("ul").hide();
	})
	//切换卡
	$(".ul-nav li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index=$(this).index();
		$(this).parent().siblings("ul").eq(index).addClass("show").siblings(".ul-shop").removeClass("show");
	})
	//banner轮播
	var bannerImg = $(".banner-img a");
	var number = $(".banner-item li");
	var timer = null;
	var sw = 0;             
    //每个li绑定click事件
    number.on("click",function (){
        $(this).addClass("active").siblings().removeClass("active");
        sw=$(this).index();
        bannerImg.eq(sw).css({"display":"block"}).siblings("a").css({"display":"none"});
        cleart();
    })    
    //左右按钮的控制效果
    $(".next").click(function (){
        sw++;
        if(sw==number.length)sw=0;
        number.eq(sw).trigger("click");
    });
    $(".prev").click(function (){
        sw--;
        if(sw<0)sw=number.length-1;
        number.eq(sw).trigger("click");
    });
    //定时器的使用，自动开始
    timer = setInterval(carousel,5000);
    bannerImg.hover(function(){clearInterval(timer);},function(){cleart();})
    //楼梯效果
    var lindex=0;
    var _top;
    $(".fix-nav ol li").click(function(){
        $(this).addClass("active").siblings("li").removeClass("active");
        lindex=$(this).index();
        //通过拼接字符串获取元素，再取得相对于文档的高度
        if($(this).is(":last-child")){_top=0;}
        else{_top=$("#louti"+lindex).offset().top;}
        //scrollTop滚动到对应高度，时长500ms
        $("body,html").animate({scrollTop:_top},500);
    });
    var win=$(window); //得到窗口对象
    var sc=$(document);//得到document文档对象。
    win.scroll(function(){
        if(sc.scrollTop()>=1380){
            $(".fix-nav").show(); 
            //获取滚动元素对应的索引
            var index=Math.floor((sc.scrollTop()-1380)/688);
            $(".fix-nav li").eq(index).addClass("active").siblings().removeClass("active");
        }else{$(".fix-nav").hide();}
    })
    //热门产品左右滑动
	var hotUl = $(".hot-sale ul");
	var hotTimer = null; 
    //左右按钮的控制效果
    $(".hot-sale h2 span:eq(1)").stop().click(function (){
        leftScroll();
        hotCleart();
    })
    $(".hot-sale h2 span:eq(0)").stop().click(function (){
        rightScroll();
        hotCleart();
    })
    //定时器的使用，自动开始
    hotTimer = setInterval(leftScroll,5000);
    hotUl.hover(function(){clearInterval(hotTimer);},function(){hotCleart();})
	
	//自定义函数
	function cleart(){
		clearInterval(timer);
		timer=setInterval(carousel,5000);
	}
	function carousel(){
		sw++;        
		if(sw==number.length)sw=0;
		bannerImg.eq(sw).css({"display":"block"}).siblings("a").css({"display":"none"});
		number.eq(sw).addClass("active").siblings("li").removeClass("active");
	}
	function hotCleart(){
		clearInterval(hotTimer);
		hotTimer=setInterval(leftScroll,5000);
	}
	function leftScroll(){
		hotUl.animate({left:-496},500,function(){
			$(".hot-sale ul li:eq(0)").appendTo(hotUl);
			hotUl.css({"left":-248}); 
		});
	}
	function rightScroll(){
		hotUl.animate({left:0},500,function(){
			$(".hot-sale ul li:last-child").prependTo(hotUl);
			hotUl.css({"left":-248}); 
		});
	}
})
