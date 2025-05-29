import { ResumeThematique } from '@/domaines/actions/ports/actions.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import {
  ThematiqueResumePresenter,
  ThematiqueResumeViewModel,
} from '@/domaines/thematiques/ports/thematiqueResume.presenter';
import { Raccourcis } from '@/domaines/thematiques/Raccourcis';

export class ThematiqueResumePresenterImpl implements ThematiqueResumePresenter {
  constructor(private readonly _informationsPourThematique: (viewModel: ThematiqueResumeViewModel) => void) {}

  async presente(resumeThematique: ResumeThematique): Promise<void> {
    const listeRaccourcis: ThematiqueResumeViewModel['listeRaccourcis'] = [];

    if (resumeThematique.nbAides) {
      listeRaccourcis.push(Raccourcis.aides(resumeThematique.nbAides));
    }

    if (resumeThematique.thematique === ClefThematiqueAPI.alimentation) {
      listeRaccourcis.push(Raccourcis.serviceRecettes(resumeThematique.nbRecettes));
      listeRaccourcis.push(Raccourcis.serviceFruitsEtLegumes);
      listeRaccourcis.push(Raccourcis.serviceProximite);
    }

    if (resumeThematique.thematique === ClefThematiqueAPI.logement) {
      listeRaccourcis.push(Raccourcis.actionMesAidesReno);
    }

    if (resumeThematique.thematique === ClefThematiqueAPI.transports) {
      listeRaccourcis.push(Raccourcis.actionSimulateurVoiture);
      listeRaccourcis.push(Raccourcis.simulateurMesAidesVelo);
    }

    if (resumeThematique.thematique === ClefThematiqueAPI.consommation) {
      listeRaccourcis.push(Raccourcis.serviceLongueVieAuxObjets);
    }

    this._informationsPourThematique({
      commune: resumeThematique.commune,
      listeRaccourcis: listeRaccourcis,
    });
  }
}
