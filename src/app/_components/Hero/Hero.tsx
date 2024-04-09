import { Avatar, Button, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <div className={classes.hero}>
      <Stack gap={32} align="center">
        <Avatar src="/images/jpg/hero-avatar.jpg" className={classes.avatar} />
        <Stack gap={24} align="center">
          <Text className="title-1" ta="center" component="h1">
            <Text span className="text-self-gradient" fz="inherit">
              Hello, I&apos;m Edwar
            </Text>
            . JavaScript Developer based in Indonesia.
          </Text>
          <Text ta="center" maw={600}>
            A JavaScript Developer in Indonesia. Skilled specialist in Front-End Dev, creating
            engaging and optimized websites.
          </Text>
        </Stack>
        <Group gap={18} justify="center">
          <Button component={Link} href="mailto:edwardedo603@gmail.com">
            GET IN TOUCH
          </Button>
          <Button variant="outline" color="white" component={Link} href="https://github.com/do-zoo">
            VIEW ALL WORKS
          </Button>
        </Group>
      </Stack>
    </div>
  );
}
