const h2El = document.querySelectorAll('h2');  // h2标签

const watchPositionId = navigator.geolocation.watchPosition(position => {
  // 把 h2 的内容设置为获取的位置信息
  h2El[0].innerHTML = `纬度：${position.coords.latitude}`;
  h2El[1].innerHTML = `经度：${position.coords.longitude}`;
  h2El[2].innerHTML = `海拔高度：${position.coords.altitude}`;
  h2El[3].innerHTML = `行进速度：${position.coords.speed}`;
  h2El[4].innerHTML = `行进方向：${position.coords.heading}`;
}, error => {
  // 在控制台输出错误信息
  console.log(error);
}, {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
});
