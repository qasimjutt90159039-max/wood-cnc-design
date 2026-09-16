import React from 'react';

const LoadingSpinner = ({ label = 'Reading material ledger...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative w-12 h-12 mb-4">
        {/* Outer subtle ring */}
        <div className="absolute inset-0 border border-hairline rounded-full"></div>
        {/* Inner rotating cutter path */}
        <div className="absolute inset-0 border-2 border-transparent border-t-walnut rounded-full animate-spin"></div>
        {/* Center datum dot */}
        <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-charcoal rounded-full"></div>
      </div>
      <p className="font-mono text-xs text-warm-gray tracking-wider uppercase">
        {label}
      </p>
    </div>
  );
};

export default LoadingSpinner;
