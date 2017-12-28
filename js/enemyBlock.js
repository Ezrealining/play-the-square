// 定义随机数函数
function randomNum(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

// 定义一个随机颜色函数
function randomColor() {
    var r = randomNum(0, 256);
    var g = randomNum(0, 256);
    var b = randomNum(0, 256);
    var a = 1;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

// 定义敌方方块构造函数
function EnemyBlock() {
    // 定义敌方方块的宽高
    this.w = randomNum(30, 71);
    this.h = this.w;
    // 定义敌方方块的初始坐标
    this.x = randomNum(0, canvas.width - this.w);
    this.y = -this.h;
    // 定义一个初速度作为一个速度边界值,也是每一个方块的初速度
    this.limitSpeedX = randomNum(-5, 1);
    // 定义x轴速度属性,将初速度赋值给speedX
    this.speedX = this.limitSpeedX;
    // 定义敌方方块y轴初始的速度
    this.speedY = 0.5;
    // 定义一个速度的变化量
    this.increaseX = 0.1;
    // 定义敌方方块的颜色
    this.color = randomColor();
    // 创建一个数组保存生成的敌方反块
    this.enemyBlocks = [];
    this.boomBlocks = [];
    // 定义一个数组存储生成的粒子对象
    this.particles = [];
    // 定义敌方方块生成的频率
    this.count = 0;
    this.countb = 0;
    this.countEnemy = 100;
    this.countBoom = 1000;
    // 定义一个属性存储丢失敌方方块的个数
    this.lose = 1;
    // 生成方块爆炸粒子的开关变量
    this.flag = false;
}

// 定义方法绘制敌方方块
EnemyBlock.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

// 定义方法绘制敌方彩色炸弹方块
EnemyBlock.prototype.drawBoom = function() {
    ctx.fillStyle = myBlock.color[randomNum(1, 12) - 1];
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

// 定义方法移动敌方方块
EnemyBlock.prototype.move = function() {
    //改变小球的速度
    this.speedX += this.increaseX;
    // 判断,如果speedX ≥ limitSpeedX 或 speedY ≤ -limitSpeedX 就说明速度已经超出了规定的速度界限,这时候让方块反向运动
    if (this.speedX >= Math.abs(this.limitSpeedX) || this.speedX <= -Math.abs(this.limitSpeedX)) {
        this.increaseX *= -1;
    }
    // 更新方块的x轴,y轴的值
    this.y += this.speedY;
    this.x += this.speedX;
    // 边界判断,不允许方块在水平方向上出界
    if (this.x <= 0) {
        this.x = 0;
    } else if (this.x >= canvas.width - this.w) {
        this.x = canvas.width - this.w;
    }
};

// 定义方法生成敌方方块
EnemyBlock.prototype.createEnemyBlock = function() {
    this.count++;
    if (this.count > this.countEnemy) {
        this.count = 0;
        var enemyBlock = new EnemyBlock();
        this.enemyBlocks.push(enemyBlock);
    }
};

// 定义方法移动敌方方块
EnemyBlock.prototype.moveEnemyBlock = function() {
    // 遍历数组中的所有敌方方块
    for (var i = 0; i < this.enemyBlocks.length; i++) {
        this.enemyBlocks[i].move();
        // 进行出界判断
        if (this.enemyBlocks[i].y >= canvas.height) {
            this.enemyBlocks.splice(i, 1);
            i--;
            // 丢失一个方块加一
            this.lose++;
        } else {
            this.enemyBlocks[i].draw();
        }
    }
};

// 定义方法生成敌方彩色炸弹方块
EnemyBlock.prototype.createBoomBlock = function() {
    this.countb++;
    if (this.countb > this.countBoom) {
        this.countb = 0;
        var boomBlock = new EnemyBlock();
        this.boomBlocks.push(boomBlock);
    }
};

// 定义方法移动敌方彩色炸弹方块
EnemyBlock.prototype.moveBoomBlock = function() {
    // 遍历数组中的所有敌方方块
    for (var i = 0; i < this.boomBlocks.length; i++) {
        this.boomBlocks[i].move();
        // 进行出界判断
        if (this.boomBlocks[i].y >= canvas.height) {
            this.boomBlocks.splice(i, 1);
            i--;
        } else {
            this.boomBlocks[i].drawBoom();
        }
    }
};

// 定义方法生成粒子
EnemyBlock.prototype.createParticle = function() {
    if (this.flag) {
        // 如果生成的敌方方块的宽小于等于40则,爆炸是生成40个粒子
        if (new_.newW <= 40) {
            for (var i = 0; i < 80; i++) {
                var particle = new Particle(new_.newX + new_.newW / 3 , new_.newY + new_.newW / 3, Math.random() * 8, new_.newColor);
                //生成好的粒子保存数组中
                this.particles.push(particle);
            }
            // 如果生成的敌方方块的宽大于40且小于等于50则,爆炸是生成80个粒子
        } else if (new_.newW > 160 && new_.newW <= 50) {
            for (var i = 0; i < 80; i++) {
                var particle = new Particle(new_.newX + new_.newW / 3 , new_.newY + new_.newW / 3, Math.random() * 9, new_.newColor);
                //生成好的粒子保存数组中
                this.particles.push(particle);
            }
            // 如果生成的敌方方块的宽大于50且小于等于60则,爆炸是生成160个粒子
        } else if (new_.newW > 240 && new_.neW <= 60) {
            for (var i = 0; i < 160; i++) {
                var particle = new Particle(new_.newX + new_.newW / 3 , new_.newY + new_.newW / 3, Math.random() * 10, new_.newColor);
                //生成好的粒子保存数组中
                this.particles.push(particle);
            }
            // 如果生成的敌方方块的宽大于60则,爆炸是生成200个粒子
        } else {
            for (var i = 0; i < 320; i++) {
                var particle = new Particle(new_.newX + new_.newW / 3 , new_.newY + new_.newW / 3, Math.random() * 11, new_.newColor);
                //生成好的粒子保存数组中
                this.particles.push(particle);
            }
        }
        this.flag = false;
    }
};

// 定义方法移动粒子
EnemyBlock.prototype.moveParticle = function() {
    // 遍历数组中的所有粒子对象
    for (var i = 0; i < this.particles.length; i++) {
        // 调用方块爆炸生成粒子的的移动方法
        this.particles[i].moveBigBlock();
        if (this.particles[i].w <= 0) {
            this.particles.splice(i, 1);
            i--;
        } else {
            this.particles[i].drawBigBlock();
        }
    }
};

// 敌方方块爆炸时信息的存储对象
// 定义一个新对象用于暂存敌方方块与子弹方块碰撞时的坐标位置,将坐标保存下来用于敌方方块爆炸时的生成粒子的位置
function NewXY(x, y, w, color) {
    this.newX = x;
    this.newY = y;
    this.newW = w;
    this.newColor = color;
}
