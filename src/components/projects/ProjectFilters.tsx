"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import methodologies from "@/data/methodologies";
import standards from "@/data/standards";
import sdgs from "@/data/sdgs";


export default function ProjectFilters({ onApply }: any) {
  const [filters, setFilters] = useState<any>({});

  const toggleArray = (key: string, value: any) => {
    setFilters((prev: any) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v: any) => v !== value)
          : [...arr, value],
      };
    });
  };

  return (
    <div className="border border-green-200 rounded-xl p-5 space-y-6 bg-green-50">

      {/* Methodology */}
      <div>
        <h4 className="font-semibold text-green-800 mb-2">Category</h4>
        {methodologies.map((m) => (
          <label key={m.id} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              onChange={() => toggleArray("methodology", m.name)}
            />
            {m.name}
          </label>
        ))}
      </div>

      {/* Standards */}
      <div>
        <h4 className="font-semibold text-green-800 mb-2">Registry</h4>
        {standards.map((s) => (
          <label key={s} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              onChange={() => toggleArray("standard", s)}
            />
            {s}
          </label>
        ))}
      </div>

      {/* SDGs */}
      <div>
        <h4 className="font-semibold text-green-800 mb-2">UN SDGs</h4>
        <div className="grid grid-cols-5 gap-2">
          {sdgs.map((s) => (
            <img
              key={s.id}
              src={s.logo}
              alt={s.name}
              title={s.name}
              onClick={() => toggleArray("sdgs", s.id)}
              className="w-8 h-8 cursor-pointer hover:scale-105 transition"
            />
          ))}
        </div>
      </div>

      <Button
        className="w-full bg-green-700 hover:bg-green-800 text-white"
        onClick={() => onApply(filters)}
      >
        Apply Filters
      </Button>
    </div>
  );
}
