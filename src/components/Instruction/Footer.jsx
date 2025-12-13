import React from 'react';

const Footer = () => {
    return (
        <footer>
            <p>🎉 Готово!</p>
            <p style={{ marginTop: '10px', fontSize: '0.9em' }}>
                Если у вас возникли вопросы, напишите мне в telegram{' '}
                <a
                    href="https://t.me/gurtsievae"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0d9488', textDecoration: 'underline' }}
                >
                    https://t.me/gurtsievae
                </a>
            </p>
        </footer>
    );
};

export default Footer;
