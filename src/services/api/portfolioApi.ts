import AsyncStorage from '@react-native-async-storage/async-storage';
import {bundledPortfolio} from '../../data/portfolioData';
import {PortfolioContent} from '../../types/portfolio';

const CONTENT_URL = 'https://maurotrejoportafolio.com/data/portfolio.json';
const CACHE_KEY = '@portfolio/content-v1';
const REQUEST_TIMEOUT_MS = 7000;

type RemoteContent = {
  updatedAt?: string;
  experience?: Partial<Record<'es' | 'en', Array<{id: string} & Record<string, unknown>>>>;
  projects?: Partial<Record<'es' | 'en', Array<{id: string} & Record<string, unknown>>>>;
  skills?: Partial<Record<'es' | 'en', Array<{id: string} & Record<string, unknown>>>>;
};

export type ContentSource = 'remote' | 'cache' | 'bundled';

function mergeById<T extends {id: string}>(base: T[], changes: Array<{id: string} & Record<string, unknown>> = []): T[] {
  const overrides = new Map(changes.map(item => [item.id, item]));
  return base.map(item => ({...item, ...(overrides.get(item.id) ?? {})} as T));
}

function mergeRemote(remote: RemoteContent): PortfolioContent {
  return {
    updatedAt: remote.updatedAt ?? bundledPortfolio.updatedAt,
    experience: {
      es: mergeById(bundledPortfolio.experience.es, remote.experience?.es),
      en: mergeById(bundledPortfolio.experience.en, remote.experience?.en),
    },
    projects: {
      es: mergeById(bundledPortfolio.projects.es, remote.projects?.es),
      en: mergeById(bundledPortfolio.projects.en, remote.projects?.en),
    },
    skills: {
      es: mergeById(bundledPortfolio.skills.es, remote.skills?.es),
      en: mergeById(bundledPortfolio.skills.en, remote.skills?.en),
    },
  };
}

export async function loadPortfolioContent(): Promise<{content: PortfolioContent; source: ContentSource}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(CONTENT_URL, {signal: controller.signal});
    if (!response.ok) throw new Error(`Portfolio request failed: ${response.status}`);
    const content = mergeRemote((await response.json()) as RemoteContent);
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(content));
    return {content, source: 'remote'};
  } catch {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) return {content: JSON.parse(cached) as PortfolioContent, source: 'cache'};
    return {content: bundledPortfolio, source: 'bundled'};
  } finally {
    clearTimeout(timeout);
  }
}
