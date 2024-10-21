import {
  QuestionViewModel,
  ReponsePossibleViewModel,
} from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
import { Question, ReponseKYCSimple, ReponseMosaic, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestionUsecase';

export class QuestionViewModelBuilder {
  private questionViewModel: Partial<QuestionViewModel> = {};

  static init(): QuestionViewModelBuilder {
    return new QuestionViewModelBuilder();
  }

  withId(id: string): QuestionViewModelBuilder {
    this.questionViewModel.id = id;
    return this;
  }

  withLibelle(libelle: string): QuestionViewModelBuilder {
    this.questionViewModel.libelle = libelle;
    return this;
  }

  withType(type: 'libre' | 'choix_multiple' | 'choix_unique' | 'mosaic_boolean' | 'entier'): QuestionViewModelBuilder {
    this.questionViewModel.type = type;
    return this;
  }

  withPoints(points: number): QuestionViewModelBuilder {
    this.questionViewModel.points = `Récoltez vos + ${points} points`;
    return this;
  }

  withReponsesPossibles(reponses: ReponsePossibleViewModel[]): QuestionViewModelBuilder {
    this.questionViewModel.reponses_possibles = reponses;
    return this;
  }

  withReponses(reponses: string[]): QuestionViewModelBuilder {
    this.questionViewModel.reponses = reponses;
    return this;
  }

  withADejaEteRepondu(aDejaEteRepondu: boolean): QuestionViewModelBuilder {
    this.questionViewModel.aDejaEteRepondu = aDejaEteRepondu;
    return this;
  }

  withDescription(description: string): QuestionViewModelBuilder {
    this.questionViewModel.description = description;
    return this;
  }

  build(): QuestionViewModel {
    return this.questionViewModel as QuestionViewModel;
  }

  static buildFromQuestion(question: Question): QuestionViewModel {
    const builder = QuestionViewModelBuilder.init();

    return builder
      .withId(question.id)
      .withLibelle(question.libelle)
      .withType(question.type)
      .withPoints(question.points)
      .withReponsesPossibles(builder.determineReponsePossibles(question))
      .withReponses(builder.determineReponse(question))
      .withADejaEteRepondu(question.aEteRepondu)
      .withDescription(builder.determineDescription(question.thematique))
      .build();
  }

  private determineDescription(thematique: ThematiqueQuestion): string {
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

  private determineReponsePossibles(question: Question): ReponsePossibleViewModel[] {
    if (question.type === 'mosaic_boolean') {
      return (question.reponses as ReponseMosaic<boolean>).reponse.map(reponse => ({
        id: reponse.code,
        label: reponse.label,
        picto: reponse.image_url,
        emoji: reponse.emoji,
        checked: reponse.valeur,
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
