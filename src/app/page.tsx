import { ProjectCard } from "@/components/shared/project-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dummy project data based on PRD
const dummyProjects = [
  {
    project_id: "1",
    name: "Urunday Afforestation Project",
    standard: "Verra – VCS",
    methodology: "VM0007 (Afforestation/Reforestation)",
    project_type: "Carbon Removal",
    country: "Argentina",
    region: "Corrientes Province",
    vintage_year: 2022,
    credits_available: 125000,
    price_per_credit: 12.8,
    certification_link: "#",
    sdg_list: ["SDG 13", "SDG 15"],
    verification_status: true,
  },
  {
    project_id: "2",
    name: "Amazon Rainforest Conservation",
    standard: "Gold Standard",
    methodology: "GS-VER",
    project_type: "Avoidance",
    country: "Brazil",
    region: "Amazon Basin",
    vintage_year: 2023,
    credits_available: 85000,
    price_per_credit: 15.5,
    certification_link: "#",
    sdg_list: ["SDG 13", "SDG 15", "SDG 6"],
    verification_status: true,
  },
  {
    project_id: "3",
    name: "Solar Energy Initiative",
    standard: "Verra – VCS",
    methodology: "VM0018",
    project_type: "Avoidance",
    country: "India",
    region: "Rajasthan",
    vintage_year: 2023,
    credits_available: 200000,
    price_per_credit: 8.9,
    certification_link: "#",
    sdg_list: ["SDG 7", "SDG 13"],
    verification_status: true,
  },
  {
    project_id: "4",
    name: "Wind Farm Development",
    standard: "Gold Standard",
    methodology: "GS-VER",
    project_type: "Avoidance",
    country: "Mexico",
    region: "Oaxaca",
    vintage_year: 2022,
    credits_available: 95000,
    price_per_credit: 11.2,
    certification_link: "#",
    sdg_list: ["SDG 7", "SDG 13", "SDG 8"],
    verification_status: true,
  },
  {
    project_id: "5",
    name: "Mangrove Restoration Project",
    standard: "Verra – VCS",
    methodology: "VM0007",
    project_type: "Carbon Removal",
    country: "Indonesia",
    region: "Sumatra",
    vintage_year: 2023,
    credits_available: 150000,
    price_per_credit: 13.5,
    certification_link: "#",
    sdg_list: ["SDG 13", "SDG 14", "SDG 15"],
    verification_status: true,
  },
];

const features = [
  {
    title: "Verified Projects",
    description: "All projects are certified by leading standards like Verra and Gold Standard, ensuring credibility and transparency.",
    icon: "✓",
  },
  {
    title: "Instant Certificates",
    description: "Receive digital retirement certificates immediately after purchase, ready to share and download.",
    icon: "📜",
  },
  {
    title: "Transparent Pricing",
    description: "Clear pricing with no hidden fees. See exactly what you're paying for each credit.",
    icon: "💰",
  },
  {
    title: "SDG Impact",
    description: "Every project supports UN Sustainable Development Goals, creating positive social and environmental impact.",
    icon: "🌍",
  },
];

const stats = [
  { value: "655,000+", label: "Credits Available" },
  { value: "5", label: "Verified Projects" },
  { value: "100%", label: "Transparent" },
  { value: "Instant", label: "Certificates" },
];

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <span className="bg-green-50 text-green-800 border border-green-300 rounded-full px-4 py-1 text-sm font-medium">
                🌱 Verified Carbon Credits
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6 leading-tight">
              Offset Your Carbon Footprint
              <br />
              <span className="text-green-700">With Confidence</span>
            </h1>
            <p className="text-xl text-green-900 mb-8 leading-relaxed">
              Explore verified carbon projects, purchase credits, and receive instant
              retirement certificates. Transparent, credible, and simple.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-6 text-lg"
              >
                <Link href="#projects">Browse Projects</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-green-700 text-green-700 hover:bg-green-50 px-8 py-6 text-lg"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-green-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-green-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Why Choose CarbonCot?
            </h2>
            <p className="text-lg text-green-900 max-w-2xl mx-auto">
              We make carbon offsetting simple, transparent, and trustworthy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-green-200 bg-white hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <CardTitle className="text-green-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-900 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Featured Carbon Projects
            </h2>
            <p className="text-lg text-green-900 max-w-2xl mx-auto">
              Browse our verified carbon credit projects from around the world.
              Each project is certified and contributes to sustainable development.
            </p>
          </div>

          <div className="mb-8 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-green-50 border border-green-300 rounded-lg px-6 py-3">
              <span className="text-green-800 font-medium">
                🌱 All projects are verified and certified
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {dummyProjects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-700 text-green-700 hover:bg-green-50 px-8"
            >
              <Link href="#projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-green-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-green-900 max-w-2xl mx-auto">
              Simple steps to offset your carbon footprint
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Browse Projects
              </h3>
              <p className="text-green-900">
                Explore verified carbon projects by country, type, and certification
                standard. View detailed information about each project.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Select & Retire
              </h3>
              <p className="text-green-900">
                Choose the number of credits you want to retire, add beneficiary
                information, and complete your purchase.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Get Certificate
              </h3>
              <p className="text-green-900">
                Receive your digital retirement certificate instantly. Download,
                share, or print your proof of carbon offset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              Ready to take your climate action to the next level?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-gray-100 text-green-700 px-8 py-6 text-lg font-semibold rounded-lg"
              >
                <Link href="#projects">I want to buy carbon credits</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-gray-100 text-green-700 px-8 py-6 text-lg font-semibold rounded-lg"
              >
                <Link href="/sell">I want to sell carbon credits</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
