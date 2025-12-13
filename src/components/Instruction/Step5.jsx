import React, { useEffect, useRef, useState } from 'react';

const Step5 = ({ id }) => {
    const sectionRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [codeReady, setCodeReady] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Начинаем загрузку кода только когда секция видима
                    setTimeout(() => {
                        setCodeReady(true);
                        setIsLoading(false);
                    }, 300);
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

    const pageCode = `import { jsx } from '@app/html-jsx'
import { Deals } from './table'

const managerNames: Record<number, string> = {
  287115534: 'Анжела Романова',
  287115542: 'Эльмира Сарова',
  287115546: 'Лилия Новикова',
}

const dealsPage = app.html('/deals', async (ctx, req) => {

  const allDeals = await Deals.findAll(ctx, { order: { createdAt: 'desc' } })
  const deals = allDeals.filter(d => d.manager_user_id && d.finished_at_deal)
  const dealsJson = JSON.stringify(deals)

  return (
    <html>
      <head>
        <title>Заказы с апгрейдом</title>
        <style>{\`
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f7fa;
            padding: 30px;
            color: #333;
          }

          h1 {
            text-align: center;
            margin-bottom: 30px;
            color: #2c3e50;
            font-size: 28px;
          }

          .stats-container {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
            margin-bottom: 25px;
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            align-items: center;
          }

          .stat-item {
            background: #f0f3f7;
            padding: 15px 20px;
            border-radius: 8px;
            min-width: 200px;
          }

          .stat-label {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
          }

          .stat-value {
            font-size: 24px;
            font-weight: 600;
            color: #2c3e50;
          }

          .filters {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 25px;
            align-items: center;
            justify-content: center;
          }

          select, input[type="date"], button {
            padding: 8px 14px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.2s;
          }

          select:hover, input[type="date"]:hover, button:hover {
            border-color: #999;
          }

          .period-buttons button {
            border: 1px solid #ccc;
            background: #fff;
            color: #333;
            margin-right: 5px;
            border-radius: 8px;
            padding: 8px 16px;
            cursor: pointer;
            transition: all 0.3s;
          }

          .period-buttons button.active {
            background-color: #4CAF50;
            color: #fff;
            border-color: #4CAF50;
          }

          .period-buttons button:hover:not(.active) {
            background-color: #e6f0f6;
          }

          button.reset-btn {
            background-color: #f44336;
            color: white;
            border: none;
            transition: background-color 0.3s;
          }

          button.reset-btn:hover {
            background-color: #d32f2f;
          }

          table {
            border-collapse: collapse;
            width: 100%;
            background: #fff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
            border-radius: 10px;
            overflow: hidden;
          }

          th, td {
            border-bottom: 1px solid #e0e0e0;
            padding: 12px 15px;
            text-align: left;
            font-size: 14px;
          }

          th {
            background: #f0f3f7;
            color: #555;
            font-weight: 600;
          }

          tbody tr:nth-child(even) {
            background: #f9f9f9;
          }

          tbody tr:hover {
            background: #e0f7ff;
            transition: background 0.2s;
          }

          .date-range {
            display: none;
            gap: 8px;
            align-items: center;
          }

          .date-range input {
            width: 150px;
          }

          @media (max-width: 800px) {
            .filters {
              flex-direction: column;
            }

            .period-buttons {
              margin-top: 10px;
            }

            .stats-container {
              flex-direction: column;
              align-items: stretch;
            }

            .stat-item {
              min-width: auto;
            }

            table th, table td {
              font-size: 13px;
              padding: 10px;
            }
          }
        \`}</style>
        <script>
          {\`
            const dealsData = \${dealsJson};
            const managerNamesMap = \${JSON.stringify(managerNames)};
            let activePeriod = '';

            function calculateTotalUpgrade(filteredDeals) {
              return filteredDeals.reduce((sum, deal) => {
                const upgradeValue = parseFloat(deal.upgrade) || 0;
                return sum + upgradeValue;
              }, 0).toFixed(2);
            }

            function calculateAverageUpgrade(filteredDeals) {
              if (filteredDeals.length === 0) return '0.00';
              const total = filteredDeals.reduce((sum, deal) => {
                const upgradeValue = parseFloat(deal.upgrade) || 0;
                return sum + upgradeValue;
              }, 0);
              return (total / filteredDeals.length).toFixed(2);
            }

            function updateStatistics(filteredDeals) {
              const totalUpgrade = calculateTotalUpgrade(filteredDeals);
              const averageUpgrade = calculateAverageUpgrade(filteredDeals);
              
              document.getElementById('totalUpgrade').textContent = totalUpgrade + ' ₽';
              document.getElementById('averageUpgrade').textContent = averageUpgrade + ' ₽';
              document.getElementById('totalDeals').textContent = filteredDeals.length;
              
              // Получаем выбранного менеджера
              const managerId = document.getElementById('managerSelect').value;
              const managerName = managerId ? managerNamesMap[managerId] || 'Менеджер' : 'Все менеджеры';
              
              // Получаем период
              let periodText = '';
              if (activePeriod === 'day') {
                periodText = 'за сегодня';
              } else if (activePeriod === 'week') {
                periodText = 'за последнюю неделю';
              } else if (activePeriod === 'range') {
                const fromInput = document.getElementById('fromDate').value;
                const toInput = document.getElementById('toDate').value;
                if (fromInput || toInput) {
                  periodText = 'за выбранный период';
                }
              }
              
              document.getElementById('statsTitle').textContent = \\\`Статистика: \\\${managerName} \\\${periodText}\\\`;
            }

            function loadDeals() {
              const managerId = document.getElementById('managerSelect').value;
              const fromInput = document.getElementById('fromDate').value;
              const toInput = document.getElementById('toDate').value;

              let filtered = dealsData;
              if (managerId) filtered = filtered.filter(d => d.manager_user_id == managerId);

              const now = new Date();
              const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

              if (activePeriod === 'day') {
                filtered = filtered.filter(d => new Date(d.finished_at_deal) >= startOfToday);
              } else if (activePeriod === 'week') {
                const weekAgo = new Date();
                weekAgo.setDate(now.getDate() - 7);
                filtered = filtered.filter(d => new Date(d.finished_at_deal) >= weekAgo);
              } else if (activePeriod === 'range') {
                const from = fromInput ? new Date(fromInput) : null;
                const to = toInput ? new Date(toInput) : null;
                if (from) {
                  const fromDate = new Date(from);
                  fromDate.setHours(0, 0, 0, 0);
                  filtered = filtered.filter(d => new Date(d.finished_at_deal) >= fromDate);
                }
                if (to) {
                  const toDate = new Date(to);
                  toDate.setHours(23, 59, 59, 999);
                  filtered = filtered.filter(d => new Date(d.finished_at_deal) <= toDate);
                }
              }

              const tbody = document.getElementById('dealsBody');
              tbody.innerHTML = '';
              filtered.forEach(deal => {
                const tr = document.createElement('tr');
                tr.innerHTML = \\\`
                  <td>\\\${deal.id_deal}</td>
                  <td>\\\${deal.id_user}</td>
                  <td>\\\${managerNamesMap[deal.manager_user_id] ?? deal.manager_user_id}</td>
                  <td>\\\${deal.cost_deal ? parseFloat(deal.cost_deal).toFixed(2) + ' ₽' : '—'}</td>
                  <td>\\\${deal.user_payed_money_value ? parseFloat(deal.user_payed_money_value).toFixed(2) + ' ₽' : '—'}</td>
                  <td>\\\${deal.upgrade ? parseFloat(deal.upgrade).toFixed(2) + ' ₽' : '—'}</td>
                  <td>\\\${deal.finished_at_deal ? new Date(deal.finished_at_deal).toLocaleString('ru-RU') : '—'}</td>
                \\\`;
                tbody.appendChild(tr);
              });

              updateStatistics(filtered);
            }

            function setPeriod(period) {
              activePeriod = period;
              const buttons = document.querySelectorAll('.period-buttons button');
              buttons.forEach(btn => btn.classList.remove('active'));
              if (period) document.getElementById('btn_' + period).classList.add('active');

              document.querySelector('.date-range').style.display = period === 'range' ? 'flex' : 'none';
              loadDeals();
            }

            function resetFilters() {
              document.getElementById('managerSelect').value = '';
              activePeriod = '';
              document.querySelectorAll('.period-buttons button').forEach(btn => btn.classList.remove('active'));
              document.querySelector('.date-range').style.display = 'none';
              document.getElementById('fromDate').value = '';
              document.getElementById('toDate').value = '';
              loadDeals();
            }

            window.onload = loadDeals;
          \`}</script>
      </head>
      <body>
        <h1>Список заказов</h1>

        <div class="stats-container">
          <h2 id="statsTitle" style="width: 100%; margin: 0 0 15px 0; color: #2c3e50; font-size: 20px;">
            Статистика
          </h2>
          <div class="stat-item">
            <div class="stat-label">Общий апгрейд</div>
            <div class="stat-value" id="totalUpgrade">0.00 ₽</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Средний апгрейд</div>
            <div class="stat-value" id="averageUpgrade">0.00 ₽</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Количество сделок</div>
            <div class="stat-value" id="totalDeals">0</div>
          </div>
        </div>

        <div class="filters">
          <label>Менеджер:</label>
          <select id="managerSelect" onchange="loadDeals()">
            <option value="">Все</option>
            {Object.entries(managerNames).map(([id, name]) => (
              <option value={id}>{name}</option>
            ))}
          </select>

          <div class="period-buttons">
            <button id="btn_day" onclick="setPeriod('day')">Сегодня</button>
            <button id="btn_week" onclick="setPeriod('week')">Последняя неделя</button>
            <button id="btn_range" onclick="setPeriod('range')">Период</button>
          </div>

          <div class="date-range">
            <label>с:</label>
            <input type="date" id="fromDate" onchange="loadDeals()" />
            <label>по:</label>
            <input type="date" id="toDate" onchange="loadDeals()" />
          </div>

          <button class="reset-btn" onclick="resetFilters()">Сбросить фильтры</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID заказа</th>
              <th>ID пользователя</th>
              <th>Менеджер</th>
              <th>Сумма первоначального заказа</th>
              <th>Оплачено</th>
              <th>Апгрейд</th>
              <th>Дата оплаты</th>
            </tr>
          </thead>
          <tbody id="dealsBody"></tbody>
        </table>
      </body>
    </html>
  )
})`;
    // Скелетон для загрузки
    const SkeletonLoader = () => (
        <div className="skeleton-container">
            <div className="skeleton-header">
                <div className="skeleton-step-number"></div>
                <div className="skeleton-title"></div>
            </div>
            <div className="skeleton-content">
                <div className="skeleton-info-box"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
                <div className="skeleton-code-block">
                    <div className="skeleton-code-header"></div>
                    <div className="skeleton-code-lines">
                        {[...Array(15)].map((_, i) => (
                            <div key={i} className="skeleton-code-line" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <section id={id} className="content-section skeleton-section" ref={sectionRef}>
                <SkeletonLoader />
            </section>
        );
    }

    return (
        <section id={id} className="content-section" ref={sectionRef}>
            <div className="section-header">
                <span className="step-number">5</span>
                <span>Файл page.tsx</span>
            </div>
            <div className="section-content">
                <div className="info-box">
                    <strong>📌 Назначение:</strong> HTML‑страница со статистикой и фильтрами по апгрейдам.
                </div>

                <p>Вставьте код из инструкции без изменений логики.</p>
                <p>Проверьте список менеджеров:</p>

                {codeReady && (
                    <div className="code-block large-code">
                        <div className="code-header">
                            <span className="code-language">TypeScript</span>
                            <button
                                className={`copy-btn ${copied ? 'copied' : ''}`}
                                onClick={() => copyCode(pageCode)}
                                disabled={isLoading}
                            >
                                {copied ? 'Скопировано!' : 'Копировать'}
                            </button>
                        </div>
                        <pre><code>{pageCode}</code></pre>
                    </div>
                )}
                <div className="info-box" style={{ marginTop: '20px' }}>
                    <strong>⚙️ Настройка кода:</strong>
                    <p>Замените в объекте <span className="parameter">const managerNames</span> значения на ID менеджеров и соответствующие им имена</p>
                </div>
            </div>
            
        </section>
    );
};

export default Step5;