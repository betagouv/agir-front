import { ListeQuestionsPresenter, QuestionDansLeCompteViewModel } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { Question, ReponseKYCSimple, ReponseMosaic, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestionUsecase';

export class ListeQuestionsDansLeComptePresenter implements ListeQuestionsPresenter {
  constructor(private readonly questionsViewModel: (viewModel: QuestionDansLeCompteViewModel[]) => void) {}
  presente(questions: Question[]): void {
    this.questionsViewModel(
      questions.map<QuestionDansLeCompteViewModel>(question => ({
        id: question.id,
        libelle: question.libelle,
        reponse:
          question.type === 'mosaic_boolean'
            ? (question.reponses as ReponseMosaic<boolean>).reponse
                .filter(r => r.valeur)
                .map(value => value.label)
                .join(' - ')
            : (question.reponses as ReponseKYCSimple).reponse.join(' - '),
        description: this.determineDescription(question.thematique),
      })),
    );
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
