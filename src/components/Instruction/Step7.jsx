import React, { useEffect, useRef } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock';

const Step8 = ({ id }) => {
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

    const blockingCode = `<!--БЛОКИРУЕМ ПОЛЯ -->

<script>
document.addEventListener('DOMContentLoaded', function () {

  // --- Получение user_id ---
  let sessionData = localStorage.getItem('session');
  let userId = null;

  if (sessionData) {
    try {
      const session = JSON.parse(sessionData);
      userId = session.user_id;
    } catch (e) {
      console.error('Ошибка парсинга session:', e);
    }
  }

  // --- Разрешенные пользователи ---
  const allowedUserIds = [280938485];

  // -------------------------------
  // Блокировка редактора тегов
  // -------------------------------
  function lockTagInput() {
    const tagEditor = document.querySelector('.gc-tags.gc-tags-editable');
    if (!tagEditor) return false;

    if (!allowedUserIds.includes(userId)) {
      tagEditor.style.pointerEvents = 'none';
      tagEditor.style.opacity = '0.6';
      tagEditor.setAttribute('title', 'Редактирование тегов недоступно');
    }

    return true;
  }

  // -------------------------------
  // Блокировка конкретного input
  // -------------------------------
  function lockCustomField() {
    const input = document.querySelector('#field-input-11484986');

    if (!input) return false;

    if (!allowedUserIds.includes(userId)) {
      input.disabled = true;
      input.style.opacity = '0.6';
      input.style.pointerEvents = 'none';
      input.setAttribute('title', 'Редактирование недоступно');
    }

    return true;
  }

  // ---------------------------------------------------
  // Блокировка пунктов меню: "Добавить тег" / "Удалить тег/Изменить значение доп поля"
  // ---------------------------------------------------
  function lockTagMenu() {
    const btnAddTag = document.querySelector('a[data-type="deal_addtag"]');
    const btnRemoveTag = document.querySelector('a[data-type="deal_removetag"]');
    const btnUpdateField = document.querySelector('a[data-type="update_field"]');

    // если меню ещё не загрузилось
    if (!btnAddTag && !btnRemoveTag && !btnUpdateField ) return false;

    const canEdit = allowedUserIds.includes(userId);

    if (!canEdit) {
      if (btnAddTag) {
        btnAddTag.style.display = 'none';
        if (btnAddTag.parentElement) btnAddTag.parentElement.style.display = 'none';
      }
      if (btnRemoveTag) {
        btnRemoveTag.style.display = 'none';
        if (btnRemoveTag.parentElement) btnRemoveTag.parentElement.style.display = 'none';
      }
      if (btnUpdateField) {
        btnUpdateField.style.display = 'none';
        if (btnUpdateField.parentElement) btnUpdateField.parentElement.style.display = 'none';
      }
    }

    return true;
  }

  // --------------------------------------
  // Ожидание всех элементов (lazy-load GC)
  // --------------------------------------
  function waitForElements(attempt = 0) {
    const readyTags = lockTagInput();
    const readyField = lockCustomField();
    const readyMenu = lockTagMenu();

    if (readyTags && readyField && readyMenu) return;

    if (attempt > 30) {
      console.warn('Некоторые элементы не появились после 30 попыток');
      return;
    }

    setTimeout(() => waitForElements(attempt + 1), 400);
  }

  waitForElements();
});
</script>`;

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">8</span>
                <span>Ограничение редактирования полей (Body аккаунта)</span>
            </div>
            <div className="section-content">
                <p>Перейдите в <span className="highlight">Настройки аккаунта → Body</span>.</p>
                <p>Вставьте код блокировки.</p>

                <CodeBlock
                    code={blockingCode}
                    language="javascript"
                    showLineNumbers={true}
                    collapsible={true}
                    maxLines={15}
                    copyButton={true}
                />

                <div className="info-box" style={{ marginTop: '20px' }}>
                    <strong>⚙️ Настройка кода:</strong>
                    <p>Замените ID в строке <span className="parameter">const allowedUserIds = [280938485];</span> на ID пользователей, которым разрешено редактирование.</p>
                    <p>Замените ID в строке <span className="parameter">const input = document.querySelector('#field-input-11484986');</span> на ID поля 'Разница между суммой клиента и финальным платежом', которое было создано в пункте 1.</p>
                </div>
            </div>
        </section>
    );
};

export default Step8;
