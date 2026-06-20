import React from 'react';

interface AfricanPatternProps {
  variant?: 'kuba' | 'waves' | 'mesh';
  className?: string;
}

export default function AfricanPattern({ variant = 'kuba', className = 'opacity-[0.03]' }: AfricanPatternProps) {
  let svgString = '';
  
  if (variant === 'kuba') {
    // Kuba traditional diamond grids
    svgString = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z M30 10 L50 30 L30 50 L10 30 Z M0 0 L15 0 L0 15 Z M60 0 L45 0 L60 15 Z M60 60 L45 60 L60 45 Z M0 60 L15 60 L0 45 Z' fill='%23df6438' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E`;
  } else if (variant === 'waves') {
    // African pottery chevron waves/ripples representing Lake Kivu
    svgString = `data:image/svg+xml,%3Csvg width='80' height='40' viewBox='0 0 80 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L40 20 L80 0 L85 5 L40 25 L-5 5 Z M0 15 L40 35 L80 15 L85 20 L40 40 L-5 20 Z M40 0 L80 20 L40 40 L0 20 Z' fill='%23df6438' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E`;
  } else {
    // Interlocking tribal mesh weave
    svgString = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L20 20 L40 0 L45 5 L20 25 L-5 5 Z M20 20 L40 40 L20 40 L0 20 Z' fill='%23df6438' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E`;
  }

  return (
    <div 
      className={`absolute inset-0 pointer-events-none mix-blend-multiply ${className}`}
      style={{
        backgroundImage: `url("${svgString}")`,
        backgroundSize: variant === 'waves' ? '80px 40px' : '40px 40px',
        backgroundRepeat: 'repeat',
      }}
    />
  );
}
