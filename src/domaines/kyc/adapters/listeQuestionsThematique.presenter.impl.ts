import { ListeQuestionsPresenter } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { Question, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestionUsecase';

export interface ReponsePossible {
  id: string;
  label: string;
}

export interface QuestionsViewModel {
  questions: QuestionViewModel[];
  phrasePointAGagner: string;
}

export interface QuestionViewModel {
  id: string;
  libelle: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique';
  reponses_possibles: ReponsePossible[];
  points: string;
  reponses: string[];
  aDejaEteRepondu: boolean;
  description: string;
}

export class ListesQuestionsThematiquePresenter implements ListeQuestionsPresenter {
  constructor(private readonly questionViewModel: (viewModel: QuestionsViewModel) => void) {}

  presente(questions: Question[]) {
    this.questionViewModel({
      questions: questions.map(question => ({
        id: question.id,
        libelle: question.libelle,
        type: question.type,
        points: `Récoltez vos + ${question.points} points`,
        reponses_possibles: question.reponses_possibles.map(reponse => ({
          id: reponse,
          label: reponse,
        })),
        reponses: question.reponse,
        aDejaEteRepondu: question.reponse?.length > 0,
        description: this.determineDescription(question.thematique),
      })),
      phrasePointAGagner: `Vous avez remporté ${questions.reduce((accumulator, question: Question) => accumulator + question.points, 0)}`,
    });
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
