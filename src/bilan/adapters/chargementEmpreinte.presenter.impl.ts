import { Empreinte } from '@/bilan/ports/empreinteRepository';
import { ChargementEmpreintePresenter } from '@/bilan/ports/chargementEmpreinte.presenter';

interface DetailEmpreinteViewModel {
  libelle: string;
  valeur: number;
  couleur: string;
}
export interface EmpreinteViewModel {
  bilan: string;
  details: DetailEmpreinteViewModel[];
  valeurMax: number;
}

export class ChargementEmpreintePresenterImpl implements ChargementEmpreintePresenter {
  private _empreinteViewModel: (viewModel: EmpreinteViewModel) => void;

  constructor(empreinteViewModel: (viewModel: EmpreinteViewModel) => void) {
    this._empreinteViewModel = empreinteViewModel;
  }

  presenteEmpreinte(empreinte: Empreinte): void {
    function transformerEnKiloPuisPasserEnString(valeur: number) {
      return (valeur / 1000).toFixed(1);
    }
    function transformerEnKiloEtArrondirAUn(valeur: number) {
      return parseFloat((valeur / 1000).toFixed(1));
    }

    const details = [
      {
        libelle: '🥦 Alimentation',
        valeur: transformerEnKiloEtArrondirAUn(empreinte.detail.alimentation),
        couleur: '#F28622',
      },
      {
        libelle: '🚗 Transports',
        valeur: transformerEnKiloEtArrondirAUn(empreinte.detail.transport),
        couleur: '#474EFF',
      },
      {
        libelle: '🏛️ Services sociétaux',
        valeur: transformerEnKiloEtArrondirAUn(empreinte.detail.servicesSocietaux),
        couleur: '#809769',
      },
      {
        libelle: '🏡 Logement',
        valeur: transformerEnKiloEtArrondirAUn(empreinte.detail.logement),
        couleur: '#F8BE00',
      },
      {
        libelle: '🛒 Consommation',
        valeur: transformerEnKiloEtArrondirAUn(empreinte.detail.divers),
        couleur: '#5C26D1',
      },
    ].sort((a, b) => b.valeur - a.valeur);

    this._empreinteViewModel({
      bilan: transformerEnKiloPuisPasserEnString(empreinte.bilan),
      details: details,
      valeurMax: details[0].valeur,
    });
  }
}
