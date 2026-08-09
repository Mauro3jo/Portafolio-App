import React from 'react';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from 'react-native';
import {usePreferences} from '../providers/PreferencesProvider';
import {ExperienceScreen} from '../../features/experience/ExperienceScreen';
import {ExperienceDetailScreen} from '../../features/experience/ExperienceDetailScreen';
import {HomeScreen} from '../../features/home/HomeScreen';
import {ProfileScreen} from '../../features/profile/ProfileScreen';
import {ProjectsScreen} from '../../features/projects/ProjectsScreen';
import {ProjectDetailScreen} from '../../features/projects/ProjectDetailScreen';
import {StackScreen} from '../../features/skills/StackScreen';
import {RootStackParamList, TabParamList} from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const Root = createNativeStackNavigator<RootStackParamList>();
const icons: Record<keyof TabParamList, string> = {Home: '⌂', Experience: '◷', Projects: '◇', Stack: '⌘', Profile: '●'};

function Tabs() {
  const {colors, t} = usePreferences();
  const labels: Record<keyof TabParamList, string> = {Home: t.tabs.home, Experience: t.tabs.experience, Projects: t.tabs.projects, Stack: t.tabs.stack, Profile: t.tabs.profile};
  return <Tab.Navigator screenOptions={({route}) => ({headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.textMuted, tabBarStyle: {height: 67, paddingTop: 7, paddingBottom: 8, backgroundColor: colors.surface, borderTopColor: colors.border}, tabBarLabelStyle: {fontSize: 10, fontWeight: '700'}, tabBarLabel: labels[route.name], tabBarIcon: ({color}) => <Text style={{color, fontSize: 20, fontWeight: '800'}}>{icons[route.name]}</Text>})}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Experience" component={ExperienceScreen} />
    <Tab.Screen name="Projects" component={ProjectsScreen} />
    <Tab.Screen name="Stack" component={StackScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>;
}

export function AppNavigator() {
  const {colors, isDark, language} = usePreferences();
  const theme = {...(isDark ? DarkTheme : DefaultTheme), colors: {...(isDark ? DarkTheme.colors : DefaultTheme.colors), background: colors.background, card: colors.surface, text: colors.text, border: colors.border, primary: colors.primary}};
  return <NavigationContainer theme={theme} linking={{prefixes: ['maurotrejo://', 'https://maurotrejoportafolio.com'], config: {screens: {ProjectDetail: 'projects/:id', ExperienceDetail: 'experience/:id'}}}}><Root.Navigator screenOptions={{headerStyle: {backgroundColor: colors.surface}, headerTintColor: colors.text, headerShadowVisible: false}}><Root.Screen name="Tabs" component={Tabs} options={{headerShown: false}} /><Root.Screen name="ExperienceDetail" component={ExperienceDetailScreen} options={{title: language === 'es' ? 'Experiencia' : 'Experience'}} /><Root.Screen name="ProjectDetail" component={ProjectDetailScreen} options={{title: language === 'es' ? 'Proyecto' : 'Project'}} /></Root.Navigator></NavigationContainer>;
}
