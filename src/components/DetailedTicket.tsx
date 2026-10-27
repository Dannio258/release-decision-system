import { useState, useEffect, useRef } from "react";
import type { Ticket } from "../../data/tickets";
import {
  ownerRegex,
  titleRegex,
  hoursRegex,
} from "../../logic/ticketValidation.ts";

type TicketProps = {
  ticket: Ticket;
  onDelete: () => void;
  onEdit: (ticket: Ticket) => void;
};
type EditableTicket = Omit<Ticket, "remainingHours"> & {
  remainingHours: string;
};
function DetailedTicketCard({ ticket, onDelete, onEdit }: TicketProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTicket, setUpdatedTicket] = useState<EditableTicket>({
    ...ticket,
    remainingHours: String(ticket.remainingHours),
  });
  const editModeRef = useRef<HTMLDivElement>(null);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const inputRadioStyle =
    "flex cursor-pointer items-center justify-center rounded-xl border border-outline-strong bg-elevated px-2 py-3 text-secondary-strong transition-all duration-200 hover:border-accent/60 hover:bg-surface-hover has-checked:border-accent has-checked:bg-accent/30 has-checked:text-accent-text min-w-0 flex-1 xl:px-5";

  const isTitleInvalid = !titleRegex.test(updatedTicket.title);

  const owner = updatedTicket.owner?.trim() ?? "";
  const isOwnerInvalid = owner !== "" && !ownerRegex.test(owner);

  const isHoursInvalid = !hoursRegex.test(updatedTicket.remainingHours);

  const invalidSave = isTitleInvalid || isOwnerInvalid || isHoursInvalid;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        editModeRef.current &&
        !editModeRef.current.contains(event.target)
      ) {
        setIsEditing(false);
      }
    };
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);
  return (
    <div
      ref={editModeRef}
      className="text-fluid-sm border-outline-subtle bg-panel grid w-full grid-cols-1 gap-3 rounded-2xl border p-3 shadow-lg sm:grid-cols-2 sm:gap-4 sm:p-6 lg:p-8"
    >
      <p className="bg-elevated flex items-center rounded-xl p-4 font-medium sm:p-6">
        ID: {ticket.id}
      </p>
      <p
        className={`${!isEditing ? `flex items-center` : `grid grid-cols-1`} bg-elevated gap-2 rounded-xl p-4 font-medium sm:px-6 sm:py-4`}
      >
        Title
        <input
          required
          className={`${isEditing ? `bg-accent/30 rounded border p-2 lg:w-full ${isTitleInvalid ? "border-danger" : "border-outline-strong"}` : "border-none bg-transparent p-0"} min-w-0 outline-none`}
          type="text"
          value={
            !isEditing
              ? capitalize(ticket.title)
              : capitalize(updatedTicket.title)
          }
          onChange={(e) =>
            setUpdatedTicket((updatedTicket) => ({
              ...updatedTicket,
              title: e.target.value,
            }))
          }
          readOnly={!isEditing}
        />
      </p>
      <p
        className={`${!isEditing ? `flex items-center` : `grid grid-cols-1`} bg-elevated gap-2 rounded-xl p-4 font-medium sm:px-6 sm:py-4`}
      >
        Owner
        <input
          className={`${isEditing ? `bg-accent/30 rounded border p-2 lg:w-full ${isOwnerInvalid ? "border-danger" : "border-outline-strong"}` : "border-none bg-transparent p-0"} min-w-0 outline-none`}
          type="text"
          value={
            !isEditing
              ? capitalize(ticket.owner ?? "")
              : capitalize(updatedTicket.owner ?? "")
          }
          onChange={(e) =>
            setUpdatedTicket((updatedTicket) => ({
              ...updatedTicket,
              owner: e.target.value || null,
            }))
          }
          placeholder="No owner"
          readOnly={!isEditing}
        />
      </p>
      {!isEditing ? (
        <p
          className={`bg-elevated rounded-xl p-4 font-semibold sm:p-6 ${
            ticket.blocked ? "text-danger-text" : "text-success-text"
          }`}
        >
          {ticket.blocked ? "Blocked : True" : "Blocked : False"}
        </p>
      ) : (
        <div className="border-outline bg-elevated grid grid-cols-2 gap-2 rounded-xl border p-4">
          <span className="col-span-2">Blocked</span>
          <label className={inputRadioStyle}>
            <input
              required
              checked={updatedTicket.blocked === true}
              type="radio"
              name="blocked"
              value="true"
              onChange={() =>
                setUpdatedTicket((updatedTicket) => ({
                  ...updatedTicket,
                  blocked: true,
                }))
              }
              className="sr-only"
            />
            Yes
          </label>
          <label className={inputRadioStyle}>
            <input
              required
              checked={updatedTicket.blocked === false}
              type="radio"
              name="blocked"
              value="false"
              onChange={() =>
                setUpdatedTicket((updatedTicket) => ({
                  ...updatedTicket,
                  blocked: false,
                }))
              }
              className="sr-only"
            />
            No
          </label>
        </div>
      )}
      {!isEditing ? (
        <p
          className={`bg-elevated rounded-xl p-4 font-semibold text-nowrap sm:p-6 ${
            ticket.customerVip ? "text-warning-text" : "text-secondary-strong"
          }`}
        >
          {ticket.customerVip ? "VIP Customer" : "Standard Customer"}
        </p>
      ) : (
        <div className="border-outline bg-elevated grid grid-cols-2 gap-2 rounded-xl border p-4">
          <span className="col-span-2">VIP</span>
          <label className={inputRadioStyle}>
            <input
              required
              type="radio"
              checked={updatedTicket.customerVip === true}
              name="customerVip"
              value="true"
              onChange={() =>
                setUpdatedTicket((updatedTicket) => ({
                  ...updatedTicket,
                  customerVip: true,
                }))
              }
              className="sr-only"
            />
            Yes
          </label>
          <label className={inputRadioStyle}>
            <input
              required
              type="radio"
              checked={updatedTicket.customerVip === false}
              name="customerVip"
              value="false"
              onChange={() =>
                setUpdatedTicket((updatedTicket) => ({
                  ...updatedTicket,
                  customerVip: false,
                }))
              }
              className="sr-only"
            />
            No
          </label>
        </div>
      )}
      <p
        className={`${!isEditing ? `flex items-center` : `grid grid-cols-1`} bg-elevated gap-2 rounded-xl p-4 font-medium text-nowrap sm:px-6 sm:py-4`}
      >
        Remaining Hours
        <input
          required
          className={`${
            isEditing
              ? `bg-accent/30 rounded border p-2 lg:w-full ${isHoursInvalid ? "border-danger" : "border-outline-strong"}`
              : "border-none bg-transparent"
          } min-w-0 outline-none`}
          type="text"
          placeholder="Max 200 hours"
          value={
            !isEditing ? ticket.remainingHours : updatedTicket.remainingHours
          }
          onChange={(e) => {
            setUpdatedTicket((updatedTicket) => ({
              ...updatedTicket,
              remainingHours: e.target.value,
            }));
          }}
          readOnly={!isEditing}
        />
      </p>
      {!isEditing ? (
        <p className="bg-elevated text-accent-text rounded-xl p-4 sm:p-6">
          Status{` ${ticket.status.toUpperCase()}`}
        </p>
      ) : (
        <div className="border-outline bg-elevated grid grid-cols-3 gap-2 rounded-xl border p-3">
          <span className="col-span-3">Status</span>
          {(["open", "testing", "done"] as const).map((status) => (
            <label key={status} className={inputRadioStyle}>
              <input
                required
                checked={updatedTicket.status === status}
                type="radio"
                name="status"
                value={status}
                onChange={() =>
                  setUpdatedTicket((updatedTicket) => ({
                    ...updatedTicket,
                    status: status,
                  }))
                }
                className="sr-only"
              />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          ))}
        </div>
      )}
      {!isEditing ? (
        <p
          className={`bg-elevated rounded-xl p-4 sm:p-6 ${
            ticket.severity >= 5
              ? "text-danger-text"
              : ticket.severity >= 3
                ? "text-warning-text"
                : "text-success-text"
          }`}
        >
          Severity{` ${ticket.severity}`}
        </p>
      ) : (
        <div className="border-outline bg-elevated grid grid-cols-5 gap-1 rounded-xl border p-3 sm:gap-2">
          <span className="col-span-5">Severity</span>
          {([1, 2, 3, 4, 5] as const).map((severity) => (
            <label key={severity} className={inputRadioStyle}>
              <input
                required
                checked={updatedTicket.severity === severity}
                type="radio"
                name="severity"
                value={severity}
                onChange={() =>
                  setUpdatedTicket((updatedTicket) => ({
                    ...updatedTicket,
                    severity: severity,
                  }))
                }
                className="sr-only"
              />
              {severity}
            </label>
          ))}
        </div>
      )}
      {isEditing ? (
        <>
          <button
            onClick={() => {
              setIsEditing(false);
            }}
            className="border-danger/30 bg-danger/10 text-danger-text hover:border-danger/60 hover:bg-danger/20 hover:text-danger-text-hover col-span-full w-full cursor-pointer rounded-xl border p-4 font-semibold transition-all duration-200 sm:col-span-1"
          >
            Cancel
          </button>
          <button
            disabled={invalidSave}
            onClick={() => {
              {
                onEdit({
                  ...updatedTicket,
                  owner: updatedTicket.owner?.trim() || null,
                  remainingHours: Number(updatedTicket.remainingHours),
                });
                setIsEditing(false);
              }
            }}
            className={`col-span-full w-full cursor-pointer sm:col-span-1 ${invalidSave && `pointer-events-none opacity-30`} border-success/30 bg-success/10 text-success-text hover:border-success/60 hover:bg-success/20 hover:text-success-text-hover rounded-xl border p-4 font-semibold transition-all duration-200`}
          >
            Save edit
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onDelete}
            className="bg-danger-solid hover:bg-danger-hover col-span-full w-full cursor-pointer rounded-xl p-4 opacity-70 sm:col-span-1"
          >
            Delete Ticket
          </button>
          <button
            onClick={() => {
              {
                setIsEditing(true);
                setUpdatedTicket({
                  ...ticket,
                  remainingHours: String(ticket.remainingHours),
                });
              }
            }}
            className="bg-edit hover:bg-warning text-overlay col-span-full w-full cursor-pointer rounded-xl p-4 opacity-70 sm:col-span-1"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}
export default DetailedTicketCard;
