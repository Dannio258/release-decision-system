import type { Ticket } from "../../data/tickets";
import releaseDecision, {
  getTicketStatistics,
} from "../../logic/releaseAnalysis";

type AnalysisProps = {
  onClick: (decision: string) => void;
  tickets: Ticket[];
};
function ReleaseAnalysis({ onClick, tickets }: AnalysisProps) {
  const stats = getTicketStatistics(tickets);
  return (
    <div className="border-outline-subtle bg-panel rounded-2xl border p-6 text-left shadow-lg lg:p-8">
      <h1 className="mb-6 text-center text-2xl font-semibold tracking-tight">
        Release Analysis
      </h1>
      <p className="border-danger/50 bg-danger/15 text-danger-text mb-3 rounded-xl border px-4 py-3 font-medium">
        Blockers: {stats.releaseBlockers}
      </p>

      <p className="border-warning/20 bg-warning/10 text-warning-text mb-3 rounded-xl border px-4 py-3 font-medium">
        Priority: {stats.priority}
      </p>

      <p className="border-unassigned/20 bg-unassigned/10 text-unassigned-text mb-3 rounded-xl border px-4 py-3 font-medium">
        Unassigned: {stats.unassigned}
      </p>
      <p className="border-outline bg-elevated text-secondary-strong mb-6 rounded-xl border px-4 py-3 font-medium">
        Active Hours: <span className="font-semibold">{stats.activeHours}</span>
      </p>
      {stats.total > 0 && (
        <div
          onClick={() => onClick(releaseDecision(tickets))}
          className={`border-accent/30 bg-accent/10 text-accent-text hover:border-accent-text hover:bg-accent/20 cursor-pointer rounded-xl border px-4 py-4 text-center text-lg font-semibold tracking-wide transition`}
        >
          {releaseDecision(tickets)}
        </div>
      )}
    </div>
  );
}
export default ReleaseAnalysis;
