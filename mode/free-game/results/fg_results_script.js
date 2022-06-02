// Ссылка на переменную myCanvas для указание на элемент холста HTML
const canvas = document.getElementById("myCanvas"),
    ctx = canvas.getContext("2d"),
    buttonBackMenu = document.getElementById("page-button");
// Распределение canvas по всей ширине
canvas.width = window.innerWidth;
// Распределение canvas по всей высоте
canvas.height = window.innerHeight;

let stopwatch = document.getElementById("clock"), //Получение эллемента секундомера по идентификатору clock из fg_level1_index.html
    stopwatchContent = stopwatch.textContent, // Присвоение переменной
    temp;

stopwatch.textContent = localStorage.getItem("stopwatchContent");

setInterval(() => {
    (canvas.width = window.innerWidth), (canvas.height = window.innerHeight);
}, 1);

function Circle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    // Скорость перемещения balls в пространстве
    this.dx = Math.random() * 0.9 + 1;
    this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    this.dy = Math.random() * 0.4 + 1;
    this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    };
    this.animate = function () {
        this.x += this.dx;
        this.y += this.dy;

        /* Границы, которые не могут покинуть balls */
        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.dy = -this.dy;
        }

        this.draw();
    };
}

// Количество balls при старте скрипта
const balls = [];
for (let i = 0; i < 25; i++) {
    let r = Math.floor(Math.random() * 40) + 15; // Размер balls при старте скрипта
    let x = Math.random() * (canvas.width - r * 2) + r;
    let y = Math.random() * (canvas.height - r * 2) + r;
    let c = "#FF9900";
    balls.push(new Circle(x, y, r, c));
}

// Слушатель, для клика мышкой
canvas.addEventListener("click", function (e) {
    temp = Math.random() * 8;
    let r = 0;
    switch (Math.floor(temp % 7)) {
        case 0:
            r = Math.floor(Math.random() * 40) + 5;
            balls.push(new Circle(e.clientX, e.clientY, r, "#FF6666"));
            break;
        case 1:
            r = Math.floor(Math.random() * 40) + 10;
            balls.push(new Circle(e.clientX, e.clientY, r, "#FFCCFF"));
            break;
        case 2:
            r = Math.floor(Math.random() * 40) + 10;
            balls.push(new Circle(e.clientX, e.clientY, r, "#CCFFFF"));
            break;
        case 3:
            r = Math.floor(Math.random() * 40) + 10;
            balls.push(new Circle(e.clientX, e.clientY, r, "#CCFF99"));
            break;
        case 4:
            r = Math.floor(Math.random() * 40) + 10;
            balls.push(new Circle(e.clientX, e.clientY, r, "#CCCCFF"));
            break;
        case 5:
            r = Math.floor(Math.random() * 40) + 10;
            balls.push(new Circle(e.clientX, e.clientY, r, "#FF6666"));
            break;
        case 6:
            console.log(temp);
            r = Math.floor(Math.random() * 40) + 10;
            balls.push(new Circle(e.clientX, e.clientY, r, "#FF9900"));
            break;
    }
});

if (buttonBackMenu) {
    buttonBackMenu.addEventListener("click", () => {
        backMenu();
    });
}

function backMenu() {
    localStorage.clear();
    window.location.href = document.location = "../../../menu/index.html";
}

function Update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].animate();
    }

    requestAnimationFrame(Update);
}
Update();
