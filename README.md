# Release Decision System

A ticket management and release analysis application built with **React, TypeScript, and Tailwind CSS**. It evaluates a collection of development tickets against defined rules and produces one of three release decisions: **Block**, **Review**, or **Release**.

## Project background

I developed Release Decision System independently as a **solo school project during my Fullstack JavaScript studies at NTI Gymnasiet**.

The original assignment provided an opportunity to practise application logic and decision-making rules. I chose to go beyond the assignment's scope by expanding the application with additional functionality and a more complete user interface. The result is an educational simulation of release readiness, designed to strengthen my skills in React, TypeScript, state management, and code organization rather than to serve as a production release-management system.

## Features

### Ticket management

- **Create tickets** with a title, severity level, status, owner, estimated remaining hours, VIP customer flag, and blocked flag.
- **View ticket details** by selecting a ticket from the list.
- **Edit existing tickets** through an inline editing interface.
- **Delete tickets** with a confirmation step to help prevent accidental deletion.
- **Search by ticket ID** to find a specific ticket.
- **Validate inputs** when adding or editing tickets, including required values and allowed formats.
- **Persist changes in local storage**, so tickets are retained when the page is refreshed.
- **Handle invalid saved data** by falling back to the initial tickets and displaying an error notification.

### Release analysis

The application recalculates ticket statistics and the release decision as the ticket data changes. The analysis panel displays:

- **Release blockers:** tickets that meet a blocking condition.
- **Priority tickets:** unfinished VIP-customer tickets with severity 3 or higher.
- **Unassigned tickets:** unfinished tickets without an owner.
- **Active hours:** the combined remaining hours of tickets not marked as done.

The decision is based on the **entire ticket collection**, independently of any ID search filter.

## How release decisions work

The rules are evaluated in priority order:

| Decision | Condition |
| --- | --- |
| **Block** | At least one ticket is marked blocked with severity **4 or higher**, or has severity **5** and status **open**. |
| **Review** | There are no release blockers, but at least one unfinished ticket has no owner **or** total active work exceeds **35 hours**. |
| **Release** | Neither the Block nor Review conditions apply. |

**Block takes precedence over Review**, and Review takes precedence over Release. Priority tickets are shown as a statistic but do not independently trigger a decision.

These rules are implemented separately from the UI in `logic/releaseAnalysis.ts`.

## Tech stack

| Technology | Purpose |
| --- | --- |
| **React** | Component-based user interface and state management |
| **TypeScript** | Typed ticket data, component props, and application logic |
| **Tailwind CSS** | Styling and responsive layout |
| **Vite** | Development server and build tooling |
| **Browser localStorage** | Client-side persistence without a backend |
| **ESLint & Prettier** | Linting and consistent code formatting |

## Project structure

```text
data/
  tickets.ts                # Ticket types and initial sample data
logic/
  releaseAnalysis.ts       # Release rules and ticket statistics
  ticketValidation.ts      # Input validation patterns
src/
  components/              # Ticket cards, forms, dialogs, and analysis UI
  pages/
    App.tsx                 # Main application state and ticket operations
  index.css                # Global styles
  main.tsx                 # Application entry point
```

The project separates **business logic**, **ticket data**, and **React components** to make the code easier to understand and maintain.

## Run locally

Make sure **Node.js** and **npm** are installed. From the project directory, run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

Additional commands:

```bash
npm run lint      # Run ESLint
npm run build     # Type-check and create a production build
npm run preview   # Preview the built application locally
```

## What I learned

Building this project gave me practical experience with:

- Managing and updating arrays of typed objects in React state.
- Passing data and event handlers between components through props.
- Implementing create, edit, and delete workflows.
- Applying input validation and providing user feedback.
- Persisting application data in the browser.
- Keeping decision-making logic separate from presentation components.

## Possible future improvements

I would like to keep improving the project as I develop my skills. Potential additions include **automated tests for the decision rules**, more flexible **ticket filtering and sorting**, and clearer **explanations of why a particular release decision was reached**.

---

**Project type:** Solo school project  
**School:** NTI Gymnasiet  
**Focus:** React, TypeScript, and frontend application logic
