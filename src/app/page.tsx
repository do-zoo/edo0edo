import { Hero, ProjectReport, ShowcaseProject } from '@edo0edo/app/_components';
import { Stack } from '@mantine/core';

export default function HomePage() {
  return (
    <Stack gap={100}>
      <Stack pt={80} mih="100vh" justify="center">
        <Hero />
      </Stack>
      <ShowcaseProject />
      <ProjectReport />
    </Stack>
  );
}
