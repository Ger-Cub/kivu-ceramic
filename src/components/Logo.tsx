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
      {/* SVG recreating the concentric pottery wheel logo of 'Kivu Ceramic' */}
      <svg
        className={`${currentSize.svg} shrink-0`}
        viewBox="0 0 100 100"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* outer ambient circle representing the spinning clay wheel */}
        <circle cx="50" cy="50" r="45" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.15" />
        
        {/* Dynamic clay arc 1 (Outer - terracotta tone #92400e) */}
        <path
          d="M 50,5 A 45,45 0 1,1 15,35"
          fill="none"
          stroke="#92400e"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.85"
        />
        
        {/* Dynamic clay arc 2 (Inner - warm amber (#d97706) */}
        <path
          d="M 50,18 A 32,32 0 1,1 25,38"
          fill="none"
          stroke="#d97706"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* Smallest core circle representing raw centering clay */}
        <circle cx="50" cy="50" r="16" fill="none" stroke="#f59e0b" strokeWidth="4" />

        {/* The 'K' monogram overlay standing proudly for Kivu */}
        <text
          x="32" 
          y="62" 
          fontFamily="sans-serif" 
          fontWeight="900" 
          fontSize="36" 
          fill="#1c1917"
        >
          K
        </text>

        {/* Decorative central detail */}
        <circle cx="50" cy="50" r="4" fill="#1c1917" />
      </svg>
      
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
