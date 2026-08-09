import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/app/navigation/AppNavigator';
import {PreferencesProvider, usePreferences} from './src/app/providers/PreferencesProvider';
import {PortfolioProvider} from './src/app/providers/PortfolioProvider';

function AppContent() {
  const {colors, isDark} = usePreferences();

  return <><StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} /><AppNavigator /></>;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        <PortfolioProvider>
          <AppContent />
        </PortfolioProvider>
      </PreferencesProvider>
    </SafeAreaProvider>
  );
}
