import React from "react";

export default function EnterButton({ onEnter }) {
  const handleEnter = () => {
    if (onEnter) {
      onEnter();
    } else {
      console.log("进入操作界面");
    }
  };

  return (
    <div className="mt-10">
      <button
        onClick={handleEnter}
        className="flex items-center gap-1 text-modern-accent hover:text-blue-600 transition-colors duration-300 focus:outline-none group"
        aria-label="进入操作界面"
      >
        <svg 
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 arrow-animate" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
        <svg 
          className="w-4 h-4 transition-transform duration-300 delay-100 group-hover:translate-x-1 arrow-animate-delay-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
        <svg 
          className="w-4 h-4 transition-transform duration-300 delay-200 group-hover:translate-x-1 arrow-animate-delay-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </button>
    </div>
  );
} 