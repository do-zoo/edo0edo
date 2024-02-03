'use client';

import { Burger, Button, Container, Divider, Drawer, Group, rem, ScrollArea } from '@mantine/core';
import { Logo } from '@edo0edo/components';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import classes from './Header.module.css';

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <Container pos="relative" h="100%">
        <Group justify="space-between" h="100%">
          <Group>
            <Logo width={32} />

            <Group h="100%" gap={0} visibleFrom="sm">
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
              {/*<HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>*/}
              {/*  <HoverCard.Target>*/}
              {/*    <Link href="/" className={classes.link}>*/}
              {/*      <Center inline>*/}
              {/*        <Box component="span" mr={5}>*/}
              {/*          Features*/}
              {/*        </Box>*/}
              {/*        <IconChevronDown*/}
              {/*          style={{*/}
              {/*            width: rem(16),*/}
              {/*            height: rem(16),*/}
              {/*          }}*/}
              {/*          color={theme.colors.blue[6]}*/}
              {/*        />*/}
              {/*      </Center>*/}
              {/*    </Link>*/}
              {/*  </HoverCard.Target>*/}

              {/*  <HoverCard.Dropdown style={{ overflow: 'hidden' }}>*/}
              {/*    <Group justify="space-between" px="md">*/}
              {/*      <Text fw={500}>Features</Text>*/}
              {/*      <Anchor href="#" fz="xs">*/}
              {/*        View all*/}
              {/*      </Anchor>*/}
              {/*    </Group>*/}

              {/*    <Divider my="sm" />*/}

              {/*    <SimpleGrid cols={2} spacing={0}>*/}
              {/*      {links}*/}
              {/*    </SimpleGrid>*/}

              {/*    <div className={classes.dropdownFooter}>*/}
              {/*      <Group justify="space-between">*/}
              {/*        <div>*/}
              {/*          <Text fw={500} fz="sm">*/}
              {/*            Get started*/}
              {/*          </Text>*/}
              {/*          <Text size="xs" c="dimmed">*/}
              {/*            Their food sources have decreased, and their numbers*/}
              {/*          </Text>*/}
              {/*        </div>*/}
              {/*        <Button variant="default">Get started</Button>*/}
              {/*      </Group>*/}
              {/*    </div>*/}
              {/*  </HoverCard.Dropdown>*/}
              {/*</HoverCard>*/}
            </Group>
          </Group>

          <Group visibleFrom="sm">
            <Button component={Link} href="mailto:edwardedo603@gmail.com">
              Let’S Talk
            </Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Edo0edo"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />

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

            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
              <Button component={Link} href="mailto:edwardedo603@gmail.com">
                Let’S Talk
              </Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Container>
    </header>
  );
}
