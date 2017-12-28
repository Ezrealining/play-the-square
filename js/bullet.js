// 定义子弹的构造函数
function Bullet(x, y, speed) {
    // 定义子弹x轴的初始位置
    this.x = x;
    // 定义子弹y轴的初始位置
    this.y = y;
    // 定义子弹的宽度
    this.w = 10;
    // 定义子弹的宽度
    this.h = 10;
    // 定义子弹的速度
    this.speed = speed;
    // 定义一个数组存储生成的粒子对象
    this.particles = [];
    //粒子生成的频率控制
    this.count = 0;
    this.countSum = 2;
}

// 定义绘制子弹的方法
Bullet.prototype.draw = function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

// 定义移动子弹的方法
Bullet.prototype.move = function() {
    this.y += this.speed;
};

// 定义方法完成子弹生成粒子
Bullet.prototype.createParticle = function() {
    //控制粒子生成频率
    this.count++;
    if (this.count % this.countSum == 0) {
        //生成粒子
        var particle = new Particle(this.x + this.w / 3, this.y + this.h, randomNum(2, 6), randomColor());
        //生成好的粒子保存数组中
        this.particles.push(particle);
    }
    //控制一下count值
    if (this.count >= this.countSum) {
        this.count = 0;
    }
};

// 定义方法移动粒子
Bullet.prototype.moveParticle = function() {
    // 遍历数组中的所有粒子对象
    for (var i = 0; i < this.particles.length; i++) {
        // 调用力的的移动方法
        this.particles[i].moveSmallBlock();
        if (this.particles[i].w <= 0) {
            this.particles.splice(i, 1);
            i--;
        } else {
            this.particles[i].drawSmallBlock();
        }
    }
};
