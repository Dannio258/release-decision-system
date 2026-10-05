import tickets from "../../data/tickets";
import SearchBar from "../components/SearchBar";
import TicketCard from "../components/Ticket";
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const filteredTickets =
    inputValue.trim() === ""
      ? tickets
      : tickets.filter((ticket) => ticket.id === Number(inputValue));

  return (
    <div className="grid h-dvh w-full place-content-center gap-2 bg-gray-950 text-gray-100">
      <SearchBar
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex max-w-80 flex-col gap-2">
        <div className="flex h-70 scrollbar-none flex-col gap-2 overflow-y-auto rounded-xl bg-gray-700 px-4 py-3">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))
          ) : (
            <div className="rounded-xl bg-blue-950 px-4 py-3 text-xl">
              <p>Nothing was found</p>
            </div>
          )}
        </div>
        <p className=" mx-auto w-fit rounded-xl px-3 py-2 outline-1">
          Total: {filteredTickets.length}
        </p>
      </div>
    </div>
  );
}

export default App;
