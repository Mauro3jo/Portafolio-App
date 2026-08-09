export const lightColors = {
  background: '#F4F7FB',
  surface: '#FFFFFF',
  surfaceRaised: '#EAF2F8',
  text: '#0A1726',
  textMuted: '#526477',
  primary: '#00B8E6',
  primaryStrong: '#007FA3',
  border: '#D8E4EC',
  success: '#0A9A70',
  shadow: '#06121F',
} as const;

export const darkColors = {
  background: '#06111F',
  surface: '#0B1C2E',
  surfaceRaised: '#10283E',
  text: '#F4FAFF',
  textMuted: '#91A8BC',
  primary: '#11D4FF',
  primaryStrong: '#5CE2FF',
  border: '#173A55',
  success: '#36D3A2',
  shadow: '#000000',
} as const;

export type AppColors = typeof lightColors | typeof darkColors;
