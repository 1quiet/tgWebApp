import { useEffect, useState } from 'react'; // подключаем хуки (useEffect для побочных эффектов, useState для состояния)
import './style.css'; // ну это понятно

function App() {
    const [user, setUser] = useState<any>(null); // создаем переменные для хранения инфы о пользователе
    const [currentSlide, setCurrentSlide] = useState(0); // целочисленные переменнные [0-19] для хранения инфы о текущем слайде (но работает только на компе, с телефона другое маштабирование идет и там сбивается прокрутка)
    const [isAutoScroll, setIsAutoScroll] = useState(false); // активна ли прокрутка сейчас 
    const totalSlides = 20; // константное количество слайдов 

    // Инициализация Telegram
    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (tg) {
            tg.ready();
            tg.expand();

            const userData = tg.initDataUnsafe?.user;
            if (userData) {
                setUser(userData);
            }

            // Настройка темы
            document.documentElement.style.setProperty('--tg-bg-color', tg.themeParams?.bg_color || '#ffffff');
            document.documentElement.style.setProperty('--tg-text-color', tg.themeParams?.text_color || '#000000');
        }
    }, []);

    // Автопрокрутка
    useEffect(() => {
        let interval: any;

        if (isAutoScroll) {
            interval = setInterval(() => {
                setCurrentSlide(prev => {
                    const next = prev + 1;
                    if (next >= totalSlides) {
                        clearInterval(interval);
                        setIsAutoScroll(false);
                        return 0;
                    }
                    return next;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isAutoScroll, totalSlides]);

    const startAutoScroll = () => {
        setIsAutoScroll(true);
        // Вибрация если есть
        window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('light');
    };

    const stopAutoScroll = () => {
        setIsAutoScroll(false);
    };

    const resetApp = () => {
        setCurrentSlide(0);
        setIsAutoScroll(false);
    };

    // Расчет смещения для слайдера
    const sliderStyle = {
        transform: `translateX(-${currentSlide * 120}px)`,
    };

    return (
        <div className="app">
            {/* Приветствие */}
            <div className="welcome-cont">
                {user ? (
                    <div>
                        Приветствую, <strong>{user.first_name}</strong>!<br />
                        Здесь ты узнаешь что-то...
                        <p>Нажимай на "Старт" и внимай</p>
                    </div>
                ) : (
                    <div>Загрузка пользователя...</div>
                )}
            </div>

            {/* Слайдер */}
            <div className="main-conts">
                <div className="main-conts-track" style={sliderStyle}>
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <div key={index} className="main-conts__container">
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* Кнопки управления */}
            <div className="controls">
                <button
                    id="startBtn"
                    onClick={startAutoScroll}
                    className="control-button"
                >
                    Старт
                </button>

                <button
                    id="stopBtn"
                    onClick={stopAutoScroll}
                    className="control-button"
                >
                    Стоп
                </button>

                <button
                    id="reset-button"
                    onClick={resetApp}
                    className="control-button"
                >
                    Сброс
                </button>
            </div>

            {/* Индикатор текущего слайда */}
            <div className="slide-indicator">
                Слайд: {currentSlide + 1} / {totalSlides}
                {isAutoScroll && " (Автопрокрутка)"}
            </div>
        </div>
    );
}

export default App;