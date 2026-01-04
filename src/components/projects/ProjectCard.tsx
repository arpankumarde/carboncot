// import { Card, CardContent } from "@/components/ui/card";
// import sdgs from "@/data/sdgs";
// import Link from "next/link";


// export default function ProjectCard({ project }: any) {
//   const projectSDGs = sdgs.filter((s) => project.sdgs.includes(s.id));

//   return (
//     <Link href={`/projects/${project.id}`} className="block">
//       <Card className="border-green-200 hover:shadow-lg transition group cursor-pointer pt-0">
//         {project.imageUrl && (
//           <div className="overflow-hidden rounded-t-lg">
//             <img
//               src={project.imageUrl}
//               alt={project.name}
//               className="block h-44 w-full object-cover"
//             />
//           </div>
//         )}

//         <CardContent className="px-4 pt-2 pb-4 space-y-3">
//           <div className="text-xl font-bold text-green-800">
//             ${project.pricePerCredit}
//           </div>

//           <h3 className="font-semibold text-green-900 line-clamp-2">
//             {project.name}
//           </h3>

//           <p className="text-sm text-green-700 line-clamp-2">
//             {project.methodology} · {project.country}
//           </p>

//           {/* TAGS */}
//           <div className="flex flex-wrap gap-2 text-xs">
//             <span className="border px-2 py-1 rounded">
//               {project.standard}
//             </span>
//             <span className="border px-2 py-1 rounded">
//               {project.vintageYear}
//             </span>
//           </div>

//           {/* SDG HOVER */}
//           <div className="relative">
//             <span className="text-sm text-green-700 underline cursor-pointer">
//               {projectSDGs.length} SDGs
//             </span>

//             <div className="absolute left-0 mt-2 bg-white border rounded-lg p-2 flex gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition z-50">
//               {projectSDGs.map((s) => (
//                 <img
//                   key={s.id}
//                   src={s.logo}
//                   alt={s.name}
//                   title={s.name}
//                   className="w-8 h-8"
//                 />
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// }

import { Card, CardContent } from "@/components/ui/card";
import sdgs from "@/data/sdgs";
import { Project } from "@/generated/prisma/client";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  const projectSDGs = sdgs.filter((s) => project.sdgs.includes(s.id));
  const visibleSDGs = projectSDGs.slice(0, 5);
  const extraCount = projectSDGs.length - visibleSDGs.length;

  return (
    <Link href={`/projects/${project.id}`} className="block h-full">
      <Card
        className="
          h-full flex flex-col
          border border-green-200
          bg-gray-50
          hover:bg-white
          hover:shadow-lg
          transition
          cursor-pointer
          overflow-hidden
          p-0
        "
      >
        {/* IMAGE */}
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="block h-44 w-full object-cover"
          />
        )}

        {/* CONTENT */}
        <CardContent className="flex flex-col px-4 pt-3 pb-4 space-y-3 flex-1">
          {/* PRICE */}
          <div className="text-xl font-bold text-green-800">
            ${project.pricePerCredit.toString()}
          </div>

          {/* TITLE */}
          <h3 className="font-semibold text-green-900 line-clamp-2">
            {project.name}
          </h3>

          {/* META */}
          <p className="text-sm text-green-700 line-clamp-1">
            {project.methodology} · {project.country}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="border border-green-300 bg-white px-2 py-1 rounded">
              {project.standard}
            </span>
            <span className="border border-green-300 bg-white px-2 py-1 rounded">
              {project.vintageYear}
            </span>
          </div>

          {/* PUSH SDGS TO BOTTOM */}
          <div className="mt-auto pt-3 border-t border-green-200">
            <div className="flex items-center gap-2">
              {visibleSDGs.map((s) => (
                <img
                  key={s.id}
                  src={s.logo}
                  alt={s.name}
                  title={s.name}
                  className="w-7 h-7 rounded"
                />
              ))}

              {extraCount > 0 && (
                <span className="text-xs text-green-700 font-medium">
                  +{extraCount}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
