"use client";

import React from "react";

export const DEFAULT_CATEGORIES = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

export default function CategoryFilter({
  selectedCategory = "All",
  onSelectCategory,
  categories = DEFAULT_CATEGORIES,
}) {
  return (
    <section className="flex flex-col items-center">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#0f766e] font-bold">
          Explore by Initiative
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#101010] mt-1 font-semibold">
          Filter Event Categories
        </h2>
      </div>

      {/* Pill navigation container matching reference image */}
      <div className="w-full overflow-x-auto pb-4 pt-1 scrollbar-none flex justify-start sm:justify-center">
        <div className="inline-flex items-center gap-2 sm:gap-3 p-1.5 bg-white/70 backdrop-blur-md rounded-full border border-gray-200/80 shadow-xs">
          {categories.map((category) => {
            const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(category)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0f766e] text-white shadow-md shadow-[#0f766e]/30 scale-[1.02]"
                    : "bg-white text-gray-700 hover:text-black hover:bg-gray-50 border border-gray-100"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
