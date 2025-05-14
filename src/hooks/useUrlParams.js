import { useState, useEffect, useCallback } from 'react';

export function useUrlParams({
    key,
    defaultValue,
    serialize = String,
    deserialize = (v) => v
}) {
    const [value, setValue] = useState(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramValue = urlParams.get(key);
        return paramValue ? deserialize(paramValue) : defaultValue;
    });

    useEffect(() => {
        const handlePopState = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const paramValue = urlParams.get(key);
            setValue(paramValue ? deserialize(paramValue) : defaultValue);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [key, defaultValue, deserialize]);

    const updateValue = useCallback((newValue) => {
        setValue(newValue);
        const urlParams = new URLSearchParams(window.location.search);
        const serializedValue = serialize(newValue);

        if (serializedValue && serializedValue.toLowerCase() !== 'all') {
            urlParams.set(key, serializedValue);
        } else {
            urlParams.delete(key);
        }

        const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
        window.history.pushState({}, '', newUrl);
    }, [key, serialize]);

    return [value, updateValue];
}

export function useMultiUrlParams(params) {
    const entries = Object.entries(params);
    const hooks = entries.map(([_, options]) => useUrlParams(options));

    return Object.fromEntries(
        entries.map(([key], index) => [key, hooks[index]])
    );
}