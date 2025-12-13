import React, { useEffect, useRef, useState } from 'react';

const Step5 = ({ id }) => {
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

    const tableCode = `import { Heap } from '@app/heap'

export const Deals = Heap.Table('dealsforupgrade', {
  id_deal: Heap.Number(),
  id_user: Heap.Number(),
  finished_at_deal: Heap.Optional(Heap.DateTime()),
  cost_deal: Heap.Optional(Heap.Number()),
  manager_user_id: Heap.Optional(Heap.Number()),
  user_payed_money_value: Heap.Optional(Heap.Number()),
  upgrade: Heap.Optional(Heap.Number()),
})`;

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">5</span>
                <span>Файл table.tsx</span>
            </div>
            <div className="section-content">
                <div className="info-box">
                    <strong>📌 Назначение:</strong> таблица для хранения сделок с апгрейдом.
                </div>

                <div className="code-block">
                    <div className="code-header">
                        <span className="code-language">TypeScript</span>
                        <button
                            className={`copy-btn ${copied ? 'copied' : ''}`}
                            onClick={() => copyCode(tableCode)}
                        >
                            {copied ? 'Скопировано!' : 'Копировать'}
                        </button>
                    </div>
                    <pre><code>{tableCode}</code></pre>
                </div>
            </div>
        </section>
    );
};

export default Step5;
