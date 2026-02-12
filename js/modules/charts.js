/**
 * Premium Charts Module
 * Configured for a high-end financial dashboard aesthetic.
 */

export const initDashboardCharts = (canvasId, type, data) => {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';

    // Create Premium Gradients
    const canvasCtx = ctx.getContext('2d');
    let gradient = null;

    if (type === 'line') {
        gradient = canvasCtx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(79, 70, 229, 0.2)');
        gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');
    }

    const config = {
        type: type,
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: {
                    display: type === 'doughnut',
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        font: { family: 'IBM Plex Sans Arabic', size: 12 },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    titleColor: isDark ? '#f1f5f9' : '#1e293b',
                    bodyColor: isDark ? '#94a3b8' : '#64748b',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 8,
                    usePointStyle: true,
                    titleFont: { family: 'IBM Plex Sans Arabic', weight: '600' },
                    bodyFont: { family: 'IBM Plex Sans Arabic' }
                }
            },
            scales: type === 'line' ? {
                y: {
                    grid: { color: gridColor, drawBorder: false },
                    ticks: { color: textColor, font: { family: 'IBM Plex Sans Arabic' } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: textColor, font: { family: 'IBM Plex Sans Arabic' } }
                }
            } : {}
        }
    };

    // Apply Area Styling for Lines
    if (type === 'line' && config.data.datasets[0]) {
        config.data.datasets[0].fill = true;
        config.data.datasets[0].backgroundColor = gradient;
        config.data.datasets[0].borderWidth = 3;
        config.data.datasets[0].pointBackgroundColor = '#ffffff';
        config.data.datasets[0].pointBorderColor = '#4f46e5';
        config.data.datasets[0].pointBorderWidth = 2;
        config.data.datasets[0].pointHoverRadius = 6;
    }

    return new Chart(ctx, config);
};
