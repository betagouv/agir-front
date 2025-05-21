import { DeconnecterUtilisateurUsecase } from '@/domaines/authentification/deconnecterUtilisateur.usecase';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';
import { expect } from 'vitest';
import { UtilisateurRepositoryMock } from './adapters/utilisateur.repository.mock';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { SpyAppRawDataStorage } from '../shell/spyAppRawDataStorage';

describe("Fichier de tests concernant la déconnexion d'un compte utilisateur", () => {
  const spyAppRawDataStorage = new SpyAppRawDataStorage();
  it("L'utilisateur est déconnecté du service et sa session est terminée et doit vider le cache", async () => {
    // GIVEN
    const utilisateurRepository = UtilisateurRepositoryMock.nouvelleInstance();
    const sessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise({
      id: 'id',
      mail: 'mail',
      prenom: 'prenom',
      nom: 'nom',
    });

    // WHEN
    const usecase = new DeconnecterUtilisateurUsecase(utilisateurRepository, sessionRepository, spyAppRawDataStorage);
    await usecase.execute('utilisateurId', (url: string) => {
      expect(url).toBe('/');
    });

    // THEN
    expect(sessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '',
      mail: '',
      prenom: '',
      nom: '',
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
      pseudo: '',
      estUnUtilisateurFranceConnect: false,
      afficherMessageReset: false,
    });
    expect(spyAppRawDataStorage.clearAllItems).toHaveBeenCalled();
  });
  it("L'utilisateur connecté avec France Connect est déconnecté du service doit rédiriger vers la deconnexion france connect et sa session est terminée", async () => {
    // GIVEN
    const utilisateurRepository = UtilisateurRepositoryMock.seDeconnecterDeFranceConnect();
    const sessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise({
      id: 'id',
      mail: 'mail',
      prenom: 'prenom',
      nom: 'nom',
    });

    // WHEN
    const usecase = new DeconnecterUtilisateurUsecase(utilisateurRepository, sessionRepository, spyAppRawDataStorage);
    await usecase.execute('utilisateurId', (url: string) => {
      // THEN
      expect(url).toBe('urlDeDeconnexion');
    });
    // THEN
    expect(sessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '',
      mail: '',
      prenom: '',
      nom: '',
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
      pseudo: '',
      estUnUtilisateurFranceConnect: false,
      afficherMessageReset: false,
    });
  });
});
