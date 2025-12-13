import React, { useEffect, useRef, useState } from 'react';

const Step4 = ({ id }) => {
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

    const code = `import { HookParams } from '@templates/sdk'
import { getDealInfo } from '@getcourse/sdk'
import { Deals } from './table'

app.accountHook('@builder/hook-node-actions/ВАШ_ID_ДЕЙСТВИЯ', async (ctx, p: any) => {
  const params = p as HookParams<undefined>
  const dealID = params.agentsByType.deal.externalId
  const dealInfo = await getDealInfo(ctx, dealID)

  const existingDeal = await Deals.findOneBy(ctx, {
    id_deal: dealInfo.id,
  })

  if (!existingDeal) {
    // ➕ СОЗДАНИЕ
    await Deals.create(ctx, {
      id_deal: dealInfo.id,
      id_user: dealInfo.user_id,
      cost_deal: dealInfo.cost ?? null,
      manager_user_id: dealInfo.manager_user_id ?? null,
    })
  } else {
    // Вычисляем апгрейд
    const upgrade =
      dealInfo.user_payed_money_value && existingDeal.cost_deal
        ? dealInfo.user_payed_money_value - existingDeal.cost_deal
        : null

    // 🔄 ОБНОВЛЕНИЕ или УДАЛЕНИЕ
    if (!dealInfo.manager_user_id || upgrade === 0 || (upgrade !== null && upgrade < 15000)) {
      await Deals.delete(ctx, existingDeal.id)
    } else {
      await Deals.update(ctx, {
        id: existingDeal.id,
        finished_at_deal: dealInfo.finished_at
          ? new Date(dealInfo.finished_at)
          : null,
        manager_user_id: dealInfo.manager_user_id,
        user_payed_money_value: dealInfo.user_payed_money_value ?? null,
        upgrade,
      })
    }
  }

  return {
    success: true,
    data: String(dealInfo.cost),
  }
})`;

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">4</span>
                <span>Файл changeDealInformation.tsx</span>
            </div>
            <div className="section-content">
                <div className="info-box">
                    <strong>📌 Назначение:</strong> создание / обновление / удаление записи сделки и расчет апгрейда.
                </div>

                <p>Откройте файл changeDealInformation.tsx.</p>
                <p>Полностью вставьте код:</p>

                <div className="code-block">
                    <div className="code-header">
                        <span className="code-language">TypeScript</span>
                        <button
                            className={`copy-btn ${copied ? 'copied' : ''}`}
                            onClick={() => copyCode(code)}
                        >
                            {copied ? 'Скопировано!' : 'Копировать'}
                        </button>
                    </div>
                    <pre><code>{code}</code></pre>
                </div>

                <div className="warning">
                    <div className="warning-title">Важно:</div>
                    <p>замените <span className="parameter">ВАШ_ID_ДЕЙСТВИЯ</span> на идентификатор пользовательского кода из воронки.</p>
                </div>
            </div>
        </section>
    );
};

export default Step4;
