$(function(){ 
	//banner����
	$("#banner ol>li").hover(function(){
		$(this).children("ul").show();
	},function(){
		$(this).children("ul").hide();
	})
	//�л���
	$(".ul-nav li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index=$(this).index();
		$(this).parent().siblings("ul").eq(index).addClass("show").siblings(".ul-shop").removeClass("show");
	})
	//banner�ֲ�
	var bannerImg = $(".banner-img a");
	var number = $(".banner-item li");
	var timer = null;
	var sw = 0;             
    //ÿ��li��click�¼�
    number.on("click",function (){
        $(this).addClass("active").siblings().removeClass("active");
        sw=$(this).index();
        bannerImg.eq(sw).css({"display":"block"}).siblings("a").css({"display":"none"});
        cleart();
    })    
    //���Ұ�ť�Ŀ���Ч��
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
    //��ʱ����ʹ�ã��Զ���ʼ
    timer = setInterval(carousel,5000);
    bannerImg.hover(function(){clearInterval(timer);},function(){cleart();})
    //¥��Ч��
    var lindex=0;
    var _top;
    $(".fix-nav ol li").click(function(){
        $(this).addClass("active").siblings("li").removeClass("active");
        lindex=$(this).index();
        //ͨ��ƴ���ַ�����ȡԪ�أ���ȡ��������ĵ��ĸ߶�
        if($(this).is(":last-child")){_top=0;}
        else{_top=$("#louti"+lindex).offset().top;}
        //scrollTop��������Ӧ�߶ȣ�ʱ��500ms
        $("body,html").animate({scrollTop:_top},500);
    });
    var win=$(window); //�õ����ڶ���
    var sc=$(document);//�õ�document�ĵ�����
    win.scroll(function(){
        if(sc.scrollTop()>=1380){
            $(".fix-nav").show(); 
            //��ȡ����Ԫ�ض�Ӧ������
            var index=Math.floor((sc.scrollTop()-1380)/688);
            $(".fix-nav li").eq(index).addClass("active").siblings().removeClass("active");
        }else{$(".fix-nav").hide();}
    })
    //���Ų�Ʒ���һ���
	var hotUl = $(".hot-sale ul");
	var hotTimer = null; 
    //���Ұ�ť�Ŀ���Ч��
    $(".hot-sale h2 span:eq(1)").stop().click(function (){
        leftScroll();
        hotCleart();
    })
    $(".hot-sale h2 span:eq(0)").stop().click(function (){
        rightScroll();
        hotCleart();
    })
    //��ʱ����ʹ�ã��Զ���ʼ
    hotTimer = setInterval(leftScroll,5000);
    hotUl.hover(function(){clearInterval(hotTimer);},function(){hotCleart();})
	
	//�Զ��庯��
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
