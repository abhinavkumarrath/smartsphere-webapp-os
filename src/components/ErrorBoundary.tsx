import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#F0EBE1] border-4 border-black p-8 text-black z-50 absolute inset-0">
          <h2 className="text-2xl font-black mb-4 uppercase">Background Crash</h2>
          <p className="font-mono bg-white border-2 border-black p-4 text-red-600 shadow-[4px_4px_0px_0px_#000]">
            {this.state.error?.message || 'An unknown error occurred while rendering the 3D model.'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
