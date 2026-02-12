/**
 * Loader Module
 * Controls the visibility of the global application loader.
 */

export const showLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.remove('fade-out');
        loader.style.display = 'flex';
    }
};

export const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // Wait for CSS transition
    }
};
