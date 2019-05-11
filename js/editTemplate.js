$(function () {
    var obj = {};
    if (!window.localStorage) {
        alert("浏览器不支持localstorage");
    } else {
        var storage = window.localStorage;
        if (!storage.getItem("classify")) {
            var classify = [];
        } else {
            var classify = JSON.parse(storage.getItem("classify"));
            console.log(classify);
        }
    }
    //进入页面之后把物种添加到新建物种列表中
    var $ul1 = $("#newKindLists ul");
    var len=classify.length;
    $.each(classify, function (i, item) {
        var $li1 = $("<li>" + item.kind + "</li>");
        $li1.data("singleData", item);
        $ul1.append($li1);
    });
    //选择不同的物种对应不同的分类
    var $ul2 = $("#newGroupLists ul");

    //新建物种选择
    $("#new-kind").on("touchstart", function () {
        console.log(len)
        if (len == 0) {
            showTips({text:"暂无物种，请新建物种"})
            return;
        } else {
            if ($("#new-kind").hasClass("tip")) {
                $("#newKindLists").slideUp(200);
                $("#new-kind").removeClass("tip");
            } else {
                $("#newKindLists").slideDown(200);
                $("#new-kind").addClass("tip");
            }

            if ($(".new-group").hasClass("item")) {
                $("#newGroupLists").slideUp(200);
            };
        }
    });

    //新建物种
    $(".kind-list").on("touchstart", "li", function () {
        kind = $(this).text();
        $(".kind-value").val(kind);
        $(".new-kind span").text(kind);
        $("#newKindLists").hide();
        $("#kindName").hide();
        $("#kindName1").show();
        $ul2.empty();
        var grp = $(this).data("singleData").group;
        $.each(grp, function (i, item) {
            var $li2 = $("<li>" + i + "</li>");
            $(".new-group span").text(i);
            $(".group-value").val(i);
            $ul2.append($li2);
        });

    });
    //新建组选择
    $(".new-group").on("touchstart", function () {
        if (!$.contains($('.group-list').get(0),$('.group-list li').get(0))){
            showTips({text:"请先填写/选择物种"})
        } else {
            if ($("#new-kind").hasClass("tip")) {
                $("#newKindLists").slideUp(200);
            };
            if ($(".new-group").hasClass("item")) {
                $("#newGroupLists").slideUp(200);
                $(".new-group").removeClass("item");
            } else {
                $("#newGroupLists").slideDown(200);
                $(".new-group").addClass("item");
            };
        }

    });
    //新建组
    $(".group-list").on("touchstart", "li", function () {
      
        group = $(this).text();
        $(".new-group span").text(group);
            $(".group-value").val(group);
            $("#newGroupLists").hide();
            //$("#groupName").hide();
            //$("#groupName1").show();
        
    });
    $("#save,.add").on("touchstart", function (e) {
        //数据库不为空
        if (classify.length != 0) {
            //for (var i = 0; i < classify.length; i++) {
            //    if (classify[i].kind == $(".kind-value").val()) {
            //        for (var key in classify[i].group) {
            //            if (key == $(".group-value").val()) {
            //                alert("组名重复，请重新起名！")
            //                e.preventdefault();
            //                return;
            //            }
            //        }
            //    }
            //};

            if ($("#kindName").val() == "" || $("#groupName").val() == "") {
                showTips({text:"物种名/组名不能为空！"});
                e.preventdefault();

            };
            var count = 0;
            for (var i = 0; i < classify.length; i++) {
                //物种名一样
                if (classify[i].kind == $("#kindName").val()) {
                    //遍历组名
                    var groupName = $.trim($("#groupName").val());
                    console.log(groupName)
                    $.each(classify[i].group, function (k, item) {
                        //组名也一样
                        if (k == groupName) {
                            showTips({text:"组名重复，请重新起名！"});
                            return false;
                            //组名不一样
                        } else {
                            //得到更新的新数据
                            classify[i].group[groupName] = get();
                            //重新序列化入库
                            var newCfy = JSON.stringify(classify);
                            storage.setItem("classify", newCfy);
                            showTips({text:"模板保存成功",success:function(){
                                location.href='addRecord.html?auto=false';
                            }});
                            return false;
                        }
                    });
                    //物种名不一样

                }else {
                    count++;
                };
                //else {
                //    getData();
                //}
            };
            if (count == classify.length){
                getData();
            };
        //数据库为空
        } else {
            getData();
        }
    });
    $("#cancle").on("touchstart", function (e) {
        location.href="index.html";
    });
    //添加新的item
    $("#addItem").on("touchstart", function (e) {
        //克隆一个父元素
        $parent = $(this).parent().clone(true);
        var cls = $parent.attr("class") + "1";
        $parent.attr("class", cls);
        //将克隆的元素插入到当前元素的下面
        $(this).parent().after($parent);
        $(this).next().show();
        $(this).hide();
        e.preventDefault();
    });

    //删除该行输入框
    $("[data-kill]").on("touchstart", function () {
        $(this).parent().detach();
    });
    //返回上一页
    $(".back").on("touchstart", function () {
        //if (history.length < 1) {
        //    history.back();
        //} else {
        //    alert("当前页就是首页");
        //}
        window.location.href = "addRecord.html?auto=false";
    });
    //获取页面所有数据
    function getData() {
        var dtlObj = {};
        //物种名
        var kindValue = $(".kind-value").val();
        //组名
        var groupValue = $(".group-value").val();
        //发芽期
        var sprout = $(".sproutValue input").val();
        //活动积温
        var activeValue = $(".activeValue input").val();
        //新增内容
        var newAdds = $(".addValue");
        var json = {};
        $(".addValue").each(function (i, item) {
            if (!$(item).find("input").val()) {
                return false;
            }
            json[$(item).find("input").val()] = '';
            //console.log(item);
        });
        dtlObj[groupValue] = json;
        //==============================
        obj.kind = kindValue;
        obj.group = dtlObj;
        classify.push(obj);
        var tmpObj = JSON.stringify(classify);
        storage.setItem("classify", tmpObj);
        showTips({text:"模板保存成功",success:function(){
            location.href="addRecord.html?auto=false"
        }});
    };
    function get() {
        //发芽期
        var sprout = $(".sproutValue input").val();
        //活动积温
        var activeValue = $(".activeValue input").val();
        //新增内容
        var newAdds = $(".addValue");
        var json = {};
        json[sprout] = '';
        json[activeValue] = "";
        $(".addValue").each(function (i, item) {
            json[$(item).find("input").val()] = '';
        });
        return json;
        
    }

});
