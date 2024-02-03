'use client';

import { AspectRatio, Badge, Box, Group, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import classes from './ProjectCard.module.css';

export function ProjectCard() {
  return (
    <Box className={classes.wrapper}>
      <AspectRatio ratio={4 / 3}>
        <Image
          src="/examples/projects/project-1.png"
          alt="project-1"
          fill
          sizes="(max-width: 500px): 100vw, 100vw"
        />
      </AspectRatio>
      <div className={classes.info}>
        <Stack gap="sm">
          <Text className={classes.title}>Title Deksripsi</Text>
          <Text className={classes.category}>category</Text>
          <Group>
            <Badge>React</Badge>
            <Badge>Tailwind</Badge>
          </Group>
        </Stack>
      </div>
    </Box>
  );
}
