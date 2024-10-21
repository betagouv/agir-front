import * as Sentry from '@sentry/vue';
import { App } from 'vue';
import { Router } from 'vue-router';

export function createSentry(app: App, router: Router) {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracesSampleRate: import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || 0.0,
    replaysSessionSampleRate: import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE || 0.0,
    replaysOnErrorSampleRate: import.meta.env.VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE || 0.0,
    release: __APP_VERSION__ || '0.0.0',
    environment: import.meta.env.VITE_ENV || 'local',
    beforeSend(event) {
      if (import.meta.env.VITE_ENV === 'local') {
        return null;
      }
      if (event.transaction && event.transaction === '/session-expiree') {
        return null;
      }
      if (event.exception && event.exception.values) {
        const exceptionMessage = event.exception.values[0]?.value || '';
        if (exceptionMessage.includes('session-expiree')) {
          return null;
        }
      }
      return event;
    },
  });
}
