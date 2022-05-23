const startCameraBtn = document.querySelector('#start-camera-btn');  // 打开摄像头按钮
const startBtn = document.querySelector('#start-btn');  // 开始录像按钮
const stopBtn = document.querySelector('#stop-btn');  // 停止录像按钮
const playBtn = document.querySelector('#play-btn');  // 播放视频按钮
const exportBtn = document.querySelector('#export-btn');  // 导出视频按钮
const videoEl = document.querySelector('video');  // 视频播放元素
let videoData = [];  // 存放视频数据
let  cameraStream = null;  // 存放媒体流
let mediaRecorder = null;  // 存放媒体录制对象

// 打开摄像头按钮点击
startCameraBtn.addEventListener('click', () => {
  // 申请视频和音频的参数
  const constraints = {
    audio: true,
    video: {
      width: 720,
      height: 360
    }
  };
  // 申请摄像头和麦克风权限
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    cameraStream = stream;
    // 禁用 video 的控制组件
    videoEl.controls = false;
    // 把媒体流传给 video 的 srcObject
    videoEl.srcObject = cameraStream;
    // 播放画面和声音
    videoEl.play();
    startCameraBtn.disabled = true;
    playBtn.disabled = true;
    exportBtn.disabled = true;
    startBtn.disabled = false;
  }).catch(info => {
    alert('错误' + info);
  });
});

// 开始录像按钮点击
startBtn.addEventListener('click', () => {
  // 清空视频数据
  videoData = [];
  // 创建媒体录制
  mediaRecorder = new MediaRecorder(cameraStream, {mimeType: 'video/webm'});
  // 开始录制
  mediaRecorder.start();

  // 处理视频数据
  mediaRecorder.addEventListener('dataavailable', ev => {
    videoData.push(ev.data);
  });

  // 录制开始事件
  mediaRecorder.addEventListener('start', () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
  });

  // 录制停止事件
  mediaRecorder.addEventListener('stop', () => {
    videoData = new Blob(videoData);
    stopBtn.disabled = true;
    startBtn.disabled = false;
    playBtn.disabled = false;
    exportBtn.disabled = false;
  });
});

// 停止录像按钮点击
stopBtn.addEventListener('click', () => {
  mediaRecorder.stop();
});

// 播放视频点击
playBtn.addEventListener('click', () => {
  if (videoData === null) return false;
  // 清除 video 的媒体流
  videoEl.srcObject = null;
  // 把视频数据转为 URL 传给 video 的 src
  videoEl.src = URL.createObjectURL(videoData);
  // 播放视频
  videoEl.play();
  // 启用 video 的控制组件
  videoEl.controls = true;
  // 删除媒体流
  cameraStream = null;

  playBtn.disabled = true;
  startCameraBtn.disabled = false;
  startBtn.disabled = true;
});

// 导出视频按钮点击
exportBtn.addEventListener('click', () => {
  if (videoData === null) return false;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(videoData);
  link.download = 'video.webm';
  link.click();
});