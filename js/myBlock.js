// 定义方块的构造函数
function MyBlock() {
    // 我方方块宽度
    this.w = 30;
    // 我方方块高度
    this.h = 30;
    // x起始轴坐标
    this.x = (canvas.width - this.w) / 2;
    // y起始轴坐标
    this.y = canvas.height - this.h;
    // 我方方块颜色
    this.color = ['rgb(255,178,255)',
        'rgb(238,174,238)',
        'rgb(205,150,205)',
        'rgb(224,102,255)',
        'rgb(209,95,238)',
        'rgb(180,82,205)',
        'rgb(191,62,255)',
        'rgb(178,58,238)',
        'rgb(154,50,205)'
    ];
    // 定义一个数组存储生成的子弹
    this.bullets = [];
    // 定义一个开关属性,控制子弹的生成
    this.create = false;
    // 定义分数纪录属性
    this.score = 0;
}

// 定义绘制方块的方法
MyBlock.prototype.draw = function() {
    ctx.fillStyle = this.color[randomNum(1, 12) - 1];
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

// 定义方法生成子弹
MyBlock.prototype.createBullet = function() {
    // 生成子弹对象
    if (this.create) {
        var bullet = new Bullet(this.x + this.w / 2 - 5, this.y - 5, -6);
        // 将生成的子弹存入数组中
        this.bullets.push(bullet);
        // 将开关属性的值设置为false
        this.create = false;
    }
};

// 定义绘制和移动子弹的方法
MyBlock.prototype.moveBullet = function() {
    // 遍历子弹数组
    for (var i = 0; i < this.bullets.length; i++) {
        // 每一个子弹调用移动方法
        this.bullets[i].move();
        // 判断,若子弹出界就从数组中清除,若么偶有出界就继续绘制子弹
        if (this.bullets[i].y <= -15) {
            this.bullets.splice(i, 1);
            i--;
            // 判断,打空子弹时对已得分数的扣除情况
            if (this.score >= 20) {
                // 当 score ≥ 10 时,每打空一颗子弹扣除10分
                this.score -= 20;
            } else if (this.score < 20 && this.score > 0) {
                // 当 0 < score ≤ 10 时,没打空一颗子弹扣除1分
                this.score--;
            } else {
                // 当 score = 0 时,不扣除分数,控制分数不能为负
                this.score = 0;
            }
        } else {
            this.bullets[i].draw();
        }
    }
};

// 定义我方方块的拖拽方法
MyBlock.prototype.drag = function() {
    canvas.onmousemove = function(e) {
        e = e || window.event;
        myBlock.x = e.clientX - canvas.offsetLeft - (myBlock.h / 2);
        if (myBlock.x <= 0) {
        	myBlock.x = 0;
        }else if (myBlock.x >= canvas.width - (myBlock.h)) {
        	myBlock.x = canvas.width - (myBlock.h);
        }
    }
}
