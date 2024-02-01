'use client';

import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core';
import { componentsTheme } from './components.theme';
import { colorsTheme } from './colors.theme';

export const themeOverride = createTheme({
  /* Put your mantine theme override here */
  components: componentsTheme,
  headings: { fontFamily: 'var(--font-bai-jamjure), sans-serif', fontWeight: '700' },
  fontFamily: 'var(--font-inter), sans',
  colors: colorsTheme,
  defaultGradient: {
    from: 'lavender',
    to: 'carnation',
    deg: 45,
  },
  defaultRadius: 'xl',
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
