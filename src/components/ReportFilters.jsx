import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useBuildsList, useEnvs, useSuites, useTeams } from "../api/Query";

export function ReportFilters() {
  const navigate = useNavigate();
  const params = useParams();

  const [team, setTeam] = useState(params.team || "");
  const [env, setEnv] = useState(params.env || "");
  const [suite, setSuite] = useState(params.suite || "");
  const [build, setBuild] = useState(params.build || "");

  const { data: teams = [] } = useTeams();
  const { data: envs = [] } = useEnvs(team, !!team);
  const { data: suites = [] } = useSuites(team, env, !!team && !!env);
  const { data: builds = [] } = useBuildsList(
    team,
    env,
    suite,
    !!team && !!env && !!suite
  );

  useEffect(() => {
    setTeam(params.team || "");
    setEnv(params.env || "");
    setSuite(params.suite || "");
    setBuild(params.build || "");
  }, [params.team, params.env, params.suite, params.build]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (team && env && suite && build) {
      navigate(`/${team}/${env}/${suite}/${build}/summary`);
    }
  };

  const showDefaultScreen = !team || !env || !suite || !build;

  return (
    <div>
      <form
        className="bg-white rounded-lg shadow p-4 mb-6 flex flex-row gap-6 items-end mx-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col flex-1 min-w-[180px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team
          </label>
          <select
            className="border border-zinc-300 rounded px-2 py-2 text-sm w-full"
            value={team}
            onChange={(e) => {
              setTeam(e.target.value);
              setEnv("");
              setSuite("");
              setBuild("");
            }}
          >
            <option value="">Select Team</option>
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col flex-1 min-w-[180px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Environment
          </label>
          <select
            className={`border border-zinc-300 rounded px-2 py-2 text-sm w-full ${
              !team ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
            }`}
            value={env}
            onChange={(e) => {
              setEnv(e.target.value);
              setSuite("");
              setBuild("");
            }}
            disabled={!team}
          >
            <option value="">Select Environment</option>
            {envs.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col flex-1 min-w-[180px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Suite
          </label>
          <select
            className={`border border-zinc-300 rounded px-2 py-2 text-sm w-full ${
              !team || !env
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : ""
            }`}
            value={suite}
            onChange={(e) => {
              setSuite(e.target.value);
              setBuild("");
            }}
            disabled={!team || !env}
          >
            <option value="">Select Suite</option>
            {suites.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col flex-1 min-w-[180px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Build
          </label>
          <select
            className={`border border-zinc-300 rounded px-2 py-2 text-sm w-full ${
              !team || !env || !suite
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : ""
            }`}
            value={build}
            onChange={(e) => setBuild(e.target.value)}
            disabled={!team || !env || !suite}
          >
            <option value="">Select Build</option>
            {(Array.isArray(builds.builds) ? builds.builds : []).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col flex-1 min-w-[120px]">
          <div className="flex flex-row gap-2">
            <button
              type="submit"
              className={`px-6 py-2 rounded-md text-sm font-medium mt-5 w-full
              ${
                !team || !env || !suite || !build
                  ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-green-600 transition-colors"
              }`}
              disabled={!team || !env || !suite || !build}
            >
              Submit
            </button>
            <button
              type="button"
              className={`px-6 py-2 rounded-md text-sm font-medium mt-5 w-full bg-white text-red-600 border border-red-600 transition-colors
                ${
                  !team && !env && !suite && !build
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-600 hover:text-white"
                }
              `}
              disabled={!team && !env && !suite && !build}
              onClick={() => {
                setTeam("");
                setEnv("");
                setSuite("");
                setBuild("");
                navigate("/");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      {showDefaultScreen && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow mx-6 min-h-[78vh]">
          <div className="relative mb-12 rounded overflow-hidden border-none">
            <img
              src="/images/filters3.svg"
              alt="Select filters illustration"
              className="w-full h-full max-w-3xl object-contain"
              style={{ maxWidth: "500px" }}
            />
          </div>

          <div className="text-lg font-semibold text-gray-700 mb-2 mt-6">
            Select all filters to continue
          </div>
          <div className="text-gray-500 text-sm mb-6">
            Please choose Team, Environment, Suite, and Build to view the
            report.
          </div>
        </div>
      )}
    </div>
  );
}
