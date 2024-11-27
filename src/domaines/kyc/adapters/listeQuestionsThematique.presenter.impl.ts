import { QuestionViewModelBuilder } from '@/domaines/kyc/adapters/question.base.presenter';
import { ListeQuestionsPresenter } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { Question } from '@/domaines/kyc/recupererQuestion.usecase';

export interface ReponsePossibleViewModel {
  id: string;
  label: string;
  picto?: string;
  checked?: boolean;
  emoji?: string;
}

export interface QuestionsViewModel {
  questions: QuestionViewModel[];
  phrasePointAGagner: string;
}

export interface QuestionViewModel {
  id: string;
  libelle: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique' | 'mosaic_boolean' | 'entier';
  reponses_possibles: ReponsePossibleViewModel[];
  points: string;
  aDejaEteRepondu: boolean;
  description: string;
}

export class ListesQuestionsThematiquePresenter implements ListeQuestionsPresenter {
  constructor(private readonly questionViewModel: (viewModel: QuestionsViewModel) => void) {}

  presente(questions: Question[]) {
    this.questionViewModel({
      questions: questions.map(question => QuestionViewModelBuilder.buildFromQuestion(question)),
      phrasePointAGagner: `Vous avez remporté ${questions.reduce((acc, question) => acc + question.points, 0)}`,
    });
  }
}
