import { useQuery } from "@tanstack/react-query";

import {
    fetchBuildReport,
    fetchBuildTests,
    fetchBuilds,
    fetchEnvs,
    fetchSuites,
    fetchTeams
} from "./Api";


// Custom hooks for fetching data using react-query
// These hooks will automatically handle caching, background updates, and stale data
export function useTeams() {
    return useQuery({
        queryKey: ["teams"],
        queryFn: fetchTeams,
    });
}

export function useEnvs(team, enabled = true) {
    return useQuery({
        queryKey: ["envs", team],
        queryFn: () => fetchEnvs(team),
        enabled: !!team && enabled,
    });
}

export function useSuites(team, env, enabled = true) {
    return useQuery({
        queryKey: ["suites", team, env],
        queryFn: () => fetchSuites(team, env),
        enabled: !!team && !!env && enabled,
    });
}

export function useBuildsList(team, env, suite, enabled = true) {
    return useQuery({
        queryKey: ["buildsList", team, env, suite],
        queryFn: () => fetchBuilds(team, env, suite),
        enabled: !!team && !!env && !!suite && enabled,
    });
}

export function useBuildReport(team, env, suite, build, enabled = true) {
    return useQuery({
        queryKey: ["buildReport", team, env, suite, build],
        queryFn: () => fetchBuildReport(team, env, suite, build),
        enabled: !!team && !!env && !!suite && !!build && enabled,
    });
}

export function useBuildTests(team, env, suite, build, enabled = true) {
    return useQuery({
        queryKey: ["buildTests", team, env, suite, build],
        queryFn: () => fetchBuildTests(team, env, suite, build),
        enabled: !!team && !!env && !!suite && !!build && enabled,
    });
}

export function prefetchBuildTests(queryClient, team, env, suite, build) {
    return queryClient.prefetchQuery(
        ["buildTests", team, env, suite, build],
        () => fetchBuildTests(team, env, suite, build)
    );
}