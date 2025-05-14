export const STATUS = {
    PASSED: 'passed',
    FAILED: 'failed',
    SKIPPED: 'skipped'
};

export const PRIORITY = {
    P0: 'p0',
    P1: 'p1',
    P2: 'p2',
    P3: 'p3'
};

export const HEALTH_THRESHOLDS = {
    HEALTHY: 98,
    WARNING: 90
};

export const FLAKINESS_THRESHOLDS = {
    HIGH: 50,
    MEDIUM: 25,
    LOW: 20
};

export const COLORS = {
    STATUS: {
        PASSED: {
            bg: 'bg-green-100',
            text: 'text-green-800',
            accent: 'text-green-500'
        },
        FAILED: {
            bg: 'bg-red-100',
            text: 'text-red-800',
            accent: 'text-red-500'
        },
        SKIPPED: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            accent: 'text-yellow-500'
        }
    },
    PRIORITY: {
        P0: {
            bg: 'bg-red-100',
            text: 'text-red-800'
        },
        P1: {
            bg: 'bg-orange-100',
            text: 'text-orange-800'
        },
        P2: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800'
        },
        P3: {
            bg: 'bg-green-100',
            text: 'text-green-800'
        }
    },
    HEALTH: {
        HEALTHY: {
            bg: 'bg-green-100',
            text: 'text-green-800'
        },
        WARNING: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800'
        },
        CRITICAL: {
            bg: 'bg-red-100',
            text: 'text-red-800'
        }
    }
};

export const DEFAULT_CHART_OPTIONS = {
    TREND: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    font: {
                        size: 11,
                    },
                    color: '#6b7280',
                },
            },
            y: {
                position: 'left',
                grid: {
                    color: 'rgba(229, 231, 235, 0.5)',
                },
                ticks: {
                    font: {
                        size: 11,
                    },
                    color: '#6b7280',
                },
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        size: 11,
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#111827',
                titleFont: {
                    size: 13,
                    weight: '600',
                },
                bodyColor: '#374151',
                bodyFont: {
                    size: 12,
                },
                borderColor: 'rgba(229, 231, 235, 0.8)',
                borderWidth: 1,
                padding: 10,
                boxPadding: 4,
            },
        },
    }
};


// Base URL for the API
export const API_BASE_URL = "https://qa-report.lambdatestinternal.com";