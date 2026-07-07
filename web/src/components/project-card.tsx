"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getSlug, getTitle } from "@/lib/sanity/helpers";
import { sanityImageLoader, urlFor } from "@/lib/sanity/image";
import type { ProjectListItem } from "@/lib/sanity/types";

export function ProjectCard({ project }: { project: ProjectListItem }) {
  const reducedMotion = useReducedMotion();
  const slug = getSlug(project.slug);
  if (!slug) return null;

  const imageUrl = project.coverImage ? urlFor(project.coverImage) : null;
  const title = getTitle(project.title, "Project");

  const card = (
    <Card className="card-hover overflow-hidden bg-card ring-border/60 [--card-spacing:--spacing(5)] pt-0">
      {imageUrl && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loader={sanityImageLoader}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-display text-lg transition-colors group-hover:text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
        {project.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-secondary/80 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Link href={`/projects/${slug}`} className="group block">
      {reducedMotion ? (
        card
      ) : (
        <SpotlightCard
          spotlightColor="rgba(245, 158, 11, 0.25)"
          className="rounded-xl! border-border! bg-card! p-0!"
        >
          {card}
        </SpotlightCard>
      )}
    </Link>
  );
}
