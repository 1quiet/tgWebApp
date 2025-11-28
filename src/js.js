// Объявляем переменную для хранения идентификатора интервала
// Это нужно чтобы потом можно было остановить автопрокрутку
let autoScrollInterval;

// Текущий индекс активного слайда (начинаем с первого элемента)
let currentIndex = 0;

// Скорость прокрутки в миллисекундах (1000 мс = 1 секундa)
const scrollSpeed = 500;

// Флаг, который показывает, активна ли автопрокрутка в данный момент
let isScrolling = false;

// Основная функция запуска автопрокрутки
function startAutoScroll() {
    // Если прокрутка уже активна, выходим из функции (защита от повторного запуска)
    if (isScrolling) return;

    // Устанавливаем флаг в true - теперь прокрутка активна
    isScrolling = true;

    // Получаем ссылку на элемент-дорожку, которая содержит все слайды
    const sliderTrack = document.getElementById('sliderTrack');

    // Получаем коллекцию всех элементов с классом 'main-conts__container' (все наши дивы)
    const slides = document.querySelectorAll('.main-conts__container');

    // Получаем ссылки на кнопки управления
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');

    // Скрываем кнопку "Старт" и показываем кнопку "Стоп"
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';

    // Внутренняя функция для прокрутки к следующему слайду
    function scrollToNext() {
        // Увеличиваем индекс на 1, и если достигли конца - начинаем с начала
        // Оператор % (остаток от деления) обеспечивает зацикленность
        // Например: если slides.length = 5, то:
        // 0 % 5 = 0, 1 % 5 = 1, ... 4 % 5 = 4, 5 % 5 = 0 (снова первый)
        currentIndex = (currentIndex + 1) % slides.length;

        // Вычисляем ширину одного слайда (ширина элемента + отступ)
        // offsetWidth возвращает полную ширину элемента включая padding и border
        // +20 - это предположительная сумма margin-left и margin-right
        const slideWidth = slides[0].offsetWidth; // + 20

        // Устанавливаем CSS transition для плавной анимации
        // 'transform 0.5s ease-in-out' означает:
        // - анимируем свойство transform
        // - длительность 0.5 секунды
        // - функция easing ease-in-out (плавное начало и конец)
        sliderTrack.style.transition = 'transform 2s linear'; // ease-in-out

        // Сдвигаем дорожку слайдов влево на расстояние, равное
        // текущему индексу умноженному на ширину одного слайда
        // Например: при currentIndex = 1 сдвигаем на 1*slideWidth
        // при currentIndex = 2 сдвигаем на 2*slideWidth и т.д.
        sliderTrack.style.transform = `translateX(-${currentIndex * 2 * slideWidth}px)`;
    }

    // Сразу вызываем функцию прокрутки чтобы начать не с задержкой,
    // а мгновенно после нажатия кнопки "Старт"
    scrollToNext();

    // Устанавливаем интервал - функция scrollToNext будет вызываться
    // автоматически каждые scrollSpeed миллисекунд (2000 мс = 2 сек)
    // Результат (идентификатор интервала) сохраняем в autoScrollInterval
    // чтобы потом можно было остановить
    autoScrollInterval = setInterval(scrollToNext, scrollSpeed);
}

// Функция остановки автопрокрутки
function stopAutoScroll() {
    // Если прокрутка не активна, выходим из функции
    if (!isScrolling) return;

    // Устанавливаем флаг в false - прокрутка больше не активна
    isScrolling = false;

    // Получаем ссылки на кнопки
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');

    // Показываем кнопку "Старт" и скрываем кнопку "Стоп"
    startBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';

    // Останавливаем интервал, передавая идентификатор который сохранили при запуске
    // clearInterval прекращает выполнение функции setInterval
    clearInterval(autoScrollInterval);
}