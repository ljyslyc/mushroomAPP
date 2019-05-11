	/*!
	 * tips.js 原生js封装不依赖任何框架
	 * Version - 1.0.0
	 * 2016年12月24日18:30:36
	 *
	 * Copyright (c) Joke
	 */


	/*参数和方法
	1.  showPop(options);  显示POP形式弹层
		options
			title  			标题
			describe    	描述
			cancel      	返回键文本 ->默认 "取消"   class: pop-cancel
			sure        	确认键文本 ->默认 "确定"   class: pop-sure
			showCancel		是否显示取消键  传字符串的布尔值 ->默认 "true"
			showSure		是否显示确认键  传字符串的布尔值 ->默认 "true"
			textarea        是否显示文本域  传字符串的布尔值 ->默认 "false"


	2. hidePop();  隐藏POP形式弹层

	3. showTips(options); 显示tips形式弹层 默认不禁止body滚动   showTips({text:"撒娇的凯撒阶段",success:function(){
                                                                                
                                                                }})
                                                                showSuccessPop({text:"dsadsa"});
                                                                hideSuccessPop();
		options
			text        	显示的文本
			animateKlass	出现的动画类  ->不传默认 "slideInUp" 参考ANIMATE.CSS  

	4. blockBody();    禁止body滚动

	5. freeBody();		释放body

	*/
/*pop**/
//x>0?x=1:x=6;
function showPop(options){
	var title=options.title || '';
	var describe=options.describe;
	var cancel=options.cancel || '取消';
	var sure=options.sure || '确定';
	var placeholder=options.placeholder || "请输入文本";
	var showCancel , showSure, timer, textarea;
	var callback=options.callback || null;

	// √ options.showCancel=="false"|| !options.showCancel?showCancel=false:showCancel=true;
	//|| !options.showCancel 加上这个条件  默认按钮不显示
	//判断是否显示button和文本域  默认都不显示

	options.showCancel=="false" ? showCancel=false:showCancel=true;
	options.showSure=="false" ? showSure=false:showSure=true;
	options.textarea=="false" || !options.textarea?textarea=false:textarea=true;

	/*if(options.showCancel=="false"){ 
		showCancel=false;
	}else {
		showCancel=true;
	}
	if(options.showSure=="false"){//|| !options.showSure
		showSure=false;
	}else {
		showSure=true;
	}
	if(options.textarea=="false" || !options.textarea){
		textarea=false;
	}else{
		textarea=true;
	}*/
	//字符串拼接
	var res='';
	res+='<div class="pop-content">\
			<p class="pop-title">'+title+'</p>\
			<p class="pop-describe">'+describe+'</p>';

	//是否显示文本域
	if(textarea) res+='<textarea class="pop-textarea" placeholder="'+placeholder+'"></textarea>';

	//是否显示按钮
	if(showCancel || showSure){
		//有一个显示   都要加上pop-button结构
		res+='<div class="pop-button">';
		//button拼接
		//判断哪个为true
		if(showCancel)res+='<div class="pop-cancel" href="javascript:;">'+cancel+'</div>';
		if(showSure)res+='<div class="pop-sure" href="javascript:;">'+sure+'</div>';
		//结尾要加上pop-button的闭合标签
		res+='</div></div>';
	}else{
		//如果都未假   忽略pop-button结构
		res+='</div>';
	}
	
	var oDiv=document.createElement('div');
	oDiv.className='pop-box';
	oDiv.setAttribute('id','pop-box');
	oDiv.innerHTML=res;
	document.body.appendChild(oDiv);

	blockBody();
	//事件监听
    var textareaText;
	document.querySelector('.pop-cancel').addEventListener('click',function(){
		hidePop();
	},false);
	document.querySelector('.pop-sure').addEventListener('click',function(){
		if(document.querySelector('.pop-textarea')){
			textareaText=document.querySelector('.pop-textarea').value;
		}else{
			textareaText="";
		}
		hidePop();
		callback && callback(textareaText);
	},false);
	//如果没有button  就定时关闭
	//有button就手动关闭
	if(!showCancel && !showSure){
		clearTimeout(timer);
		setTimeout(function(){
			hidePop();
		},2000);
	}
}

function hidePop(){
	var oPop=document.getElementById('pop-box');
	oPop.parentNode.removeChild(oPop);
	freeBody();
}

/*tips*/
var showTipsReady=true;
function showTips(options){
	var text=options.text;
	var animateKlass=options.animateKlass || "flipInX";
	var success=options.success || null;
	//tip默认不锁定文档
	if(!showTipsReady){return;}
	if(!text){console.log("文本不存在，请传值");showTipsReady=true;return;}

	showTipsReady=false;
	var text=text;
	var timer=null;
	var oDiv=document.createElement('div');

	oDiv.className='tips-box '+animateKlass+' animated';
	oDiv.id='tips-box';
	oDiv.innerHTML=text;
	oDiv.style.opacity="0";
	document.body.appendChild(oDiv);

	var domBox=document.querySelector('#tips-box');
	var domWidth=domBox.offsetWidth;

	domBox.style.left="50%";
	domBox.style.marginLeft='-'+domWidth/2+'px';
	domBox.style.opacity='1';

	clearTimeout(timer);
	timer=setTimeout(function(){
		var oTips=document.getElementById('tips-box');
		oTips.parentNode.removeChild(oTips);
		if(timer){
			clearTimeout(timer);
			success && success();
		};

		showTipsReady=true;
	},2000)
}
/*weChatUI*/
function showSuccessPop(options){
	var text=options.text;
	var str='';
	var oDiv=document.createElement('div');
	oDiv.className="icon-pop";
	str+='<div class="success"></div>\
			<p>'+text+'</p>\
		';
	oDiv.innerHTML=str;

	var oMask=document.createElement('div');
	oMask.className="popmask";
	document.body.appendChild(oDiv);
	document.body.appendChild(oMask);
	oMask.style.opacity="0";
}
function hideSuccessPop(){
	var oIcon=document.querySelector('.icon-pop');
	var oMask=document.querySelector('.popmask');
	oIcon.parentNode.removeChild(oIcon);
	oMask.parentNode.removeChild(oMask);
}

 //加载效果
function showLoadingPop(options){
	blockBody();
	var text=options.text || '加载中...';
	var oDiv=document.createElement('div');
	oDiv.className="tips-load-container load4";
	var str='';
	str+='<div class="loader"></div><p class="tips-loading-text">'+text+'</p>';
	oDiv.innerHTML=str;

	var oMask=document.createElement('div');
	oMask.className="popmask";

	document.body.appendChild(oDiv);
	document.body.appendChild(oMask);
}
function hideLoadingPop(){
	freeBody();
	var oIcon=document.querySelector('.tips-load-container');
	var oMask=document.querySelector('.popmask');
	oIcon.parentNode.removeChild(oIcon);
	oMask.parentNode.removeChild(oMask);
}

/*return false*/
function blockBody(){
	document.body.style.width='100%';
	document.body.style.height='100%';
	document.body.style.overflow='hidden';

	document.documentElement.style.width="100%"
	document.documentElement.style.height="100%"
	document.documentElement.style.overflow='hidden';
}

function freeBody(){
	document.body.style.width='100%';
	document.body.style.height='auto';
	document.body.style.overflow='visible';

	document.documentElement.style.width="100%"
	document.documentElement.style.height="auto"
	document.documentElement.style.overflow='visible';
}



	/*pop
	<div class="pop-box" style="display: block;">
		<div class="pop-content">
			<p class="pop-title">标题</p>
			<p class="pop-describe">描述</p>
			<textarea class="pop-textarea" placeholder="输入文本信息"></textarea>
			<div class="pop-button">
				<div class="pop-cancel" href="javascript:;">取消</a>
				<div class="pop-sure" href="javascript:;">确定</a>
			</div>
		</div>
	</div>
	
	tips
	<div class="tips-box">消息提示</div>*/