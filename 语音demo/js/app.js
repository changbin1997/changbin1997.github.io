const textBox = document.querySelector('#text-content');  // 文本输入
const voicesSelect = document.querySelector('#voices-list');  // 语音选择
const pitch = document.querySelector('#pitch'); // 音调
const volume = document.querySelector('#volume');  // 音量
const rate = document.querySelector('#rate');  // 语速
const playBtn = document.querySelector('#play-btn');  // 朗读按钮
const synth = window.speechSynthesis;  // 获取语音合成对象
let voicesList = null;  // 用来存储语音库
let chineseVoice = -1;  // 中文语音库的索引
let status = 'stop';  // 当前状态

setTimeout(() => {
  // 获取语音库列表
  voicesList = synth.getVoices();
  // 创建语音库列表
  for (let i = 0;i < voicesList.length;i ++) {
    const optionEl = document.createElement('option');
    optionEl.value = i;
    const voicesInfo = {
      localService: voicesList[i].localService?'类型：离线合成':'类型：在线合成',
      lang: '语言：' + voicesList[i].lang,
      name: '发音人：' + voicesList[i].name
    };
    optionEl.innerHTML = voicesInfo.name + '  ' + voicesInfo.lang + '  ' + voicesInfo.localService;
    voicesSelect.appendChild(optionEl);
    // 找出中文语音库
    if (voicesList[i].lang === 'zh-CN' || voicesList[i].lang === 'zh-TW') {
      chineseVoice = i;
    }
  }
  // 如果找到中文语音库就把默认语音库设置为中文语音库
  if (chineseVoice !== -1) {
    voicesSelect.children[chineseVoice].selected = true;
  }
}, 50);

// 合成语音按钮点击
playBtn.addEventListener('click', ev => {
  if (textBox.value === '') return false;

  if (status === 'play') {
    synth.cancel();
    status = 'stop';
    ev.target.innerHTML = '播放语音';
    return false;
  }

  // 创建语音合成接口
  const utterThis = new SpeechSynthesisUtterance(textBox.value);
  // 设置语音库
  utterThis.voice = voicesList[voicesSelect.value];
  // 设置音调
  utterThis.pitch = pitch.value;
  // 设置语速
  utterThis.rate = rate.value;
  // 设置音量
  utterThis.volume = volume.value;
  // 开始朗读
  synth.speak(utterThis);

  // 朗读开始
  utterThis.addEventListener('start', () => {
    ev.target.innerHTML = '停止语音';
    status = 'play';
  });

  // 朗读结束
  utterThis.addEventListener('end', () => {
    status = 'stop';
    ev.target.innerHTML = '播放语音';
  });
});