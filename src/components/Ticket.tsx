import type { Ticket } from "../../data/tickets";

type TicketProps = {
  ticket: Ticket;
  onClick: () => void;
};

function TicketCard({ ticket, onClick }: TicketProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-left transition hover:border-slate-600 hover:bg-slate-700"
    >
      <h2 className="font-semibold text-slate-100">Title: {ticket.title}</h2>
      <p className="mt-1 text-sm text-slate-400">ID: {ticket.id}</p>
    </div>
  );
}
export default TicketCard;
