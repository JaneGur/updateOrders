import React, { useEffect, useRef } from 'react';
import VideoInstruction from './VideoInstruction';

const Step0 = ({ id }) => {
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

    // Пример видео - вы можете заменить на реальные URL
    const videos = [
        {
            src: "https://disk.yandex.ru/client/disk/Chatium/Лайки%20на%20уроки?idApp=client&dialog=slider&idDialog=%2Fdisk%2FChatium%2FЛайки%20на%20уроки%2F2025-10-25%2008-04-13.mp4", // замените на реальный путь к видео
            title: "Видео инструкция: Обзор процесса настройки",
            description: "Подробно рассмотрим весь процесс настройки системы от начала до конца. Рекомендуем посмотреть это видео перед началом работы.",
            poster: "/images/video-poster-1.jpg" // замените на реальный путь к постеру
        },
    ];

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">1</span>
                <span>Видео инструкция: Обзор процесса настройки</span>
            </div>
            <div className="section-content">
                <p>Подробно рассмотрим весь процесс настройки системы от начала до конца.</p>

                <div><button className="watch-video-btn">Смотреть видео</button></div>

                <div className="video-note">
                    <h4>После просмотра видео перейдем к следующим шагам:</h4>
                    <ul className="step-list">
                        <li>Создание дополнительного поля заказа</li>
                        <li>Подготовка структуры проекта</li>
                        <li>Настройка файлов и компонентов</li>
                        <li>Конфигурация воронки и ограничений</li>
                    </ul>
                </div>

            </div>
        </section>
    );
};

export default Step0;