<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EMS App - Svelte</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body>
    <div id="app"></div>

    <script type="module">
        import { writable } from 'https://cdn.jsdelivr.net/npm/svelte@4/store/index.mjs';
        
        // Componente Svelte compilado manualmente
        const app = document.getElementById('app');
        
        // Estado reactivo
        let isAuthenticated = false;
        let authMode = 'login';
        let activeTab = 'dashboard';
        let showMovimientoModal = false;
        let showMetaModal = false;
        let movimientoType = 'gasto';
        let descripcion = '';
        let chartsInitialized = false;

        function render() {
            if (!isAuthenticated) {
                app.innerHTML = renderAuth();
            } else {
                app.innerHTML = renderApp();
                if (!chartsInitialized) {
                    setTimeout(initCharts, 100);
                    chartsInitialized = true;
                }
            }
            attachEventListeners();
        }

        function renderAuth() {
            return `
                <div class="w-full h-screen flex items-center justify-center bg-cover bg-center relative" style="background-image: url('https://images.unsplash.com/photo-1579621970563-ebec7560eb3e?q=80&w=2500&auto=format&fit=crop')">
                    <div class="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"></div>
                    
                    <div class="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md relative z-10 animate-fade-in">
                        <div class="text-center mb-8">
                            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 text-blue-500 mb-4">
                                <i class="fas fa-wallet text-3xl"></i>
                            </div>
                            <h1 class="text-3xl font-bold text-white">Bienvenido a EMS</h1>
                            <p class="text-gray-400 text-sm mt-2">Gestiona tus finanzas con inteligencia.</p>
                        </div>

                        <div class="flex bg-gray-900 rounded-lg p-1 mb-6">
                            <button data-action="auth-login" class="${authMode === 'login' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'} flex-1 py-2 text-sm font-medium rounded-md">Iniciar Sesión</button>
                            <button data-action="auth-register" class="${authMode === 'register' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'} flex-1 py-2 text-sm font-medium rounded-md">Registrarse</button>
                        </div>

                        ${authMode === 'login' ? `
                            <form data-action="login-form" class="space-y-4">
                                <div>
                                    <label class="block text-sm text-gray-400 mb-1">Correo Electrónico</label>
                                    <div class="relative">
                                        <i class="fas fa-envelope absolute left-3 top-3 text-gray-500"></i>
                                        <input type="email" class="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none" placeholder="ejemplo@correo.com">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm text-gray-400 mb-1">Contraseña</label>
                                    <div class="relative">
                                        <i class="fas fa-lock absolute left-3 top-3 text-gray-500"></i>
                                        <input type="password" class="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none" placeholder="••••••••">
                                    </div>
                                </div>
                                <div class="flex justify-end">
                                    <a href="#" class="text-xs text-blue-400 hover:text-blue-300">¿Olvidaste tu contraseña?</a>
                                </div>
                                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/20 transition transform hover:scale-[1.02]">
                                    Ingresar
                                </button>
                            </form>
                        ` : `
                            <form data-action="login-form" class="space-y-4">
                                <div>
                                    <label class="block text-sm text-gray-400 mb-1">Nombre Completo</label>
                                    <div class="relative">
                                        <i class="fas fa-user absolute left-3 top-3 text-gray-500"></i>
                                        <input type="text" class="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none" placeholder="Tu Nombre">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm text-gray-400 mb-1">Correo Electrónico</label>
                                    <div class="relative">
                                        <i class="fas fa-envelope absolute left-3 top-3 text-gray-500"></i>
                                        <input type="email" class="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none" placeholder="ejemplo@correo.com">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm text-gray-400 mb-1">Contraseña</label>
                                    <div class="relative">
                                        <i class="fas fa-lock absolute left-3 top-3 text-gray-500"></i>
                                        <input type="password" class="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none" placeholder="Crear contraseña">
                                    </div>
                                </div>
                                <button type="submit" class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-green-500/20 transition transform hover:scale-[1.02]">
                                    Crear Cuenta
                                </button>
                            </form>
                        `}
                    </div>
                </div>
            `;
        }

        function renderApp() {
            const tabTitles = {
                dashboard: 'Resumen Financiero',
                movimientos: 'Historial de Movimientos',
                metas: 'Metas de Ahorro'
            };

            return `
                <div class="flex h-screen overflow-hidden bg-gray-900 text-white">
                    <!-- Sidebar -->
                    <aside class="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                        <div class="p-6">
                            <h1 class="text-2xl font-bold text-blue-500"><i class="fas fa-wallet mr-2"></i>EMS App</h1>
                        </div>
                        <nav class="flex-1 px-4 space-y-2">
                            <button data-tab="dashboard" class="w-full text-left flex items-center px-4 py-3 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'} rounded-lg transition">
                                <i class="fas fa-chart-pie w-6"></i> Dashboard
                            </button>
                            <button data-tab="movimientos" class="w-full text-left flex items-center px-4 py-3 ${activeTab === 'movimientos' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'} rounded-lg transition">
                                <i class="fas fa-list w-6"></i> Movimientos
                            </button>
                            <button data-tab="metas" class="w-full text-left flex items-center px-4 py-3 ${activeTab === 'metas' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'} rounded-lg transition">
                                <i class="fas fa-bullseye w-6"></i> Metas
                            </button>
                        </nav>
                        <div class="p-4 border-t border-gray-700">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold text-sm">JD</div>
                                    <div class="text-sm">
                                        <p class="font-medium">José David</p>
                                        <p class="text-xs text-gray-400">En línea</p>
                                    </div>
                                </div>
                                <button data-action="logout" class="text-red-400 hover:text-white" title="Cerrar Sesión">
                                    <i class="fas fa-sign-out-alt"></i>
                                </button>
                            </div>
                        </div>
                    </aside>

                    <!-- Main Content -->
                    <main class="flex-1 overflow-y-auto bg-gray-900 p-8">
                        <header class="flex justify-between items-center mb-8">
                            <h2 class="text-3xl font-bold">${tabTitles[activeTab]}</h2>
                            ${activeTab === 'movimientos' ? `
                                <button data-action="open-movimiento" class="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-blue-500/30 flex items-center gap-2 transition hover:scale-105">
                                    <i class="fas fa-plus"></i> Nuevo Movimiento
                                </button>
                            ` : ''}
                        </header>

                        ${activeTab === 'dashboard' ? renderDashboard() : ''}
                        ${activeTab === 'movimientos' ? renderMovimientos() : ''}
                        ${activeTab === 'metas' ? renderMetas() : ''}
                    </main>

                    ${showMovimientoModal ? renderMovimientoModal() : ''}
                    ${showMetaModal ? renderMetaModal() : ''}
                </div>
            `;
        }

        function renderDashboard() {
            return `
                <div class="space-y-6 animate-fade-in">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <p class="text-gray-400 text-sm mb-1">Saldo Actual</p>
                            <h3 class="text-3xl font-bold text-white">$ 1,450,000</h3>
                            <span class="text-green-400 text-xs"><i class="fas fa-arrow-up"></i> 12% vs mes pasado</span>
                        </div>
                        <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <p class="text-gray-400 text-sm mb-1">Ingresos (Mes)</p>
                            <h3 class="text-3xl font-bold text-green-400">$ 2,500,000</h3>
                        </div>
                        <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <p class="text-gray-400 text-sm mb-1">Gastos (Mes)</p>
                            <h3 class="text-3xl font-bold text-red-400">$ 1,050,000</h3>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <h4 class="font-bold mb-4">Top Gastos por Categoría</h4>
                            <div class="h-64 flex items-center justify-center">
                                <canvas id="donutChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <h4 class="font-bold mb-4">Balance Mensual</h4>
                            <div class="h-64">
                                <canvas id="barChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                        <div class="p-6 border-b border-gray-700">
                            <h4 class="font-bold">Ranking de Fugas de Dinero</h4>
                        </div>
                        <table class="w-full text-left text-sm text-gray-400">
                            <thead class="bg-gray-700 text-gray-200 uppercase text-xs">
                                <tr>
                                    <th class="px-6 py-3">#</th>
                                    <th class="px-6 py-3">Categoría</th>
                                    <th class="px-6 py-3">Total Gastado</th>
                                    <th class="px-6 py-3">% del Total</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-700">
                                <tr>
                                    <td class="px-6 py-4">1</td>
                                    <td class="px-6 py-4"><i class="fas fa-utensils text-orange-400 mr-2"></i> Comida</td>
                                    <td class="px-6 py-4 text-white font-medium">$ 450,000</td>
                                    <td class="px-6 py-4"><div class="w-24 bg-gray-700 h-2 rounded-full"><div class="bg-orange-400 h-2 rounded-full" style="width: 45%"></div></div></td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4">2</td>
                                    <td class="px-6 py-4"><i class="fas fa-home text-blue-400 mr-2"></i> Arriendo</td>
                                    <td class="px-6 py-4 text-white font-medium">$ 300,000</td>
                                    <td class="px-6 py-4"><div class="w-24 bg-gray-700 h-2 rounded-full"><div class="bg-blue-400 h-2 rounded-full" style="width: 30%"></div></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        function renderMovimientos() {
            return `
                <div class="space-y-6 animate-fade-in">
                    <div class="flex gap-4 bg-gray-800 p-4 rounded-xl border border-gray-700">
                        <div class="flex-1 relative">
                            <i class="fas fa-search absolute left-3 top-3 text-gray-500"></i>
                            <input type="text" placeholder="Buscar 'Uber', 'Netflix'..." class="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:border-blue-500 focus:outline-none">
                        </div>
                        <select class="bg-gray-900 text-white rounded-lg px-4 py-2 border border-gray-700">
                            <option>Este Mes</option>
                            <option>Mes Pasado</option>
                        </select>
                        <select class="bg-gray-900 text-white rounded-lg px-4 py-2 border border-gray-700">
                            <option>Todas las Cuentas</option>
                            <option>Nequi</option>
                            <option>Bancolombia</option>
                        </select>
                    </div>

                    <div class="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                        <table class="w-full text-left text-sm text-gray-400">
                            <thead class="bg-gray-700 text-gray-200 uppercase text-xs">
                                <tr>
                                    <th class="px-6 py-3">Fecha</th>
                                    <th class="px-6 py-3">Categoría</th>
                                    <th class="px-6 py-3">Descripción</th>
                                    <th class="px-6 py-3">Cuenta</th>
                                    <th class="px-6 py-3 text-right">Monto</th>
                                    <th class="px-6 py-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-700">
                                <tr class="hover:bg-gray-700/50 transition">
                                    <td class="px-6 py-4">01 Dic 2025</td>
                                    <td class="px-6 py-4"><span class="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs"><i class="fas fa-shopping-bag mr-1"></i> Ropa</span></td>
                                    <td class="px-6 py-4 text-white">Compra Zara</td>
                                    <td class="px-6 py-4">Bancolombia</td>
                                    <td class="px-6 py-4 text-right text-red-400 font-bold">- $ 120,000</td>
                                    <td class="px-6 py-4 text-center">
                                        <button class="text-blue-400 hover:text-white mx-1"><i class="fas fa-pencil"></i></button>
                                        <button class="text-red-400 hover:text-white mx-1"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr class="hover:bg-gray-700/50 transition">
                                    <td class="px-6 py-4">30 Nov 2025</td>
                                    <td class="px-6 py-4"><span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs"><i class="fas fa-wallet mr-1"></i> Salario</span></td>
                                    <td class="px-6 py-4 text-white">Pago Quincena</td>
                                    <td class="px-6 py-4">Nequi</td>
                                    <td class="px-6 py-4 text-right text-green-400 font-bold">+ $ 1,200,000</td>
                                    <td class="px-6 py-4 text-center">
                                        <button class="text-blue-400 hover:text-white mx-1"><i class="fas fa-pencil"></i></button>
                                        <button class="text-red-400 hover:text-white mx-1"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        function renderMetas() {
            return `
                <div class="space-y-6 animate-fade-in">
                    <div class="flex justify-between items-center bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <div>
                            <h3 class="text-2xl font-bold text-white">Tus Objetivos</h3>
                            <p class="text-gray-400 text-sm">Ahorra con propósito. Llevas 2 metas activas.</p>
                        </div>
                        <button data-action="open-meta" class="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-medium transition">
                            <i class="fas fa-plus mr-2"></i> Crear Meta
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 relative overflow-hidden group hover:border-purple-500 transition">
                            <div class="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <span class="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-bold uppercase">Viaje</span>
                                    <h4 class="text-xl font-bold text-white mt-1">Vacaciones Europa</h4>
                                </div>
                                <div class="text-right">
                                    <p class="text-xs text-gray-400">Objetivo</p>
                                    <p class="font-bold text-white">$ 10,000,000</p>
                                </div>
                            </div>
                            <div class="mb-2 flex justify-between text-sm">
                                <span class="text-gray-400">Progreso (25%)</span>
                                <span class="text-white font-bold">$ 2,500,000</span>
                            </div>
                            <div class="w-full bg-gray-700 h-3 rounded-full mb-4">
                                <div class="bg-gradient-to-r from-purple-600 to-blue-500 h-3 rounded-full" style="width: 25%"></div>
                            </div>
                            <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                                <p class="text-xs text-gray-500"><i class="far fa-clock mr-1"></i> Fecha límite: Dic 2025</p>
                                <button data-abonar="Vacaciones Europa" class="text-purple-400 hover:text-white text-sm font-medium">Abonar <i class="fas fa-arrow-right ml-1"></i></button>
                            </div>
                        </div>

                        <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 relative overflow-hidden group hover:border-green-500 transition">
                            <div class="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase">Tecnología</span>
                                    <h4 class="text-xl font-bold text-white mt-1">MacBook Pro</h4>
                                </div>
                                <div class="text-right">
                                    <p class="text-xs text-gray-400">Objetivo</p>
                                    <p class="font-bold text-white">$ 8,000,000</p>
                                </div>
                            </div>
                            <div class="mb-2 flex justify-between text-sm">
                                <span class="text-gray-400">Progreso (60%)</span>
                                <span class="text-white font-bold">$ 4,800,000</span>
                            </div>
                            <div class="w-full bg-gray-700 h-3 rounded-full mb-4">
                                <div class="bg-gradient-to-r from-green-600 to-teal-500 h-3 rounded-full" style="width: 60%"></div>
                            </div>
                            <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                                <p class="text-xs text-gray-500"><i class="far fa-clock mr-1"></i> Fecha límite: Jun 2025</p>
                                <button data-abonar="MacBook Pro" class="text-green-400 hover:text-white text-sm font-medium">Abonar <i class="fas fa-arrow-right ml-1"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderMovimientoModal() {
            return `
                <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div class="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md p-6 relative animate-fade-in">
                        <button data-action="close-movimiento" class="absolute top-4 right-4 text-gray-400 hover:text-white"><i class="fas fa-times text-xl"></i></button>
                        <h3 class="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-2">Registrar Movimiento</h3>
                        <form class="space-y-4">
                            <div>
                                <label class="block text-sm text-gray-400 mb-2">Tipo de Movimiento</label>
                                <div class="grid grid-cols-2 gap-2 p-1 bg-gray-900 rounded-lg">
                                    <button type="button" data-tipo="gasto" class="${movimientoType === 'gasto' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'} py-2 rounded-md font-medium text-sm">Gasto</button>
                                    <button type="button" data-tipo="ingreso" class="${movimientoType === 'ingreso' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'} py-2 rounded-md font-medium text-sm">Ingreso</button>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm text-gray-400 mb-1">Monto ($)</label>
                                <input type="number" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none text-lg font-bold" placeholder="0.00">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm text-gray-400 mb-1">Cuenta <span class="text-red-500">*</span></label>
                                    <select class="w-full bg-gray-900 border border-red-500/50 rounded-lg px-3 py-2 text-white focus:border-blue-500">
                                        <option>Seleccionar...</option>
                                        <option>Nequi</option>
                                        <option>Bancolombia</option>
                                        <option>Efectivo</option>
                                    </select>
                                    <p class="text-red-500 text-[10px] mt-1">Obligatorio (ID)</p>
                                </div>
                                <div>
                                    <label class="block text-sm text-gray-400 mb-1">Categoría <span class="text-red-500">*</span></label>
                                    <select class="w-full bg-gray-900 border border-red-500/50 rounded-lg px-3 py-2 text-white focus:border-blue-500">
                                        <option>Seleccionar...</option>
                                        <option>Comida</option>
                                        <option>Transporte</option>
                                        <option>Ocio</option>
                                    </select>
                                    <p class="text-red-500 text-[10px] mt-1">Obligatorio (ID)</p>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm text-gray-400 mb-1">Fecha</label>
                                <input type="date" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 text-sm">
                            </div>
                            <div>
                                <label class="block text-sm text-gray-400 mb-1">Descripción</label>
                                <input type="text" data-input="descripcion" value="${descripcion}" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 text-sm" placeholder="Ej: Almuerzo con el equipo">
                            </div>
                            <button type="button" data-action="save-movimiento" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-4 shadow-lg shadow-blue-500/20">
                                Guardar Transacción
                            </button>
                        </form>
                    </div>
                </div>
            `;
        }

        function renderMetaModal() {
            return `
                <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div class="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md p-6 relative animate-fade-in">
                        <button data-action="close-meta" class="absolute top-4 right-4 text-gray-400 hover:text-white"><i class="fas fa-times text-xl"></i></button>
                        <h3 class="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-2">Crear Meta de Ahorro</h3>
                        <form class="space-y-4">
                            <div>
                                <label class="block text-sm text-gray-400 mb-1">Nombre de la Meta</label>
                                <input type="text" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none" placeholder="Ej: Comprar Carro">
                            </div>
                            <div>
                                <label class="block text-sm text-gray-400 mb-1">Monto Objetivo ($)</label>
                                <input type="number" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none text-lg font-bold" placeholder="0.00">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm text-gray-400 mb-1">Fecha Inicio</label>
                                    <input type="date" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                                </div>
                                <div>
                                    <label class="block text-sm text-gray-400 mb-1">Fecha Límite</label>
                                    <input type="date" class="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                                </div>
                            </div>
                            <button type="button" data-action="save-meta" class="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg mt-4 shadow-lg shadow-purple-500/20">
                                Crear Meta
                            </button>
                        </form>
                    </div>
                </div>
            `;
        }

        function initCharts() {
            const donutCanvas = document.getElementById('donutChart');
            const barCanvas = document.getElementById('barChart');

            if (donutCanvas && window.Chart) {
                const ctxDonut = donutCanvas.getContext('2d');
                new window.Chart(ctxDonut, {
                    type: 'doughnut',
                    data: {
                        labels: ['Comida', 'Arriendo', 'Ocio', 'Otros'],
                        datasets: [{
                            data: [450000, 300000, 150000, 150000],
                            backgroundColor: ['#fb923c', '#60a5fa', '#a78bfa', '#4b5563'],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: { color: 'white' }
                            }
                        }
                    }
                });
            }

            if (barCanvas && window.Chart) {
                const ctxBar = barCanvas.getContext('2d');
                new window.Chart(ctxBar, {
                    type: 'bar',
                    data: {
                        labels: ['Ene', 'Feb', 'Mar'],
                        datasets: [
                            { label: 'Ingresos', data: [2000, 2500, 2200], backgroundColor: '#4ade80' },
                            { label: 'Gastos', data: [1800, 1050, 2000], backgroundColor: '#f87171' }
                        ]
                    },
                    options: {
                        plugins: {
                            legend: { labels: { color: 'white' } }
                        },
                        scales: {
                            y: { ticks: { color: 'gray' } },
                            x: { ticks: { color: 'gray' } }
                        }
                    }
                });
            }
        }

        function attachEventListeners() {
            // Auth buttons
            const loginBtn = document.querySelector('[data-action="auth-login"]');
            const registerBtn = document.querySelector('[data-action="auth-register"]');
            const loginForm = document.querySelector('[data-action="login-form"]');
            
            if (loginBtn) loginBtn.addEventListener('click', () => {
                authMode = 'login';
                render();
            });
            
            if (registerBtn) registerBtn.addEventListener('click', () => {
                authMode = 'register';
                render();
            });
            
            if (loginForm) loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                isAuthenticated = true;
                render();
            });

            // Logout
            const logoutBtn = document.querySelector('[data-action="logout"]');
            if (logoutBtn) logoutBtn.addEventListener('click', () => {
                isAuthenticated = false;
                activeTab = 'dashboard';
                chartsInitialized = false;
                render();
            });

            // Tab navigation
            document.querySelectorAll('[data-tab]').forEach(btn => {
                btn.addEventListener('click', () => {
                    activeTab = btn.dataset.tab;
                    render();
                });
            });

            // Modal actions
            const openMovimientoBtn = document.querySelector('[data-action="open-movimiento"]');
            const closeMovimientoBtn = document.querySelector('[data-action="close-movimiento"]');
            const saveMovimientoBtn = document.querySelector('[data-action="save-movimiento"]');
            
            if (openMovimientoBtn) openMovimientoBtn.addEventListener('click', () => {
                showMovimientoModal = true;
                render();
            });
            
            if (closeMovimientoBtn) closeMovimientoBtn.addEventListener('click', () => {
                showMovimientoModal = false;
                descripcion = '';
                render();
            });
            
            if (saveMovimientoBtn) saveMovimientoBtn.addEventListener('click', () => {
                showMovimientoModal = false;
                descripcion = '';
                render();
            });

            const openMetaBtn = document.querySelector('[data-action="open-meta"]');
            const closeMetaBtn = document.querySelector('[data-action="close-meta"]');
            const saveMetaBtn = document.querySelector('[data-action="save-meta"]');
            
            if (openMetaBtn) openMetaBtn.addEventListener('click', () => {
                showMetaModal = true;
                render();
            });
            
            if (closeMetaBtn) closeMetaBtn.addEventListener('click', () => {
                showMetaModal = false;
                render();
            });
            
            if (saveMetaBtn) saveMetaBtn.addEventListener('click', () => {
                showMetaModal = false;
                render();
            });

            // Movimiento type buttons
            document.querySelectorAll('[data-tipo]').forEach(btn => {
                btn.addEventListener('click', () => {
                    movimientoType = btn.dataset.tipo;
                    render();
                });
            });

            // Abonar buttons
            document.querySelectorAll('[data-abonar]').forEach(btn => {
                btn.addEventListener('click', () => {
                    descripcion = `Abono a meta: ${btn.dataset.abonar}`;
                    showMovimientoModal = true;
                    render();
                });
            });

            // Descripcion input
            const descripcionInput = document.querySelector('[data-input="descripcion"]');
            if (descripcionInput) {
                descripcionInput.addEventListener('input', (e) => {
                    descripcion = e.target.value;
                });
            }
        }

        // Initial render
        render();
    </script>
</body>
</html>
