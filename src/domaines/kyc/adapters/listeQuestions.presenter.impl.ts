import { ListeQuestionsPresenter, QuestionViewModel } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { Question, ReponseKYCSimple, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestionUsecase';

export class ListeQuestionsPresenterImpl implements ListeQuestionsPresenter {
  constructor(private readonly questionsViewModel: (viewModel: QuestionViewModel[]) => void) {}
  presente(questions: Question[]): void {
    this.questionsViewModel(
      questions.map<QuestionViewModel>(question => ({
        id: question.id,
        libelle: question.libelle,
        reponse: (question.reponses as ReponseKYCSimple).reponse.join(' - '),
        description: this.determineDescription(question.thematique),
      })),
    );
  }

  private determineDescription(thematique: ThematiqueQuestion) {
    switch (thematique) {
      case ThematiqueQuestion.ALIMENTATION:
        return 'Ces informations permettent à <span class="text--italic">Agir</span> de mieux comprendre vos habitudes alimentaires';
      case ThematiqueQuestion.TRANSPORT:
        return 'Ces informations permettent à <span class="text--italic">Agir</span> de mieux vous conseiller en matière de mobilité';
      case ThematiqueQuestion.LOGEMENT:
        return 'Ces informations permettent à <span class="text--italic">Agir</span> de mieux vous conseiller sur les aides auxquelles vous pourriez avoir droit';
      case ThematiqueQuestion.DECHET:
        return 'Ces informations permettent à <span class="text--italic">Agir</span> de mieux vous conseiller en matière de gestion des déchets et d\'alimentation';
      default:
        return 'Dites-nous en plus sur vous pour que le service vous recommande des actions plus personnalisées.';
    }
  }
}
