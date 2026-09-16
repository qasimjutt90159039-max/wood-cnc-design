import React from 'react';
import { Layers } from 'lucide-react';

const EmptyState = ({ message, onRetry }) => {
  return (
    <div className="border border-dashed border-hairline bg-ivory/50 p-12 text-center max-w-lg mx-auto my-8">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-hairline bg-paper text-warm-gray mb-4">
        <Layers className="w-5 h-5 stroke-[1.5]" />
      </div>
      <p className="text-charcoal font-medium text-base mb-2">
        {message}
      </p>
      <p className="font-mono text-xs text-warm-gray tracking-wider uppercase mb-5">
        LEDGER STATUS: 0 RECORDS FOUND
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center px-4 py-2 border border-charcoal text-xs font-mono tracking-wider uppercase text-charcoal hover:bg-charcoal hover:text-paper transition-colors duration-200"
        >
          Check Again
        </button>
      )}
    </div>
  );
};

export default EmptyState;
