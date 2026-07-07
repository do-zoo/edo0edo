import { Card, CardContent } from '@/components/ui/card';
import { about } from '@/data/about';

export function SkillGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {about.skills.map((skill) => (
        <Card
          key={skill}
          className="border-border transition-opacity hover:opacity-80"
        >
          <CardContent className="flex items-center justify-center p-4">
            <span className="text-sm font-medium">{skill}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
