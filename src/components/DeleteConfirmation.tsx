type DeleteConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

function DeleteConfirmation({ onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
        className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl"
      >
        <h2 id="delete-title" className="text-lg font-semibold text-slate-100">
          Delete ticket?
        </h2>

        <p id="delete-description" className="mt-2 text-sm text-slate-400">
          Are you sure you want to delete this ticket? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteConfirmation;
