import { QuestionViewModelBuilder } from '@/domaines/kyc/adapters/question.base.presenter';
import { QuestionPresenter } from '@/domaines/kyc/ports/question.presenter';
import { QuestionMetaData } from '@/domaines/kyc/recupererQuestion.usecase';

export interface ReponsePossibleViewModel {
  id: string;
  label: string;
  picto?: string;
  checked?: boolean;
  emoji?: string;
  unite?: {
    abreviation: string;
    libelleLong: string;
  };
}

export interface QuestionViewModel {
  id: string;
  libelle: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique' | 'mosaic_boolean' | 'entier' | 'decimal';
  reponses_possibles: ReponsePossibleViewModel[];
  points: string;
  aDejaEteRepondu: boolean;
  description: string;
  etapeCourante: number;
  nombreTotalDeQuestions: number;
}

export class QuestionPresenterImpl implements QuestionPresenter {
  constructor(
    private readonly callBackQuestion: (viewModel: QuestionViewModel) => void,
    private readonly callBackFinAtteinte: (finAtteinte: boolean) => void,
  ) {}

  presente(question: QuestionMetaData) {
    this.callBackQuestion(QuestionViewModelBuilder.buildFromQuestion(question));
    this.callBackFinAtteinte(false);
  }

  finAtteinte() {
    this.callBackFinAtteinte(true);
  }
}
