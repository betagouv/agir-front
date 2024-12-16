import { ScoreExamenPresenter } from '@/domaines/examens/ports/scoreExamen.presenter';
import { ScoreExamen } from '@/domaines/examens/terminerExamen.usecase';

export interface ScoreExamenViewModel {
  pourcentageDeReussite: string;
  phrase: string;
}

export class ScoreExamenPresenterImpl implements ScoreExamenPresenter {
  constructor(private readonly viewModel: (scoreExamenViewMode: ScoreExamenViewModel) => void) {}
  presente(scoreExamen: ScoreExamen) {
    const pourcentageDeReussite = `${scoreExamen.pourcentageDeReussite} %`;
    let phrase =
      'Bravo ! Nous espérons que ce quiz vous a permis de mieux comprendre l’impact de nos habitudes et vous a donné envie d’agir.';

    if (scoreExamen.pourcentageDeReussite <= 50 && scoreExamen.pourcentageDeReussite > 0) {
      phrase =
        'Vous avez compris les grands enjeux ! Retrouvez les articles sur le sujet dans votre bibliothèque, et n’hésitez pas à consulter les sources renseignées pour en savoir plus.';
    } else if (scoreExamen.pourcentageDeReussite === 0) {
      phrase = 'Nous espérons que ce quiz vous a permis de mieux comprendre l’impact de nos habitudes.';
    }
    this.viewModel({ pourcentageDeReussite, phrase });
  }
}
