import { calculateFlakinessRate } from './calculations';

export function analyzeTestStability(test) {
    if (!test.history || test.history.length < 2) {
        return {
            isFlaky: false,
            flakinessRate: 0,
            pattern: null,
            severity: null
        };
    }

    const flakinessRate = calculateFlakinessRate(test.history);
    const isFlaky = flakinessRate > 20;
    const pattern = test.history[0].status === 'failed' ? 'fail-to-pass' : 'pass-to-fail';

    let severity = null;
    if (isFlaky) {
        if (flakinessRate > 50) severity = 'high';
        else if (flakinessRate > 25) severity = 'medium';
        else severity = 'low';
    }

    return {
        isFlaky,
        flakinessRate,
        pattern,
        severity
    };
}

export function getFailedStep(test) {
    if (!test.steps) return null;

    const failedStep = test.steps.find(step => step.result.status === 'failed');
    return failedStep ? failedStep.name : null;
}

export function getTestStatus(test) {
    const stability = analyzeTestStability(test);
    const failedStep = getFailedStep(test);

    return {
        status: test.result.status,
        message: test.result.message,
        failedStep,
        isFlaky: stability.isFlaky,
        flakinessRate: stability.flakinessRate,
        flakySeverity: stability.severity,
        flakyPattern: stability.pattern
    };
}

export function categorizeTests(tests) {
    return {
        passed: tests.filter(t => t.result.status === 'passed'),
        failed: tests.filter(t => t.result.status === 'failed'),
        skipped: tests.filter(t => t.result.status === 'skipped'),
        flaky: tests.filter(t => analyzeTestStability(t).isFlaky),
        critical: tests.filter(t =>
            t.result.status === 'failed' &&
            (t.priority?.toLowerCase() === 'p0' || t.priority?.toLowerCase() === 'p1')
        )
    };
}