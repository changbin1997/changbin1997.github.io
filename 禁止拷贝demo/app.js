var content = document.querySelector('#content');
// 生成HTML内容
var myUrl = document.createElement('p');
myUrl.innerHTML = 'Mr. Ma\'s Blog www.misterma.com';
content.appendChild(myUrl);
// 循环生成HTML内容
for (var i = 0;i < 5;i++) {
  var pEl = document.createElement('p');
  pEl.innerHTML = '禁止拷贝';
  content.appendChild(pEl);
}

// 禁止选择
document.addEventListener('selectstart', function(ev) {
  ev.preventDefault();
  return false;
});

// 禁止弹出右键菜单
document.addEventListener('contextmenu', function(ev) {
  ev.preventDefault();
  return false;
});

// 禁止拷贝
document.addEventListener('copy', function(ev) {
  ev.preventDefault();
  return false;
});

// 禁止剪切
document.addEventListener('cut', function(ev) {
  ev.preventDefault();
  return false;
});

// 禁止打开控制台
document.addEventListener('keydown', function(ev) {
  if (ev.keyCode === 123) {
    ev.preventDefault();
    return false;
  }
});