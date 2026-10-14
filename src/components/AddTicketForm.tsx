function AddTicketForm() {
  return (
    <form className="absolute top-1/2 left-1/2 z-99 flex -translate-x-1/2 -translate-y-1/2 flex-col bg-black px-6 py-12">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 transition outline-none placeholder:text-slate-500 focus:border-blue-500"
      />

      <label htmlFor="severity">Severity</label>
      <div className="flex justify-between">
        <div>
          <input type="radio" className="mr-1" />
          <label htmlFor="one">1</label>
        </div>
        <div>
          <input type="radio" className="mr-1" />
          <label htmlFor="one">2</label>
        </div>
        <div>
          <input type="radio" className="mr-1" />
          <label htmlFor="one">3</label>
        </div>
        <div>
          <input type="radio" className="mr-1" />
          <label htmlFor="one">4</label>
        </div>
        <div>
          <input type="radio" className="mr-1" />
          <label htmlFor="one">5</label>
        </div>
      </div>

      <label htmlFor="status">Status</label>
      <div className="flex">
        <div>Open</div>
        <div>Testing</div>
        <div>Done</div>
      </div>

      <label htmlFor="owner">Owner</label>
      <input
        type="text"
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 transition outline-none placeholder:text-slate-500 focus:border-blue-500"
        placeholder="May be empty"
      />

      <label htmlFor="remainingHours">Remaining Hours</label>
      <input
        type="number"
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 transition outline-none placeholder:text-slate-500 focus:border-blue-500"
      />

      <label htmlFor="customerVip">Vip Customer</label>
      <div>
        <input type="radio"></input>
        <input type="radio"></input>
      </div>

      <label htmlFor="isBlocked">Blocked</label>
      <div>
        <input type="radio"></input>
        <input type="radio"></input>
      </div>
    </form>
  );
}
export default AddTicketForm;
