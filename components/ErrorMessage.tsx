'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-500/10 backdrop-blur-xl rounded-3xl p-8 border border-red-400/30 shadow-2xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-red-500/20 p-3 rounded-full">
          <AlertCircle className="text-red-400" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white">Something Went Wrong</h3>
      </div>
      
      <p className="text-white/80 mb-6 text-lg">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-2xl text-white font-medium transition-all"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
