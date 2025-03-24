import { SupprimerCompteUtilisateurUsecase } from '@/domaines/compte/supprimerCompteUtilisateur.usecase';
import { CompteUtilisateurRepositoryMock } from './adapters/compteUtilisateur.repository.mock';
import { SpySauvegarderUtilisateurSessionRepository } from './sessionRepository.sauvegarderUtilisateur.spy';
import { expect } from 'vitest';

describe('Fichier de tests concernant la suppression du compte utilisateur', () => {
  it('La suppression doit appeler le repository', async () => {
    // GIVEN
    const sessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise({
      id: 'id',
      mail: 'mail',
      prenom: 'prenom',
      nom: 'nom',
    });
    const repository = new CompteUtilisateurRepositoryMock();
    // WHEN
    const usecase = new SupprimerCompteUtilisateurUsecase(repository, sessionRepository);
    await usecase.execute('utilisateurId', (url: string) => {
      expect(url).toBe('/');
    });
    // THEN
    expect(sessionRepository.utilisateur).toStrictEqual({
      id: '',
      mail: '',
      prenom: '',
      nom: '',
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
      pseudo: '',
      estUnUtilisateurFranceConnect: false,
    });
  });

  it("Cas de la suppression d'un utilisateur connecté avec France Connect est déconnecté du service doit rédiriger vers la deconnexion france connect et sa session est terminée", async () => {
    // GIVEN
    const sessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise({
      id: 'id',
      mail: 'mail',
      prenom: 'prenom',
      nom: 'nom',
    });
    const repository = CompteUtilisateurRepositoryMock.utilisateurFranceConnect();
    // WHEN
    const usecase = new SupprimerCompteUtilisateurUsecase(repository, sessionRepository);
    await usecase.execute('utilisateurId', (url: string) => {
      expect(url).toBe('urlDeDeconnexion');
    });
    // THEN
    expect(sessionRepository.utilisateur).toStrictEqual({
      id: '',
      mail: '',
      prenom: '',
      nom: '',
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
      pseudo: '',
      estUnUtilisateurFranceConnect: false,
    });
  });
});
