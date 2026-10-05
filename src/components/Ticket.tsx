import type { Ticket } from "../../data/tickets";

type TicketProps = {
  ticket: Ticket;
};

function TicketCard({ ticket }: TicketProps) {
  return (
    <div className="cursor-pointer rounded-xl bg-blue-950 px-4 py-3 text-xl">
      <h2 className="font-bold">Title: {ticket.title}</h2>
      <p>ID: {ticket.id}</p>
    </div>
  );
}
export default TicketCard;
