import { watch } from 'vue';
import type { Router } from 'vue-router';

export function useMatomoContentTracking(router: Router) {
  function trackContentImpressions() {
    if (window._paq) {
      window._paq.push(['trackAllContentImpressions']);
    }
  }

  watch(
    () => router.currentRoute.value.fullPath,
    () => {
      trackContentImpressions();
    },
    { immediate: true },
  );
}
