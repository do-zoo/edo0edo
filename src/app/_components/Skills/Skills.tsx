'use client';

import { AspectRatio, Box, Grid, Paper, Text } from '@mantine/core';
import Image from 'next/image';
import classes from './Skills.module.css';

const SKILLS = [
  {
    name: 'HTML',
    url: '',
    slug: 'html',
  },
  {
    name: 'CSS',
    url: '',
    slug: 'css',
  },
  {
    name: 'TailwindCSS',
    url: '',
    slug: 'tailwind',
  },
  {
    name: 'Git',
    url: '',
    slug: 'git',
  },
  {
    name: 'JavaScript',
    url: '',
    slug: 'js',
  },
  {
    name: 'TypeScript',
    url: '',
    slug: 'ts',
  },
  {
    name: 'Node.js',
    url: '',
    slug: 'nodejs',
  },
  {
    name: 'React',
    url: '',
    slug: 'react',
  },
  {
    name: 'Next.js',
    url: '',
    slug: 'nextjs',
  },
  {
    name: 'Discord.js',
    url: '',
    slug: 'discordjs',
  },
  {
    name: 'Express.js',
    url: '',
    slug: 'express',
  },
  {
    name: 'MongoDB',
    url: '',
    slug: 'mongodb',
  },
  {
    name: 'VS Code',
    url: '',
    slug: 'vscode',
  },
  {
    name: 'Figma',
    url: '',
    slug: 'figma',
  },
];

export function Skills() {
  return (
    <div>
      <Text className="title-3">What I do</Text>
      <Grid my="md" columns={10} justify="center">
        {SKILLS.map((skill, index) => (
          <Grid.Col
            span={{
              md: 2,
              sm: 2.5,
              base: 5,
            }}
            className={classes.gridCol}
            key={index}
          >
            <Paper radius="md" p="md" className={classes.card}>
              <Box p="md" w="100%">
                <AspectRatio ratio={1 / 1} maw={80} mx="auto" w="100%">
                  <Image
                    src={`https://skillicons.dev/icons?i=${skill.slug}`}
                    alt={skill.slug}
                    fill
                    sizes="80px"
                  />
                </AspectRatio>
              </Box>
              <Text className={classes.skillName}>{skill.name}</Text>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
