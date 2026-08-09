import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {PreferencesProvider, usePreferences} from './src/app/providers/PreferencesProvider';

function AppContent() {
  const {colors, isDark} = usePreferences();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <View style={[styles.mark, {backgroundColor: colors.primary}]} />
      <Text style={[styles.eyebrow, {color: colors.primary}]}>PORTFOLIO APP</Text>
      <Text style={[styles.title, {color: colors.text}]}>Mauro Trejo</Text>
      <Text style={[styles.subtitle, {color: colors.textMuted}]}>React Native · React · .NET</Text>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        <AppContent />
      </PreferencesProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', paddingHorizontal: 28},
  mark: {width: 52, height: 5, borderRadius: 3, marginBottom: 24},
  eyebrow: {fontSize: 13, fontWeight: '800', letterSpacing: 2},
  title: {fontSize: 42, fontWeight: '800', letterSpacing: -1.5, marginTop: 8},
  subtitle: {fontSize: 17, marginTop: 8},
});
