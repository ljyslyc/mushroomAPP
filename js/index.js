//mui.init();
(function ($) {
    //第一个demo，拖拽后显示操作图标，点击操作图标删除元素；
    $('#OA_task_1').on('tap', '.mui-btn', function (event) {
        var elem = this;
        var li = elem.parentNode.parentNode;
        mui.confirm('确认删除该条记录？', '删除该条记录', btnArray, function (e) {
            if (e.index == 0) {
                li.parentNode.removeChild(li);
            } else {
                setTimeout(function () {
                    $.swipeoutClose(li);
                }, 0);
            }
        });
    });
    var btnArray = ['确认', '取消'];

})(mui);



//首页点击加号展开+
var menuWrapper = document.getElementById("menu-wrapper");
var menu = document.getElementById("menu");
var menuWrapperClassList = menuWrapper.classList;
var backdrop = document.getElementById("menu-backdrop");
var info = document.getElementById("info");

backdrop.addEventListener('tap', toggleMenu);
document.getElementById("menu-btn").addEventListener('tap', toggleMenu);
//下沉菜单中的点击事件
mui('#menu').on('tap', 'a', function () {
    toggleMenu();
    //info.innerHTML = '你已选择：' + this.innerHTML;
});

var busying = false;

function toggleMenu() {
    if (busying) {
        return;
    }
    busying = true;
    if (menuWrapperClassList.contains('mui-active')) {
        document.body.classList.remove('menu-open');
        menuWrapper.className = 'menu-wrapper fade-out-up animated';
        menu.className = 'menu bounce-out-up animated';
        setTimeout(function () {
            backdrop.style.opacity = 0;
            menuWrapper.classList.add('hidden');
        }, 500);
    } else {
        document.body.classList.add('menu-open');
        menuWrapper.className = 'menu-wrapper fade-in-down animated mui-active';
        menu.className = 'menu bounce-in-down animated';
        backdrop.style.opacity = 1;
    }
    setTimeout(function () {
        busying = false;
    }, 500);


    //图标替换
    if ($(this).hasClass("show")) {
        //$(this).css('color', '#ff5366');
        $("#menu-btn img").remove();
        $("#menu-btn").append("<img src='images/close.png'/>");
        $("#menu-btn").removeClass("show");

    } else {

        $("#menu-btn").addClass("show");
        $("#menu-btn img").remove();
        $("#menu-btn").append("<img src='images/add.png'/>");
    }

}



//事件委托的方法---a标签
mui('body').on('tap', 'a', function () {
    window.top.location.href = this.href;
});