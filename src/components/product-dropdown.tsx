"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { memo } from "react";

const productCategories = [
  { name: 'NPK Fertilizers', href: '/products#npk-fertilizers', id: 'npk-fertilizers' },
  { name: 'Micronutrients', href: '/products#micronutrients', id: 'micronutrients' },
  { name: 'Biostimulants', href: '/products#biostimulants', id: 'biostimulants' },
];

export const ProductDropdown = memo(() => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-lg md:text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 text-foreground/70">
          <span>Products</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56 bg-background border border-border shadow-lg rounded-md p-2">
        {productCategories.map((category) => (
          <DropdownMenuItem key={category.name} asChild>
            <Link href={category.href} className="cursor-pointer">
              {category.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ProductDropdown.displayName = 'ProductDropdown';