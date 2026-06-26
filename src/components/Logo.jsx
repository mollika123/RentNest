import React from 'react';

export default function Logo({ className = "h-8" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* House + Bird Stylized SVG Icon */}
      <svg 
        viewBox="0 0 24 24" 
        className="h-full w-auto text-blue-600 fill-none stroke-current" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* House Roof & Structure */}
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        {/* Abstract Nest/Bird Wing Curve inside the house */}
        <path d="M9 22V12h6v10" />
        <path d="M12 5a3 3 0 0 0-3 3c0 3 3 4 3 6" />
      </svg>
      
      {/* Brand Text */}
      <span className="text-xl font-black tracking-tight text-blue-800">
        RentNest
      </span>
    </div>
  );
}