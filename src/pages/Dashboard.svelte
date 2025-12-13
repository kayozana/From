<script>
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';

  Chart.register(...registerables);

  // Datos mock (después vendrán de la API)
  let saldoActual = 1450000;
  let totalIngresos = 2500000;
  let totalGastos = 1050000;
  let cambioMensual = 12;

  let chartGastos;
  let chartBalance;

  onMount(() => {
    // Gráfico de pastel - Gastos por categoría
    const ctxGastos = document.getElementById('chartGastos');
    if (ctxGastos && ctxGastos instanceof HTMLCanvasElement) {
      chartGastos = new Chart(ctxGastos, {
        type: 'doughnut',
        data: {
          labels: ['Alimentación', 'Transporte', 'Entretenimiento', 'Salud', 'Otros'],
          datasets: [{
            data: [450000, 300000, 150000, 100000, 50000],
            backgroundColor: [
              '#3b82f6',
              '#8b5cf6',
              '#ec4899',
              '#f59e0b',
              '#64748b'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 15,
                font: { size: 12 },
                color: '#475569'
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.label + ': $' + context.parsed.toLocaleString();
                }
              }
            }
          }
        }
      });
    }

    // Gráfico de barras - Balance mensual
    const ctxBalance = document.getElementById('chartBalance');
    if (ctxBalance && ctxBalance instanceof HTMLCanvasElement) {
      chartBalance = new Chart(ctxBalance, {
        type: 'bar',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Ingresos',
              data: [2000000, 2200000, 2500000, 2300000, 2400000, 2500000],
              backgroundColor: '#10b981',
              borderRadius: 8
            },
            {
              label: 'Gastos',
              data: [1500000, 1600000, 1050000, 1800000, 1700000, 1050000],
              backgroundColor: '#ef4444',
              borderRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                padding: 15,
                font: { size: 12, weight: '600' },
                color: '#475569',
                usePointStyle: true
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '$' + (value / 1000) + 'k';
                },
                color: '#64748b'
              },
              grid: {
                color: '#e2e8f0'
              }
            },
            x: {
              ticks: {
                color: '#64748b'
              },
              grid: {
                display: false
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartGastos) chartGastos.destroy();
      if (chartBalance) chartBalance.destroy();
    };
  });
</script>

<style>
  h1 {
    font-size: 2rem;
    color: #0f172a;
    margin-bottom: 32px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 28px;
    border-radius: 16px;
    color: white;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
    transition: transform 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-4px);
  }

  .stat-card.green {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
  }

  .stat-card.red {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    box-shadow: 0 4px 20px rgba(239, 68, 68, 0.3);
  }

  .stat-label {
    font-size: 0.95rem;
    opacity: 0.9;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .stat-value {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .stat-change {
    font-size: 0.85rem;
    opacity: 0.8;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
  }

  .chart-card {
    background: white;
    padding: 28px;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .chart-card h3 {
    color: #0f172a;
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .chart-container {
    position: relative;
    height: 300px;
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }

    .charts-grid {
      grid-template-columns: 1fr;
    }

    .stat-value {
      font-size: 1.8rem;
    }
  }
</style>

<div>
  <h1>📊 Dashboard</h1>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-label">💼 Saldo Actual</div>
      <div class="stat-value">${saldoActual.toLocaleString()}</div>
      <div class="stat-change">
        ⬆️ {cambioMensual}% vs mes pasado
      </div>
    </div>

    <div class="stat-card green">
      <div class="stat-label">💰 Ingresos (Mes)</div>
      <div class="stat-value">${totalIngresos.toLocaleString()}</div>
      <div class="stat-change">Este mes</div>
    </div>

    <div class="stat-card red">
      <div class="stat-label">💸 Gastos (Mes)</div>
      <div class="stat-value">${totalGastos.toLocaleString()}</div>
      <div class="stat-change">Este mes</div>
    </div>
  </div>

  <div class="charts-grid">
    <div class="chart-card">
      <h3>📈 Top Gastos por Categoría</h3>
      <div class="chart-container">
        <canvas id="chartGastos"></canvas>
      </div>
    </div>

    <div class="chart-card">
      <h3>📊 Balance Mensual</h3>
      <div class="chart-container">
        <canvas id="chartBalance"></canvas>
      </div>
    </div>
  </div>
</div>