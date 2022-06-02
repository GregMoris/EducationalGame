// Объявление константных переменных
const canvas = document.getElementById("myCanvas"), // Ссылка на переменную myCanvas для указание на элемент холста HTML
    pageName = document.getElementById("name"), // Ссылка на переменную name для указание на элемент имени страницы
    pageNameContent = pageName.textContent, // Получение имени раздела веб-страницы
    ctx = canvas.getContext("2d"); // Первый аргумент строки контекста 2d

canvas.width = window.innerWidth; // Распределение canvas по всей ширине
canvas.height = window.innerHeight; // Распределение canvas по всей высоте

let temp; // Временная переменная

// Функция изменения видимой области при изменении размера браузера
setInterval(() => {
    canvas.width = window.innerWidth; // Значение ширины видимой области
    canvas.height = window.innerHeight; // Значение ширины видимой области
}, 10);

// Функция создания и отрисовки круга
function Circle(x, y, r, c) {
    this.x = x; // Ссылка на объект координаты появления объекта по оси Х
    this.y = y; // Ссылка на объект координаты появления объекта по оси Y
    this.r = r; // Ссылка на объект радиуса объекта, который отражает его размер
    this.c = c; // Ссылка на объект цвета объекта

    // Скорость и координаты перемещения balls в пространстве
    this.dx = Math.random() * 0.9 + 1; // Ссылка на объект координат присваивание случайного значения переменной dx
    this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // Ссылка на объект координат присваивание значения dx с домножением на 1 или -1 в зависимости от случайного числа
    this.dy = Math.random() * 0.4 + 1; // Ссылка на объект координат присваивание случайного значения переменной dy
    this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // Ссылка на объект координат присваивание значения dy с домножением на 1 или -1 в зависимости от случайного числа

    // Функция отрисовки объектов
    this.draw = function () {
        ctx.beginPath(); // Метод начала контура объекта
        ctx.fillStyle = this.c; // Устанавливаем цвет заливки объекта
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); // Метод создания дуги, для отрисовки окружности
        ctx.stroke(); // Метод отрисовки заранее заданного контура фигуры
        ctx.fill(); // Заполнение элементов массива индексами с первого по последний
    };

    // Функция анимации перемещения объектов по холсту
    this.animate = function () {
        /* Ссылка на объект координат прибавление к координате X объекта
        значения координаты dx в сторону которую он должен двигаться */
        this.x += this.dx;
        /* Ссылка на объект координат прибавление к координате Y объекта
        значения координаты dy в сторону которую он должен двигаться */
        this.y += this.dy;

        /* Границы, которые не могут покинуть balls */
        // Проверка пересечения границ горизонтали
        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        // Проверка пересечения границ вертикали
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.dy = -this.dy;
        }

        this.draw(); // Ссылка на функцию отрисовки объектов
    };
}

/* Константнный массив хранящий объекты, а также определения их цвета при старте страницы
    в зависимости от уровня нахождения */
const balls = [];
// Количество объектов
for (let i = 0; i < 25; i++) {
    let r = Math.floor(Math.random() * 40) + 15; // Размер balls при старте скрипта
    let x = Math.random() * (canvas.width - r * 2) + r; // Рандомная координата X появления объекта
    let y = Math.random() * (canvas.height - r * 2) + r; // Рандомная коодината Y появления объекта
    let c; // Переменная цвета, которая изменяется в зависимости от уровня нахождения

    /* Оператор определения цвета изначальных объектов в зависимости от уровня,
     на котором находится пользователь */
    switch (pageNameContent) {
        case "Электро Викторина":
            c = "#FF6666";
            break;
        case "Об игре":
            c = "#CCFF99";
            break;
        case "Режим игры":
            c = "#FFCCFF";
            break;
        case "Уровень сложности":
            c = "#99CC99";
            break;
    }
    balls.push(new Circle(x, y, r, c)); // Добавление нового объекта в конец массива balls
}

// Слушатель, для клика мышкой по области холста для создания новых объектов
canvas.addEventListener("click", function (e) {
    temp = Math.random() * 8; // Временная переменная для создания разнообразия цветов
    let r = 0; // Переменная радиуса новых объектов

    /* Оператор, который случайным образом назначает размер и цвет объекта
    в зависимости от полученного значения temp */
    switch (Math.floor(temp % 7)) {
        case 0:
            r = Math.floor(Math.random() * 40) + 5; // Получение значения случайного радиуса объекта
            balls.push(new Circle(e.clientX, e.clientY, r, "#99CC99")); // Добавление нового объекта в конец массива balls
            break; // Выход их оператора switch
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

// Функция обновления для создания анимации объектов
function Update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Цикл выполняется, пока не проанимирует все эелемемты массива balls
    for (let i = 0; i < balls.length; i++) {
        balls[i].animate();
    }
    // Метод, указывающий браузеру, что необходимо выполнить анимацию
    requestAnimationFrame(Update);
}
Update(); // Выполнения функции Updata
