var circles = [];
var particles = [];

const gravity = 0.05;
const density = 50;
const lifespan = 500;

class Circle {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.xVel = Math.random() * 5 - 2.5;
    this.yVel = Math.random() * -5 - 2;
    this.index = circles.length;
    this.fade = 1;
    var temp = document.createElement("div");
    temp.classList.add("particle");
    temp.style.left = `${this.x}px`;
    temp.style.top = `${this.y}px`;
    document.body.appendChild(temp);
    particles.push(temp);
  }

  update() {
    var temp = particles[this.index];
    this.x += this.xVel;
    this.y += this.yVel;
    this.yVel += gravity;
    this.fade -= 1 / lifespan;
    temp.style.left = `${this.x}px`;
    temp.style.top = `${this.y}px`;
    temp.style.background = `rgba(${this.r - (Math.random() * 50)}, ${this.g - (Math.random() * 50)}, ${this.b - (Math.random() * 50)}, ${this.fade})`;
  }

  getDelete() {
    if (this.fade < 0) {
      return true;
    } else {
      return false;
    }
  }
  
  setId(newId) {
    this.index = newId;
  }
}

document.onclick = function (event) {
  var quota = 255;
  var r = quota - Math.random() * 100;
  var g = quota - Math.random() * 100;
  var b = quota - Math.random() * 100;
  
  
  for (var i = 0; i < density; i++) {
    circles.push(new Circle(event.clientX, event.clientY, r, g, b));
  var lightness = Math.random() * 255;
  document.body.style.background = `rgb(${lightness}, ${lightness}, ${lightness})`;
  }
  document.body.style.background = "rgb(0, 0, 0)";
};

(function () {
  (function update() {
    for (var i = 0; i < circles.length; i++) {
      circles[i].setId(i);
      circles[i].update();
    }

    for (var i = 0; i < circles.length; i++) {
      if (circles[i].getDelete()) {
        circles.splice(i, 1);
        particles.splice(i, 1);
      }
    }
    console.log(circles.length);

    setTimeout(update, 0);
  })();
})();
