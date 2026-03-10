'use client';

import * as React from 'react';
import { cn } from './cn';

interface MenuToggleIconProps extends React.SVGAttributes<SVGElement> {
  open: boolean;
  duration?: number;
}

function MenuToggleIcon({ open, duration = 300, className, ...props }: MenuToggleIconProps) {
  return (
    <svg
      className={cn('h-6 w-6', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line
        x1="4"
        y1="6"
        x2="20"
        y2="6"
        className="origin-center transition-all"
        style={{
          transitionDuration: `${duration}ms`,
          transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
        }}
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        className="origin-center transition-all"
        style={{
          transitionDuration: `${duration}ms`,
          opacity: open ? 0 : 1,
        }}
      />
      <line
        x1="4"
        y1="18"
        x2="20"
        y2="18"
        className="origin-center transition-all"
        style={{
          transitionDuration: `${duration}ms`,
          transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
        }}
      />
    </svg>
  );
}

export { MenuToggleIcon };
export type { MenuToggleIconProps };
