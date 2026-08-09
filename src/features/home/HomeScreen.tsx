import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {usePreferences} from '../../app/providers/PreferencesProvider';
import {usePortfolio} from '../../app/providers/PortfolioProvider';
import {RootStackParamList} from '../../app/navigation/types';
import {Button, Card, Chips, Screen, SectionTitle, uiStyles} from '../../components/ui';

export function HomeScreen() {
  const {colors, language} = usePreferences();
  const {content, source} = usePortfolio();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const current = content.experience[language][0];
  const stats = language === 'es' ? [['6+', 'años de experiencia'], ['3', 'apps publicadas en Zoco'], ['6', 'países LATAM']] : [['6+', 'years of experience'], ['3', 'apps released at Zoco'], ['6', 'LATAM countries']];
  return <Screen><View style={styles.hero}><View style={[styles.line, {backgroundColor: colors.primary}]} /><Text style={[styles.kicker, {color: colors.primary}]}>SENIOR FULL STACK DEVELOPER</Text><Text style={[styles.name, {color: colors.text}]}>Mauro{`\n`}Trejo</Text><Text style={[styles.lead, {color: colors.textMuted}]}>React Native · React · .NET</Text><View style={styles.actions}><Button label={language === 'es' ? 'Ver proyectos' : 'View projects'} onPress={() => navigation.navigate('ProjectDetail', {id: 'real-plaza'})} /><Button secondary label={language === 'es' ? 'Conocer mi experiencia' : 'See my experience'} onPress={() => navigation.navigate('ExperienceDetail', {id: current.id})} /></View></View><View style={styles.stats}>{stats.map(([value, label]) => <View key={label} style={[styles.stat, {borderColor: colors.border}]}><Text style={[styles.statValue, {color: colors.primary}]}>{value}</Text><Text style={[styles.statLabel, {color: colors.textMuted}]}>{label}</Text></View>)}</View><SectionTitle eyebrow={language === 'es' ? 'Actualmente' : 'Currently'} title="PinApp → Real Plaza" /><Card><View style={styles.currentRow}><View><Text style={[uiStyles.cardTitle, {color: colors.text}]}>{current.role}</Text><Text style={[styles.period, {color: colors.success}]}>{current.period}</Text></View><Text style={[styles.live, {color: colors.success}]}>● LIVE</Text></View><Text style={[uiStyles.body, {color: colors.textMuted, marginTop: 12}]}>{current.summary}</Text><Chips items={current.stack} /></Card><Text style={[styles.source, {color: colors.textMuted}]}>{source === 'remote' ? '● Actualizado online' : source === 'cache' ? '● Contenido disponible offline' : '● Contenido incluido en la app'}</Text></Screen>;
}

const styles = StyleSheet.create({hero: {paddingTop: 24, gap: 8}, line: {width: 54, height: 5, borderRadius: 3, marginBottom: 14}, kicker: {fontSize: 12, fontWeight: '900', letterSpacing: 1.8}, name: {fontSize: 52, lineHeight: 52, fontWeight: '900', letterSpacing: -2}, lead: {fontSize: 17, marginTop: 4}, actions: {gap: 10, marginTop: 18}, stats: {flexDirection: 'row', gap: 9}, stat: {flex: 1, borderWidth: 1, borderRadius: 16, padding: 12, minHeight: 96}, statValue: {fontSize: 25, fontWeight: '900'}, statLabel: {fontSize: 11, lineHeight: 15, marginTop: 4}, currentRow: {flexDirection: 'row', justifyContent: 'space-between', gap: 10}, period: {fontSize: 12, fontWeight: '800', marginTop: 4}, live: {fontSize: 10, fontWeight: '900'}, source: {fontSize: 11, textAlign: 'center'}});
