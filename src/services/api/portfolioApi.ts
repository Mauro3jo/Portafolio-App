import AsyncStorage from '@react-native-async-storage/async-storage';
import {bundledPortfolio} from '../../data/portfolioData';
import {PortfolioContent} from '../../types/portfolio';

const CONTENT_URL = 'https://maurotrejoportafolio.com/data/portfolio.json';
const CACHE_KEY = '@portfolio/content-v1';
const REQUEST_TIMEOUT_MS = 7000;

export type ContentSource = 'remote' | 'cache' | 'bundled';

export async function loadPortfolioContent(): Promise<{content: PortfolioContent; source: ContentSource}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(CONTENT_URL, {signal: controller.signal});
    if (!response.ok) throw new Error(`Portfolio request failed: ${response.status}`);
    const content = (await response.json()) as PortfolioContent;
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
