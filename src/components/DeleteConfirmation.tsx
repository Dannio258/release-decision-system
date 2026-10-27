type DeleteConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
};
function DeleteConfirmation({ onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/60 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
        className="w-full max-w-sm rounded-xl border border-outline bg-elevated p-6 shadow-2xl"
      >
        <h2 id="delete-title" className="text-lg font-semibold ">
          Delete ticket?
        </h2>
        <p id="delete-description" className="mt-2 text-sm text-secondary">
          Are you sure you want to delete this ticket? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-lg border border-outline-strong px-4 py-2 text-sm text-secondary-strong transition hover:bg-surface-hover"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-lg bg-danger-solid px-4 py-2 text-sm font-medium  transition hover:bg-danger-hover"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteConfirmation;
