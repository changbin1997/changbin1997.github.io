const startBtn = document.querySelector('#start-btn');  // 开始录音按钮
const stopBtn = document.querySelector('#stop-btn');  // 停止录音按钮
const playBtn = document.querySelector('#play-btn');  // 播放录音按钮
const exportBtn = document.querySelector('#export-btn');  // 导出录音按钮
let mediaRecorder = null;  // 存放 MediaRecorder
let audioData = [];  // 存储录音数据块
time.init();

// 开始录音按钮点击
startBtn.addEventListener('click', () => {
  audioData = [];
  // 请求麦克风权限
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    // 创建媒体记录
    mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'});
    // 开始录制
    mediaRecorder.start();

    // 处理音频数据
    mediaRecorder.addEventListener('dataavailable', ev => {
      // 把数据块添加到数组
      audioData.push(ev.data);
    });

    // 录音停止
    mediaRecorder.addEventListener('stop', () => {
      // 把音频数据块转换为 Blob
      audioData = new Blob(audioData);
      time.stop();
      startBtn.disabled = false;
      stopBtn.disabled = true;
      playBtn.disabled = false;
      exportBtn.disabled = false;
    });

    // 录音开始
    mediaRecorder.addEventListener('start', () => {
      time.start();
      startBtn.disabled = true;
      stopBtn.disabled = false;
      playBtn.disabled = true;
      exportBtn.disabled = true;
    });
  }).catch(info => {
    alert('无法获取麦克风权限！错误信息：' + info);
  });
});

// 停止录音按钮点击
stopBtn.addEventListener('click', () => {
  mediaRecorder.stop();
});

// 播放录音按钮点击
playBtn.addEventListener('click', () => {
  if (audioData === null) return false;
  // 创建一个 URL 资源对象给 Audio 读取
  const audio = new Audio(URL.createObjectURL(audioData));
  // 播放音频
  audio.play();
  // 开始播放触发事件
  audio.addEventListener('canplay', () => {
    time.start();
    startBtn.disabled = true;
    playBtn.disabled = true;
  });
  audio.addEventListener('ended', () => {
    time.stop();
    startBtn.disabled = false;
    playBtn.disabled = false;
  });
});

// 导出录音按钮点击
exportBtn.addEventListener('click', () => {
  // 创建一个链接
  const link = document.createElement('a');
  // 把音频数据转换为 URL 资源对象传给链接的 href
  link.href = URL.createObjectURL(audioData);
  // 设置下载时的文件名，后缀是 webm
  link.download = 'audio.webm';
  // 点击链接
  link.click();
});