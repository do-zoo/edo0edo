import { Avatar, Button, Group, Stack, Text, Title } from '@mantine/core';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <div className={classes.hero}>
      <Stack gap={32} align="center">
        <Avatar src="/images/jpg/hero-avatar.jpg" className={classes.avatar} />
        <Stack gap={24} align="center">
          <Title className={classes.title} ta="center">
            <Text span className={`${classes.title} text-self-gradient`}>
              Hello, I&apos;m Edwar
            </Text>
            . Web Developer based in Indonesia.
          </Title>
          <Text ta="center" maw={600}>
            A Web Developer in Indonesia. Specialist skilled in Front-End Dev, using JavaScript to
            create engaging, optimized websites.
          </Text>
        </Stack>
        <Group gap={18} justify="center">
          <Button>GET IN TOUCH</Button>
          <Button variant="outline" color="white">
            VIEW ALL WORKS
          </Button>
        </Group>
      </Stack>
    </div>
  );
}
