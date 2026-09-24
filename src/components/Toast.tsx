import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, Info } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container - positioned at bottom center or bottom right */}
      <div
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 text-white text-sm font-medium shadow-[0_8px_32px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-3 duration-250 pointer-events-auto select-none"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 15px rgba(6, 214, 255, 0.25)',
            }}
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#FF1768] via-[#8B5CF6] to-[#06D6FF] flex items-center justify-center text-white shrink-0">
              {toast.type === 'info' ? (
                <Info className="w-3 h-3 text-white" />
              ) : (
                <Check className="w-3 h-3 text-white stroke-[3]" />
              )}
            </div>
            <span className="tracking-wide text-slate-100">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
