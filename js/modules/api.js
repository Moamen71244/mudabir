/**
 * API Module
 * Simulates data fetching, prioritizing LocalStorage.
 */

import { getItems, saveItems } from './storage.js';

export const mockData = {
    dashboard: {
        balance: '45,280',
        income: '12,400',
        expense: '8,150',
        recentActivities: [
            { icon: 'fa-arrow-up', title: 'تم استلام الراتب', date: 'منذ ساعتين', amount: '+7,500' },
            { icon: 'fa-shopping-cart', title: 'شراء مشتريات بقالة', date: 'أمس الساعة 6 مساءً', amount: '-450' }
        ]
    },
    transactions: [
        { id: 1, name: 'سوبر ماركت', category: 'طعام', date: '2026-02-10', status: 'completed', amount: -150 },
        { id: 2, name: 'تحويل بنكي', category: 'دخل', date: '2026-02-12', status: 'completed', amount: 3500 },
        { id: 3, name: 'فاتورة الكهرباء', category: 'فواتير', date: '2026-02-11', status: 'pending', amount: -650 }
    ],
    budgets: [
        { id: 1, title: 'طعام ومشتريات', total: 2000, used: 1200 },
        { id: 2, title: 'ترفيه', total: 1000, used: 800 }
    ],
    savings: [
        { id: 1, name: 'دفعة السيارة', goal: 50000, balance: 12500 },
        { id: 2, name: 'إجازة الصيف', goal: 10000, balance: 4200 }
    ],
    bills: [
        { id: 1, name: 'إيجار المنزل', amount: 4500, due: '2026-03-01', status: 'paid' },
        { id: 2, name: 'اشتراك النادي', amount: 300, due: '2026-02-15', status: 'overdue' }
    ]
};

export const fetchData = (key) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const localData = getItems(key);
            // If local storage has data for this key, return it. 
            // Otherwise, seed it with mockData if available.
            if (localData && localData.length > 0) {
                resolve(localData);
            } else if (mockData[key]) {
                if (key !== 'dashboard') saveItems(key, mockData[key]);
                resolve(mockData[key]);
            } else {
                resolve([]);
            }
        }, 500);
    });
};
