export type AnalyticsEvent =
  | 'project_view'
  | 'experience_view'
  | 'cv_open'
  | 'github_open'
  | 'linkedin_open'
  | 'play_store_project_open'
  | 'share_project'
  | 'share_profile';

export type AnalyticsParams = Record<string, string | number | boolean>;

export async function trackEvent(name: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (__DEV__) console.info(`[analytics] ${name}`, params);
  // Firebase Analytics se conectará aquí cuando exista google-services.json.
  return Promise.resolve();
}
