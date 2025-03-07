// components/Toast.tsx
import { useState, useEffect } from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {

const [isVisible, setIsVisible] = useState(true);
const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true); // Start the slide-out animation
      setTimeout(onClose, 500); // Wait for animation to finish before calling onClose
    }, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
    className="fixed top-4 right-4 p-4 rounded-md bg-green-500 text-white shadow-lg transition duration-500 animate-slide-out">
      {message}
    </div>
  );
};

export default Toast;