import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  // Dimensions based on sizes
  const sizes = {
    sm: { svg: 'w-8 h-8', text: 'text-sm font-semibold tracking-wider' },
    md: { svg: 'w-12 h-12', text: 'text-lg font-bold tracking-widest' },
    lg: { svg: 'w-20 h-20', text: 'text-2xl font-black tracking-widest' },
    xl: { svg: 'w-32 h-32', text: 'text-3.5xl font-black tracking-widest' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/assets/kivu-ceramic-logo.svg"
        className={`${currentSize.svg} shrink-0`} 
        alt="Kivu Ceramic logo"
      />

      {showText && (
        <div className="flex flex-col select-none">
          <span className={`${currentSize.text} font-black text-stone-900 tracking-wider leading-none font-sans`}>
            KIVU
          </span>
          <span className="text-[10px] font-bold text-amber-800 tracking-[0.25em] leading-tight font-mono">
            CERAMIC
          </span>
        </div>
      )}
    </div>
  );
}
