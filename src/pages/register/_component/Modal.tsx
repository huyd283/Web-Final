import React, { memo } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  textButton: string;
  content: React.ReactNode;
  onConfirm: () => void;
}

const ModalProduct: React.FC<ModalProps> = ({
  show,
  onClose,
  title,
  content,
  onConfirm,
  textButton
}) => {
  if (!show) {
    return null;
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onConfirm();
    }
  };

  return (
    <div
      className="modal-overlay h-screen w-screen"
      role="button"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onClick={onClose}
    >
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-body">
            <div className="flex flex-col items-center justify-center">
              {title && <h1 className="mb-4 text-4xl font-bold">{title}</h1>}
              {content}
              <button
                type="button"
                className="custom-text-yellow w-full rounded bg-red-500 px-4 py-2 font-semibold  hover:bg-red-600"
                onClick={onConfirm}
              >
                {textButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ModalProduct);
