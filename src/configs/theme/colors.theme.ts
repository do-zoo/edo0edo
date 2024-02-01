import { DefaultMantineColor, MantineColorsTuple, MantineThemeColorsOverride } from '@mantine/core';

type ExtendedCustomColors = 'carnation' | 'lavender' | 'coral' | 'sunshade' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

export const colorsTheme: Partial<MantineThemeColorsOverride['colors']> = {
  lavender: [
    '#faf6fe',
    '#f4eafd',
    '#ead9fb',
    '#dabbf7',
    '#c38ff1',
    '#b16cea',
    '#9743da',
    '#8231bf',
    '#6e2d9c',
    '#5a257e',
    '#3d0f5c',
  ],
  carnation: [
    '#fff1f2',
    '#ffe1e3',
    '#ffc7cb',
    '#ffa0a6',
    '#ff5e69',
    '#f83b48',
    '#e51d2b',
    '#c11420',
    '#a0141e',
    '#84181f',
    '#48070b',
  ],
  coral: [
    '#fff3ed',
    '#ffe4d4',
    '#ffc6a9',
    '#ff8a56',
    '#fe6a39',
    '#fc4313',
    '#ed2909',
    '#c51a09',
    '#9c1710',
    '#7e1610',
    '#440706',
  ],
  sunshade: [
    '#fff8ed',
    '#fff0d4',
    '#ffdda8',
    '#ffc371',
    '#ffa84b',
    '#fe8211',
    '#ef6607',
    '#c64c08',
    '#9d3c0f',
    '#7e3310',
    '#441706',
  ],
};
