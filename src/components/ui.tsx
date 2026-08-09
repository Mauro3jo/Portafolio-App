import React, {PropsWithChildren} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {usePreferences} from '../app/providers/PreferencesProvider';

export function Screen({children, scroll = true}: PropsWithChildren<{scroll?: boolean}>) {
  const {colors} = usePreferences();
  if (!scroll) return <SafeAreaView style={[styles.screen, {backgroundColor: colors.background}]}>{children}</SafeAreaView>;
  return <SafeAreaView style={[styles.screen, {backgroundColor: colors.background}]} edges={['left', 'right']}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>{children}</ScrollView></SafeAreaView>;
}

export function SectionTitle({eyebrow, title}: {eyebrow?: string; title: string}) {
  const {colors} = usePreferences();
  return <View style={styles.sectionTitle}>{eyebrow ? <Text style={[styles.eyebrow, {color: colors.primary}]}>{eyebrow}</Text> : null}<Text style={[styles.heading, {color: colors.text}]}>{title}</Text></View>;
}

export function Card({children, style}: PropsWithChildren<{style?: ViewStyle}>) {
  const {colors} = usePreferences();
  return <View style={[styles.card, {backgroundColor: colors.surface, borderColor: colors.border}, style]}>{children}</View>;
}

export function Chip({label}: {label: string}) {
  const {colors} = usePreferences();
  return <View style={[styles.chip, {backgroundColor: colors.surfaceRaised}]}><Text style={[styles.chipText, {color: colors.primaryStrong}]}>{label}</Text></View>;
}

export function Button({label, onPress, secondary = false}: {label: string; onPress: () => void; secondary?: boolean}) {
  const {colors} = usePreferences();
  return <Pressable accessibilityRole="button" onPress={onPress} style={({pressed}) => [styles.button, {backgroundColor: secondary ? colors.surface : colors.primary, borderColor: secondary ? colors.border : colors.primary, opacity: pressed ? 0.75 : 1}]}><Text style={[styles.buttonText, {color: secondary ? colors.text : '#03131E'}]}>{label}</Text></Pressable>;
}

export function Chips({items}: {items: string[]}) {
  return <View style={styles.chips}>{items.map(item => <Chip key={item} label={item} />)}</View>;
}

export const uiStyles = StyleSheet.create({
  body: {fontSize: 15, lineHeight: 23},
  cardTitle: {fontSize: 20, fontWeight: '800'},
  muted: {fontSize: 14, lineHeight: 21},
  row: {flexDirection: 'row', alignItems: 'center'},
});

const styles = StyleSheet.create({
  screen: {flex: 1},
  content: {padding: 20, paddingBottom: 36, gap: 18},
  sectionTitle: {gap: 5},
  eyebrow: {fontSize: 12, fontWeight: '900', letterSpacing: 1.6, textTransform: 'uppercase'},
  heading: {fontSize: 29, fontWeight: '900', letterSpacing: -0.7},
  card: {borderWidth: 1, borderRadius: 20, padding: 18},
  chips: {flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14},
  chip: {borderRadius: 999, paddingHorizontal: 11, paddingVertical: 7},
  chipText: {fontSize: 12, fontWeight: '700'},
  button: {minHeight: 48, borderWidth: 1, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18},
  buttonText: {fontSize: 14, fontWeight: '800'},
});
