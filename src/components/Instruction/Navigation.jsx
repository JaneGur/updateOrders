import React from 'react';

const Navigation = ({ activeSection }) => {
    return (
        <nav className="navigation">
            <div className="nav-title">
                <span>Оглавление</span>
            </div>
            <div className="nav-list">
                <a
                    href="#step0"
                    className={`nav-item ${activeSection === 'step0' ? 'active' : ''}`}
                >
                    Шаг 1. Видео инструкция
                </a>
                <a
                    href="#step2"
                    className={`nav-item ${activeSection === 'step2' ? 'active' : ''}`}
                >
                    Шаг 2. Создание поля заказа
                </a>
                <a
                    href="#step3"
                    className={`nav-item ${activeSection === 'step3' ? 'active' : ''}`}
                >
                    Шаг 3. Структура проекта
                </a>
                <a
                    href="#step4"
                    className={`nav-item ${activeSection === 'step4' ? 'active' : ''}`}
                >
                    Шаг 4. Файл changeDealInformation.tsx
                </a>
                <a
                    href="#step5"
                    className={`nav-item ${activeSection === 'step5' ? 'active' : ''}`}
                >
                    Шаг 5. Файл table.tsx
                </a>
                <a
                    href="#step6"
                    className={`nav-item ${activeSection === 'step6' ? 'active' : ''}`}
                >
                    Шаг 6. Файл page.tsx
                </a>
                <a
                    href="#step7"
                    className={`nav-item ${activeSection === 'step7' ? 'active' : ''}`}
                >
                    Шаг 7. Настройка воронки
                </a>
                <a
                    href="#step8"
                    className={`nav-item ${activeSection === 'step8' ? 'active' : ''}`}
                >
                    Шаг 8. Ограничение редактирования
                </a>
                <a
                    href="#step9"
                    className={`nav-item ${activeSection === 'step9' ? 'active' : ''}`}
                >
                    Шаг 9. Добавление иконки в боковое меню
                </a>
            </div>
        </nav>
    );
};

export default Navigation;