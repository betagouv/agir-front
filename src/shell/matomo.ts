export function trackClick(page: string, contenu: string) {
  window._paq.push(['trackEvent', 'click', page, contenu]);
}
