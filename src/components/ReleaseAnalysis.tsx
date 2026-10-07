import releaseDecision, {
  getTicketStatistics,
} from "../../logic/releaseAnalysis";
import tickets from "../../data/tickets";

type AnalysisProps = {
  onClick: (decision: string) => void;
};

function ReleaseAnalysis({ onClick }: AnalysisProps) {
  const stats = getTicketStatistics(tickets);
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left shadow-lg lg:p-8">
      <h1 className="mb-6 text-center text-2xl font-semibold tracking-tight text-slate-100">
        Release Analysis
      </h1>

      <p className="mb-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 font-medium text-red-400">
        Blockers: {stats.releaseBlockers}
      </p>

      <p className="mb-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 font-medium text-amber-400">
        Priority: {stats.priority}
      </p>

      <p className="mb-3 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-3 font-medium text-violet-400">
        Unassigned: {stats.unassigned}
      </p>

      <p className="mb-6 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-medium text-slate-300">
        Active Hours:{" "}
        <span className="font-semibold text-slate-100">
          {stats.activeHours}
        </span>
      </p>

      <div
        onClick={() => onClick(releaseDecision(tickets))}
        className="cursor-pointer rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-4 text-center text-lg font-semibold tracking-wide text-blue-400 transition hover:border-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
      >
        {releaseDecision(tickets)}
      </div>
    </div>
  );
}
export default ReleaseAnalysis;
