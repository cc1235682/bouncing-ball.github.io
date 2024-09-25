const container = document.querySelector('.container');
const numBalls = 10; // 小球数量
const balls = [];

function createBall() {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    ball.size = 20;
    ball.x = Math.random() * (container.clientWidth - ball.size);
    ball.y = Math.random() * (container.clientHeight - ball.size);
    ball.velocityX = (Math.random() * 4) + 1;
    ball.velocityY = (Math.random() * 4) + 1;
    balls.push(ball);
    container.appendChild(ball);
}

for (let i = 0; i < numBalls; i++) {
    createBall();
}

function getRandomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function animate() {
    balls.forEach(ball => {
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;

        // 碰撞检测边界
        if (ball.x <= 0) {
            ball.x = 0;
            ball.velocityX = -ball.velocityX;
        }
        if (ball.x >= container.clientWidth - ball.size) {
            ball.x = container.clientWidth - ball.size;
            ball.velocityX = -ball.velocityX;
        }
        if (ball.y <= 0) {
            ball.y = 0;
            ball.velocityY = -ball.velocityY;
        }
        if (ball.y >= container.clientHeight - ball.size) {
            ball.y = container.clientHeight - ball.size;
            ball.velocityY = -ball.velocityY;
        }

        // 更新小球位置
        ball.style.left = ball.x + 'px';
        ball.style.top = ball.y + 'px';

        // 碰撞检测小球之间
        balls.forEach(otherBall => {
            if (ball !== otherBall) {
                const dx = ball.x - otherBall.x;
                const dy = ball.y - otherBall.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < ball.size) {
                    // 计算重叠距离
                    const overlap = (ball.size - distance) / 2;
                    const angle = Math.atan2(dy, dx);
                    ball.x += Math.cos(angle) * overlap; // 分开小球
                    otherBall.x -= Math.cos(angle) * overlap; // 分开小球
                    ball.y += Math.sin(angle) * overlap; // 分开小球
                    otherBall.y -= Math.sin(angle) * overlap; // 分开小球

                    // 改变颜色
                    ball.style.backgroundColor = getRandomColor();
                    otherBall.style.backgroundColor = getRandomColor();

                    // 反弹
                    ball.velocityX = -ball.velocityX;
                    ball.velocityY = -ball.velocityY;
                    otherBall.velocityX = -otherBall.velocityX;
                    otherBall.velocityY = -otherBall.velocityY;
                }
            }
        });
    });
    requestAnimationFrame(animate);
}

animate();
