import { QuestionViewModelBuilder } from '@/domaines/kyc/adapters/question.base.presenter';
import { ListeQuestionsPresenter } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { Question } from '@/domaines/kyc/recupererQuestionUsecase';

export interface ReponsePossibleViewModel {
  id: string;
  label: string;
  picto?: string;
}

export interface QuestionsViewModel {
  questions: QuestionViewModel[];
  phrasePointAGagner: string;
}

export interface QuestionViewModel {
  id: string;
  libelle: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique' | 'mosaic_boolean';
  reponses_possibles: ReponsePossibleViewModel[];
  points: string;
  reponses: string[];
  aDejaEteRepondu: boolean;
  description: string;
}

export class ListesQuestionsThematiquePresenter implements ListeQuestionsPresenter {
  constructor(private readonly questionViewModel: (viewModel: QuestionsViewModel) => void) {}

  presente(questions: Question[]) {
    this.questionViewModel({
      questions: questions.map(question => QuestionViewModelBuilder.build(question)),
      phrasePointAGagner: `Vous avez remporté ${questions.reduce((acc, question) => acc + question.points, 0)}`,
    });
  }
}
