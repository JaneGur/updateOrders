import React, { useEffect, useRef } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock';

const Step5 = ({ id }) => {
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

                <CodeBlock
                    code={tableCode}
                    language="typescript"
                    showLineNumbers={true}
                    collapsible={false}
                    copyButton={true}
                />
            </div>
        </section>
    );
};

export default Step5;
