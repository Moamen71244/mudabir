/**
 * UI Module - Bootstrap 5 Optimized
 */

import { formatCurrency } from './utils.js';

export const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) {
        sidebar.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        // On desktop, we still use collapsed
        if (window.innerWidth > 992) {
            sidebar.classList.toggle('collapsed');
        }
    }
};

export const initSidebar = () => {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainContent = document.querySelector('.main-content');

    // Create overlay if it doesn't exist
    if (!document.querySelector('.sidebar-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', toggleSidebar);
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
    }
};


// --- Renders ---

export const renderDashboard = (data) => {
    const balanceEl = document.querySelector('.balance-val');
    const incomeEl = document.querySelector('.income-val');
    const expenseEl = document.querySelector('.expense-val');

    if (balanceEl) balanceEl.textContent = formatCurrency(data.balance.replace(/,/g, ''));
    if (incomeEl) incomeEl.textContent = formatCurrency(data.income.replace(/,/g, ''));
    if (expenseEl) expenseEl.textContent = formatCurrency(data.expense.replace(/,/g, ''));

    const container = document.getElementById('activities-container');
    if (container) {
        container.innerHTML = data.recentActivities.map(act => `
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-3">
                    <div class="bg-light rounded p-2"><i class="fa-solid ${act.icon} text-primary"></i></div>
                    <div>
                        <p class="mb-0 fw-medium">${act.title}</p>
                        <small class="text-secondary">${act.date}</small>
                    </div>
                </div>
                <span class="fw-bold ${act.amount.startsWith('+') ? 'text-success' : 'text-danger'}">${act.amount}</span>
            </div>
        `).join('');
    }
};

export const renderTransactions = (transactions) => {
    const body = document.getElementById('transactions-body');
    if (body) {
        body.innerHTML = transactions.map(t => `
            <tr>
                <td><div class="fw-medium">${t.name}</div></td>
                <td><span class="badge bg-light text-dark fw-normal">${t.category}</span></td>
                <td><small class="text-secondary">${t.date}</small></td>
                <td><span class="text-${t.status === 'completed' ? 'success' : 'warning'}">● ${t.status === 'completed' ? 'مكتمل' : 'معلق'}</span></td>
                <td class="text-end fw-bold ${t.amount < 0 ? 'text-danger' : 'text-success'}">
                    ${formatCurrency(Math.abs(t.amount))} ${t.amount < 0 ? '-' : '+'}
                    <button class="btn btn-sm btn-light text-danger ms-2 btn-delete" data-id="${t.id}" data-key="transactions">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
};

export const renderBudgets = (budgets) => {
    const container = document.getElementById('budgets-container');
    if (container) {
        container.innerHTML = budgets.map(b => `
            <div class="col-md-6 col-lg-4">
                <div class="card p-4 border-0">
                    <div class="d-flex justify-content-between mb-3">
                        <h5 class="fw-bold mb-0">${b.category || b.title}</h5>
                        <div>
                            <button class="btn btn-sm btn-light text-danger btn-delete" data-id="${b.id}" data-key="budgets">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between mb-1 small text-secondary">
                        <span>مستخدم: ${formatCurrency(b.used || 0)}</span>
                        <span>إجمالي: ${formatCurrency(b.total)}</span>
                    </div>
                    <div class="progress mb-3" style="height: 10px;">
                        <div class="progress-bar bg-primary" style="width: ${((b.used || 0) / b.total) * 100}%"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

export const renderSavings = (savings) => {
    const container = document.getElementById('savings-grid');
    if (container) {
        container.innerHTML = savings.map(s => `
            <div class="col-md-6 col-lg-4">
                <div class="card p-4 border-0">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div class="bg-info-subtle text-info rounded p-2 d-inline-block">
                            <i class="fa-solid fa-piggy-bank fa-lg"></i>
                        </div>
                        <button class="btn btn-sm btn-light text-danger btn-delete" data-id="${s.id}" data-key="savings">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    <h5 class="fw-bold mb-3">${s.name}</h5>
                    <div class="d-flex justify-content-between mb-1 small">
                        <span>${formatCurrency(s.balance)} / ${formatCurrency(s.goal)}</span>
                        <span>${Math.round((s.balance / s.goal) * 100)}%</span>
                    </div>
                    <div class="progress mb-0" style="height: 10px;">
                        <div class="progress-bar bg-info" style="width: ${(s.balance / s.goal) * 100}%"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

export const renderBills = (bills) => {
    const container = document.getElementById('bills-list');
    if (container) {
        container.innerHTML = bills.map(b => `
            <div class="card p-3 border-0 border-start border-${b.status === 'overdue' ? 'danger' : 'success'} border-4 flex-row justify-content-between align-items-center shadow-sm">
                <div>
                    <h6 class="fw-bold mb-1">${b.name}</h6>
                    <small class="text-secondary">تاريخ الاستحقاق: ${b.due}</small>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <span class="${b.status === 'overdue' ? 'text-danger' : 'text-main'} fw-bold">${formatCurrency(b.amount)}</span>
                    <span class="badge bg-${b.status === 'overdue' ? 'danger' : 'success'}-subtle text-${b.status === 'overdue' ? 'danger' : 'success'} p-2 px-3">
                        ${b.status === 'overdue' ? 'متأخرة' : 'مدفوعة'}
                    </span>
                    <div class="d-flex gap-2">
                        ${b.status === 'overdue' ? '<button class="btn btn-sm btn-primary">ادفع الآن</button>' : ''}
                        <button class="btn btn-sm btn-light text-danger btn-delete" data-id="${b.id}" data-key="bills">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
};
