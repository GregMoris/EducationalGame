// Объявление константных переменных
const allCards = document.querySelectorAll(".definition, .pictures"), // Создание массива из definition и pictures которые хранят блоковые элементы содержищие карточки
    numberOfPairsOfCards = Math.floor(allCards.length * 0.5), // Расчет количества пар карточек
    buttonBackMenu = document.getElementById("game-button"), // Переменная кнопки для возвращения в меню
    // Массив количества правильных ответов на каждый уровень
    correctAnswers = [
        numberOfPairsOfCards,
        Math.floor(numberOfPairsOfCards * 2),
        Math.floor(numberOfPairsOfCards * 3),
    ];

// Добавление изменяемых переменных для сравнения изображений и поиска соответствий
let hasFlippedCard = false, // Переменная проверка перевернутой карты
    boardLocked = false, // Переменная фиксирования карточки
    firstCard, // Переменная первой карточки
    secondCard, // Переменная второй карточки
    counterTrueAnswers = 0, // Счётчик правильных ответов
    temp = 0; // Временная переменная для хранения временных значений

// Добавление изменяемых переменных для секундомера
let stopwatch = document.getElementById("clock"), //Получение эллемента секундомера  по идентификатору number-of-attempts из tg_level1_index.html
    stopwatchContent = stopwatch.textContent, // Присвоение переменной текст элемента stopwatch
    seconds = 0, // Переменная секунд для секундомера
    interval = null, // Интервал изменения секунд
    secs, // Переменная отображаемых секунд
    mins, // Переменная отображаемых минут
    hrs; // Переменная отображаемых часов

// Добавление изменяемых переменных для расчёта числа попыток
let numberOfAttempts = document.getElementById("number-of-attempts"), //Получение эллемента числа попыток по идентификатору number-of-attempts из tg_level1_index.html
    numberOfAttemptsContent = numberOfAttempts.textContent; // Присвоение переменной numberOfAttemptsContent текст элемента numberOfAttempts

temp = localStorage.getItem("counterTrueAnswers"); // Присвоение временной переменной значения counterTrueAnswers из локального хранилища
counterTrueAnswers = JSON.parse(temp); // Присвоение переменной counterTrueAnswers значения temp методом разбора строки с преобразованием в необходимое значение

temp = correctAnswers.includes(counterTrueAnswers); // Передача в переменную temp значения true или false при совпадении числа кореектных ответов из переменной counterTrueAnswers с одним из значений в псевдомассиве correctAnswers

// При совпадении числа ответов с даннми из псевдомассива входим в условный оператор, который получает значения попыток и секундомера из локальных данных браузера на компьютер пользователя
if (temp) {
    numberOfAttempts.textContent = localStorage.getItem(
        "numberOfAttemptsContent"
    ); // Получение числа попыток из локальных данных в переменную
    numberOfAttemptsContent = numberOfAttempts.textContent; // Передача числа попыток в переменную сохраняя только текст, без наличия тегов

    stopwatch.textContent = localStorage.getItem("stopwatchContent"); // Получение данных секундомера из локальных данных в переменную
    stopwatchContent = stopwatch.textContent; // Передача данных секундомера в переменную сохраняя только текст, без наличия тегов
    temp = localStorage.getItem("seconds"); // Получение данных секунд из локальных данных во временную переменную
    seconds = temp; // Передача данных секунд в переменную сохраняя только текст, без наличия тегов
}

// Обновление таймера каждую секунду
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

setInterval(timer, 1000);

/* Использование анонимных стрелочных функции, которая не принимает значение this,
 а принимает событие. Данная функция описывает поворот карточек на
 180 градусов при нажатии на них. Добавление слушателя происходит на
 каждой карточке, а не весь контейнер для возможности дальнейшего сравнения */
const flipCard = (e) => {
    // Фиксирование каждой карточки в развернутой положении
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
    const isEqual = firstCard.dataset.quize === secondCard.dataset.quize;
    isEqual ? disableCard() : unflipCards();
};

// Функция разворота одинаковых карт
const disableCard = () => {
    // Удаление обработчика событий с элемента firstCard
    firstCard.removeEventListener("click", flipCard);
    // Удаление обработчика событий с элемента secondCard
    secondCard.removeEventListener("click", flipCard);

    // В случае совпадения двух карточек, увеличивается счётчик правильных ответов
    counterTrueAnswers++;

    // Проверка количества правлиьных ответов для перехода на следующий уровень
    switch (counterTrueAnswers) {
        // Переход на второй уровень при совпадении количества правильных ответов с первым элементом массива correctAnswers[]
        case correctAnswers[0]:
            saveDataLevel();
            window.location.href = "../level_2/tg_level2_index.html";
            break;
        // Переход на третий уровень при совпадении количества правильных ответов со вторым элементом массива correctAnswers[]
        case correctAnswers[1]:
            saveDataLevel();
            window.location.href = "../level_3/tg_level3_index.html";
            break;
        // Переход на страницу результатов при совпадении количества правильных ответов с третьим элементом массива correctAnswers[]
        case correctAnswers[2]:
            saveDataLevel();
            window.location.href = "../results/tg_results_index.html";
            counterTrueAnswers = 0;
            break;
    }
};

// Функция разворота разных карт
const unflipCards = () => {
    // Если карточки имеют разные значения, происходит блокировка поля для действий над карточками
    boardLocked = true;

    // Таймаут для правильной анимации разных карточек
    setTimeout(() => {
        firstCard.classList.remove("flip"); // Возвращение первой карточки в исходное положение
        secondCard.classList.remove("flip"); // Возвращение второй карточки в исходное положение

        // Вызов стрелочной функции для сброса блокировки при нажатии на карточку
        resetBoard();
    }, 500);

    // Декремент числа попыток с выводом результата на экран.
    numberOfAttemptsContent--;
    numberOfAttempts.textContent = numberOfAttemptsContent;
    // Проверкой равно ли число попыток нулю
    if (numberOfAttemptsContent <= 0) {
        saveDataLevel();
        // Объект типа location получающий URL для перехода на заданый уровень
        window.location.href = "../results/tg_results_index.html";
        // Метод, который срабатывает при достижении попыток нулевого значения, который удаляет все значения из хранилища
    }
};

// Сброс области игры для возможности повторного нажатия на первую карточку
const resetBoard = () => {
    // Упрощённый вариант по сравнению с ES6, без Spread оператора
    hasFlippedCard = boardLocked = false;
    firstCard = secondCard = null;
};

// Добавление события поворота при "click" по изображению области allCards
allCards.forEach((card) => {
    card.addEventListener("click", flipCard);

    // Перетасовка карточек для расположения их в случайном порядке
    const randomIndex = Math.floor(Math.random() * allCards.length);
    card.style.order = randomIndex;
});

// Слушатель события, срабатывающий при нажатии на кнопку кнопки back-menu
if (buttonBackMenu) {
    buttonBackMenu.addEventListener("click", () => {
        backMenu();
    });
}

// Функция выходо в главное меню по нажанию на кнопку кнопки back-menu
function backMenu() {
    localStorage.clear();
    window.location.href = "../../mode_index.html";
}

// Функция сохранения данных в локальное хранилище для переноса их на следующий уровень
function saveDataLevel() {
    localStorage.setItem("numberOfAttemptsContent", numberOfAttemptsContent);
    // Передача данных переменной числа попыток numberOfAttemptsContent в локальные данные браузера
    localStorage.setItem(
        "counterTrueAnswers",
        JSON.stringify(counterTrueAnswers)
    ); // Передача данных переменной числа правильных ответов counterTrueAnswers в локальные данные браузера

    localStorage.setItem("stopwatchContent", stopwatchContent); // Передача данных переменной секундомера stopwatchContent в локальные данные браузера

    localStorage.setItem("seconds", seconds); // Передача данных переменной секунд seconds в локальные данные браузера
}
