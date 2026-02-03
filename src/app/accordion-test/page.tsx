"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AccordionTest() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Accordion Test</h1>
      
      <div className="bg-card p-6 rounded-lg mb-4">
        <button 
          className="flex items-center justify-between w-full py-4 font-medium text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Test Accordion Item</span>
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isOpen && (
          <div className="pt-4 pb-2">
            <p>This is the accordion content. If the chevron rotates 180 degrees when opened, the rotation is working correctly.</p>
          </div>
        )}
      </div>
      
      <div className="bg-card p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Current State</h2>
        <p>Accordion is {isOpen ? 'open' : 'closed'}</p>
        <p>Chevron should be {isOpen ? 'rotated 180 degrees' : 'in normal position'}</p>
      </div>
    </div>
  );
}