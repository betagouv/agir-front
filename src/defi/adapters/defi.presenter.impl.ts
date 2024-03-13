import { Question } from '@/kyc/recupererQuestionUsecase';
import { DefiPresenter } from '@/defi/ports/defi.presenter';

export interface ReponsePossible {
  id: string;
  label: string;
}
export interface DefiViewModel {
  id: string;
  libelle: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique';
  reponses_possibles: ReponsePossible[];
  points: string;
  reponses: string[];
}

export class DefiPresenterImpl implements DefiPresenter {
  constructor(private readonly questionViewModel: (viewModel: DefiViewModel) => void) {}

  presente(question: Question) {
    this.questionViewModel({
      id: question.id,
      libelle: question.libelle,
      type: question.type,
      points: `Récoltez vos + ${question.points} points`,
      reponses_possibles: question.reponses_possibles.map(reponse => ({
        id: reponse,
        label: reponse,
      })),
      reponses: question.reponse,
    });
  }
}
