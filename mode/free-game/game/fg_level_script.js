// Объявление константных переменных
const allCards = document.querySelectorAll(".definition, .pictures"), // Создание массива из definition и pictures которые хранят блоковые элементы содержищие карточки
    numberOfPairsOfCards = Math.floor(allCards.length * 0.5), // Расчет количества пар карточек
    buttonBackMenu = document.getElementById("game-button"); // Переменная кнопки для возвращения в меню

// Добавление изменяемых переменных для сравнения карточек и поиска соответствий
let hasFlippedCard = false, // Переменная проверка перевернутой карты
    boardLocked = false, // Переменная фиксирования карточки
    firstCard, // Переменная первой карточки
    secondCard, // Переменная второй карточки
    counterTrueAnswers = 0, // Счётчик правильных ответов
    temp; // Временная переменная для хранения временных значений

// Объявление изменяемых переменных для секундомера
let stopwatch = document.getElementById("clock"), //Получение эллемента секундомера по идентификатору clock из fg_level1_index.html
    stopwatchContent = stopwatch.textContent, // Присвоение переменной stopwatchContent текст элемента stopwatch
    seconds = 0, // Переменная секунд для секундомера
    interval = null, // Интервал изменения секунд
    secs, // Переменная отображаемых секунд
    mins, // Переменная отображаемых минут
    hrs; // Переменная отображаемых часов

// Функция секундомера
function timer() {
    seconds++; // Общее число секунд за всё время работы скрипта
    // Формат выводимого времени
    hrs = Math.floor(seconds / 3600); // Расчет числа часов из общего числа секунд
    mins = Math.floor((seconds - hrs * 3600) / 60); // Расчет числа минут из общего числа секунд
    secs = seconds % 60; // Расчет числа секунд из общего числа секунд

    if (secs < 10) secs = "0" + secs; // Добавление первого нуля отражаемым секундам, если значение меньше 10
    if (mins < 10) mins = "0" + mins; // Добавление первого нуля отражаемым минутам, если значение меньше 10
    if (hrs < 10) hrs = "0" + hrs; // Добавление первого нуля отражаемым часам, если значение меньше 10
    stopwatchContent = `${hrs}:${mins}:${secs}`; // Присвоение значений созданой шаблонной строки переменной stopwatchContent
    stopwatch.textContent = stopwatchContent; // Передача значения шаблонной строки в переменную, для отображения значений на экране
}

// Вызов функции секундомера каждую секунду
setInterval(timer, 1000);

/* Использование анонимных стрелочных функции, которая не принимает значение this,
 а принимает событие. Данная функция описывает поворот карточек на
 180 градусов при нажатии на них. Добавление слушателя происходит на
 каждой карточке, а не весь контейнер для возможности дальнейшего сравнения */
const flipCard = (e) => {
    // Блокирование залипания по одной карточке без пары
    if (boardLocked) return;
    const target = e.target.parentElement; // Так как клик происходит изображению, производим поиск элемента через .parentElement

    // Функция не позволяет сравнивать одну и ту же карту саму с собой
    if (target === firstCard) return;

    // Возвращение элементу target указанного класса «flip», с помощью метода add в свойстве classList
    target.classList.add("flip");

    // Отслеживание порядка нажатия на первую и вторую карточку
    if (!hasFlippedCard) {
        // Первый клик
        hasFlippedCard = true;
        firstCard = target;
    } else {
        // Второй клик
        hasFlippedCard = false;
        secondCard = target;

        // Вызов функции проверка совпадения карточек
        checkForMatch();
    }
};

/* Функция проверки двух одинкаовых карточек с помощью атрибута data-quize с
 помощью тернарных "условных" ( условие ? выражение1(true) : выражение2(false))
 операторов*/
const checkForMatch = () => {
    // Присвоение переменной isEqual значение true если карточки одинаковые и false если разные
    const isEqual = firstCard.dataset.quize === secondCard.dataset.quize;
    // Если карточки одинаковые то выполняется функция разворота одинаковых карточек disableCard, если разные то функция разворота разных карточек unflipCards
    isEqual ? disableCard() : unflipCards();
};

// Функция поворота и фиксирования одинаковых карт
const disableCard = () => {
    // Удаление слушателя с первой карточки
    firstCard.removeEventListener("click", flipCard);
    // Удаление слушателя со второй карточки
    secondCard.removeEventListener("click", flipCard);

    // Увеличения счётчика правильных ответов на 1
    counterTrueAnswers++;

    // При достижении счётчиком правильных ответов числа пар карточек, выход в меню результат
    if (counterTrueAnswers == numberOfPairsOfCards) {
        // Сохранение значения секунд в локальную переменную
        localStorage.setItem("stopwatchContent", stopwatchContent);
        //Переход в меню результата
        window.location.href = "../../results/fg_results_index.html";
    }
};

// Функция поворота и разворота разных карт через 0.5 секунд
const unflipCards = () => {
    boardLocked = true; // Пока карточки имеют разные значения, происходит блок поля для действий

    /* Таймаут для правильной анимации разных карточек */
    setTimeout(() => {
        // Удаление класса filp с первой карточки
        firstCard.classList.remove("flip");

        // Удаление класса flip cо второй карточки
        secondCard.classList.remove("flip");

        // Выполнение функции resetBoard
        resetBoard();
    }, 500);
};

// Сброс области игры, чтобы можно было повторно нажимать на первую карточку
const resetBoard = () => {
    // Упрощённый вариант по сравнению с ES6, без Spread оператора
    hasFlippedCard = boardLocked = false;
    firstCard = secondCard = null;
};
// Добавление события поворота при "click" по карточке области allCards с помощью стрелочной функции
allCards.forEach((card) => {
    // Вызов слушателя при нажатии на карточку
    card.addEventListener("click", flipCard);

    // Перетасовка карточек, чтобы они располагались в случайном месте
    const randomIndex = Math.floor(Math.random() * allCards.length);
    card.style.order = randomIndex;
});

// Если значение buttonBackMenu true вызывается слушатель клика по кнопке game-button вызовающей функциию возвращения в меню backMenu
if (buttonBackMenu) {
    buttonBackMenu.addEventListener("click", () => {
        backMenu();
    });
}

// Функция возвращения в меню
function backMenu() {
    window.location.href = "../../level_index.html";
}
