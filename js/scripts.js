/** js/scripts.js of bbauska/1980s making 1980s.bauska.org */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class VCREffect {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = Object.assign({
      fps: 60,
      blur: 1,
      opacity: 1,
      miny: 220,
      miny2: 220,
      num: 70
    }, options);
    this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.opacity = this.config.opacity;
    this.generateVCRNoise();
    window.addEventListener("resize", () => this.onResize());
  }
  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  generateVCRNoise() {
    if (this.config.fps >= 60) {
      cancelAnimationFrame(this.vcrInterval);
      const animate = () => {
        this.renderTrackingNoise();
        this.vcrInterval = requestAnimationFrame(animate);
      };
      animate();
    } else {
      clearInterval(this.vcrInterval);
      this.vcrInterval = setInterval(() => {
        this.renderTrackingNoise();
      }, 1000 / this.config.fps);
    }
  }

  renderTrackingNoise(radius = 2) {
    const { canvas, ctx, config } = this;
    let { miny, miny2, num } = config;
    canvas.style.filter = `blur(${config.blur}px)`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `#fff`;
    ctx.beginPath();
    for (let i = 0; i <= num; i++) {
      let x = Math.random() * canvas.width;
      let y1 = getRandomInt(miny += 3, canvas.height);
      let y2 = getRandomInt(0, miny2 -= 3);
      ctx.fillRect(x, y1, radius, radius);
      ctx.fillRect(x, y2, radius, radius);
      ctx.fill();
      this.renderTail(ctx, x, y1, radius);
      this.renderTail(ctx, x, y2, radius);
    }
    ctx.closePath();
  }

  renderTail(ctx, x, y, radius) {
    const n = getRandomInt(1, 50);
    const dirs = [1, -1];
    let dir = dirs[Math.floor(Math.random() * dirs.length)];
    for (let i = 0; i < n; i++) {
      let r = getRandomInt(radius - 0.01, radius);
      let dx = getRandomInt(1, 4) * dir;
      radius -= 0.1;
      ctx.fillRect((x += dx), y, r, r);
      ctx.fill();
    }
  }
}  /* end class VCREffect */

// Usage
const canvas = document.getElementById("canvas");
const vcrEffect = new VCREffect(canvas, {
  opacity: 1,
  miny: 220,
  miny2: 220,
  num: 70,
  fps: 60,
  blur: 1
});
const videoIds = ["aPzS3QYb868", "2hBSMInlDGg", "0JdxlRIcn1k", "7KtAgAMzaeg", "tUltrX-ICew", 
                  "csVaRY1ptZ0", "KAKaJE4gjYg", "HnDtvZXYHgE", "1rzC5qrYZXs", "DjK9GJMBpt0"];
let currentVideoIndex = 0;
const iframe = document.getElementById("ytplayer");
const snowEffect = document.querySelector(".snow-effect");

function switchToNextVideo() {
  snowEffect.style.opacity = 1;
  setTimeout(() => {
    currentVideoIndex = (currentVideoIndex + 1) % videoIds.length;
    iframe.src = `https://www.youtube.com/embed/${videoIds[currentVideoIndex]}?autoplay=1&controls=0&loop=1&mute=1`;
    snowEffect.style.opacity = 0;
  }, 3000);  /* 3 seconds of static before switching */
}
https://youtu.be/
iframe.addEventListener("load", () => {
  setTimeout(switchToNextVideo, 17000);  /* 17 seconds of video play */
});

/*
1980's nostalgia videos;
 1. https://youtu.be/aPzS3QYb868 = the simpsons (1989-current 2025)
 2. https://youtu.be/2hBSMInlDGg = ALF (86-90)
 3. https://youtu.be/0JdxlRIcn1k = newhart (82-90)
 4. https://youtu.be/7KtAgAMzaeg = cheers (82-93)
 5. https://youtu.be/tUltrX-ICew = night court (84-92)
 6. https://youtu.be/csVaRY1ptZ0 = the wonder years (88-93)
 7. https://youtu.be/KAKaJE4gjYg = married with children (87-97)
 8. https://youtu.be/HnDtvZXYHgE = star trek: the next generation (87-94)
 9. https://youtu.be/1rzC5qrYZXs = seinfeld (89-98)
10. https://youtu.be/DjK9GJMBpt0 = quantum leap (89-93)
*/
