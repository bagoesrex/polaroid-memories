import { memo } from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast = memo(function Toast({ message }: ToastProps) {
  return (
    <div
      className={`toast ${message ? 'show' : ''}`}
      role="status"
      aria-live="polite"
    >
      {message || ''}
    </div>
  );
});
