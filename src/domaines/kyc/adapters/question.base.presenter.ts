import {
  QuestionViewModel,
  ReponsePossibleViewModel,
} from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
import { Question, ReponseKYCSimple, ReponseMosaic, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestionUsecase';

export class QuestionViewModelBuilder {
  static build(question: Question): QuestionViewModel {
    const builder = new QuestionViewModelBuilder();
    return {
      id: question.id,
      libelle: question.libelle,
      type: question.type,
      points: `Récoltez vos + ${question.points} points`,
      reponses_possibles: builder.determineReponsePossibles(question),
      reponses: builder.determineReponse(question),
      aDejaEteRepondu: question.aEteRepondu,
      description: builder.determineDescription(question.thematique),
    };
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

  private determineReponsePossibles(question: Question): ReponsePossibleViewModel[] {
    if (question.type === 'mosaic_boolean') {
      return (question.reponses as ReponseMosaic<boolean>).reponse.map(reponse => ({
        id: reponse.code,
        label: reponse.label,
      }));
    } else {
      return (question.reponses as ReponseKYCSimple).reponses_possibles.map(reponse => ({
        id: reponse,
        label: reponse,
      }));
    }
  }

  private determineReponse(question: Question): string[] {
    if (question.type === 'mosaic_boolean') {
      return (question.reponses as ReponseMosaic<boolean>).reponse.map(reponse => reponse.valeur.toString());
    } else {
      return (question.reponses as ReponseKYCSimple).reponse;
    }
  }
}
