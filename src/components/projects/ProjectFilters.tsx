// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import methodologies from "@/data/methodologies";
// import standards from "@/data/standards";
// import sdgs from "@/data/sdgs";


// export default function ProjectFilters({ onApply }: any) {
//   const [filters, setFilters] = useState<any>({});

//   const toggleArray = (key: string, value: any) => {
//     setFilters((prev: any) => {
//       const arr = prev[key] || [];
//       return {
//         ...prev,
//         [key]: arr.includes(value)
//           ? arr.filter((v: any) => v !== value)
//           : [...arr, value],
//       };
//     });
//   };

//   return (
//     <div className="border border-green-200 rounded-xl p-5 space-y-6 bg-green-50">

//       {/* Methodology */}
//       <div>
//         <h4 className="font-semibold text-green-800 mb-2">Category</h4>
//         {methodologies.map((m) => (
//           <label key={m.id} className="flex items-center gap-2 text-sm">
//             <input
//               type="checkbox"
//               onChange={() => toggleArray("methodology", m.name)}
//             />
//             {m.name}
//           </label>
//         ))}
//       </div>

//       {/* Standards */}
//       <div>
//         <h4 className="font-semibold text-green-800 mb-2">Registry</h4>
//         {standards.map((s) => (
//           <label key={s} className="flex items-center gap-2 text-sm">
//             <input
//               type="checkbox"
//               onChange={() => toggleArray("standard", s)}
//             />
//             {s}
//           </label>
//         ))}
//       </div>

//       {/* SDGs */}
//       <div>
//         <h4 className="font-semibold text-green-800 mb-2">UN SDGs</h4>
//         <div className="grid grid-cols-5 gap-2">
//           {sdgs.map((s) => (
//             <img
//               key={s.id}
//               src={s.logo}
//               alt={s.name}
//               title={s.name}
//               onClick={() => toggleArray("sdgs", s.id)}
//               className="w-8 h-8 cursor-pointer hover:scale-105 transition"
//             />
//           ))}
//         </div>
//       </div>

//       <Button
//         className="w-full bg-green-700 hover:bg-green-800 text-white"
//         onClick={() => onApply(filters)}
//       >
//         Apply Filters
//       </Button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import methodologies from "@/data/methodologies";
import standards from "@/data/standards";
import sdgs from "@/data/sdgs";

export default function ProjectFilters({ onApply }: any) {
  const [filters, setFilters] = useState<any>({
    methodology: [],
    standard: [],
    sdgs: [],
  });

  const [open, setOpen] = useState({
    methodology: true,
    standard: false,
    sdgs: false,
  });

  const toggleArray = (key: string, value: any) => {
    setFilters((prev: any) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v: any) => v !== value)
          : [...arr, value],
      };
    });
  };

  const clearFilters = () => {
    const empty = { methodology: [], standard: [], sdgs: [] };
    setFilters(empty);
    onApply({});
  };

  return (
    <div className="border border-green-200 rounded-xl p-5 space-y-6 bg-green-50">

  {/* CATEGORY */}
  <div className="border-b border-green-200 pb-4">
    <button
      onClick={() =>
        setOpen((o) => ({ ...o, methodology: !o.methodology }))
      }
      className="w-full flex items-center justify-between font-semibold text-green-800
                 bg-white rounded-lg px-3 py-2 border border-green-200"
    >
      <span>
        Category{" "}
        {filters.methodology.length > 0 &&
          `(${filters.methodology.length})`}
      </span>
      <ChevronDown
        className={`h-5 w-5 transition-transform ${
          open.methodology ? "rotate-180" : ""
        }`}
      />
    </button>

    {open.methodology && (
      <div className="mt-3 space-y-2 pl-1">
        {methodologies.map((m) => (
          <label key={m.id} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.methodology.includes(m.name)}
              onChange={() => toggleArray("methodology", m.name)}
            />
            {m.name}
          </label>
        ))}
      </div>
    )}
  </div>

  {/* REGISTRY */}
  <div className="border-b border-green-200 pb-4">
    <button
      onClick={() =>
        setOpen((o) => ({ ...o, standard: !o.standard }))
      }
      className="w-full flex items-center justify-between font-semibold text-green-800
                 bg-white rounded-lg px-3 py-2 border border-green-200"
    >
      <span>
        Registry{" "}
        {filters.standard.length > 0 &&
          `(${filters.standard.length})`}
      </span>
      <ChevronDown
        className={`h-5 w-5 transition-transform ${
          open.standard ? "rotate-180" : ""
        }`}
      />
    </button>

    {open.standard && (
      <div className="mt-3 space-y-2 pl-1">
        {standards.map((s) => (
          <label key={s} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.standard.includes(s)}
              onChange={() => toggleArray("standard", s)}
            />
            {s}
          </label>
        ))}
      </div>
    )}
  </div>

  {/* SDGS */}
  <div className="pb-2">
    <button
      onClick={() =>
        setOpen((o) => ({ ...o, sdgs: !o.sdgs }))
      }
      className="w-full flex items-center justify-between font-semibold text-green-800
                 bg-white rounded-lg px-3 py-2 border border-green-200"
    >
      <span>
        UN SDGs{" "}
        {filters.sdgs.length > 0 && `(${filters.sdgs.length})`}
      </span>
      <ChevronDown
        className={`h-5 w-5 transition-transform ${
          open.sdgs ? "rotate-180" : ""
        }`}
      />
    </button>

    {open.sdgs && (
      <div className="mt-3 grid grid-cols-5 gap-2">
        {sdgs.map((s) => {
          const selected = filters.sdgs.includes(s.id);

          return (
            <img
              key={s.id}
              src={s.logo}
              alt={s.name}
              title={s.name}
              onClick={() => toggleArray("sdgs", s.id)}
              className={`w-9 h-9 cursor-pointer rounded transition
                ${
                  selected
                    ? "border-2 border-black scale-105"
                    : "border border-transparent opacity-70 hover:opacity-100"
                }`}
            />
          );
        })}
      </div>
    )}
  </div>

  {/* ACTION BUTTONS */}
  <div className="space-y-2 pt-4 border-t border-green-200">
    <Button
      className="w-full bg-green-700 hover:bg-green-800 text-white"
      onClick={() => onApply(filters)}
    >
      Apply Filters
    </Button>

    <Button
      variant="outline"
      className="w-full border-green-700 text-green-700"
      onClick={clearFilters}
    >
      Clear Filters
    </Button>
  </div>
</div>

  );
}
