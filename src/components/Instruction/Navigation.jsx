import React from 'react';

const Navigation = ({ activeSection }) => {
    return (
        <nav className="navigation">
            <div className="nav-title">
                <span>Оглавление</span>
            </div>
            <div className="nav-list">
                <a
                    href="#step1"
                    className={`nav-item ${activeSection === 'step1' ? 'active' : ''}`}
                >
                    Шаг 1. Создание поля заказа
                </a>
                <a
                    href="#step2"
                    className={`nav-item ${activeSection === 'step2' ? 'active' : ''}`}
                >
                    Шаг 2. Структура проекта
                </a>
                <a
                    href="#step3"
                    className={`nav-item ${activeSection === 'step3' ? 'active' : ''}`}
                >
                    Шаг 3. Файл changeDealInformation.tsx
                </a>
                <a
                    href="#step4"
                    className={`nav-item ${activeSection === 'step4' ? 'active' : ''}`}
                >
                    Шаг 4. Файл table.tsx
                </a>
                <a
                    href="#step5"
                    className={`nav-item ${activeSection === 'step5' ? 'active' : ''}`}
                >
                    Шаг 5. Файл page.tsx
                </a>
                <a
                    href="#step6"
                    className={`nav-item ${activeSection === 'step6' ? 'active' : ''}`}
                >
                    Шаг 6. Настройка воронки
                </a>
                <a
                    href="#step7"
                    className={`nav-item ${activeSection === 'step7' ? 'active' : ''}`}
                >
                    Шаг 7. Ограничение редактирования
                </a>
            </div>
        </nav>
    );
};

export default Navigation;
