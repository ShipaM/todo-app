import React from "react";

type DeleteConfirmModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
};
export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  onCancel,
  onConfirm,
  message,
}) => {
  return (
    <>
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-black/50 z-4 backdrop-blur-xs"></div>
        <div className="relative z-5 flex h-full items-center justify-center p-4">
          <div className="p-6 rounded-lg shadow-xl max-w-md w-full mx-4 bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
            <h3 className="text-xl font-bold mb-4">Do you want to delete?</h3>
            <p className="mb-6">{message}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onCancel}
                className="transition-colors px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="transition-colors px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
