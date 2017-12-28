// 定义粒子的构造函数
function Particle(x, y, w, color) {
    // 定义粒子的宽高
    this.w = w;
    this.h = this.w;
    // 定义粒子的初始坐标
    this.x = x;
    this.y = y;
    // 定义粒子的初始速度
    this.speedX = Math.random() * (-1 - 1) + 1;
    this.speedY = Math.random() * (-1 - 1) + 1;
    // 定义粒子的颜色
    this.color = color;
}

// 定义子弹生成的粒子的绘制方法
Particle.prototype.drawSmallBlock = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

// 定义方块子弹生成的粒子的方法
Particle.prototype.moveSmallBlock = function() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.w -= 0.01;
    this.h -= 0.01;
};

// 定义敌方方块生成的粒子的绘制方法
Particle.prototype.drawBigBlock = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

// 定义敌方方块爆炸生成的粒子的方法
Particle.prototype.moveBigBlock = function() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.w -= 0.07;
    this.h -= 0.07;
};
