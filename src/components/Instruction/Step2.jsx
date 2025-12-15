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

    const files = [
        {
            name: 'changeDealInformation',
            description: 'Логика создания/обновления/удаления записей сделок',
            icon: '⚙️',
            color: '#38bdf8'
        },
        {
            name: 'page',
            description: 'HTML-страница со статистикой и фильтрами',
            icon: '📄',
            color: '#0ea5e9'
        },
        {
            name: 'table',
            description: 'Определение структуры таблицы БД',
            icon: '📊',
            color: '#7dd3fc'
        }
    ];
  

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">3</span>
                <span>Подготовка структуры проекта в IDE</span>
            </div>
            <div className="section-content">
                <div className="info-box" style={{ marginBottom: '30px' }}>
                    <strong>📁 Создайте папку:</strong>
                    <code
                        className={`folder-name ${copiedFile === 'changeDealInformation' ? 'copied' : ''}`}
                        onClick={() => copyFileName('changeDealInformation')}
                        style={{ cursor: 'pointer' }}
                    >
                        changeDealInformation
                    </code>
                    {copiedFile === 'changeDealInformation' && (
                        <span className="copied-indicator">✓ Скопировано</span>
                    )}
                </div>

                <h3 className="files-subtitle">Внутри папки создайте 3 файла:</h3>

                <div className="file-cards-grid">
                    {files.map((file, index) => (
                        <div 
                            key={file.name}
                            className={`file-card ${copiedFile === file.name ? 'copied' : ''}`}
                            style={{ '--card-color': file.color, '--card-index': index }}
                            onClick={() => copyFileName(file.name)}
                        >
                            <div className="file-card-icon" style={{ background: file.color }}>
                                {file.icon}
                            </div>
                            <div className="file-card-content">
                                <div className="file-card-name">
                                    {file.name}
                                </div>
                                <div className="file-card-description">
                                    {file.description}
                                </div>
                            </div>
                            <div className="file-card-action">
                                {copiedFile === file.name ? (
                                    <span className="copy-success">✓ Скопировано</span>
                                ) : (
                                    <span className="copy-hint">Нажмите, чтобы скопировать</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="project-structure-visual">
                    <div className="structure-title">
                        <span className="structure-icon">🗂️</span>
                        Итоговая структура проекта:
                    </div>
                    <div className="structure-tree">
                        <div className="tree-folder">
                            <span className="tree-icon folder-icon">📁</span>
                            <span className="tree-name">changeDealInformation/</span>
                        </div>
                        <div className="tree-children">
                            {files.map((file, index) => (
                                <div key={file.name} className="tree-file" style={{ '--file-index': index }}>
                                    <span className="tree-connector">{index === files.length - 1 ? '└─' : '├─'}</span>
                                    <span className="tree-icon file-icon">{file.icon}</span>
                                    <span className="tree-name">{file.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Step3;