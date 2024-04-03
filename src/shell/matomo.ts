export function trackClick(page: string, contenu: string) {
  window._paq.push(['trackContentInteraction', 'clic', page, contenu]);
}
