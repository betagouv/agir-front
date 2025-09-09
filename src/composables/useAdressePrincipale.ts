import { ref } from 'vue';
import {
  BarreDeRecherchePresenterImpl,
  BarreDeRechercheViewModel,
} from '@/domaines/logement/adapters/barreDeRecherche.presenter.impl';
import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
import { PatcherInformationLogementUsecase } from '@/domaines/logement/patcherInformationLogement.usecase';
import { RecupererAdressePourBarreDeRechercheUsecase } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
import { sessionAppRawDataStorage } from '@/shell/appRawDataStorage';
import { AdresseBarreDeRecherche, Coordonnees } from '@/shell/coordonneesType';
import { utilisateurStore } from '@/store/utilisateur';

export function useAdressePrincipale() {
  const logementRepository = new LogementRepositoryAxios();
  const avecAdressePrivee = ref<boolean>(false);

  const recupererAdressePourBarreDeRechercheUsecase = new RecupererAdressePourBarreDeRechercheUsecase(
    logementRepository,
  );

  function definirAdressePrincipale(
    utilisateurId: string,
    adresse?: AdresseBarreDeRecherche,
    coordonnees?: Coordonnees,
  ) {
    if (!adresse || !coordonnees) return;

    const nouveauLogement: Partial<Logement> = {
      coordonnees: {
        latitude: coordonnees.latitude,
        longitude: coordonnees.longitude,
      },
      codePostal: adresse.codePostal,
      codeEpci: adresse.codeEpci,
      numeroRue: adresse.numeroRue,
      rue: adresse.rue,
    };

    const patcherInformationLogementUsecase = new PatcherInformationLogementUsecase(
      new LogementRepositoryAxios(),
      sessionAppRawDataStorage,
    );
    return patcherInformationLogementUsecase.execute(utilisateurId, nouveauLogement).then(() => {
      avecAdressePrivee.value = false;
      utilisateurStore().utilisateur.possedeUneAdresseComplete = true;
    });
  }

  async function recupererAdressePourBarreDeRecherche(
    utilisateurId: string,
    callback: (barreDeRechercheViewModel: BarreDeRechercheViewModel) => Promise<void>,
  ) {
    return recupererAdressePourBarreDeRechercheUsecase.execute(
      utilisateurId,
      new BarreDeRecherchePresenterImpl(callback),
    );
  }

  return {
    avecAdressePrivee,
    definirAdressePrincipale,
    recupererAdressePourBarreDeRecherche,
  };
}
