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
      className="fixed left-1/2 z-50 flex w-[90%] max-w-sm -translate-x-1/2 items-center gap-4 rounded-xl border border-red-500/40 bg-red-950 px-5 py-4 text-red-200 shadow-xl"
    >
      <span className="text-xl">⚠</span>

      <p className="text-sm">{message}</p>

      <button
        type="button"
        onClick={onClose}
        className="ml-auto cursor-pointer text-red-400 hover:text-white"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

export default ErrorNotification;
