import { debounce } from './utils.js';

export const renderData = (data) => {
    console.log('Rendering data...', data);
    // Simulation of dynamic rendering
};

export const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

export const initScrollPerformance = () => {
    window.addEventListener('scroll', debounce(() => {
        console.log('Scroll debounced');
    }, 100));
};
