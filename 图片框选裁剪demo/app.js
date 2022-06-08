const imgEl = document.querySelector('img');  // 图片
const selectBox = document.querySelector('#select-box');  // 区域选择框
const cropBtn = document.querySelector('#crop-btn');  // 裁剪按钮
const canvasEl = document.querySelector('canvas');  // canvas
const exportBtn = document.querySelector('#export-btn');  // 导出图片按钮
let imgFile = null;  // 存放裁剪后的图片

// 图片加载完成
imgEl.addEventListener('load', () => {
  // 显示区域选择框
  selectBox.style.display = 'block';
  // 把区域选择框放到 img 上
  selectBox.style.top = imgEl.offsetTop + 'px';
  selectBox.style.left = imgEl.offsetLeft + 'px';
});

// 区域选择框鼠标按下
selectBox.addEventListener('mousedown', ev => {
  const X = ev.clientX - ev.target.offsetLeft;
  const Y = ev.clientY - ev.target.offsetTop;

  // 鼠标移动
  document.onmousemove = ev => {
    selectBox.style.left = ev.clientX - X + 'px';
    selectBox.style.top = ev.clientY - Y + 'px';
    // 限制选择框的拖动范围，禁止拖出图片区域
    if (selectBox.offsetLeft <= imgEl.offsetLeft) {
      selectBox.style.left = imgEl.offsetLeft + 'px';
    }
    if (selectBox.offsetLeft >= imgEl.offsetWidth - selectBox.offsetWidth) {
      selectBox.style.left = imgEl.offsetWidth - selectBox.offsetWidth + 'px';
    }
    if (selectBox.offsetTop <= imgEl.offsetTop) {
      selectBox.style.top = imgEl.offsetTop + 'px';
    }
    if (selectBox.offsetTop >= imgEl.offsetHeight - selectBox.offsetHeight) {
      selectBox.style.top = imgEl.offsetHeight - selectBox.offsetHeight + 'px';
    }
  }

  // 鼠标放开
  document.onmouseup = () => {
    document.onmousemove = null;
  }
  return false;
});

// 图片裁剪按钮点击
cropBtn.addEventListener('click', () => {
  const sX = selectBox.offsetLeft - imgEl.offsetLeft;  // 区域选择框左侧位置
  const sY = selectBox.offsetTop - imgEl.offsetTop;  // 区域选择框上方位置
  const sW = selectBox.offsetWidth;  // 区域选择框宽度
  const sH = selectBox.offsetHeight;  // 区域选择框高度
  // 把图片截取到 canvas
  canvasEl.getContext('2d').drawImage(imgEl, sX, sY, sW, sH , 0, 0, canvasEl.width, canvasEl.height);
  // 把裁剪后的 canvas 图像转为 Blob
  canvasEl.toBlob(blob => {
    if (blob === null) return false;
    imgFile = blob;
  }, 'image/jpeg');
});

// 导出图片按钮点击
exportBtn.addEventListener('click', () => {
  if (imgFile === null) return false;
  const linkEl = document.createElement('a');
  linkEl.href = URL.createObjectURL(imgFile);
  linkEl.download = 'image.jpg';
  linkEl.click();
});