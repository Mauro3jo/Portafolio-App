import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {usePreferences} from '../../app/providers/PreferencesProvider';
import {usePortfolio} from '../../app/providers/PortfolioProvider';
import {Card, Screen, SectionTitle, uiStyles} from '../../components/ui';

export function StackScreen() {
  const {colors, language} = usePreferences();
  const {content} = usePortfolio();
  return <Screen><SectionTitle eyebrow={language === 'es' ? 'Experiencia demostrable' : 'Proven experience'} title={language === 'es' ? 'Stack tecnológico' : 'Technology stack'} /><Text style={[uiStyles.body, {color: colors.textMuted}]}>{language === 'es' ? 'Sin puntajes arbitrarios: cada tecnología se relaciona con productos donde fue utilizada.' : 'No arbitrary scores: every technology is connected to products where it was used.'}</Text>{content.skills[language].map(group => <Card key={group.id}><Text style={[uiStyles.cardTitle, {color: colors.text}]}>{group.title}</Text><View style={styles.skills}>{group.skills.map(skill => <View key={skill.name} style={[styles.skill, {borderTopColor: colors.border}]}><Text style={[styles.name, {color: colors.primary}]}>{skill.name}</Text><Text style={[styles.used, {color: colors.textMuted}]}>{language === 'es' ? 'Usada en: ' : 'Used in: '}{skill.usedIn.join(' · ')}</Text></View>)}</View></Card>)}</Screen>;
}
const styles = StyleSheet.create({skills: {marginTop: 8}, skill: {borderTopWidth: 1, paddingVertical: 13}, name: {fontSize: 16, fontWeight: '800'}, used: {fontSize: 12, lineHeight: 18, marginTop: 4}});
