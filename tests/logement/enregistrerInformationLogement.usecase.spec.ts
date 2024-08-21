import {
  ChauffageLogementApiModel,
  DPELogementApiModel,
  SuperficieLogementApiModel,
  TypeLogementApiModel,
} from '@/domaines/logement/adapters/logement.repository.axios';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
import { LogementRepositorySpy } from './adapters/logement.repository.spy';
import { EnregistrerInformationsLogementUsecase } from '@/domaines/logement/enregistrerInformationLogement.usecase';

describe("Fichier de tests concernant l'enregistrement des informations du logement", () => {
  it('Doit envoyer les informations au back-end', async () => {
    // GIVEN
    const logementAMettreAJour: Logement = {
      adultes: 0,
      enfants: 0,
      codePostal: '75001',
      commune_utilisee_dans_le_compte: 'PARIS 01',
      commune_label: '',
      residence: TypeLogementApiModel.Appartement,
      superficie: SuperficieLogementApiModel.Superficie_150_Et_Plus,
      proprietaire: true,
      modeDeChauffage: ChauffageLogementApiModel.Bois,
      plusDeQuinzeAns: false,
      dpe: DPELogementApiModel.B,
    };
    const spyLogementRepository = new LogementRepositorySpy();
    // WHEN
    const usecase = new EnregistrerInformationsLogementUsecase(spyLogementRepository);
    await usecase.execute('idUtilsateur', logementAMettreAJour);

    // THEN
    expect(spyLogementRepository.enregistrerLesInformationsAEteAppele).toBeTruthy();
    expect(spyLogementRepository.enregistrerLesInformationsArgs).toStrictEqual<Logement>({
      adultes: 0,
      enfants: 0,
      codePostal: '75001',
      commune_utilisee_dans_le_compte: 'PARIS 01',
      commune_label: '',
      residence: TypeLogementApiModel.Appartement,
      superficie: SuperficieLogementApiModel.Superficie_150_Et_Plus,
      proprietaire: true,
      modeDeChauffage: ChauffageLogementApiModel.Bois,
      plusDeQuinzeAns: false,
      dpe: DPELogementApiModel.B,
    });
  });
});
