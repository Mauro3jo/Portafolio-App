import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from 'react';
import {Appearance} from 'react-native';
import {translations, Translation} from '../../i18n/translations';
import {AppColors, darkColors, lightColors} from '../../theme/palette';
import {Language, ThemePreference} from '../../types/portfolio';

const LANGUAGE_KEY = '@portfolio/language';
const THEME_KEY = '@portfolio/theme';
const resolveSystemTheme = (scheme: ReturnType<typeof Appearance.getColorScheme>): 'light' | 'dark' =>
  scheme === 'dark' ? 'dark' : 'light';

type PreferencesContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  themePreference: ThemePreference;
  setThemePreference: (theme: ThemePreference) => void;
  isDark: boolean;
  colors: AppColors;
  t: Translation;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({children}: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>('es');
  const [themePreference, setThemeState] = useState<ThemePreference>('system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(resolveSystemTheme(Appearance.getColorScheme()));

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(LANGUAGE_KEY), AsyncStorage.getItem(THEME_KEY)]).then(
      ([savedLanguage, savedTheme]) => {
        if (savedLanguage === 'es' || savedLanguage === 'en') setLanguageState(savedLanguage);
        if (savedTheme === 'system' || savedTheme === 'light' || savedTheme === 'dark') setThemeState(savedTheme);
      },
    );
    const subscription = Appearance.addChangeListener(({colorScheme}) => setSystemTheme(resolveSystemTheme(colorScheme)));
    return () => subscription.remove();
  }, []);

  const setLanguage = (value: Language) => {
    setLanguageState(value);
    AsyncStorage.setItem(LANGUAGE_KEY, value).catch(() => undefined);
  };

  const setThemePreference = (value: ThemePreference) => {
    setThemeState(value);
    AsyncStorage.setItem(THEME_KEY, value).catch(() => undefined);
  };

  const isDark = themePreference === 'dark' || (themePreference === 'system' && systemTheme === 'dark');
  const value = useMemo(
    () => ({language, setLanguage, themePreference, setThemePreference, isDark, colors: isDark ? darkColors : lightColors, t: translations[language]}),
    [language, themePreference, isDark],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error('usePreferences must be used inside PreferencesProvider');
  return context;
}
