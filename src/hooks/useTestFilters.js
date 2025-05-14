import { useCallback, useMemo, useState } from 'react';

export function useTestFilters(tests = []) {
    const [filters, setFilters] = useState({
        status: 'all',
        search: '',
        module: 'all',
        priority: 'all',
        duration: '',
        flakiness: ''
    });

    const setFilter = useCallback((key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    // Parse duration to seconds for comparison
    const parseDuration = useCallback((duration) => {
        if (!duration) return 0;
        // Try to parse "hh:mm:ss"
        const parts = duration.split(':');
        if (parts.length === 3) {
            const [hours = '0', minutes = '0', seconds = '0'] = parts;
            return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
        }
        // Fallback: try to parse "1 minutes, 4 seconds"
        const minMatch = duration.match(/(\d+)\s*min(?:ute)?s?/);
        const secMatch = duration.match(/(\d+)\s*sec(?:ond)?s?/);
        const mins = minMatch ? parseInt(minMatch[1]) : 0;
        const secs = secMatch ? parseInt(secMatch[1]) : 0;
        return mins * 60 + secs;
    }, []);

    // Helper function to check if coverage matches filter
    const checkCoverageMatch = useCallback((coverage, filterValue) => {
        if (filterValue === 'all') return true;

        // Handle array format (legacy)
        if (Array.isArray(coverage)) {
            return coverage.includes(filterValue);
        }

        // Handle object format (new API)
        if (typeof coverage === 'object' && coverage !== null) {
            const execution = coverage.execution || [];
            const operations = coverage.operations || [];
            return execution.includes(filterValue) || operations.includes(filterValue);
        }

        // Handle string format (fallback)
        if (typeof coverage === 'string') {
            return coverage === filterValue;
        }

        return false;
    }, []);

    const filteredTests = useMemo(() => {
        return tests.filter(test => {
            if (!test) return false;

            const statusMatch = filters.status === 'all' || test.status === filters.status;

            const searchMatch = !filters.search ||
                (test.test_name && test.test_name.toLowerCase().includes(filters.search.toLowerCase()));

            // Use the new coverage check function
            const moduleMatch = checkCoverageMatch(test.module || test.coverage, filters.module);

            const priorityMatch = filters.priority === 'all' ||
                (test.priority && test.priority.toLowerCase() === filters.priority.toLowerCase());

            const durationMatch = !filters.duration ||
                (test.duration && parseDuration(test.duration) >= parseDuration(filters.duration));

            let flakinessMatch = true;
            if (filters.flakiness) {
                const threshold = parseFloat(filters.flakiness);
                if (!isNaN(threshold) && test.status_history && test.status_history.length > 1) {
                    let changes = 0;
                    for (let i = 1; i < test.status_history.length; i++) {
                        if (test.status_history[i].status !== test.status_history[i - 1].status) changes++;
                    }
                    const flakinessRate = (changes / test.status_history.length) * 100;
                    flakinessMatch = flakinessRate >= threshold;
                }
            }

            return statusMatch && searchMatch && moduleMatch &&
                priorityMatch && durationMatch && flakinessMatch;
        });
    }, [tests, filters, parseDuration, checkCoverageMatch]);

    // Extract all available coverage options from tests
    const availableCoverage = useMemo(() => {
        const coverageSet = new Set();

        tests.forEach(test => {
            const coverage = test.module || test.coverage;

            // Handle array format
            if (Array.isArray(coverage)) {
                coverage.forEach(item => coverageSet.add(item));
            }
            // Handle object format
            else if (typeof coverage === 'object' && coverage !== null) {
                const execution = coverage.execution || [];
                const operations = coverage.operations || [];
                execution.forEach(item => coverageSet.add(item));
                operations.forEach(item => coverageSet.add(item));
            }
            // Handle string format
            else if (typeof coverage === 'string') {
                coverageSet.add(coverage);
            }
        });

        return Array.from(coverageSet).sort();
    }, [tests]);

    return {
        filters,
        setFilter,
        filteredTests,
        availableCoverage
    };
}