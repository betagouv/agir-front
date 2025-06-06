import { QuestionViewModel, ReponsePossibleViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';
import {
  Question,
  QuestionMetaData,
  ReponseKYCSimple,
  ReponseMosaic,
  ReponseMultiple,
  ThematiqueQuestion,
} from '@/domaines/kyc/recupererQuestion.usecase';

export class QuestionViewModelBuilder {
  private questionViewModel: Partial<QuestionViewModel> = {};

  static init(): QuestionViewModelBuilder {
    return new QuestionViewModelBuilder();
  }

  static buildFromQuestion(questionMetaData: QuestionMetaData): QuestionViewModel {
    const builder = QuestionViewModelBuilder.init();
    const question = questionMetaData.question;
    return builder
      .withId(question.id)
      .withLibelle(question.libelle)
      .withType(question.type)
      .withPoints(question.points)
      .withReponsesPossibles(builder.determineReponsePossibles(question))
      .withADejaEteRepondu(question.aEteRepondu)
      .withDescription(builder.determineDescription(question.thematique))
      .withEtapeCourante(questionMetaData.etapeCourante)
      .withNombreTotalDeQuestions(questionMetaData.nombreTotalDeQuestions)
      .build();
  }

  withEtapeCourante(etapeCourant: number): QuestionViewModelBuilder {
    this.questionViewModel.etapeCourante = etapeCourant;
    return this;
  }

  withNombreTotalDeQuestions(nombreTotalDeQuestion: number): QuestionViewModelBuilder {
    this.questionViewModel.nombreTotalDeQuestions = nombreTotalDeQuestion;
    return this;
  }

  withId(id: string): QuestionViewModelBuilder {
    this.questionViewModel.id = id;
    return this;
  }

  withLibelle(libelle: string): QuestionViewModelBuilder {
    this.questionViewModel.libelle = libelle;
    return this;
  }

  withType(
    type: 'libre' | 'choix_multiple' | 'choix_unique' | 'mosaic_boolean' | 'entier' | 'decimal',
  ): QuestionViewModelBuilder {
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

  private determineDescription(thematique: ThematiqueQuestion): string {
    switch (thematique) {
      case ThematiqueQuestion.ALIMENTATION:
        return "Ces informations permettent à <i>J'agis</i> de mieux comprendre vos habitudes alimentaires";
      case ThematiqueQuestion.TRANSPORT:
        return "Ces informations permettent à <i>J'agis</i> de mieux vous conseiller en matière de mobilité";
      case ThematiqueQuestion.LOGEMENT:
        return "Ces informations permettent à <i>J'agis</i> de mieux vous conseiller sur les aides auxquelles vous pourriez avoir droit";
      case ThematiqueQuestion.DECHET:
        return "Ces informations permettent à <i>J'agis</i> de mieux vous conseiller en matière de gestion des déchets et d'alimentation";
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
    } else if (question.type === 'choix_multiple' || question.type === 'choix_unique') {
      return (question.reponses as ReponseMultiple).reponse.map(reponse => ({
        id: reponse.code,
        label: reponse.label,
        checked: reponse.estSelectionnee,
      }));
    } else
      return (question.reponses as ReponseKYCSimple).reponses_possibles.map(reponse => ({
        id: reponse,
        label: reponse,
        unite: (question.reponses as ReponseKYCSimple).unite,
      }));
  }
}
