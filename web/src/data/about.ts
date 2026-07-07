export const about = {
  name: 'Edwar',
  title: 'JavaScript Developer',
  location: 'Jakarta, Indonesia',
  bio: 'A JavaScript Developer in Indonesia. Skilled specialist in Front-End Dev, creating engaging and optimized websites.',
  longBio:
    'Every moment, I am ambitious to acquire projects, and I work on them wholeheartedly to deliver maximum results for you.',
  stats: {
    projects: '15+',
    experience: '2+ Years',
    satisfaction: '100%',
  },
  skills: [
    'HTML',
    'CSS',
    'TailwindCSS',
    'Git',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'React',
    'Next.js',
    'Discord.js',
    'Express.js',
    'MongoDB',
    'VS Code',
    'Figma',
  ],
  social: {
    github: 'https://github.com/do-zoo',
    linkedin: 'https://www.linkedin.com/in/edo0edo',
    instagram: 'https://www.instagram.com/edo0edo',
    email: 'edwardedo603@gmail.com',
  },
} as const;

export type About = typeof about;
