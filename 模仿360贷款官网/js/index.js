window.onload = function() {
    
    //  导航区域的手机客户端鼠标移入
    document.querySelector('header .menu-item').onmouseover = function() {
        //  显示二维码
        document.querySelector('header .qr-box').style.display = 'block';
        //  根据链接位置设置二维码的位置
        document.querySelector('header .qr-box').style.left = document.querySelector('header .menu-item .arrow-down').offsetLeft + document.querySelector('header .menu-item .arrow-down').offsetWidth - document.querySelector('header .qr-box').offsetWidth + 'px';
    };

    //  导航区域的手机客户端鼠标移出
    document.querySelector('header .menu-item').onmouseout = function() {
        //  隐藏二维码
        document.querySelector('header .qr-box').style.display = 'none';
    };
};