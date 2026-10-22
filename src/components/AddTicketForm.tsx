import type { Ticket, TicketStatus, Severity } from "../../data/tickets";
import Button from "./Button";
import {
  ownerRegex,
  titleRegex,
  hoursRegex,
} from "../../logic/ticketValidation.ts";
import { useState } from "react";

type AddTicketFormProps = {
  onClose: () => void;
  onAddTicket: (ticket: Ticket) => void;
  newId: number;
};
type EditableTicket = Omit<Ticket, "remainingHours"> & {
  remainingHours: string;
};

function AddTicketForm({ onClose, onAddTicket, newId }: AddTicketFormProps) {
  const [formErrors, setFormErrors] = useState({
    title: false,
    severity: false,
    status: false,
    owner: false,
    remainingHours: false,
    customerVip: false,
    blocked: false,
  });
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const inputRadioStyle =
    "cursor-pointer rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-center text-sm font-medium text-slate-300 transition hover:border-blue-500/50 has-checked:border-blue-500 has-checked:bg-blue-500/10 has-checked:text-blue-400 flex-1";

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const isAlowedSave = validateForm(formData);

    setSubmitAttempted(true);
    setFormErrors(isAlowedSave);

    if (Object.values(isAlowedSave).some(Boolean)) {
      return;
    }

    const data = Object.fromEntries(formData.entries());

    const title = capitalize(data.title.toString());
    const status = data.status.toString() as TicketStatus;
    const severity = Number(data.severity) as Severity;
    const remainingHours = data.remainingHours.toString();
    const customerVip = data.customerVip === "true";
    const blocked = data.blocked === "true";
    const owner = capitalize(data.owner.toString().trim()) || null;

    const newTicket: EditableTicket = {
      id: newId,
      title: title,
      severity: severity,
      status: status,
      owner: owner,
      remainingHours: remainingHours,
      customerVip: customerVip,
      blocked: blocked,
    };

    onAddTicket({ ...newTicket, remainingHours: Number(remainingHours) });
  };

  const validateForm = (formData: FormData) => {
    const isTitleInvalid = !titleRegex.test(
      String(formData.get("title") ?? ""),
    );
    const isSeverityInvalid = formData.get("severity") === null;
    const isStatusInvalid = formData.get("status") === null;

    const owner = String(formData.get("owner") ?? "").trim();
    const isOwnerInvalid = owner !== "" && !ownerRegex.test(owner);

    const isHoursInvalid = !hoursRegex.test(
      String(formData.get("remainingHours")),
    );
    const isCustomerVipInvalid = formData.get("customerVip") === null;
    const isBlockedInvalid = formData.get("blocked") === null;

    const errors = {
      title: isTitleInvalid,
      severity: isSeverityInvalid,
      status: isStatusInvalid,
      owner: isOwnerInvalid,
      remainingHours: isHoursInvalid,
      customerVip: isCustomerVipInvalid,
      blocked: isBlockedInvalid,
    };
    return errors;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const fieldName = e.target.name;
    setFormErrors(validateForm(formData));
    setTouchedFields((prev) => new Set(prev).add(fieldName));
  };

  return (
    <div className="fixed inset-0 z-98 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <form
        onChange={handleFormChange}
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

        <label htmlFor="title" className="text-sm font-medium text-slate-300">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className={`${(touchedFields.has("title") || submitAttempted) && formErrors.title ? "border-red-500" : `border-slate-700`} rounded-xl border bg-slate-950 px-4 py-3 text-slate-100 transition outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
        />

        <p className="mt-2 text-sm font-medium text-slate-300">Severity</p>
        <div
          className={`flex items-center gap-2 rounded-xl border ${
            submitAttempted && formErrors.severity
              ? "border-red-500"
              : "border-transparent"
          }`}
        >
          {([1, 2, 3, 4, 5] as const).map((severity) => (
            <label key={severity} className={`${inputRadioStyle} flex-1`}>
              <input
                type="radio"
                name="severity"
                value={severity}
                className="sr-only"
              />
              {severity}
            </label>
          ))}
        </div>

        <p className="mt-2 text-sm font-medium text-slate-300">Status</p>
        <div
          className={`grid grid-cols-3 gap-2 rounded-xl border ${
            submitAttempted && formErrors.status
              ? "border-red-500"
              : "border-transparent"
          }`}
        >
          {(["open", "testing", "done"] as const).map((status) => (
            <label key={status} className={inputRadioStyle}>
              <input
                type="radio"
                name="status"
                value={status}
                className="sr-only"
              />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          ))}
        </div>

        <label
          htmlFor="owner"
          className="mt-2 text-sm font-medium text-slate-300"
        >
          Owner
        </label>
        <input
          id="owner"
          name="owner"
          type="text"
          className={`${touchedFields.has("owner") && formErrors.owner ? "border-red-500" : `border-slate-700`} rounded-xl border bg-slate-950 px-4 py-3 text-slate-100 transition outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/20`}
          placeholder="May be empty"
        />

        <label
          htmlFor="remainingHours"
          className="mt-2 text-sm font-medium text-slate-300"
        >
          Remaining Hours
        </label>
        <input
          id="remainingHours"
          name="remainingHours"
          type="text"
          placeholder="Max 200 hours"
          onWheel={(e) => e.currentTarget.blur()}
          className={`${(touchedFields.has("remainingHours") || submitAttempted) && formErrors.remainingHours ? "border-red-500" : `border-slate-700`} [appearance:textfield] rounded-xl border bg-slate-950 px-4 py-3 text-slate-100 transition outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/20 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
        />

        <div className="mt-3 grid grid-cols-2 gap-4">
          <div
            className={`rounded-xl border bg-slate-950 p-4 ${
              submitAttempted && formErrors.customerVip
                ? "border-red-500"
                : "border-slate-700"
            }`}
          >
            <span className="mb-3 block text-center text-sm font-medium text-slate-300">
              VIP Customer
            </span>
            <div className="flex gap-2">
              <label className={inputRadioStyle}>
                <input
                  type="radio"
                  name="customerVip"
                  value="true"
                  className="sr-only"
                />
                Yes
              </label>
              <label className={inputRadioStyle}>
                <input
                  type="radio"
                  name="customerVip"
                  value="false"
                  className="sr-only"
                />
                No
              </label>
            </div>
          </div>

          <div
            className={`rounded-xl border bg-slate-950 p-4 ${
              submitAttempted && formErrors.blocked
                ? "border-red-500"
                : "border-slate-700"
            }`}
          >
            <span className="mb-3 block text-center text-sm font-medium text-slate-300">
              Blocked
            </span>
            <div className="flex gap-2">
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
