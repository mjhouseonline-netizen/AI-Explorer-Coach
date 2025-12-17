
import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

interface NotificationContainerProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-auto z-[100] flex flex-col gap-3 pointer-events-none">
      {notifications.map(n => (
        <div key={n.id} className="pointer-events-auto">
          <NotificationItem notification={n} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
};

const NotificationItem: React.FC<{ notification: Notification; onDismiss: (id: string) => void }> = ({ notification, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 6000); // Auto-dismiss after 6 seconds
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  const styles = {
    success: 'bg-emerald-600 border-emerald-500 text-white shadow-emerald-900/20',
    error: 'bg-red-600 border-red-500 text-white shadow-red-900/20',
    info: 'bg-slate-700 border-slate-600 text-white shadow-slate-900/20'
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
    info: <Info className="w-5 h-5 flex-shrink-0" />
  };

  return (
    <div className={`
      flex items-start gap-3 p-4 rounded-xl shadow-lg border ${styles[notification.type]} 
      w-full md:max-w-sm animate-slideIn backdrop-blur-md transition-all duration-300
    `}>
      <div className="mt-0.5">{icons[notification.type]}</div>
      <p className="text-sm font-medium flex-1 leading-relaxed opacity-95 break-words">{notification.message}</p>
      <button 
        onClick={() => onDismiss(notification.id)} 
        className="p-1 -mr-2 -mt-2 hover:bg-white/20 rounded-lg transition-colors opacity-70 hover:opacity-100"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
