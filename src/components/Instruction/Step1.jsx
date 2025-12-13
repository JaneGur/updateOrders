import React, { useEffect, useRef } from 'react';

const Step1 = ({ id }) => {
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

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">1</span>
                <span>Создание дополнительного поля заказа</span>
            </div>
            <div className="section-content">
                <p>В GetCourse перейдите в <span className="highlight">Настройки → Дополнительные поля → Заказы</span>.</p>

                <p>Создайте поле:</p>
                <ul className="step-list">
                    <li><strong>Название:</strong> Разница между суммой клиента и финальным платежом</li>
                    <li><strong>Тип:</strong> Число</li>
                </ul>

                <p>Сохраните поле.</p>
            </div>
        </section>
    );
};

export default Step1;
