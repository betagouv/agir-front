import { App } from 'vue';

interface CrispOptions {
  siteId: string;
}

declare global {
  interface Window {
    $crisp: [];
    CRISP_WEBSITE_ID: string;
  }
}

export default {
  install(app: App, options: CrispOptions) {
    if (!options.siteId) {
      throw Error('Crisp siteId is required');
    }

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = options.siteId;

    (function () {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      d.getElementsByTagName('head')[0].appendChild(s);
    })();

    app.config.globalProperties.$crisp = window.$crisp;
  },
};
