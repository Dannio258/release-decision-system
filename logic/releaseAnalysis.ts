import { type Ticket } from "../data/tickets";

const isReleaseBlocker = (ticket: Ticket) => {
  return (
    (ticket.blocked && ticket.severity >= 4) ||
    (ticket.severity === 5 && ticket.status === "open")
  );
};
const isPriority = (ticket: Ticket) => {
  return ticket.customerVip && ticket.severity >= 3 && ticket.status !== "done";
};
const isUnassigned = (ticket: Ticket) => {
  return ticket.owner === null && ticket.status !== "done";
};
const isActive = (ticket: Ticket) => {
  return ticket.status !== "done";
};
const isDone = (ticket: Ticket) => {
  return ticket.status === "done";
};

const releaseDecision = (tickets: Ticket[]) => {
  const releaseBlock = tickets.some((ticket) => isReleaseBlocker(ticket));
  const review = tickets.some((ticket) => isUnassigned(ticket));

  let activeHours = 0;
  tickets.forEach((ticket) => {
    if (ticket.status !== "done") {
      activeHours += ticket.remainingHours;
    }
  });

  if (releaseBlock) {
    return "Block";
  } else if (review || activeHours > 35) {
    return "Review";
  } else {
    return "Release";
  }
};
export const getTicketStatistics = (tickets: Ticket[]) => {
  const statistics = {
    total: tickets.length,
    releaseBlockers: 0,
    priority: 0,
    unassigned: 0,
    active: 0,
    done: 0,
    activeHours: 0,
  };

  tickets.forEach((ticket) => {
    if (isReleaseBlocker(ticket)) {
      statistics.releaseBlockers++;
    }

    if (isPriority(ticket)) {
      statistics.priority++;
    }

    if (isUnassigned(ticket)) {
      statistics.unassigned++;
    }

    if (isActive(ticket)) {
      statistics.active++;
    }

    if (isDone(ticket)) {
      statistics.done++;
    }

    if (ticket.status !== "done") {
      statistics.activeHours += ticket.remainingHours;
    }
  });

  return statistics;
};

export default releaseDecision;
