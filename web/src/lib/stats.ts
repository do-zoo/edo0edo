import { about } from '@/data/about';

export function getYearsOfExperience(
  startYear = about.careerStartYear,
  referenceDate = new Date(),
): number {
  return Math.max(0, referenceDate.getFullYear() - startYear);
}

export function formatExperienceYears(years: number): string {
  return `${years}+ Years`;
}

export function formatProjectCount(count: number): string {
  return count > 0 ? `${count}+` : '0';
}
