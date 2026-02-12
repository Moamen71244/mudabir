export const showLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.remove('fade-out');
};

export const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
};
