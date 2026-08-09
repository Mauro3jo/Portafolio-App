import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Linking, Share, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../app/navigation/types';
import {usePreferences} from '../../app/providers/PreferencesProvider';
import {usePortfolio} from '../../app/providers/PortfolioProvider';
import {Button, Card, Chips, Screen, SectionTitle, uiStyles} from '../../components/ui';
import {trackEvent} from '../../services/analytics/analytics';

export function ProjectDetailScreen({route}: NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>) {
  const {colors, language} = usePreferences();
  const {content} = usePortfolio();
  const item = content.projects[language].find(value => value.id === route.params.id);
  if (!item) return <Screen><Text style={{color: colors.text}}>Proyecto no encontrado.</Text></Screen>;
  const share = () => {
    trackEvent('share_project', {project_id: item.id}).catch(() => undefined);
    return Share.share({message: `${item.title} — ${item.description}\nhttps://maurotrejoportafolio.com/projects/${item.id}`});
  };
  const openLink = (url: string) => {
    trackEvent(url.includes('play.google.com') ? 'play_store_project_open' : 'project_view', {project_id: item.id}).catch(() => undefined);
    return Linking.openURL(url);
  };
  return <Screen><SectionTitle eyebrow={item.subtitle} title={item.title} /><Text style={[uiStyles.body, {color: colors.textMuted}]}>{item.description}</Text><Chips items={item.stack} /><Card><Text style={[uiStyles.cardTitle, {color: colors.text}]}>{language === 'es' ? 'Mi participación' : 'My contribution'}</Text><Text style={[uiStyles.body, {color: colors.textMuted, marginTop: 10}]}>{item.participation}</Text></Card><Card><Text style={[uiStyles.cardTitle, {color: colors.text}]}>{language === 'es' ? 'Funcionalidades' : 'Features'}</Text><View style={styles.list}>{item.features.map(feature => <Text key={feature} style={[uiStyles.body, {color: colors.textMuted}]}>• {feature}</Text>)}</View></Card><View style={styles.actions}>{item.links.map(link => <Button key={link.url} label={link.label} onPress={() => openLink(link.url)} />)}<Button secondary label={language === 'es' ? 'Compartir proyecto' : 'Share project'} onPress={share} /></View></Screen>;
}
const styles = StyleSheet.create({list: {gap: 8, marginTop: 12}, actions: {gap: 10}});
