import { ListeQuestionsPresenter, QuestionDansLeCompteViewModel } from '@/domaines/kyc/ports/listeQuestions.presenter';
import {
  Question,
  ReponseKYCSimple,
  ReponseMosaic,
  ReponseMultiples,
  ThematiqueQuestion,
} from '@/domaines/kyc/recupererQuestionUsecase';

export class ListeQuestionsDansLeComptePresenter implements ListeQuestionsPresenter {
  constructor(private readonly questionsViewModel: (viewModel: QuestionDansLeCompteViewModel[]) => void) {}
  presente(questions: Question[]): void {
    this.questionsViewModel(
      questions.map<QuestionDansLeCompteViewModel>(question => ({
        id: question.id,
        libelle: question.libelle,
        reponse: this.determineReponse(question),
        description: this.determineDescription(question.thematique),
      })),
    );
  }

  private determineReponse(question: Question) {
    if (question.type === 'mosaic_boolean')
      return (question.reponses as ReponseMosaic<boolean>).reponse
        .filter(r => r.valeur)
        .map(value => value.label)
        .join(' - ');
    else if (question.type === 'choix_multiple' || question.type === 'choix_unique') {
      return (question.reponses as ReponseMultiples).reponse
        .filter(r => r.estSelectionnee)
        .map(value => value.label)
        .join(' - ');
    } else {
      return (question.reponses as ReponseKYCSimple).reponse.join(' - ');
    }
  }

  private determineDescription(thematique: ThematiqueQuestion) {
    switch (thematique) {
      case ThematiqueQuestion.ALIMENTATION:
        return "Ces informations permettent à <span class='text--italic'>J'agis</span> de mieux comprendre vos habitudes alimentaires";
      case ThematiqueQuestion.TRANSPORT:
        return "Ces informations permettent à <span class='text--italic'>J'agis</span> de mieux vous conseiller en matière de mobilité";
      case ThematiqueQuestion.LOGEMENT:
        return "Ces informations permettent à <span class='text--italic'>J'agis</span> de mieux vous conseiller sur les aides auxquelles vous pourriez avoir droit";
      case ThematiqueQuestion.DECHET:
        return "Ces informations permettent à <span class='text--italic'>J'agis</span> de mieux vous conseiller en matière de gestion des déchets et d'alimentation";
      default:
        return 'Dites-nous en plus sur vous pour que le service vous recommande des actions plus personnalisées.';
    }
  }
}
