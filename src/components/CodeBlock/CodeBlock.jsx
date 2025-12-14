import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism-tomorrow.css';
import './CodeBlock.css';

const CodeBlock = ({
  code,
  language = 'typescript',
  showLineNumbers = true,
  collapsible = false,
  maxLines = 10,
  copyButton = true,
  isLoading = false
}) => {
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      // Подсчитываем количество строк
      const lines = code.split('\n');
      setLineCount(lines.length);
      
      // Применяем подсветку синтаксиса
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const copyCode = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Ошибка при копировании:', err);
      });
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const shouldShowCollapseButton = collapsible && lineCount > maxLines;
  const isLongCode = lineCount > maxLines;

  return (
    <div className={`code-block enhanced ${isLongCode ? 'large-code' : ''} ${isLoading ? 'loading' : ''}`}>
      <div className="code-header">
        <div className="code-header-left">
          <span className="code-language">{language}</span>
          {shouldShowCollapseButton && (
            <button 
              className="collapse-btn"
              onClick={toggleCollapse}
              title={isCollapsed ? 'Развернуть' : 'Свернуть'}
            >
              {isCollapsed ? '▼' : '▲'}
              <span className="collapse-text">
                {isCollapsed ? `Показать все (${lineCount} строк)` : `Свернуть`}
              </span>
            </button>
          )}
        </div>
        {copyButton && (
          <button
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={copyCode}
            disabled={copied}
          >
            {copied ? 'Скопировано!' : 'Копировать'}
          </button>
        )}
      </div>
      
      <div className={`code-content ${isCollapsed ? 'collapsed' : ''}`}>
        {showLineNumbers && (
          <div className="line-numbers">
            {code.split('\n').map((_, index) => (
              <div key={index} className="line-number">
                {index + 1}
              </div>
            ))}
          </div>
        )}
        
        <div className="code-wrapper">
          <pre>
            <code 
              ref={codeRef}
              className={`language-${language}`}
            >
              {code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;