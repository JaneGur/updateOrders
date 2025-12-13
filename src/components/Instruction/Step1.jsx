import React, { useEffect, useRef, useState } from 'react';

const Step2 = ({ id }) => {
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

    const [copied, setCopied] = useState(false);

    const handleCopyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Не удалось скопировать текст:', err);
        }
    };

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">2</span>
                <span>Создание дополнительного поля заказа</span>
            </div>
            <div className="section-content">
                <p>В GetCourse перейдите в <span className="highlight">Настройки → Дополнительные поля → Заказы</span>.</p>

                <p>Создайте поле:</p>
                <ul className="step-list">
                    <li>
                        <strong>Название:</strong>{' '}
                        <span
                            className="copyable-text"
                            onClick={() => handleCopyText('Разница между суммой клиента и финальным платежом')}
                            title="Нажмите, чтобы скопировать"
                        >
                            Разница между суммой клиента и финальным платежом
                        </span>
                        {copied && <span className="copied-indicator"> ✓ Скопировано!</span>}
                    </li>
                    <li><strong>Тип:</strong> Строка</li>
                </ul>

                <p>Сохраните поле.</p>
            </div>
        </section>
    );
};

export default Step2;
