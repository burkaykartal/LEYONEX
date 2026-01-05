// Data helper functions - Sanity yerine static data kullanıyoruz
import { services, type Service } from "@/data/services";
import { projects, type Project } from "@/data/projects";
import { fairs, type Fair } from "@/data/fairs";

// SERVICES
export function getAllServices(): Service[] {
  return services.sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

// PROJECTS
export function getAllProjects(): Project[] {
  return projects.sort((a, b) => b.year - a.year);
}

export function getFeaturedProjects(limit: number = 6): Project[] {
  return projects.filter((p) => p.featured).slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

// FAIRS
export function getAllFairs(): Fair[] {
  return fairs.sort((a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

export function getUpcomingFairs(): Fair[] {
  const now = new Date();
  return fairs
    .filter((fair) => new Date(fair.startDate) >= now)
    .sort((a, b) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
}

export function getFeaturedFairs(): Fair[] {
  return fairs.filter((fair) => fair.featured);
}

export function getFairBySlug(slug: string): Fair | undefined {
  return fairs.find((fair) => fair.slug === slug);
}

export function getFairSlugs(): string[] {
  return fairs.map((f) => f.slug);
}

// Sanity urlFor yerine placeholder image helper
export function getImageUrl(path: string): string {
  return path || "/placeholder.jpg";
}
