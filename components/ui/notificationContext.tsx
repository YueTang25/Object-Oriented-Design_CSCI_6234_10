'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import Notification from '@/components/ui/notification';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
    message: string;
    type: NotificationType;
    duration?: number;
}

interface NotificationContextType {
    showNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

    const showNotification = ({ message, type, duration = 3000 }: Notification) => {
        setCurrentNotification({ message, type, duration });

        // Auto-hide after duration
        setTimeout(() => {
            setCurrentNotification(null);
        }, duration);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {currentNotification && (
                <Notification
                    message={currentNotification.message}
                    type={currentNotification.type}
                    onClose={() => setCurrentNotification(null)}
                />
            )}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}