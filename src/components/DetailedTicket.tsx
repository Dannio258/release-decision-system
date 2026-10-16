import { useState } from "react";
import type { Ticket } from "../../data/tickets";

type TicketProps = {
  ticket: Ticket;
  onDelete: () => void;
  onEdit: () => void;
};

function DetailedTicketCard({ ticket, onDelete, onEdit }: TicketProps) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left shadow-lg lg:p-8">
      <p className="rounded-xl bg-slate-800 p-4 font-medium text-slate-300">
        ID:{" "}
        <input
          className={`${isEditing ? "rounded border border-blue-500 bg-slate-700" : "border-none bg-transparent outline-none"} p-2 `}
          type="text"
          value={ticket.id}
          readOnly={!isEditing}
        />
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

      {isEditing ? (
        <>
          <button
            onClick={() => {
              setIsEditing(false);
            }}
            className="cursor-pointer rounded-xl bg-red-600 p-4 opacity-70 hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setIsEditing(true);
            }}
            className="cursor-pointer rounded-xl bg-green-600 p-4 opacity-70 hover:bg-green-700"
          >
            Save edit
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onDelete}
            className="cursor-pointer rounded-xl bg-red-600 p-4 opacity-70 hover:bg-red-700"
          >
            Delete Ticket
          </button>
          <button
            onClick={() => {
              setIsEditing(true);
            }}
            className="cursor-pointer rounded-xl bg-yellow-600 p-4 opacity-70 hover:bg-amber-500"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}

export default DetailedTicketCard;
