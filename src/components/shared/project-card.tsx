import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: {
    project_id: string;
    name: string;
    standard: string;
    project_type: string;
    country: string;
    vintage_year: number;
    credits_available: number;
    price_per_credit: number;
    verification_status: boolean;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrls = [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop",
  ];
  const imageIndex = parseInt(project.project_id) % imageUrls.length;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-green-300 pt-0">
      <div className="relative h-48 w-full bg-green-100">
        <img
          src={imageUrls[imageIndex]}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        {project.verification_status && (
          <div className="absolute top-2 right-2 bg-green-700 text-white text-xs px-2 py-1 rounded font-medium">
            Verified
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg text-green-800">{project.name}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-green-900">
          <span className="bg-green-50 text-green-800 px-2 py-1 rounded text-xs font-medium border border-green-200">
            {project.standard}
          </span>
          <span className="text-green-700">•</span>
          <span>{project.country}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-green-900">Type:</span>
          <span className="font-medium text-green-800">
            {project.project_type}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-green-900">Vintage:</span>
          <span className="font-medium text-green-800">
            {project.vintage_year}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-green-900">Available:</span>
          <span className="font-medium text-green-800">
            {project.credits_available.toLocaleString()} tCO₂e
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-green-200">
          <span className="text-green-900">Price:</span>
          <span className="text-xl font-bold text-green-800">
            ${project.price_per_credit.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          asChild
          className="flex-1 bg-green-700 hover:bg-green-800 text-white"
        >
          <Link href={`/projects/${project.project_id}`}>View Details</Link>
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-green-400 text-green-800 hover:bg-green-50"
        >
          Retire
        </Button>
      </CardFooter>
    </Card>
  );
}
