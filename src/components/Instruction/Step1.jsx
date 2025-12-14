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

    const handleCopyText = async (text, event) => {
    try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        createCopyParticles(event);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        console.error('Не удалось скопировать текст:', err);
    }
};

const createCopyParticles = (e) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'copy-particle';
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.left = `${rect.left + rect.width / 2}px`;
        particle.style.top = `${rect.top + rect.height / 2}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.animation = `particleFly 0.8s ease-out forwards`;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 800);
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
                            onClick={(e) => handleCopyText('Разница между суммой клиента и финальным платежом', e)}
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
