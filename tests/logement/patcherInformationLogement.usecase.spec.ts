import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
import { LogementRepositorySpy } from './adapters/logement.repository.spy';
import { PatcherInformationLogementUsecase } from '@/domaines/logement/patcherInformationLogement.usecase';
import { SpyAppRawDataStorage } from '../shell/spyAppRawDataStorage';

describe("Fichier de tests concernant l'enregistrement des informations du logement", () => {
  it('Doit patcher les informations du back-end', async () => {
    // GIVEN
    const logementAMettreAJour: Partial<Logement> = {
      codePostal: '75001',
      commune_utilisee_dans_le_compte: 'PARIS 01',
      commune_label: 'Paris 01',
      coordonnees: {
        latitude: 48.865,
        longitude: 2.331,
      },
      numeroRue: '34',
      rue: "avenue de l'Opéra",
    };
    const spyLogementRepository = new LogementRepositorySpy();
    const spyAppRawDataStorage = new SpyAppRawDataStorage();

    // WHEN
    const usecase = new PatcherInformationLogementUsecase(spyLogementRepository, spyAppRawDataStorage);
    await usecase.execute('idUtilisateur', logementAMettreAJour);

    // THEN
    expect(spyLogementRepository.patcherLesInformationsAEteAppele).toBeTruthy();
    expect(spyLogementRepository.patcherLesInformationsArgs).toStrictEqual<Partial<Logement>>({
      codePostal: '75001',
      commune_utilisee_dans_le_compte: 'PARIS 01',
      commune_label: 'Paris 01',
      coordonnees: {
        latitude: 48.865,
        longitude: 2.331,
      },
      numeroRue: '34',
      rue: "avenue de l'Opéra",
    });
    expect(spyAppRawDataStorage.clearAllItems).toHaveBeenCalledOnce();
  });
});
