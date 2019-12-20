window.onload = function () {
    var navList = document.querySelector('header nav');
    var navLi = document.querySelectorAll('header li');
    var line = document.querySelector('header .line');

    for (var i = 0;i < navLi.length;i ++) {
		navLi[i].index = i;
        navLi[i].onmouseover = function () {
            if (this.index < navLi.length - 1) {
				line.style.left = this.offsetLeft + 'px';
                line.style.width = this.offsetWidth - 25 + 'px';
			}
        };
    }

    navList.onmouseout = function (ev) {
        if (ev.clientX < this.offsetLeft || ev.clientX > this.offsetLeft + this.offsetWidth || ev.clientY < this.offsetTop || ev.clientY > this.offsetTop + this.offsetHeight) {
            line.style.left = navLi[0].offsetLeft + 'px';
            line.style.width = navLi[0].offsetWidth + 'px';
        }
    };

    setTimeout(function () {
        document.querySelector('.mod-banner .download').style.right = '114px';
        document.querySelector('.mod-banner .download').style.opacity = 1;
    }, 20);
};