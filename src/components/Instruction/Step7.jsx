import React, { useEffect, useRef, useState } from 'react';

const Step7 = ({ id }) => {
    const sectionRef = useRef(null);
    const [copied, setCopied] = useState(false);

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

    const copyCode = (code) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error('Ошибка при копировании:', err);
            });
    };

    const allowedUsersCode = 'const allowedUserIds = [280938485]';

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">7</span>
                <span>Ограничение редактирования полей (Body аккаунта)</span>
            </div>
            <div className="section-content">
                <p>Перейдите в <span className="highlight">Настройки аккаунта → Body</span>.</p>
                <p>Вставьте код блокировки.</p>
                <p>Укажите разрешенных пользователей:</p>

                <div className="code-block">
                    <div className="code-header">
                        <span className="code-language">JavaScript</span>
                        <button
                            className={`copy-btn ${copied ? 'copied' : ''}`}
                            onClick={() => copyCode(allowedUsersCode)}
                        >
                            {copied ? 'Скопировано!' : 'Копировать'}
                        </button>
                    </div>
                    <pre><code>{allowedUsersCode}</code></pre>
                </div>

                <p>➡️ Замените ID на свои.</p>

                <div className="warning" style={{ marginTop: '30px' }}>
                    <div className="warning-title">Важно:</div>
                    <p>Убедитесь, что вы указали правильные ID пользователей, которым разрешено редактирование.
                        Только пользователи с указанными ID смогут вносить изменения в настройки.</p>
                </div>
            </div>
        </section>
    );
};

export default Step7;
