'use client';

import { Box, Stack, Text } from '@mantine/core';
import { ProjectCard } from '@edo0edo/components';

export function ShowcaseProject() {
  return (
    <Box>
      <Box mb="md">
        <Text component="h1" className="title-2">
          <Text span className="text-self-gradient" fz="inherit">
            Selected Projects
          </Text>
        </Text>
        <Text maw={500}>
          I do deep market research before starting any project the gives an unfair advantage to
          bring the best result for client.
        </Text>
      </Box>
      <Stack>
        {Array(2)
          .fill(0)
          .map((_, index) => (
            <ProjectCard key={index} />
          ))}
      </Stack>
    </Box>
  );
}
