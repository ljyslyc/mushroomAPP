function loadMore(data){
	var step=4;
	var num=1;
	var iCount=1;
	if(data.length){
		for(var i=0;i<step*num;i++){
			if(iCount==data.length){
				//No-data
			}else{
				var str='';
				str+='<li>\
	                    <img src="img/img.png">\
	                    <div class="right">\
	                        <h2 class="clearfix">\
	                            <span>大叶栀子花</span><em>2017-6-4</em>\
	                        </h2>\
	                        <h3>AZ00021245-2</h3>\
	                        <P>大豆/生育期</P>\
	                        <h4 class="clearfix">\
	                            <span>武汉市洪山区光谷广场</span>\
	                            <i class="camera"></i>\
	                        </h4>\
	                    </div>\
	                    <div class="delete"></div>\
	                </li>';
	            $('.list').append(str);
	            iCount++;
			}
		}
		num++;
	}else{
		return;
	}
}