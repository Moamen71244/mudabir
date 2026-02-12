/**
 * Alerts Module
 * Centralized utility for displaying professional SweetAlert2 notifications.
 */

export const showAlert = (options) => {
    if (typeof Swal === 'undefined') {
        console.warn('SweetAlert2 not found');
        return;
    }

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    return Swal.fire({
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#0f172a',
        confirmButtonColor: '#2b52f3',
        ...options
    });
};

export const showSuccess = (title, text = '') => {
    return showAlert({ icon: 'success', title, text });
};

export const showError = (title, text = '') => {
    return showAlert({ icon: 'error', title, text });
};

export const showConfirm = (title, text = '') => {
    return showAlert({
        icon: 'warning',
        title,
        text,
        showCancelButton: true,
        confirmButtonText: 'تأكيد',
        cancelButtonText: 'إلغاء'
    });
};
