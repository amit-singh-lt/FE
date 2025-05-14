import { useMemo } from 'react';
import { FLAKINESS_THRESHOLDS } from '../utils/constants';
import { calculateFlakinessRate } from '../utils/calculations';

export function useTestAnalysis(tests = []) {
    const analysis = useMemo(() => {
        const flakyTests = tests.filter(test => {
            if (!test.status_history || test.status_history.length < 2) return false;
            const flakinessRate = calculateFlakinessRate(test.status_history);
            return flakinessRate > FLAKINESS_THRESHOLDS.LOW;
        });

        const criticalFailures = tests.filter(test =>
            test.status === 'failed' &&
            (test.priority?.toLowerCase() === 'p0' || test.priority?.toLowerCase() === 'p1')
        );

        const moduleHealth = new Map();

        tests.forEach(test => {
            const coverage = test.module || test.coverage;

            if (!coverage) return;

            // Handle different coverage formats
            let coverageItems = [];

            if (Array.isArray(coverage)) {
                coverageItems = coverage;
            } else if (typeof coverage === 'object' && coverage !== null) {
                const execution = coverage.execution || [];
                const operations = coverage.operations || [];
                coverageItems = [...execution, ...operations];
            } else if (typeof coverage === 'string') {
                coverageItems = [coverage];
            }

            // Process each coverage item
            coverageItems.forEach(moduleName => {
                if (!moduleHealth.has(moduleName)) {
                    moduleHealth.set(moduleName, {
                        total: 0,
                        passed: 0,
                        failed: 0,
                        skipped: 0,
                        flaky: 0
                    });
                }

                const stats = moduleHealth.get(moduleName);
                stats.total++;

                if (test.status === 'passed') stats.passed++;
                else if (test.status === 'failed') stats.failed++;
                else stats.skipped++;

                if (test.status_history && calculateFlakinessRate(test.status_history) > FLAKINESS_THRESHOLDS.LOW) {
                    stats.flaky++;
                }
            });
        });

        return {
            flakyTests,
            criticalFailures,
            moduleHealth: Array.from(moduleHealth.entries()).map(([name, stats]) => ({
                name,
                ...stats,
                passRate: (stats.passed / stats.total) * 100
            }))
        };
    }, [tests]);

    return analysis;
}