import React from 'react';
import {Linking, Share, StyleSheet, Text, View} from 'react-native';
import {usePreferences} from '../../app/providers/PreferencesProvider';
import {Button, Card, Screen, SectionTitle, uiStyles} from '../../components/ui';
import {Language, ThemePreference} from '../../types/portfolio';
import {AnalyticsEvent, trackEvent} from '../../services/analytics/analytics';

const links = [{label: 'LinkedIn', url: 'https://www.linkedin.com/in/mauro-trejo-98968b1ab/'}, {label: 'GitHub', url: 'https://github.com/Mauro3jo'}, {label: 'WhatsApp', url: 'https://wa.me/543814767206'}, {label: 'Portfolio web', url: 'https://maurotrejoportafolio.com'}];

export function ProfileScreen() {
  const {colors, language, setLanguage, themePreference, setThemePreference, t} = usePreferences();
  const choices = <T extends string>(values: T[], active: T, onChange: (value: T) => void) => <View style={styles.choices}>{values.map(value => <Button key={value} secondary={active !== value} label={value.toUpperCase()} onPress={() => onChange(value)} />)}</View>;
  const open = (label: string, url: string) => {
    const event: AnalyticsEvent = label === 'GitHub' ? 'github_open' : label === 'LinkedIn' ? 'linkedin_open' : 'cv_open';
    trackEvent(event).catch(() => undefined);
    return Linking.openURL(url);
  };
  const shareProfile = () => {
    trackEvent('share_profile').catch(() => undefined);
    return Share.share({message: 'Mauro Trejo — Senior Full Stack Developer\nhttps://maurotrejoportafolio.com'});
  };
  return <Screen><SectionTitle eyebrow="Tucumán, Argentina" title="Mauro Trejo" /><Text style={[styles.role, {color: colors.primary}]}>Senior Full Stack Developer</Text><Text style={[uiStyles.body, {color: colors.textMuted}]}>{language === 'es' ? 'Desarrollo productos mobile, web y backend con foco en arquitectura, calidad e impacto real.' : 'I build mobile, web and backend products focused on architecture, quality and real impact.'}</Text><View style={styles.links}>{links.map(link => <Button key={link.url} secondary label={link.label} onPress={() => open(link.label, link.url)} />)}</View><Button label={language === 'es' ? 'Compartir perfil' : 'Share profile'} onPress={shareProfile} /><Card><Text style={[uiStyles.cardTitle, {color: colors.text}]}>{t.settings.language}</Text>{choices<Language>(['es', 'en'], language, setLanguage)}<Text style={[uiStyles.cardTitle, {color: colors.text, marginTop: 22}]}>{t.settings.theme}</Text>{choices<ThemePreference>(['system', 'light', 'dark'], themePreference, setThemePreference)}</Card><Card><Text style={[uiStyles.cardTitle, {color: colors.text}]}>CV</Text><Text style={[uiStyles.muted, {color: colors.textMuted, marginVertical: 10}]}>{language === 'es' ? 'Versión resumida para recruiters y procesos ATS.' : 'Concise version for recruiters and ATS processes.'}</Text><Button label={language === 'es' ? 'Abrir portfolio y CV' : 'Open portfolio and résumé'} onPress={() => open('CV', 'https://maurotrejoportafolio.com')} /></Card></Screen>;
}
const styles = StyleSheet.create({role: {fontSize: 17, fontWeight: '800'}, links: {gap: 10}, choices: {flexDirection: 'row', gap: 8, marginTop: 12}});
