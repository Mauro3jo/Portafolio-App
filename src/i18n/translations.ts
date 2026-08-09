export const translations = {
  es: {
    tabs: {home: 'Inicio', experience: 'Experiencia', projects: 'Proyectos', stack: 'Stack', profile: 'Perfil'},
    common: {seeMore: 'Ver más', open: 'Abrir', share: 'Compartir', retry: 'Reintentar', current: 'ACTUAL'},
    settings: {theme: 'Tema', language: 'Idioma', system: 'Sistema', light: 'Claro', dark: 'Oscuro'},
  },
  en: {
    tabs: {home: 'Home', experience: 'Experience', projects: 'Projects', stack: 'Stack', profile: 'Profile'},
    common: {seeMore: 'See more', open: 'Open', share: 'Share', retry: 'Retry', current: 'CURRENT'},
    settings: {theme: 'Theme', language: 'Language', system: 'System', light: 'Light', dark: 'Dark'},
  },
} as const;

export type Translation = {
  tabs: Record<'home' | 'experience' | 'projects' | 'stack' | 'profile', string>;
  common: Record<'seeMore' | 'open' | 'share' | 'retry' | 'current', string>;
  settings: Record<'theme' | 'language' | 'system' | 'light' | 'dark', string>;
};
