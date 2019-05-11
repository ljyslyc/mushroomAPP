function addZero(n){
	return n<10?'0'+n:n;
}

function changeTime(time){
	var oDate=new Date();
	oDate.setTime(Number(time));
	var year=oDate.getFullYear();
	var month=oDate.getMonth()+1;
	var date=oDate.getDate();

	return year+'-'+addZero(month)+'-'+addZero(date);
}

//获得某一具体的数据 options// 表名、数据ID
function getData(DBNAME,TIME){
	var tempData=JSON.parse(localStorage.getItem(DBNAME));
	for(var i=0;i<tempData.list.length;i++){
		if(tempData.list[i].time==TIME){
			return tempData.list[i]
		}else{
			continue;            
		}
	}
}

//sec
function getSec(mainText,currentDefaultSec){
    var tempObj={};
    var str2='';
    var mainIndex=null;
    allClassify.forEach(function(val,index){
        if(val.kind==mainText){
            tempObj=allClassify[index].group;
            mainIndex=index;
        }
    })
    //看主类下面是否有当前被选择的次类
    var isReady=isInObj(tempObj,currentDefaultSec);
    if(isReady){
        $('item2 p').text(currentDefaultSec);
        for(var key in tempObj){
            if(key==currentDefaultSec){
                str2+='<li class="active">'+key+'</li>';
            }else{
                str2+='<li>'+key+'</li>'
            }
        }

        getThr(mainIndex,currentDefaultSec);
    }else{
        var index=0;
        var firstKey=null;
        //默认显示第0个
        for(var key in tempObj){
            if(index==0){
                firstKey=key;
                $('.item2 p').text(key);
                str2+='<li class="active">'+key+'</li>';
            }else{
                str2+='<li>'+key+'</li>'
            }
            index++;
        }
        getThr(mainIndex,firstKey);
    }
    $('.list2').html('').append(str2);
    $('.list2 li').off('touchstart').on('touchstart',function(){
        $('.list2 li').removeClass('active');
        var secText=$(this).text();

        $(this).addClass('active');
        $('.group-name').val(secText);
        $(this).parent().siblings().text(secText);
        getThr(mainIndex,secText);
    })
}
//option
function getThr(index,txt){
    var thrArr={};
    for(var key in allClassify[index].group){
        if(key==txt){
            thrArr=allClassify[index].group[key];
        }
    }
    //detail-option
    var strLi='';
    for(var name in thrArr){
        if($.trim(name)==''){
            continue;
        }else{
            if(name=="综合分析"){
                $('.content').show().find('textarea').val(thrArr[name]);
            }else{
                var lastCh=name.charAt(name.length-1);
                switch(lastCh){
                    case "期":
                        strLi+='<li class="clearfix date">\
                            <span>'+name+'</span>\
                            <i class="date-icon"></i>\
                            <input type="text" readonly value="'+thrArr[name]+'" placeholder="请输入'+name+'" />\
                        </li>';
                    break;
                    case "率":
                        strLi+='<li class="clearfix percent">\
                            <span>'+name+'</span>\
                            <em>%</em>\
                            <input type="number" value="'+thrArr[name]+'" name="" placeholder="请输入'+name+'">\
                        </li>';
                    break
                    default:
                        strLi+='<li class="clearfix">\
                            <span>'+name+'</span>\
                            <input type="text" name="" value="'+thrArr[name]+'" placeholder="请输入'+name+'">\
                        </li>';
                }
            }
        }
    }

    $('.detail-list').html('').append(strLi);
    $('.date input').mobiscroll().date({
        theme: 'mobiscroll',
        lang: "zh",
        display: 'bottom',
        dateFormat: 'yy-mm-dd'
    });
}



//default-option
function update(data){
    console.log(data);
    var tempKey="综合分析";
    //主要信息
    var str3='<img src="'+data.src+'">\
            <div class="photo-des">\
                <h2>'+data.name+'</h2>\
                <span>'+data.number+'</span>\
                <h5>'+changeTime(data.time)+'</h5>\
                <p class="address">'+data.address+'</p>\
            </div>';
    
    //details
    $('.photopos').html('').append(str3);
    $('.hasphoto').css("background-image",'url('+data.src+')');

    $('.variety').val(data.name);
    $('.group-name').val(data.classify);
    $('.breed-name').on('keyup',function(){
        $('.photo-des h2').text($(this).val());
    }).val(data.breedName);
    $('.number').on('keyup',function(){
        $('.photo-des span').text($(this).val());
    }).val(data.number);
    $('.townName input').on('keyup',function(){
        $('.photo-des p').text($(this).val())
    }).val(data.address);
    $('.bz input').val(data.seedTime);
    $('.cm input').val(data.sproutTime);
    $('.kh input').val(data.bloomTime);
    $('.cml input').val(data.sproutPercent);
    
    //综合分析
    console.log(data.details[tempKey])
    if(data.details[tempKey]){
        $('.content').show().find('textarea').val(data.details[tempKey]);
    }else{
        $('.content').hide().find('textarea').val('');
    }
    hideLoadingPop();
}


function save(id,mainData,detailsData){
	var data=JSON.parse(localStorage.getItem('indexList')).list;
	var tempClassify=JSON.parse(localStorage.getItem('classify'));

	for(var k=0;k<data.length;k++){
		if(data[k].time==id){
			var klassify=data[k].classify;

            for(var key in mainData){
                data[k][key]=mainData[key];
            }

			data[k].details=detailsData
			
			/*for(var m=0;m<tempClassify.length;m++){
				if(tempClassify[m].kind==mainData.name){
                    console.log(detailsData);
					tempClassify[m].group[klassify]=detailsData;
					break;
				}
			}*/
			localStorage.setItem('indexList',JSON.stringify({"list":data}));
			/*localStorage.setItem('classify',JSON.stringify(tempClassify));*/
			return true;
		}else{
			continue;
		}
	}
	return false
}


function isInObj(obj,key){
    for(var name in obj){
        if(name==key){
            return true;
        }
    }
    return false;
}

function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}
function getSecData(mainText){
    var classify=JSON.parse(localStorage.getItem('classify'));
    //找到对应kind 下面的所有类别
    var currentClassArr=[];

    for(var i=0;i<classify.length;i++){
        if(classify[i].kind==mainText){
            var secMenuStr='';
            var index=0;
            for(var key in classify[i].group){
                if(index==0){
                    secMenuStr+='<li class="active">'+key+'</li>';
                    $('.item2 p').text(key);
                    $('.group-name').val(key);
                }else{
                    secMenuStr+='<li>'+key+'</li>';
                }
                index++;
            }   
            $('.list2').html(secMenuStr);
            //默认找模板
            getModule($('.item1 p').text(),$('.item2 p').text());
            //list2 li点击事件
            $('.list2 li').off('click').on('click',function(){
                $('.list2 li').removeClass('active');
                $(this).addClass('active');

                $('.item2 p').text($(this).text());
                $('.group-name').val($(this).text());
                //点击找模板
                getModule($('.item1 p').text(),$('.item2 p').text());
            });
        }else{
            continue;
        }
    }
}
function getModule(mainText,secText){
    //所有分类数据
    var allClassify=JSON.parse(localStorage.getItem('classify'));
    //是否有当前物种对应二级的option
    var ready=false;

    for(var k=0;k<allClassify.length;k++){
        if(allClassify[k].kind==mainText){
            //分类参数渲染
            ready=true;
            var detailObj=allClassify[k].group[secText];
            var optionsStr='';

            for(var key in detailObj){
                if(key=="综合分析"){
                    $('.content').show();
                }else{
                    $('.content').hide();
                    var lastCh=key.charAt(key.length-1);
                    switch(lastCh){
                        case '率':
                            optionsStr+='<li class="clearfix percent">\
                                <span>'+key+'</span>\
                                <em>%</em>\
                                <input type="number" placeholder="请输入'+key+'">\
                            </li>';
                        break;
                        case '期':
                            optionsStr+='<li class="clearfix date">\
                                <span>'+key+'</span>\
                                <i class="date-icon" id="dateIcon"></i>\
                                <input value=""  readonly  placeholder="请输入'+key+'">\
                            </li> ';
                        break;
                        default:
                            optionsStr+='<li class="clearfix">\
                                <span>'+key+'</span>\
                                <input type="text"  placeholder="请输入'+key+'">\
                            </li>';
                    }
                }
            }
            $('.option-list2').html(optionsStr);
            // 时间选择
            $('.date input').mobiscroll().date({
                theme: 'mobiscroll',
                lang: "zh",
                display: 'bottom',
                dateFormat: 'yy-mm-dd'
            });
        }else{
            continue;
        }

        //是否有当前类的option
        if(!ready){
            showPop({
                title:"温馨提示",
                describe:"暂无详细参数",
                showCancel:fasle
            })
        }
    }
}
//验证 找当前数据中是否有  当前填写物种和当前分类
//0 有物种有分类  1 有物种无分类（新建分类） 2无物种
function localIsHas(mainText,secText){
    var classify=JSON.parse(localStorage.getItem('classify'));
    if(classify){
        for(var u=0;u<classify.length;u++){
            if(classify[u].kind==mainText){
                for(var key in classify[u].group){
                    if(key==secText){
                        return 0;
                    }
                }
                return 1;
            }
        }
        return 2;
    }else{
        return 2;
    }
}


function isInArr(text,arr){
    if(text){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==text){
                return true;
            }
        }
        return false;
    }else{
        return false;
    }
}


function deleteRecord(id){
    var list=JSON.parse(localStorage.getItem('indexList'));

    for(var k=0;k<list.list.length;k++){
        if(list.list[k].time==id){
            list.list.splice(k,1);
        }else{
            continue;
        }
    }

    localStorage.setItem('indexList',JSON.stringify(list));
    showTips({text:"数据删除成功",success:function(){
        var x=JSON.parse(localStorage.getItem('indexList')).list.length;
        if(!x || x==0){
            $('.no-data').show();
            $('h5').hide();
        }else{
            $('.no-data').hide();
        }
    }});

}


$('.percent input').on('keyup',function(){
    var _this=$(this);
    _this.val(_this.val().replace(/\D/g,''));
})