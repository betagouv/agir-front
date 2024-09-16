import { QuestionPresenter } from '@/domaines/kyc/ports/question.presenter';
import {
  Question,
  QuestionChoixMultiple,
  QuestionChoixUnique,
  QuestionLibre,
  QuestionMosaicBoolean,
  ThematiqueQuestion,
} from '@/domaines/kyc/recupererQuestionUsecase';

export interface ReponsePossible {
  id: string;
  label: string;
}

export interface QuestionViewModel {
  id: string;
  libelle: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique' | 'mosaic_boolean';
  reponses_possibles: ReponsePossible[];
  points: string;
  reponses: string[];
  aDejaEteRepondu: boolean;
  description: string;
}

export class QuestionPresenterImpl implements QuestionPresenter {
  constructor(private readonly questionViewModel: (viewModel: QuestionViewModel) => void) {}

  presente(question: Question) {
    this.questionViewModel({
      id: question.id,
      libelle: question.libelle,
      type: question.type,
      points: `Récoltez vos + ${question.points} points`,
      reponses_possibles: this.determineReponsePossibles(question),
      reponses: this.determineReponse(question),
      aDejaEteRepondu: false,
      description: this.determineDescription(question.thematique),
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

  private determineReponsePossibles(question: Question): ReponsePossible[] {
    switch (question.type) {
      case 'libre':
        return (question.question as QuestionLibre).reponses_possibles.map(reponse => ({
          id: reponse,
          label: reponse,
        }));

      case 'choix_unique':
        return (question.question as QuestionChoixUnique).reponses_possibles.map(reponse => ({
          id: reponse,
          label: reponse,
        }));
      case 'choix_multiple':
        return (question.question as QuestionChoixMultiple).reponses_possibles.map(reponse => ({
          id: reponse,
          label: reponse,
        }));
      case 'mosaic_boolean':
        return (question.question as QuestionMosaicBoolean).reponse.map(reponse => ({
          id: reponse.code,
          label: reponse.label,
        }));
    }
  }

  private determineReponse(question: Question): string[] {
    switch (question.type) {
      case 'libre':
        return (question.question as QuestionLibre).reponse;
      case 'choix_unique':
        return (question.question as QuestionChoixUnique).reponse || [];
      case 'choix_multiple':
        return (question.question as QuestionChoixMultiple).reponse;
      case 'mosaic_boolean':
        return (question.question as QuestionMosaicBoolean).reponse.map(reponse => reponse.boolean_value.toString());
    }
  }
}
