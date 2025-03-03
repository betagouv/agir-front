import { ServiceRecherchePresenter } from '@/domaines/serviceRecherche/catalogue/ports/serviceRecherche.presenter';
import { ServicesRecherche } from '@/domaines/serviceRecherche/catalogue/recupererServicesRechercheParThematique.usecase';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';

interface ServiceRechercheViewModel {
  url: string;
  label: string;
  picto: string;
  legende: string;
  estServiceExterne: boolean;
}

export interface ServicesRechercheViewModel {
  services: ServiceRechercheViewModel[];
}

enum ServiceIdInterne {
  FRUITS_ET_LEGUMES = 'fruits_legumes',
  PRES_DE_CHEZ_VOUS = 'proximite',
  RECETTES = 'recettes',
  LINKY = 'linky',
  MES_AIDES_RENO = 'mes_aides_reno',
  LONGUE_VIE_AUX_OBJETS = 'longue_vie_objets',
}

export class ServiceRecherchePresenterImpl implements ServiceRecherchePresenter {
  constructor(private serviceViewModel: (viewModel: ServicesRechercheViewModel) => void) {}

  presente(serviceRecherche: ServicesRecherche): void {
    const urls = {
      [ServiceIdInterne.FRUITS_ET_LEGUMES]: `/thematique/${MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url}/service/fruits-et-legumes`,
      [ServiceIdInterne.PRES_DE_CHEZ_VOUS]: `/thematique/${MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url}/service/pres-de-chez-nous`,
      [ServiceIdInterne.RECETTES]: `/thematique/${MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url}/service/recettes`,
      [ServiceIdInterne.LINKY]: `/thematique/${MenuThematiques.getThematiqueData(ClefThematiqueAPI.logement).url}/service/linky`,
      [ServiceIdInterne.MES_AIDES_RENO]: `/thematique/${MenuThematiques.getThematiqueData(ClefThematiqueAPI.logement).url}/service/mes-aides-reno`,
      [ServiceIdInterne.LONGUE_VIE_AUX_OBJETS]: `/thematique/${MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).url}/service/longue-vie-aux-objets`,
    };

    this.serviceViewModel({
      services: serviceRecherche.services.map(service => ({
        url: service.estServiceExterne ? service.externalUrl : urls[service.id],
        label: service.titre,
        picto: service.iconUrl,
        legende: service.sous_titre,
        estServiceExterne: service.estServiceExterne,
      })),
    });
  }
}
