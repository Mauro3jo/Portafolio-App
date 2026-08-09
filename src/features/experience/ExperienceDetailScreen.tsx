import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../app/navigation/types';
import {usePreferences} from '../../app/providers/PreferencesProvider';
import {usePortfolio} from '../../app/providers/PortfolioProvider';
import {Button, Card, Chips, Screen, SectionTitle, uiStyles} from '../../components/ui';

export function ExperienceDetailScreen({route}: NativeStackScreenProps<RootStackParamList, 'ExperienceDetail'>) {
  const {colors, language} = usePreferences();
  const {content} = usePortfolio();
  const item = content.experience[language].find(value => value.id === route.params.id);
  if (!item) return <Screen><Text style={{color: colors.text}}>Experiencia no encontrada.</Text></Screen>;
  return <Screen><SectionTitle eyebrow={item.period} title={item.client ?? item.company} /><Text style={[styles.company, {color: colors.primary}]}>{item.company} · {item.role}</Text><Text style={[uiStyles.body, {color: colors.textMuted}]}>{item.summary}</Text><Chips items={item.stack} /><Card><Text style={[uiStyles.cardTitle, {color: colors.text}]}>{language === 'es' ? 'Qué hice' : 'What I did'}</Text><View style={styles.list}>{item.highlights.map(value => <Text key={value} style={[uiStyles.body, {color: colors.textMuted}]}>• {value}</Text>)}</View></Card>{item.productUrl ? <Button label={language === 'es' ? 'Abrir producto' : 'Open product'} onPress={() => Linking.openURL(item.productUrl!)} /> : null}</Screen>;
}
const styles = StyleSheet.create({company: {fontSize: 16, fontWeight: '800'}, list: {gap: 8, marginTop: 14}});
