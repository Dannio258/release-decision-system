import { type Ticket } from "../data/tickets";

const isReleaseBlocker = (ticket: Ticket) => {
  if (
    (ticket.blocked && ticket.severity >= 4) ||
    (ticket.severity === 5 && ticket.status === "open")
  ) {
    return true;
  } else {
    return false;
  }
};
const isPriority = (ticket: Ticket) => {
  if (ticket.customerVip && ticket.severity >= 3 && ticket.status !== "done") {
    return true;
  } else {
    return false;
  }
};
const isUnassigned = (ticket: Ticket) => {
  if (ticket.owner === null && ticket.status !== "done") {
    return true;
  } else {
    return false;
  }
};
const isActive = (ticket: Ticket) => {
  if (ticket.status !== "done") {
    return true;
  } else {
    return false;
  }
};
const isDone = (ticket: Ticket) => {
  if (ticket.status === "done") {
    return true;
  } else {
    return false;
  }
};

const classifyTicket = (ticket: Ticket) => {
  if (isReleaseBlocker(ticket)) {
    return "Release_Blocker";
  }
  if (isPriority(ticket)) {
    return "Priority";
  }
  if (isUnassigned(ticket)) {
    return "Unassigned";
  }
  if (isActive(ticket)) {
    return "Active";
  }
  if (isDone(ticket)) {
    return "Done";
  }
};
const releaseDecision = (tickets: Ticket[]) => {
  const classifiedTickets = tickets.map((ticket) => classifyTicket(ticket));

  let activeHours = 0;
  tickets.forEach((ticket) => {
    if (ticket.status !== "done") {
      return activeHours += ticket.remainingHours;
    }
  });

  if (classifiedTickets.includes("Release_Blocker")) {
    return "Block";
  } else if (classifiedTickets.includes("Unassigned") || activeHours > 35) {
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
    const classification = classifyTicket(ticket);

    if (classification === "Release_Blocker") {
      statistics.releaseBlockers++;
    }

    if (classification === "Priority") {
      statistics.priority++;
    }

    if (classification === "Unassigned") {
      statistics.unassigned++;
    }

    if (classification === "Active") {
      statistics.active++;
    }

    if (classification === "Done") {
      statistics.done++;
    }

    if (ticket.status !== "done") {
      statistics.activeHours += ticket.remainingHours;
    }
  });

  return statistics;
};

export default releaseDecision;
