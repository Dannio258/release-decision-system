import type { Ticket } from "../../data/tickets";
import DeleteBin from "./DeleteBin";

type TicketProps = {
  ticket: Ticket;
  onClick: () => void;
  onDelete: () => void;
};

function TicketCard({ ticket, onClick, onDelete }: TicketProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-left transition hover:not-has-[button:hover]:border-slate-600 hover:not-has-[button:hover]:bg-slate-700"
    >
      <div>
        <h2 className="font-semibold text-slate-100">Title: {ticket.title}</h2>
        <p className="mt-1 text-sm text-slate-400">ID: {ticket.id}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="ml-auto cursor-pointer rounded-xl bg-red-600 px-3 text-xs opacity-70 hover:bg-red-700"
      >
        <DeleteBin />
      </button>
    </div>
  );
}
export default TicketCard;
