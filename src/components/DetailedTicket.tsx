import type { Ticket } from "../../data/tickets";

type TicketProps = {
  ticket: Ticket;
};

function DetailedTicketCard({ ticket }: TicketProps) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left shadow-lg lg:p-8">
      <p className="rounded-xl bg-slate-800 p-4 font-medium text-slate-300">
        ID: <span className="font-semibold text-slate-100">{ticket.id}</span>
      </p>

      <p className="rounded-xl bg-slate-800 p-4 font-medium text-slate-300">
        Title:{" "}
        <span className="font-semibold text-slate-100">{ticket.title}</span>
      </p>

      <p className="rounded-xl bg-slate-800 p-4 font-medium text-slate-300">
        {ticket.owner ? (
          <>
            Owner:{" "}
            <span className="font-semibold text-slate-100">{ticket.owner}</span>
          </>
        ) : (
          <span className="font-semibold text-slate-500">No Owner</span>
        )}
      </p>

      <p
        className={`rounded-xl bg-slate-800 p-4 font-semibold ${
          ticket.blocked ? "text-red-400" : "text-emerald-400"
        }`}
      >
        {ticket.blocked ? `Blocked: True` : `Blocked: False`}
      </p>

      <p
        className={`rounded-xl bg-slate-800 p-4 font-semibold ${
          ticket.customerVip ? "text-amber-400" : "text-slate-300"
        }`}
      >
        {ticket.customerVip ? `VIP Customer` : `Standard Customer`}
      </p>

      <p className="rounded-xl bg-slate-800 p-4 font-medium text-slate-300">
        Remaining Hours:{" "}
        <span className="font-semibold text-slate-100">
          {ticket.remainingHours}
        </span>
      </p>

      <p className="rounded-xl bg-slate-800 p-4 font-semibold text-blue-400">
        Status: {ticket.status.toUpperCase()}
      </p>

      <p
        className={`rounded-xl bg-slate-800 p-4 font-semibold ${
          ticket.severity >= 5
            ? "text-red-400"
            : ticket.severity >= 3
              ? "text-amber-400"
              : "text-emerald-400"
        }`}
      >
        Severity: {ticket.severity}
      </p>
    </div>
  );
}

export default DetailedTicketCard;
