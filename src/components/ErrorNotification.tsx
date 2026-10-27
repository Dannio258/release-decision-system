import { useEffect } from "react";

type ErrorNotificationProps = {
  message: string;
  onClose: () => void;
};

function ErrorNotification({ message, onClose }: ErrorNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div
      role="alert"
      className="fixed left-1/2 z-50 top-15 flex w-[90%] max-w-sm -translate-x-1/2 items-center gap-4 rounded-xl border border-danger bg-danger-deep/80 px-5 py-4 text-danger-text-soft shadow-xl"
    >
      <span className="text-xl">⚠</span>

      <p className="text-sm">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="ml-auto cursor-pointer text-danger-text "
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

export default ErrorNotification;
