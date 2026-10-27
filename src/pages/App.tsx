import initialTickets, { type Ticket } from "../../data/tickets";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import TicketCard from "../components/Ticket";
import { useState, useEffect, useCallback, useRef } from "react";
import DetailedTicketCard from "../components/DetailedTicket";
import ReleaseAnalysis from "../components/ReleaseAnalysis";
import AddTicketForm from "../components/AddTicketForm";
import DeleteConfirmation from "../components/DeleteConfirmation";
import ErrorNotification from "../components/ErrorNotification";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [addForm, setAddForm] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);
  const detailedTicketRef = useRef<HTMLDivElement>(null);
  const [initialData] = useState<{
    tickets: Ticket[];
    error: string | null;
  }>(() => {
    try {
      const saved = localStorage.getItem("tickets");
      return {
        tickets: saved ? JSON.parse(saved) : initialTickets,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        tickets: initialTickets,
        error: "Failed to load tickets!",
      };
    }
  });

  const [tickets, setTickets] = useState<Ticket[]>(initialData.tickets);

  const [errorMessage, setErrorMessage] = useState<string | null>(
    initialData.error,
  );
  const selectedTicket = tickets.find(
    (ticket) => ticket.id === selectedTicketId,
  );

  const filteredTickets =
    inputValue.trim() === ""
      ? tickets
      : tickets.filter((ticket) => ticket.id === Number(inputValue));

  const handleDeleteTicket = (id: number) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    setSelectedTicketId((current) => (current === id ? null : current));
  };
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    if (selectedTicketId !== null && window.innerWidth < 1024) {
      detailedTicketRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedTicketId]);

  useEffect(() => {
    if (!addForm && ticketToDelete === null) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [addForm, ticketToDelete]);

  const handleAddTicket = (newTicket: Ticket) => {
    setTickets((prevTickets) => [...prevTickets, newTicket]);
  };

  const handleEditTicket = (updatedTicket: Ticket) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket,
      ),
    );
  };
  const newId = Math.max(0, ...tickets.map((ticket) => ticket.id)) + 1;
  const handleCloseError = useCallback(() => {
    setErrorMessage(null);
  }, []);
  return (
    <div className="bg-canvas font-primary text-text-white grid min-h-dvh w-full gap-5 p-5 lg:grid-cols-[25rem_1fr] 2xl:grid-cols-[45rem_1fr]">
      {errorMessage && (
        <ErrorNotification message={errorMessage} onClose={handleCloseError} />
      )}
      {addForm && (
        <AddTicketForm
          newId={newId}
          onClose={() => setAddForm(false)}
          onAddTicket={(newTicket) => {
            handleAddTicket(newTicket);
            setAddForm(false);
          }}
        />
      )}
      <div className="border-outline-subtle bg-panel flex flex-col gap-3 rounded-2xl border p-4 shadow-lg lg:h-[calc(100dvh-2.5rem)]">
        <SearchBar
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={() => setAddForm(true)}>Add ticket</Button>
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_auto] items-center gap-3 lg:flex lg:flex-col lg:items-stretch">
          <h1 className="order-1 text-left text-xl font-semibold tracking-tight">
            Tickets
          </h1>
          <div className="order-3 col-span-2 flex min-h-0 flex-1 flex-col gap-2 rounded-xl lg:order-2 lg:overflow-y-auto">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TicketCard
                  onDelete={() => {
                    setTicketToDelete(ticket.id);
                  }}
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
              <div className="border-outline bg-elevated text-secondary order-2 justify-self-end rounded-lg border px-3 py-2 text-sm lg:order-3 lg:self-start">
                <p>Nothing was found</p>
              </div>
            )}
          </div>
          <p className="border-outline bg-elevated text-secondary order-1 ml-auto w-fit rounded-lg border px-3 py-2 text-sm sm:order-3 sm:m-0">
            Total: {filteredTickets.length}
          </p>
        </div>
      </div>
      <div
        ref={detailedTicketRef}
        className="border-outline-subtle bg-panel flex flex-col gap-6 rounded-2xl border p-4 shadow-lg lg:p-6"
      >
        <div>
          {selectedTicket ? (
            <DetailedTicketCard
              onDelete={() => {
                setTicketToDelete(selectedTicket.id);
              }}
              onEdit={(updatedTicket) => handleEditTicket(updatedTicket)}
              ticket={selectedTicket}
            />
          ) : (
            <p className="text-muted grid h-full min-h-64 text-center place-content-center">
              Select a ticket to see its details
            </p>
          )}
        </div>
        <ReleaseAnalysis
          tickets={tickets}
          onClick={(decision) => alert(decision)}
        />
      </div>
      {ticketToDelete !== null && (
        <DeleteConfirmation
          onConfirm={() => {
            handleDeleteTicket(ticketToDelete);
            setTicketToDelete(null);
          }}
          onCancel={() => setTicketToDelete(null)}
        />
      )}
    </div>
  );
}
export default App;
