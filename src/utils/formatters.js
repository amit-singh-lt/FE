
export function formatDuration(durationStr) {
    if (!durationStr) return "-";
    const hourMatch = durationStr.match(/(\d+)\s*hour/);
    const minMatch = durationStr.match(/(\d+)\s*min/);
    const secMatch = durationStr.match(/(\d+)\s*sec/);

    const h = hourMatch ? `${hourMatch[1]}h` : "";
    const m = minMatch ? `${minMatch[1]}m` : "";
    const s = secMatch ? `${secMatch[1]}s` : "";

    return [h, m, s].filter(Boolean).join(" ") || "-";
}

export function parseDurationToMinutes(durationStr) {
    if (!durationStr) return 0;
    const hourMatch = durationStr.match(/(\d+)\s*hour/);
    const minMatch = durationStr.match(/(\d+)\s*min/);
    const secMatch = durationStr.match(/(\d+)\s*sec/);

    const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
    const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
    const seconds = secMatch ? parseInt(secMatch[1], 10) : 0;

    return hours * 60 + minutes + seconds / 60;
}

export function formatDateTime(timestamp) {
    return new Date(timestamp).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function formatPercentage(value) {
    return `${value.toFixed(2)}%`;
}

export function formatBuildName(buildId) {
    return buildId.startsWith('#') ? buildId : `#${buildId}`;
}