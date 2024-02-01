'use client';

import { CSSVariablesResolver } from '@mantine/core';

export const cssVariablesResolverTheme: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    '--mantine-color-body': theme.white,
  },
  dark: {
    '--mantine-color-body': theme.colors.dark[9],
  },
});
