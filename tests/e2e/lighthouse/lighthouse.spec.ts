import { playAudit } from 'playwright-lighthouse';
import playwright from 'playwright';

import { creerUtilisateurOuSupprimmer } from '../utils/creerUtilisateurConnecte';

describe('audit example', () => {
  it('open browser', async () => {
    const browser = await playwright['chromium'].launch({
      args: ['--remote-debugging-port=9222'],
    });
    const context = await browser.newContext();
    let page: any = await context.newPage();
    // page = await creerUtilisateurOuSupprimmer(page);

    await page.goto('/vos-aides');

    await playAudit({
      page: page,
      port: 9222,
    });

    await browser.close();
  });
});
