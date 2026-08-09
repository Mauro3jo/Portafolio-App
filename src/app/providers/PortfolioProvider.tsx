import React, {createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {bundledPortfolio} from '../../data/portfolioData';
import {ContentSource, loadPortfolioContent} from '../../services/api/portfolioApi';
import {PortfolioContent} from '../../types/portfolio';

type PortfolioContextValue = {
  content: PortfolioContent;
  source: ContentSource;
  loading: boolean;
  refreshing: boolean;
  refresh: () => Promise<void>;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({children}: PropsWithChildren) {
  const [content, setContent] = useState(bundledPortfolio);
  const [source, setSource] = useState<ContentSource>('bundled');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    const result = await loadPortfolioContent();
    setContent(result.content);
    setSource(result.source);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    refresh().catch(() => setLoading(false));
  }, [refresh]);

  const value = useMemo(() => ({content, source, loading, refreshing, refresh}), [content, source, loading, refreshing, refresh]);
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used inside PortfolioProvider');
  return context;
}
