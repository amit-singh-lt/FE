import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  prefetchBuildTests,
  useBuildReport,
  useBuildTests,
} from "../api/Query";
import { ReportMainContent } from "../components/ReportMainContent";
import { ReportNavBar } from "../components/ReportNavBar";

function isValidParam(val) {
  return val !== undefined && val !== "undefined" && val !== "";
}

function ReportPage() {
  const queryClient = useQueryClient();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { team, env, suite, build } = params;
  const enabled =
    isValidParam(team) &&
    isValidParam(env) &&
    isValidParam(suite) &&
    isValidParam(build);

  const { data, isLoading, error } = useBuildReport(
    team,
    env,
    suite,
    build,
    enabled
  );
  const { data: testData } = useBuildTests(team, env, suite, build, enabled);

  const isSummary = location.pathname.endsWith("/summary");
  const isDetailed = location.pathname.endsWith("/detailed");

  const prefetchDetailed = () => {
    if (enabled) {
      prefetchBuildTests(queryClient, team, env, suite, build);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ReportNavBar
        team={team}
        env={env}
        suite={suite}
        build={build}
        isSummary={isSummary}
        isDetailed={isDetailed}
        navigate={navigate}
        onDetailedHover={prefetchDetailed}
      />
      <ReportMainContent
        isSummary={isSummary}
        isDetailed={isDetailed}
        location={location}
        enabled={enabled}
        isLoading={isLoading}
        error={error}
        data={data}
        testData={testData}
      />
    </div>
  );
}

export default ReportPage;
