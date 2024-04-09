'use client';

import { Box, Grid, Group, Stack, Text } from '@mantine/core';
import classes from './ProjectReport.module.css';

export function ProjectReport() {
  return (
    <Grid>
      <Grid.Col
        span={{
          md: 5,
        }}
      >
        <Text className={classes.selfIntroduce}>
          <Text className={classes.name}>
            <span className="text-self-gradient">EDWAR</span>
          </Text>
          <Text className="title-3">Javascript Developer</Text>
        </Text>
      </Grid.Col>
      <Grid.Col
        span={{
          md: 7,
        }}
      >
        <Stack>
          <Text className={classes.description}>
            Every moment, I am ambitious to acquire projects, and I work on them wholeheartedly to
            deliver maximum results for you.
          </Text>
          <Text>Below is a summary of the projects I have worked on.</Text>
          <Group justify="space-between">
            <Box>
              <Text fw={700} tt="uppercase">
                <span className="text-self-gradient">PROJECTS DONE</span>
              </Text>
              <Text className="title-3">15+</Text>
            </Box>
            <Box>
              <Text fw={700} tt="uppercase">
                <span className="text-self-gradient">EXPERIENCE</span>
              </Text>
              <Text className="title-3">2+ Years</Text>
            </Box>
            <Box>
              <Text fw={700} tt="uppercase">
                <span className="text-self-gradient">CLIENTS SATISFACTION</span>
              </Text>
              <Text className="title-3">100%</Text>
            </Box>
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
