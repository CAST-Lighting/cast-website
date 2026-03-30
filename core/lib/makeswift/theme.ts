/**
 * CAST Lighting — Shared Theme Tokens
 * Used by all section components for consistent Light/Dark mode switching.
 * Switch a component's "Theme" prop between 'dark' and 'light' and all
 * colors (bg, text, cards, buttons, dividers) update automatically.
 */

export const DARK_THEME = {
  bg:          '#25262d',
  heading:     '#ffffff',
  body:        'rgba(255,255,255,0.78)',
  subtle:      'rgba(255,255,255,0.45)',
  accent:      '#7EBEE8',
  cardBg:      '#2d353c',
  cardBorder:  'rgba(255,255,255,0.08)',
  divider:     'rgba(255,255,255,0.08)',
  inputBg:     'rgba(255,255,255,0.06)',
  inputBorder: 'rgba(255,255,255,0.15)',
  overline:    'rgba(255,255,255,0.5)',
  badgeBg:     'rgba(255,255,255,0.08)',
  btnPrimary:  'sg-btn-solid-dark-md',
  btnOutline:  'sg-btn-outline-dark-md',
  btnSm:       'sg-btn-solid-dark-sm',
  btnOutlineSm:'sg-btn-outline-dark-sm',
}

export const LIGHT_THEME = {
  bg:          '#f0f2f5',
  heading:     '#014960',
  body:        '#1a3a4a',
  subtle:      'rgba(0,73,96,0.55)',
  accent:      '#007CB0',
  cardBg:      '#ffffff',
  cardBorder:  'rgba(0,73,96,0.1)',
  divider:     'rgba(0,73,96,0.1)',
  inputBg:     'rgba(0,73,96,0.04)',
  inputBorder: 'rgba(0,73,96,0.2)',
  overline:    'rgba(0,73,96,0.5)',
  badgeBg:     'rgba(0,73,96,0.08)',
  btnPrimary:  'sg-btn-solid-md',
  btnOutline:  'sg-btn-outline-md',
  btnSm:       'sg-btn-solid-sm',
  btnOutlineSm:'sg-btn-outline-sm',
}

export type Theme = typeof DARK_THEME
export type ThemeMode = 'dark' | 'light'

export function getTheme(mode?: ThemeMode): Theme {
  return mode === 'light' ? LIGHT_THEME : DARK_THEME
}
