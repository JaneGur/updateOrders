import React, { useEffect, useRef, useState } from 'react';

const Step6 = ({ id }) => {
    const sectionRef = useRef(null);
    const [copied, setCopied] = useState({
        condition: false,
        update: false
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
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

    const copyCode = (code, type) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setCopied(prev => ({ ...prev, [type]: true }));
                setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000);
            })
            .catch(err => {
                console.error('Ошибка при копировании:', err);
            });
    };

    const conditionCode = 'Number(deal.finishCost) - Number(deal.startCost) >= 15000';
    const updateCode = 'Number(deal.finishCost) - Number(deal.startCost)';

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">6</span>
                <span>Настройка воронки</span>
            </div>
            <div className="section-content">
                <h3 style={{ marginBottom: '20px', color: '#0f172a', fontWeight: 700 }}>6.1 Создание воронки</h3>
                <p>Перейдите в <span className="highlight">Воронки → Создать новую</span>.</p>

                <div className="arrow-step">⬇️</div>

                <h3 style={{ marginBottom: '20px', color: '#0f172a', fontWeight: 700 }}>6.2 Блок «Заказ создан (все предложения)»</h3>
                <p>Тип блока: <span className="parameter">Пользовательский код</span></p>

                <ol className="step-list">
                    <li>Скопируйте идентификатор действия.</li>
                    <li>Вставьте его в файл changeDealInformation.tsx.</li>
                    <li>Установите: <span className="parameter">Сохранить результат в переменную: deal.startCost</span></li>
                </ol>

                <div className="arrow-step">⬇️</div>

                <h3 style={{ marginBottom: '20px', color: '#0f172a', fontWeight: 700 }}>6.3 Блок «Заказ оплачен (все предложения)»</h3>
                <p>Тип блока: <span className="parameter">Пользовательский код</span></p>

                <ol className="step-list">
                    <li>Используйте тот же идентификатор действия.</li>
                    <li>Укажите: <span className="parameter">Сохранить результат в переменную: deal.finishCost</span></li>
                </ol>

                <div className="arrow-step">⬇️</div>

                <h3 style={{ marginBottom: '20px', color: '#0f172a', fontWeight: 700 }}>6.4 Условие между блоками</h3>
                <p>В стрелке между блоками:</p>

                <div className="code-block">
                    <div className="code-header">
                        <span className="code-language">JavaScript</span>
                        <button
                            className={`copy-btn ${copied.condition ? 'copied' : ''}`}
                            onClick={() => copyCode(conditionCode, 'condition')}
                        >
                            {copied.condition ? 'Скопировано!' : 'Копировать'}
                        </button>
                    </div>
                    <pre><code>{conditionCode}</code></pre>
                </div>

                <div className="arrow-step">⬇️</div>

                <h3 style={{ marginBottom: '20px', color: '#0f172a', fontWeight: 700 }}>6.5 Блок «Обновить заказ»</h3>
                <ol className="step-list">
                    <li>Поставьте галочку <span className="parameter">Обновить доп. поле заказа</span>.</li>
                    <li>Выберите поле: <span className="parameter">Разница между суммой клиента и финальным платежом</span></li>
                    <li>Значение:</li>
                </ol>

                <div className="code-block">
                    <div className="code-header">
                        <span className="code-language">JavaScript</span>
                        <button
                            className={`copy-btn ${copied.update ? 'copied' : ''}`}
                            onClick={() => copyCode(updateCode, 'update')}
                        >
                            {copied.update ? 'Скопировано!' : 'Копировать'}
                        </button>
                    </div>
                    <pre><code>{updateCode}</code></pre>
                </div>
            </div>
        </section>
    );
};

export default Step6;
