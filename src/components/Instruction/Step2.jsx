import React, { useEffect, useRef } from 'react';

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

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">2</span>
                <span>Подготовка структуры проекта в IDE</span>
            </div>
            <div className="section-content">
                <p>В IDE создайте папку:</p>

                <div className="file-structure">
                    <span className="folder">changeDealInformation</span>
                    <span className="file">├── changeDealInformation.tsx</span>
                    <span className="file">├── page.tsx</span>
                    <span className="file">└── table.tsx</span>
                </div>

                <p>Внутри папки создайте 3 файла:</p>
                <ul className="step-list">
                    <li>changeDealInformation.tsx</li>
                    <li>page.tsx</li>
                    <li>table.tsx</li>
                </ul>
            </div>
        </section>
    );
};

export default Step2;
