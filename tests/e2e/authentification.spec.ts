import { test, expect } from '@playwright/test';
import { connecterUtilisateur } from './utils/connecterUtilisateurs';

test('has title', async () => {
  const page = await connecterUtilisateur();

  await expect(page).toHaveTitle('Agir ! - Coach');
});
