"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilters from "@/components/projects/ProjectFilters";
import { Input } from "@/components/ui/input";
import { Project } from "@/generated/prisma/client";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");

  const fetchProjects = async (filters: any = {}) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, String(v)));
      } else if (value) {
        params.append(key, String(value));
      }
    });

    const res = await fetch(`/api/projects?${params.toString()}`, {
      cache: "no-store",
    });

    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden bg-white">
      <div className="container mx-auto px-4 py-10 flex gap-8">
        <div className="w-80 flex-shrink-0">
          <div className="h-full overflow-y-auto pr-2 space-y-6">
            <Input
              placeholder="Search for a project"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchProjects({ search })}
              className="
    border-green-300
    focus:border-green-700
    focus:ring-0
    focus:ring-offset-0
    focus-visible:ring-0
    focus-visible:ring-offset-0
    focus:outline-none
  "
            />

            <ProjectFilters
              onApply={(filters: any) => fetchProjects({ ...filters, search })}
            />
          </div>
        </div>

        <div className="flex-1">
          {projects.length === 0 ? (
            <p className="text-center text-green-700 mt-20">
              No projects found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
