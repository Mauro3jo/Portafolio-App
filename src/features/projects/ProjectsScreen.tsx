import React, {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../app/navigation/types';
import {usePreferences} from '../../app/providers/PreferencesProvider';
import {usePortfolio} from '../../app/providers/PortfolioProvider';
import {Card, Chips, Screen, SectionTitle, uiStyles} from '../../components/ui';
import {ProjectCategory} from '../../types/portfolio';

type Filter = 'all' | ProjectCategory;
const filters: Filter[] = ['all', 'mobile', 'backend', 'web', 'enterprise'];

export function ProjectsScreen() {
  const {colors, language} = usePreferences();
  const {content} = usePortfolio();
  const [filter, setFilter] = useState<Filter>('all');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const projects = useMemo(() => content.projects[language].filter(item => filter === 'all' || item.categories.includes(filter)), [content, language, filter]);
  return <Screen><SectionTitle eyebrow={language === 'es' ? 'Productos reales' : 'Real products'} title={language === 'es' ? 'Proyectos' : 'Projects'} /><View style={styles.filters}>{filters.map(value => <Pressable key={value} onPress={() => setFilter(value)} style={[styles.filter, {backgroundColor: filter === value ? colors.primary : colors.surface, borderColor: filter === value ? colors.primary : colors.border}]}><Text style={{color: filter === value ? '#03131E' : colors.text, fontWeight: '800', fontSize: 12}}>{value === 'all' ? (language === 'es' ? 'Todos' : 'All') : value}</Text></Pressable>)}</View><View style={styles.list}>{projects.map(item => <Pressable key={item.id} onPress={() => navigation.navigate('ProjectDetail', {id: item.id})}><Card><View style={styles.top}>{item.featured ? <Text style={[styles.featured, {color: colors.primary}]}>★ DESTACADO</Text> : <View />}<Text style={[styles.arrow, {color: colors.primary}]}>↗</Text></View><Text style={[uiStyles.cardTitle, {color: colors.text}]}>{item.title}</Text><Text style={[styles.subtitle, {color: colors.primaryStrong}]}>{item.subtitle}</Text><Text numberOfLines={3} style={[uiStyles.muted, {color: colors.textMuted, marginTop: 10}]}>{item.description}</Text><Chips items={item.stack.slice(0, 4)} /></Card></Pressable>)}</View></Screen>;
}
const styles = StyleSheet.create({filters: {flexDirection: 'row', flexWrap: 'wrap', gap: 8}, filter: {borderWidth: 1, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 13}, list: {gap: 13}, top: {flexDirection: 'row', justifyContent: 'space-between', minHeight: 24}, featured: {fontSize: 10, fontWeight: '900', letterSpacing: 1}, arrow: {fontSize: 20, fontWeight: '800'}, subtitle: {fontSize: 13, fontWeight: '700', marginTop: 4}});
