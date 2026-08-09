import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../app/navigation/types';
import {usePreferences} from '../../app/providers/PreferencesProvider';
import {usePortfolio} from '../../app/providers/PortfolioProvider';
import {Card, Chips, Screen, SectionTitle, uiStyles} from '../../components/ui';

export function ExperienceScreen() {
  const {colors, language, t} = usePreferences();
  const {content} = usePortfolio();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return <Screen><SectionTitle eyebrow={language === 'es' ? 'Trayectoria' : 'Career'} title={language === 'es' ? 'Experiencia profesional' : 'Professional experience'} /><View style={styles.timeline}>{content.experience[language].map(item => <View key={item.id} style={styles.item}><View style={[styles.rail, {backgroundColor: colors.border}]} /><View style={[styles.dot, {backgroundColor: item.current ? colors.success : colors.primary, borderColor: colors.background}]} /><Pressable onPress={() => navigation.navigate('ExperienceDetail', {id: item.id})}><Card><View style={styles.top}><Text style={[styles.period, {color: item.current ? colors.success : colors.primary}]}>{item.period}</Text>{item.current ? <Text style={[styles.current, {color: colors.success}]}>{t.common.current}</Text> : null}</View><Text style={[uiStyles.cardTitle, {color: colors.text, marginTop: 8}]}>{item.company}</Text>{item.client ? <Text style={[styles.client, {color: colors.primaryStrong}]}>{item.client}</Text> : null}<Text style={[styles.role, {color: colors.text}]}>{item.role}</Text><Text numberOfLines={3} style={[uiStyles.muted, {color: colors.textMuted, marginTop: 9}]}>{item.summary}</Text><Chips items={item.stack.slice(0, 4)} /></Card></Pressable></View>)}</View></Screen>;
}

const styles = StyleSheet.create({timeline: {gap: 14}, item: {paddingLeft: 19, position: 'relative'}, rail: {position: 'absolute', left: 5, top: 10, bottom: -24, width: 2}, dot: {position: 'absolute', left: 0, top: 24, width: 12, height: 12, borderRadius: 6, borderWidth: 3}, top: {flexDirection: 'row', justifyContent: 'space-between'}, period: {fontSize: 12, fontWeight: '800'}, current: {fontSize: 10, fontWeight: '900'}, client: {fontSize: 15, fontWeight: '800', marginTop: 2}, role: {fontSize: 14, marginTop: 4}});
