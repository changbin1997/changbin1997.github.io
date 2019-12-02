window.onload = () => {
    let imgBox = document.querySelector('.box');
    let imgBtn = document.querySelectorAll('.img-btn button');
    let imgL = 0;
    let imgArr = [0, -520, -1040, -1560, -2080];

    setInterval(() => {
        imgBox.style.transform = 'translate(' + imgL + 'px' + ', 0)';
        imgL -= 520;
        
        if (imgL <= -2600) {
            imgL = 0;
        }
    }, 3000);

    for (let i = 0;i < imgBtn.length;i ++) {
        imgBtn[i].onclick = ev => {
            imgL = imgArr[ev.target.getAttribute('index')];
            imgBox.style.transform = 'translate(' + imgL + 'px' + ', 0)';
        };
    }
};