import { ActionIcon, Container, Group, rem, Text } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { Logo } from '@edo0edo/components';
import Link from 'next/link';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container>
        <div className={classes.inner}>
          <Logo width={48} />
          <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <Link href="#" className={classes.link}>
              Projects
            </Link>
            <Link href="#" className={classes.link}>
              About
            </Link>
            <Link href="#" className={classes.link}>
              Blog
            </Link>
          </Group>
        </div>{' '}
        <div className={classes.inner}>
          <Text>@ Created by Edwar</Text>
          <Group gap="md" className={classes.links} justify="flex-end" wrap="nowrap">
            <ActionIcon size="lg" color="gray" variant="outline" radius="xl">
              <IconBrandLinkedin style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="outline" radius="xl">
              <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="outline" radius="xl">
              <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="outline" radius="xl">
              <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </div>
      </Container>
    </div>
  );
}
