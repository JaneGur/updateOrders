import React, { useEffect, useRef, useState } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock';

const Step9 = ({ id }) => {
    const sectionRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [codeReady, setCodeReady] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Начинаем загрузку кода только когда секция видима
                    setTimeout(() => {
                        setCodeReady(true);
                        setIsLoading(false);
                    }, 300);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const menuCode = `<!-- ВЫВОДИМ ТАБЛИЦУ В БОКОВОЕ МЕНЮ-->

<script>
document.addEventListener('DOMContentLoaded', function () {

    /* === 1. Получаем user_id === */
    let sessionData = localStorage.getItem('session');
    let userId = null;

    if (sessionData) {
        try {
            const session = JSON.parse(sessionData);
            userId = session.user_id;
        } catch (e) {
            console.error('Ошибка парсинга session:', e);
        }
    }

    /* === 2. Разрешённые user_id === */
    const allowedUserIds = [280938485];

    /* === 3. Проверка доступа === */
    if (!allowedUserIds.includes(userId)) {
        console.log('Пункт "Таблица" скрыт: нет доступа');
        return; // ⛔ ВАЖНО: дальше код не выполняется
    }

    /* === 4. Добавление пункта меню === */
    const observer = new MutationObserver(function (mutations, obs) {
        const menu = document.querySelector('.gc-account-user-menu');

        if (menu && !menu.querySelector('.menu-item-table')) {

            const newMenuItem = document.createElement('li');
            newMenuItem.className = 'menu-item menu-item-table';

            newMenuItem.innerHTML = \`
                <a href="https://magikweek8.getcourse.ru/chtm/changeDealInformation/page~deals?__chtmPreviewMode__=1"
                   title="Таблица апсейлов"
                   class="with-label"
                   target="_blank">
                    <img class="menu-item-icon"
                         src="//fs-thb01.getcourse.ru/fileservice/file/thumbnail/h/e8796ab56259db43c4d7117f62040e0b.png/s/48x/a/592238/sc/98">
                    <span class="notify-count with-label" style="display:none;"></span>
                    <span class="menu-item-label">Таблица</span>
                </a>
            \`;

            const chatiumItem = menu.querySelector('.menu-item-chatium');
            if (chatiumItem && chatiumItem.parentNode) {
                chatiumItem.parentNode.insertBefore(newMenuItem, chatiumItem.nextSibling);
            } else {
                menu.appendChild(newMenuItem);
            }

            console.log('Пункт "Таблица" добавлен');
            obs.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
</script>`;

    // Скелетон для загрузки
    const SkeletonLoader = () => (
        <div className="skeleton-container">
            <div className="skeleton-header">
                <div className="skeleton-step-number"></div>
                <div className="skeleton-title"></div>
            </div>
            <div className="skeleton-content">
                <div className="skeleton-info-box"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
                <div className="skeleton-code-block">
                    <div className="skeleton-code-header"></div>
                    <div className="skeleton-code-lines">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="skeleton-code-line" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <section id={id} className="content-section skeleton-section" ref={sectionRef}>
                <SkeletonLoader />
            </section>
        );
    }

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">9</span>
                <span>Добавление иконки в боковое меню</span>
            </div>
            <div className="section-content">
                <div className="info-box">
                    <strong>📌 Назначение:</strong> Добавление нового пункта в боковое меню с ограниченным доступом для определенных пользователей.
                </div>

                <p>Перейдите в <strong>Настройки → Body</strong> и вставьте следующий код:</p>

                {codeReady && (
                    <CodeBlock
                        code={menuCode}
                        language="html"
                        showLineNumbers={true}
                        collapsible={true}
                        maxLines={15}
                        copyButton={true}
                        isLoading={isLoading}
                    />
                )}

                <div className="info-box" style={{ marginTop: '20px' }}>
                    <strong>⚙️ Настройка кода:</strong>
                    <p>В строке <span className="parameter">const allowedUserIds = [280938485];</span> замените <span className="parameter">280938485</span> на ID пользователей, которым должен быть разрешен доступ.</p>
                    <p>Вы также можете изменить:</p>
                    <ul>
                        <li>Название пункта меню - замените <span className="parameter">Таблица</span> на нужное название</li>
                        <li>Ссылку - измените URL в атрибуте <span className="parameter">href</span></li>
                        <li>Иконку - замените <span className="parameter">src</span> у изображения на свою иконку</li>
                    </ul>
                </div>

                <div className="info-box" style={{ marginTop: '20px', backgroundColor: '#fff3cd' }}>
                    <strong>⚠️ Важно:</strong>
                    <p>• Пункт меню будет отображаться только для пользователей с указанными ID</p>
                </div>
            </div>
        </section>
    );
};

export default Step9;