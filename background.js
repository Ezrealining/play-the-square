// 定义一个数组存储需要打印的丢失方块的标识
var loseFlags = ['', 'X', 'X X', 'X X X'];

// 绘制游戏开始界面绘制函数
function gameStart() {
    // 绘制分数
    ctx.font = '25px Chalkduster';
    ctx.fillStyle = 'rgb(204,255,153)';
    ctx.fillText('SCORE: ' + myBlock.score, 5, 25);

    // 绘制最高分数
    ctx.font = '15px Chalkduster';
    ctx.fillStyle = 'yellow';
    ctx.fillText('HIGH SCORE: ' + localStorage.getItem('hightScore'), 5, 50);

    // 难度系数绘制
    ctx.beginPath();
    ctx.font = '15px Chalkduster';
    ctx.fillStyle = 'rgb(254,102,102)';
    ctx.fillText("Don't shooting your friends!", canvas.width / 2 - 120, 25);

    // 绘制丢失方块的标识
    ctx.beginPath();
    ctx.font = '30px Chalkduster';
    ctx.fillStyle = 'rgb(254,102,102)';
    ctx.fillText(loseFlags[enemyBlock.lose - 1], canvas.width - 90, 35);
}

// 游戏准备界面绘制函数
function gameReady() {
    // 游戏开始前提示语绘制
    ctx.save();
    ctx.beginPath();
    ctx.font = '60px Chalkduster';
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.shadowColor = 'rgb(255,255,255)';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 20;
    ctx.fillText('READY?', canvas.width / 2 - 130, canvas.height / 2 + 20);
    ctx.restore();
}

// 声明一个变量小方块移动的速度
var degV = 0;
// 开始游戏前的动画函数
function gameReadyAnimation() {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    degV += Math.PI / 360;

    ctx.rotate(degV * 5);
    ctx.fillStyle = 'rgba(255, 240, 240, 1)';
    ctx.fillRect(-105, 0, 15, 15);

    ctx.rotate(degV);
    ctx.fillStyle = 'rgba(255, 230, 230,1)';
    ctx.fillRect(-95, 0, 15, 15);

    ctx.rotate(degV);
    ctx.fillStyle = 'rgba(255, 220, 220,1)';
    ctx.fillRect(-90, 0, 15, 15);

    ctx.rotate(degV);
    ctx.fillStyle = 'rgba(255, 200, 200,1)';
    ctx.fillRect(-80, 0, 15, 15);

    ctx.rotate(degV);
    ctx.fillStyle = 'rgba(255, 190, 190,1)';
    ctx.fillRect(-75, 0, 15, 15);

    ctx.rotate(degV);
    ctx.fillStyle = 'rgba(255, 170, 170,1)';
    ctx.fillRect(-65, 0, 15, 15);

    ctx.rotate(degV);
    ctx.fillStyle = 'rgba(255, 160, 160,1)';
    ctx.fillRect(-60, 0, 15, 15);

    ctx.rotate(degV);
    ctx.fillStyle = 'rgba(255, 140, 140,1)';
    ctx.fillRect(-50, 0, 15, 15);

    ctx.restore();
    if (startFlag) {
        // window.cancelAnimationFrame(gameReadyAnimation);
        return;
    }
    window.requestAnimationFrame(gameReadyAnimation);
}

// 游戏结束界面绘制函数
function gameOver() {
    // 清理画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制最高分数
    ctx.font = '20px Chalkduster';
    ctx.fillStyle = 'yellow';
    ctx.fillText('HIGH SCORE: ' + localStorage.getItem('hightScore'), canvas.width / 2 - 90, canvas.height / 2 - 150);

    // 绘制当前分数
    ctx.font = '35px Chalkduster';
    ctx.fillStyle = 'rgb(204,255,153)';
    ctx.fillText('YOUR SCORE: ' + myBlock.score, canvas.width / 2 - 150, canvas.height / 2 - 100);

    // 绘制丢失方块的标识
    ctx.beginPath();
    ctx.font = '30px Chalkduster';
    ctx.fillStyle = 'rgb(254,102,102)';
    ctx.fillText(loseFlags[enemyBlock.lose - 1], canvas.width - 90, 35);

    // 绘制游戏结束
    ctx.save();
    ctx.font = '80px Chalkduster';
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.shadowColor = 'rgb(255,255,255)';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 20;
    ctx.fillText('GAME OVER', canvas.width / 2 - 280, canvas.height / 2);
    ctx.restore();
}
