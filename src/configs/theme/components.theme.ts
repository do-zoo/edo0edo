import { MantineThemeComponents, Container, Button, Badge } from '@mantine/core';
import type { PartialObjectDeep } from 'type-fest/source/partial-deep';

export const componentsTheme: PartialObjectDeep<MantineThemeComponents, {}> = {
  Container: Container.extend({
    defaultProps: {
      size: 'xl',
    },
  }),
  Button: Button.extend({
    defaultProps: {
      radius: 'xl',
      tt: 'uppercase',
      size: 'md',
      color: 'dark',
      variant: 'white',
    },
  }),

  Badge: Badge.extend({
    defaultProps: {
      variant: 'gradient',
    },
  }),
};
