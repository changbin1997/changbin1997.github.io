const time = {
  timer: null,
  m1: 0,
  m2: 0,
  s1: 0,
  s2: 0,
  start() {
    this.timer = setInterval(() => {
      this.s2 ++;
      if (this.s2 === 10) {
        this.s1 ++;
        this.s2 = 0;
      }
      if (this.s1 === 60) {
        this.m2 ++;
        this.s1 = 0;
      }
      if (this.m2 === 10) {
        this.m1 ++;
        this.m2 = 0;
      }
      document.querySelector('h1').innerHTML = `${this.m1}${this.m2}:${this.s1}${this.s2}`;
    }, 1000);
  },
  stop() {
    clearInterval(this.timer);
    this.m1 = 0;
    this.m2 = 0;
    this.s1 = 0;
    this.s2 = 0;
    document.querySelector('h1').innerHTML = `${this.m1}${this.m2}:${this.s1}${this.s2}`;
    this.timer = null;
  },
  init() {
    this.m1 = 0;
    this.m2 = 0;
    this.s1 = 0;
    this.s2 = 0;
    document.querySelector('h1').innerHTML = `${this.m1}${this.m2}:${this.s1}${this.s2}`;
  }
};