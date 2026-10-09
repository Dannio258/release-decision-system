import initialTickets, { type Ticket } from "../../data/tickets";
import SearchBar from "../components/SearchBar";
import TicketCard from "../components/Ticket";
import { useState, useEffect } from "react";
import DetailedTicketCard from "../components/DetailedTicket";
import ReleaseAnalysis from "../components/ReleaseAnalysis";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem("tickets");
    return saved ? JSON.parse(saved) : initialTickets;
  });

  const selectedTicket = tickets.find(
    (ticket) => ticket.id === selectedTicketId,
  );

  const filteredTickets =
    inputValue.trim() === ""
      ? tickets
      : tickets.filter((ticket) => ticket.id === Number(inputValue));

  const deleteTicket = (id: number) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    setSelectedTicketId(null);
  };

  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  return (
    <div className="grid min-h-dvh w-full gap-5 bg-slate-950 p-5 text-slate-100 lg:grid-cols-2 xl:grid-cols-[550px_1fr]">
      <div className="flex min-h-0 flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg">
        <SearchBar
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <div className="flex min-h-0 flex-1 flex-col gap-3">
          <h1 className="text-left text-xl font-semibold tracking-tight">
            Tickets
          </h1>

          <div className="flex flex-1 flex-col gap-2 overflow-y-auto rounded-xl">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => {
                    setSelectedTicketId((current) =>
                      current === ticket.id ? null : ticket.id,
                    );
                    setInputValue("");
                  }}
                />
              ))
            ) : (
              <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-center text-slate-400">
                <p>Nothing was found</p>
              </div>
            )}
          </div>

          <p className="w-fit rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-400">
            Total: {filteredTickets.length}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg lg:p-6">
        <div>
          {selectedTicket ? (
            <DetailedTicketCard
              onDelete={() => deleteTicket(selectedTicket.id)}
              onEdit={() => alert("clicked")}
              ticket={selectedTicket}
            />
          ) : (
            <p className="grid h-full min-h-64 place-items-center text-slate-500">
              Select a ticket to see its details
            </p>
          )}
        </div>
        <ReleaseAnalysis
          tickets={tickets}
          onClick={(decision) => alert(decision)}
        />
      </div>
    </div>
  );
}

export default App;
