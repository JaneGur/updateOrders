import React, { useEffect, useRef } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock';

const Step7 = ({ id }) => {
    const sectionRef = useRef(null);

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

    const conditionCode = 'Number(deal.finishCost) - Number(deal.startCost) >= 15000';
    const updateCode = 'Number(deal.finishCost) - Number(deal.startCost)';

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">7</span>
                <span>Настройка воронки</span>
            </div>
            <div className="section-content">
                <h3 style={{ marginBottom: '20px', color: '#0f172a', fontWeight: 700 }}>7.1 Создание воронки</h3>
                <p>Перейдите в <span className="highlight">Воронки → Создать новую</span>.</p>
                <br />
                <h3 style={{ marginBottom: '20px', color: '#0f172a', fontWeight: 700 }}>7.2 Блок «Заказ создан»</h3>
                <p>Создайте блок <span className="parameter">«Заказ создан»</span>, выберите <span className="parameter">«Все предложения»</span>.</p>

                <br />

                <h3 style={{ marginBottom: '20px', color: '#0f172a', fontWeight: 700 }}>7.3 От блока «Заказ создан» к блоку «Пользовательский код»</h3>
                <p>От данного блока проведите стрелку к блоку <span className="parameter">«Пользовательский код»</span>.</p>
                
                <p>В Блоке <span className="parameter">«Пользовательский код»</span>:</p>
                <ol className="step-list">
                    <li>Скопируйте идентификатор действия.</li>
                    <li>Вставьте его в файл changeDealInformation.tsx.</li>
                    <li>Установите: <span className="parameter">Сохранить результат в переменную: deal.startCost</span></li>
                </ol>

                <br />

                <h3 style={{ marginBottom: '20px', color: '#0f172a', fontWeight: 700 }}>7.4 Блок «Заказ оплачен»</h3>
                <p>Создайте блок <span className="parameter">«Заказ оплачен»</span>, выберите <span className="parameter">«Все предложения»</span>.</p>

                <br />

                <h3 style={{ marginBottom: '20px', color: '#0f172a', fontWeight: 700 }}>7.5 От блока «Заказ оплачен» к блоку «Пользовательский код»</h3>
                <p>От данного блока проведите стрелку к блоку <span className="parameter">«Пользовательский код»</span>.</p>
                
                <p>В Блоке <span className="parameter">«Пользовательский код»</span>:</p>
                <ol className="step-list">
                    <li>Скопируйте блок «Пользовательский код» из пункта 6.3 (чтобы идентификатор остался тот же).</li>
                    <li>Вставьте его в файл changeDealInformation.tsx.</li>
                    <li>Установите: <span className="parameter">Сохранить результат в переменную: deal.finishCost</span></li>
                </ol>

                <br />

                <h3 style={{ marginBottom: '20px', color: '#0f172a', fontWeight: 700 }}>7.6 Условие между блоками</h3>
                <p>Между блоками <span className="parameter">«Пользовательский код»</span> и блоком <span className="parameter">«Обновить заказ»</span> вставляем условие.</p>

                <CodeBlock
                    code={conditionCode}
                    language="javascript"
                    showLineNumbers={false}
                    collapsible={false}
                    copyButton={true}
                />

                <br />

                <h3 style={{ marginBottom: '20px', color: '#0f172a', fontWeight: 700 }}>7.7 Блок «Обновить заказ»</h3>
                <p>В блоке поставьте галочки и укажите параметры:</p>
                <ol className="step-list">
                    <li>✅ Поставьте галочку <span className="parameter">Обновить доп. поле заказа</span></li>
                    <li>Выберите поле: <span className="parameter">Разница между суммой клиента и финальным платежом</span></li>
                    <li>Укажите значение: <span className="parameter">Number(deal.finishCost) - Number(deal.startCost)</span> <em>(можно скопировать)</em></li>
                    <li>✅ Поставьте галочку <span className="parameter">Обновить теги</span></li>
                    <li>Укажите нужный тег: <span className="parameter">«апгрейд со входа»</span></li>
                </ol>

                <CodeBlock
                    code={updateCode}
                    language="javascript"
                    showLineNumbers={false}
                    collapsible={false}
                    copyButton={true}
                />
            </div>
        </section>
    );
};

export default Step7;
