import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Code2,
  ExternalLink,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/animated-section';
import { PortableText } from '@/components/portable-text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPublishedDate, getTitle } from '@/lib/sanity/helpers';
import { sanityImageLoader, urlFor } from '@/lib/sanity/image';
import type { Project } from '@/lib/sanity/types';

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const title = getTitle(project.title, 'Project');
  const imageUrl = project.coverImage ? urlFor(project.coverImage) : null;
  const publishedDate = formatPublishedDate(project.publishedAt);
  const hasLinks = Boolean(project.liveUrl || project.githubUrl);

  return (
    <div className="space-y-10 py-12 md:space-y-14 md:py-16">
      <AnimatedSection>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Projects
        </Link>
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <header className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 ring-1 ring-border/40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_55%),radial-gradient(ellipse_at_bottom_left,color-mix(in_oklch,var(--accent)_12%,transparent),transparent_50%)]"
          />

          <div className="relative">
            {imageUrl && (
              <div className="relative aspect-21/9 overflow-hidden border-b border-border/50 sm:aspect-[2.4/1]">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  loader={sanityImageLoader}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent" />
              </div>
            )}

            <div className="space-y-6 p-6 md:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  Project
                </p>
                {project.featured && (
                  <Badge className="gap-1 border-primary/30 bg-primary/15 text-primary hover:bg-primary/15">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </Badge>
                )}
              </div>

              <div className="max-w-4xl space-y-4">
                <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  {title}
                </h1>
                {project.description && (
                  <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                    {project.description}
                  </p>
                )}
              </div>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="border border-border/60 bg-secondary/70 px-2.5 py-1 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {hasLinks && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {project.liveUrl && (
                    <Button asChild className="h-11 gap-2 px-6 font-semibold">
                      <Link href={project.liveUrl} target="_blank">
                        Live Demo
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      asChild
                      className="h-11 gap-2 border-foreground/20 bg-foreground/5 px-6 font-medium hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    >
                      <Link href={project.githubUrl} target="_blank">
                        <Code2 className="h-4 w-4" />
                        GitHub
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
      </AnimatedSection>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
        {project.body && (
          <AnimatedSection delay={0.1} className="min-w-0 flex-1">
            <div className="rounded-2xl border border-border/50 bg-card/20 p-6 md:p-8 lg:p-10">
              <PortableText value={project.body} />
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection
          delay={0.15}
          className="w-full shrink-0 lg:w-[280px] xl:w-[300px]"
        >
          <aside className="space-y-4 lg:sticky lg:top-24">
            <Card className="border-border/60 bg-card/60 ring-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-base font-semibold">
                  Project Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {publishedDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Published
                      </p>
                      <p className="mt-0.5 text-sm">{publishedDate}</p>
                    </div>
                  </div>
                )}

                {hasLinks && (
                  <>
                    {publishedDate && <Separator className="bg-border/60" />}
                    <div className="space-y-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Links
                      </p>
                      <div className="flex flex-col gap-2">
                        {project.liveUrl && (
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-sm text-foreground/90 transition-colors hover:text-primary"
                          >
                            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">Live site</span>
                          </Link>
                        )}
                        {project.githubUrl && (
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-sm text-foreground/90 transition-colors hover:text-primary"
                          >
                            <Code2 className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">Source code</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {project.tags && project.tags.length > 0 && (
                  <>
                    {(publishedDate || hasLinks) && (
                      <Separator className="bg-border/60" />
                    )}
                    <div className="space-y-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Stack
                      </p>
                      <div className="flex flex-wrap gap-1.5">
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
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Button
              variant="outline"
              asChild
              className="w-full border-border/60 bg-card/40 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
                All Projects
              </Link>
            </Button>
          </aside>
        </AnimatedSection>
      </div>
    </div>
  );
}
