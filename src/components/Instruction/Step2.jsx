import React, { useEffect, useRef, useState } from 'react';

const Step3 = ({ id }) => {
    const sectionRef = useRef(null);
    const [copiedFile, setCopiedFile] = useState('');

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

    const copyFileName = (fileName) => {
        navigator.clipboard.writeText(fileName)
            .then(() => {
                setCopiedFile(fileName);
                setTimeout(() => setCopiedFile(''), 2000);
            })
            .catch(err => {
                console.error('Ошибка при копировании:', err);
            });
    };

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">3</span>
                <span>Подготовка структуры проекта в IDE</span>
            </div>
            <div className="section-content">
                <p>В IDE создайте папку:</p>

                <div className="file-structure">
                    <span className="folder">changeDealInformation</span>
                    <span className="file">├── </span>
                    <button
                        className={`file-name-btn ${copiedFile === 'changeDealInformation.tsx' ? 'copied' : ''}`}
                        onClick={() => copyFileName('changeDealInformation.tsx')}
                        title="Копировать имя файла"
                    >
                        changeDealInformation.tsx
                    </button>
                    <br />
                    <span className="file">├── </span>
                    <button
                        className={`file-name-btn ${copiedFile === 'page.tsx' ? 'copied' : ''}`}
                        onClick={() => copyFileName('page.tsx')}
                        title="Копировать имя файла"
                    >
                        page.tsx
                    </button>
                    <br />
                    <span className="file">└── </span>
                    <button
                        className={`file-name-btn ${copiedFile === 'table.tsx' ? 'copied' : ''}`}
                        onClick={() => copyFileName('table.tsx')}
                        title="Копировать имя файла"
                    >
                        table.tsx
                    </button>
                </div>

                <p>Внутри папки создайте 3 файла:</p>
                <ul className="step-list">
                    <li>
                        <button
                            className={`file-name-btn ${copiedFile === 'changeDealInformation.tsx' ? 'copied' : ''}`}
                            onClick={() => copyFileName('changeDealInformation.tsx')}
                            title="Копировать имя файла"
                        >
                            changeDealInformation.tsx
                        </button>
                    </li>
                    <li>
                        <button
                            className={`file-name-btn ${copiedFile === 'page.tsx' ? 'copied' : ''}`}
                            onClick={() => copyFileName('page.tsx')}
                            title="Копировать имя файла"
                        >
                            page.tsx
                        </button>
                    </li>
                    <li>
                        <button
                            className={`file-name-btn ${copiedFile === 'table.tsx' ? 'copied' : ''}`}
                            onClick={() => copyFileName('table.tsx')}
                            title="Копировать имя файла"
                        >
                            table.tsx
                        </button>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Step3;

