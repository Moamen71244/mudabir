/**
 * Modabbar - Orchestrator
 */

import { hideLoader } from './modules/loader.js';
import { initTheme, toggleTheme } from './modules/theme.js';
import { initSidebar, renderDashboard, renderTransactions, renderBudgets, renderSavings, renderBills } from './modules/ui.js';
import { fetchData } from './modules/api.js';
import { addItem, getItems, deleteItem } from './modules/storage.js';
import { showSuccess, showConfirm } from './modules/alerts.js';
import { initDashboardCharts } from './modules/charts.js';

document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    initSidebar();

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => {
        toggleTheme();
        window.location.reload();
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // UI Refresh Logic
    const refreshUI = async (key) => {
        const data = await fetchData(key);
        switch (key) {
            case 'transactions': renderTransactions(data); break;
            case 'budgets': renderBudgets(data); break;
            case 'savings': renderSavings(data); break;
            case 'bills': renderBills(data); break;
        }
    };

    // Form Submit Handlers
    const initFormHandlers = () => {
        const forms = [
            { id: 'add-transaction-form', storageKey: 'transactions', modalId: 'newTransactionModal' },
            { id: 'add-budget-form', storageKey: 'budgets', modalId: 'newBudgetModal' },
            { id: 'add-saving-form', storageKey: 'savings', modalId: 'newSavingModal' },
            { id: 'add-bill-form', storageKey: 'bills', modalId: 'newBillModal' }
        ];

        forms.forEach(formCfg => {
            const formEl = document.getElementById(formCfg.id);
            if (formEl) {
                formEl.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(formEl);
                    const item = Object.fromEntries(formData.entries());

                    // Specific numeric conversions
                    if (item.amount) item.amount = parseFloat(item.amount);
                    if (item.total) item.total = parseFloat(item.total);
                    if (item.goal) item.goal = parseFloat(item.goal);
                    if (item.used) item.used = parseFloat(item.used) || 0;
                    if (item.balance) item.balance = parseFloat(item.balance) || 0;

                    // Add default status if missing
                    if (formCfg.storageKey === 'transactions') item.status = 'completed';
                    if (formCfg.storageKey === 'bills') item.status = 'overdue';

                    // Save and Alert
                    addItem(formCfg.storageKey, item);
                    showSuccess('تمت الإضافة!', 'تم حفظ البيانات بنجاح في نظامك.');

                    // Close Modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById(formCfg.modalId));
                    if (modal) modal.hide();
                    formEl.reset();

                    // Dynamic Refresh
                    await refreshUI(formCfg.storageKey);
                });
            }
        });
    };

    // Delete Handler (Event Delegation)
    document.addEventListener('click', async (e) => {
        const deleteBtn = e.target.closest('.btn-delete');
        if (deleteBtn) {
            const id = parseInt(deleteBtn.dataset.id);
            const key = deleteBtn.dataset.key;

            const result = await showConfirm('هل أنت متأكد؟', 'ستقوم بحذف هذا العنصر نهائياً.');
            if (result.isConfirmed) {
                deleteItem(key, id);
                await refreshUI(key);
                showSuccess('تم الحذف!', 'تمت إزالة العنصر بنجاح.');
            }
        }
    });

    try {
        initFormHandlers();

        // Route Specific Logic
        switch (currentPage) {
            case 'index.html':
            case '':
                const dashData = await fetchData('dashboard');
                renderDashboard(dashData);

                initDashboardCharts('mainChart', 'line', {
                    labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                    datasets: [{
                        label: 'المصاريف اليومية',
                        data: [2100, 1500, 3200, 1100, 2400, 4100, 3000],
                        borderColor: '#4f46e5',
                        tension: 0.4,
                    }]
                });

                initDashboardCharts('pieChart', 'doughnut', {
                    labels: ['طعام', 'ترفيه', 'فواتير', 'أخرى'],
                    datasets: [{
                        data: [45, 25, 20, 10],
                        backgroundColor: ['#4f46e5', '#f59e0b', '#10b981', '#f43f5e'],
                        borderWidth: 0,
                        hoverOffset: 10
                    }]
                });
                break;

            case 'transactions.html':
                await refreshUI('transactions');
                break;
            case 'budgets.html':
                await refreshUI('budgets');
                break;
            case 'savings.html':
                await refreshUI('savings');
                break;
            case 'bills.html':
                await refreshUI('bills');
                break;
        }
    } catch (err) {
        console.error('App init error:', err);
    } finally {
        setTimeout(hideLoader, 800);
    }
});
