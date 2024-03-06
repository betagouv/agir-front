export interface LogementViewModel {
  codePostal: {
    idKYC: number;
    valeur: string;
  };
  commune: {
    idKYC: number;
    valeur: string;
  };
  adultes: {
    idKYC: number;
    valeur: number;
  };
  enfants: {
    idKYC: number;
    valeur: number;
  };
  residence: {
    idKYC: number;
    valeur: string;
    reponsesPossibles: {
      label: string;
      value: string;
    }[];
  };
  proprietaire: {
    idKYC: number;
    valeur: string;
    reponsesPossibles: {
      label: string;
      value: string;
    }[];
  };
  superficie: {
    idKYC: number;
    valeur: string;
    reponsesPossibles: {
      label: string;
      value: string;
    }[];
  };
  modeDeChauffage: {
    idKYC: number;
    valeur: string;
    reponsesPossibles: {
      label: string;
      value: string;
    }[];
  };
  plusDeQuinzeAns: {
    idKYC: number;
    valeur: string;
    reponsesPossibles: {
      label: string;
      value: string;
    }[];
  };
  dpe: {
    idKYC: number;
    valeur: string;
    reponsesPossibles: {
      label: string;
      value: string;
    }[];
  };
}

export class RecupererInformationLogementPresenterImpl {
  constructor(private logementViewModel: (viewModel: LogementViewModel) => void) {}

  presente() {
    this.logementViewModel({
      codePostal: {
        idKYC: 1,
        valeur: '75001',
      },
      commune: {
        idKYC: 2,
        valeur: 'PARIS 01',
      },
      adultes: {
        idKYC: 3,
        valeur: 2,
      },
      enfants: {
        idKYC: 4,
        valeur: 1,
      },
      residence: {
        idKYC: 5,
        valeur: 'appartement',
        reponsesPossibles: [
          {
            label: 'Un appartement',
            value: 'appartement',
          },
          {
            label: 'Une maison',
            value: 'maison',
          },
        ],
      },
      proprietaire: {
        idKYC: 6,
        valeur: 'oui',
        reponsesPossibles: [
          {
            label: 'Oui',
            value: 'oui',
          },
          {
            label: 'Non',
            value: 'non',
          },
        ],
      },
      superficie: {
        idKYC: 7,
        valeur: 'superficie_100',
        reponsesPossibles: [
          { label: 'Moins de 35 m²', value: 'superficie_35' },
          { label: 'Entre 35 et 70 m²', value: 'superficie_70' },
          { label: 'Entre 70 et 100 m²', value: 'superficie_100' },
          { label: 'Entre 100 et 150 m²', value: 'superficie_150' },
          { label: 'Plus de 150 m²', value: 'superficie_150_et_plus' },
        ],
      },
      modeDeChauffage: {
        idKYC: 8,
        valeur: 'gaz',
        reponsesPossibles: [
          { label: 'Gaz', value: 'gaz' },
          { label: 'Electrique', value: 'electrique' },
          { label: 'Autre', value: 'autre' },
        ],
      },
      plusDeQuinzeAns: {
        idKYC: 9,
        valeur: 'oui',
        reponsesPossibles: [
          {
            label: 'Oui',
            value: 'oui',
          },
          {
            label: 'Non',
            value: 'non',
          },
        ],
      },
      dpe: {
        idKYC: 10,
        valeur: 'dpe_b',
        reponsesPossibles: [
          { label: 'A', value: 'dpe_a' },
          { label: 'B', value: 'dpe_b' },
          { label: 'C', value: 'dpe_c' },
          { label: 'D', value: 'dpe_d' },
          { label: 'E', value: 'dpe_e' },
          { label: 'F', value: 'dpe_f' },
          { label: 'G', value: 'dpe_g' },
        ],
      },
    });
  }
}

export class RecupererInformationLogementUseCase {
  execute(idUtilisateur: string, presenter: RecupererInformationLogementPresenterImpl) {
    presenter.presente();
  }
}
