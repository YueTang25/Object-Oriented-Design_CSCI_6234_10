'use client';

import { useEffect, useState } from 'react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose?: () => void;
}

const bgColorMap = {
  success: 'bg-blue-500/50',  // Added transparency (30%)
  error: 'bg-red-500/50',
  info: 'bg-gray-500/50',
  warning: 'bg-yellow-500/50',
};

export default function Notification({ message, type, onClose }: NotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
  <div className={`${bgColorMap[type]} text-black px-5 py-3 rounded-md backdrop-blur-sm flex items-center`}>
    <span className="text-lg">{message}</span>
  </div>
</div>
  );
}