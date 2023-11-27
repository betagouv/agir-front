import * as Sentry from '@sentry/vue';
import { Router } from 'vue-router';
import { App } from 'vue';

export function createSentry(app: App, router: Router) {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay(),
    ],

    tracesSampleRate: import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || 0.0,
    replaysSessionSampleRate: import.meta.env.SENTRY_REPLAYS_SESSION_SAMPLE_RATE || 0.0,
    replaysOnErrorSampleRate: import.meta.env.SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE || 0.0,
    release: import.meta.env.VITE_SENTRY_RELEASE || '0.0.0',
    environment: import.meta.env.SENTRY_ENVIRONMENT || 'local',
    beforeSend(event) {
      if (import.meta.env.SENTRY_ENVIRONMENT === 'local') {
        return null;
      }
      return event;
    },
  });
}
