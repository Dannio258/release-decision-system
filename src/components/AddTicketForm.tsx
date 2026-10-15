import type { Ticket, TicketStatus, Severity } from "../../data/tickets";
import Button from "./Button";
type AddTicketFormProps = {
  onClose: () => void;
  onAddTicket: (ticket: Ticket) => void;
  newId: number;
};

function AddTicketForm({ onClose, onAddTicket, newId }: AddTicketFormProps) {
  const inputRadioStyle =
    "cursor-pointer rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-center text-sm font-medium text-slate-300 transition hover:border-blue-500/50 has-checked:border-blue-500 has-checked:bg-blue-500/10 has-checked:text-blue-400";

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const title = data.title.toString();
    const status = data.status.toString() as TicketStatus;
    const severity = Number(data.severity) as Severity;
    const remainingHours = Number(data.remainingHours);
    const customerVip = data.customerVip === "true";
    const blocked = data.blocked === "true";
    const owner = data.owner.toString() || null;
    //const newId = Math.max(0, ...tickets.map((ticket) => ticket.id)) + 1;

    const newTicket: Ticket = {
      id: newId,
      title: title,
      severity: severity,
      status: status,
      owner: owner,
      remainingHours: remainingHours,
      customerVip: customerVip,
      blocked: blocked,
    };
    onAddTicket(newTicket);
  };

  return (
    <div className="fixed inset-0 z-98 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="relative z-99 flex max-h-[90dvh] w-full max-w-lg flex-col gap-3 overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer rounded-lg p-2 text-2xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
          aria-label="Close form"
        >
          ✕
        </button>
        <h2 className="mb-3 border-b border-slate-700 pb-4 text-2xl font-bold tracking-tight text-white">
          Add New Ticket
        </h2>

        <label className="text-sm font-medium text-slate-300">Title</label>
        <input
          required
          name="title"
          type="text"
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 transition outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <label className="mt-2 text-sm font-medium text-slate-300">
          Severity
        </label>
        <div className="flex justify-around gap-2 rounded-xl border border-slate-700 bg-slate-950 p-3">
          <div className="flex items-center gap-2">
            <label className={inputRadioStyle}>
              <input
                required
                type="radio"
                name="severity"
                value={1}
                className="sr-only"
              />
              1
            </label>
          </div>
          <div className="flex items-center gap-2">
            <label className={inputRadioStyle}>
              <input
                type="radio"
                name="severity"
                value={2}
                className="sr-only"
              />
              2
            </label>
          </div>
          <div className="flex items-center gap-2">
            <label className={inputRadioStyle}>
              <input
                type="radio"
                name="severity"
                value={3}
                className="sr-only"
              />
              3
            </label>
          </div>
          <div className="flex items-center gap-2">
            <label className={inputRadioStyle}>
              <input
                type="radio"
                name="severity"
                value={4}
                className="sr-only"
              />
              4
            </label>
          </div>
          <div className="flex items-center gap-2">
            <label className={inputRadioStyle}>
              <input
                type="radio"
                name="severity"
                value={5}
                className="sr-only"
              />
              5
            </label>
          </div>
        </div>

        <label className="mt-2 text-sm font-medium text-slate-300">
          Status
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["open", "testing", "done"] as const).map((status) => (
            <label key={status} className={inputRadioStyle}>
              <input
                required
                type="radio"
                name="status"
                value={status}
                className="sr-only"
              />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          ))}
        </div>

        <label className="mt-2 text-sm font-medium text-slate-300">Owner</label>
        <input
          name="owner"
          type="text"
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 transition outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          placeholder="May be empty"
        />

        <label className="mt-2 text-sm font-medium text-slate-300">
          Remaining Hours
        </label>
        <input
          required
          name="remainingHours"
          type="number"
          min={1} 
          onWheel={(e) => e.currentTarget.blur()}
          className="[appearance:textfield] rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 transition outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <div className="mt-3 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
            <span className="mb-3 block text-center text-sm font-medium text-slate-300">
              VIP Customer
            </span>
            <div className="flex justify-around">
              <label className={inputRadioStyle}>
                <input
                  required
                  type="radio"
                  name="customerVip"
                  value="true"
                  className="sr-only"
                />
                Yes
              </label>
              <label className={inputRadioStyle}>
                <input
                  required
                  type="radio"
                  name="customerVip"
                  value="false"
                  className="sr-only"
                />
                No
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
            <span className="mb-3 block text-center text-sm font-medium text-slate-300">
              Blocked
            </span>
            <div className="flex justify-around">
              <label className={inputRadioStyle}>
                <input
                  type="radio"
                  name="blocked"
                  value="true"
                  className="sr-only"
                />
                Yes
              </label>
              <label className={inputRadioStyle}>
                <input
                  type="radio"
                  name="blocked"
                  value="false"
                  className="sr-only"
                />
                No
              </label>
            </div>
          </div>
        </div>
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}

export default AddTicketForm;
