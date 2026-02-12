/**
 * Validation Module
 * Handles form validation and error reporting.
 */

export const validateInput = (value, rules) => {
    let errors = [];
    if (rules.required && (!value || value.trim() === '')) {
        errors.push('هذا الحقل مطلوب');
    }
    if (rules.isNumber && isNaN(value)) {
        errors.push('يجب إدخال رقم');
    }
    return errors;
};

export const clearErrors = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;
    form.querySelectorAll('.error-message').forEach(el => el.remove());
};
