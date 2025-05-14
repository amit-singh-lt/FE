export function calculateModuleStats(tests) {
    const moduleMap = new Map();

    tests.forEach(test => {
        if (!test.module || !Array.isArray(test.module)) return;

        test.module.forEach(moduleName => {
            if (!moduleMap.has(moduleName)) {
                moduleMap.set(moduleName, {
                    name: moduleName,
                    total: 0,
                    passed: 0,
                    failed: 0,
                    skipped: 0,
                    passRate: 0
                });
            }
            const stats = moduleMap.get(moduleName);
            stats.total++;
            if (test.result?.status === 'passed') stats.passed++;
            else if (test.result?.status === 'failed') stats.failed++;
            else stats.skipped++;
        });
    });

    return Array.from(moduleMap.values()).map(stats => ({
        ...stats,
        passRate: stats.total > 0 ? (stats.passed / stats.total) * 100 : 0
    }));
}

export function calculatePassRate(passed, total) {
    return total > 0 ? (passed / total) * 100 : 0;
}

export function calculateCriticalFailures(tests) {
    return tests.filter(t =>
        t.result?.status === 'failed' &&
        (t.priority?.toLowerCase() === 'p0' || t.priority?.toLowerCase() === 'p1')
    ).length;
}

export function calculateTotalDuration(tests) {
    return tests.reduce((acc, curr) => {
        if (!curr.duration) return acc;
        const [hours, minutes, seconds] = curr.duration.split(':').map(Number);
        return acc + (hours * 3600 + minutes * 60 + seconds);
    }, 0);
}

export function calculateFlakinessRate(history) {
    if (!history || history.length < 2) return 0;

    let changes = 0;
    for (let i = 1; i < history.length; i++) {
        if (history[i].status !== history[i - 1].status) {
            changes++;
        }
    }
    return (changes / history.length) * 100;
}