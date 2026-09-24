import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { GlassButton } from './GlassButton';

interface Props {
  children: ReactNode;
  onClose: () => void;
  title?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ModalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ModalErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-modal-overlay"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#08090E] border border-rose-500/30 shadow-2xl text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-4 text-rose-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              Unable to load this project preview.
            </h3>
            
            <p className="text-sm text-slate-400 mb-6">
              An unexpected issue occurred while rendering the project preview.
            </p>

            <GlassButton
              variant="secondary"
              size="md"
              onClick={() => {
                this.setState({ hasError: false });
                this.props.onClose();
              }}
              className="w-full sm:w-auto min-w-[120px]"
            >
              Close
            </GlassButton>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
