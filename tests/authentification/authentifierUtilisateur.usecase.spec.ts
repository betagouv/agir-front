import { AuthentifierUtilisateurUsecase } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { SpyUtilisateurRepository } from './adapters/spyUtilisateurRepository';
import { expect } from 'vitest';

describe("Fichier de tests concernant l'authentification ", () => {
  it("Lorsque je passe un email et un mot de passe doit lancer le processus d'authentification", async () => {
    // GIVEN
    const spyUtilisateurRepository = new SpyUtilisateurRepository();
    const usecase = new AuthentifierUtilisateurUsecase(spyUtilisateurRepository);
    // WHEN
    await usecase.execute('john.doe@example.com', '123');
    // THEN
    expect(spyUtilisateurRepository.authentifierUtilisateurArgs).toStrictEqual({
      motDePasse: '123',
      nomUtilisateur: 'john.doe@example.com',
    });
  });
});
