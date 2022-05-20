const startCameraBtn = document.querySelector('#start-camera');  // 打开摄像头按钮
const snapshotBtn = document.querySelector('#snapshot-btn');  // 拍照按钮
const exportBtn = document.querySelector('#export-btn');  // 导出照片按钮
const previewBox = document.querySelector('#preview-box');  // 预览区
const canvas = document.querySelector('canvas');  // canvas用来显示拍摄的照片
let imgData = null;  // 存储图片数据

// 打开摄像头按钮点击
startCameraBtn.addEventListener('click', () => {
  const constraints = {
    audio: false,
    video: {
      width: 400,
      height: 400
    }
  };
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    // 把媒体流直接传给 video 的 srcObject
    previewBox.srcObject = stream;
    snapshotBtn.disabled = false;
  }).catch(info => {
    alert('无法获取摄像头权限：' + info);
  });
});

// 拍照按钮点击
snapshotBtn.addEventListener('click', () => {
  // 绘制 2D 图像
  canvas.getContext('2d').drawImage(previewBox, 0, 0, previewBox.width, previewBox.height);
  // 把 canvas 的图像转换为 dataURL 数据
  imgData = canvas.toDataURL('image/jpeg');
  exportBtn.disabled = false;
});

// 导出照片按钮点击
exportBtn.addEventListener('click', () => {
  if (imgData === null) return false;
  // 创建一个链接
  const link = document.createElement('a');
  link.href = imgData;
  link.download = 'image.jpg';
  link.click();
});