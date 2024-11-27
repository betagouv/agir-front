import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { AuthentifierUtilisateurFranceConnectUsecase } from '@/domaines/authentification/authentifierUtilisateurFranceConnect.usecase';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';
import { UtilisateurRepositoryForTest } from './adapters/utilisateurRepositoryForTest';

describe("Fichier de tests concernant l'authentification France Connect", () => {
  it("Lorsque je passe un token doit sauvegarder le nom et l'id", async () => {
    // GIVEN
    const spySessionRepository = new SpySauvegarderUtilisateurSessionRepository();
    const utilisateurRepositoryForTest = UtilisateurRepositoryForTest.avecOnBoardingRealise();
    const usecase = new AuthentifierUtilisateurFranceConnectUsecase(utilisateurRepositoryForTest, spySessionRepository);
    // WHEN
    await usecase.execute(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dGlsaXNhdGV1cklkIjoiNGRmNWNkMDEtYWUzZS00NmZhLTk5ZDQtOWMxOGY2OTZiNmJhIiwiaWF0IjoxNjkyMjU5MjI0LCJleHAiOjE2OTIyNTkyODR9.6Qm_REdedxvT5D8ppqtG7igcizs1OkbAD610kulRgWU',
    );
    // THEN
    expect(spySessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '4df5cd01-ae3e-46fa-99d4-9c18f696b6ba',
      nom: 'Doe',
      prenom: 'John',
      mail: '',
      onboardingAEteRealise: true,
      afficherDisclaimerAides: false,
    });
  });
});
