import { ExplicationsRecommandation } from '@/domaines/actions/explicationsRecommandation';
import {
  ActionBilanViewModel,
  ActionClassiqueViewModel,
  ActionPresenter,
  ActionQuizzesViewModel,
  ActionSimulateurViewModel,
  ExplicationRecommandationViewModel,
} from '@/domaines/actions/ports/action.presenter';
import { ActionDetail } from '@/domaines/actions/ports/actions.repository';
import marked from '@/shell/actionMarkdownToHtml';
import { buildUrl } from '@/shell/buildUrl';
import cacherEmojisAuxLecteursDecrans from '@/shell/cacherEmojisAuxLecteursDecrans';
import { nettoyerEtGarderContenuTextuel } from '@/shell/nettoyerEtGarderContenuTextuel';
import { nettoyerEtGarderLettresEtChiffres } from '@/shell/nettoyerEtGarderLettresEtChiffres';
import { MontantAfficheEnFRBuilder } from '@/shell/nombreAfficheEnFRBuilder';

class ActionViewModelBuilder {
  static async buildClassique(action: ActionDetail): Promise<ActionClassiqueViewModel> {
    const common = await this.buildCommonFields(action);
    const [astuces, faq] = await Promise.all([
      marked.parse(action.corps.astuces ?? ''),
      Promise.all(
        action.faq.map(async faq => ({
          question: faq.question,
          reponse: await marked.parseInline(faq.reponse),
        })),
      ),
    ]);

    return {
      ...common,
      titreAffiche: common.titre,
      commune: action.commune,
      astuces: cacherEmojisAuxLecteursDecrans(astuces),
      articlesRecommandes: action.articles.map(article => ({
        titre: article.titre,
        image: article.image,
        url: `/article/${buildUrl(article.titre)}/${article.id}`,
      })),
      services: action.services,
      aides: this.buildAides(action.aides),
      faq,
    };
  }

  static async buildQuiz(action: ActionDetail): Promise<ActionQuizzesViewModel> {
    const common = await this.buildCommonFields(action);
    return {
      ...common,
      titreAffiche: `Quiz - ${common.titre}`,
      quizzes: action.quizzes!.map(quiz => ({
        id: quiz.id,
        nombreDePointsAGagner: quiz.nombreDePointsAGagner.toString(),
        titre: quiz.titre,
        question: {
          intitule: quiz.questions[0].intitule,
          reponsesPossibles: quiz.questions[0].reponsesPossibles.map(reponse => ({
            label: reponse,
            value: nettoyerEtGarderLettresEtChiffres(reponse),
          })),
          ordre: quiz.questions[0].ordre,
          texteExplicationOK: quiz.questions[0].texteExplicationOK,
          texteExplicationKO: quiz.questions[0].texteExplicationKO,
          solution: nettoyerEtGarderLettresEtChiffres(quiz.questions[0].solution),
        },
        articleAssocie: quiz.articleAssocie?.id
          ? {
              id: quiz.articleAssocie?.id,
              contenu: cacherEmojisAuxLecteursDecrans(quiz.articleAssocie?.contenu ?? ''),
              sources: quiz.articleAssocie?.sources,
            }
          : null,
      })),
      quizzFelicitations: action.quizzFelicitations,
      articlesRecommandes: action.articles.map(article => ({
        titre: article.titre,
        image: article.image,
        url: `/article/${buildUrl(article.titre)}/${article.id}`,
      })),
    };
  }

  static async buildSimulateur(action: ActionDetail): Promise<ActionSimulateurViewModel> {
    const common = await this.buildCommonFields(action);
    return {
      ...common,
      titreAffiche: `Simulateur - ${common.titre}`,
      aides: this.buildAides(action.aides),
      articlesRecommandes: action.articles.map(article => ({
        titre: article.titre,
        image: article.image,
        url: `/article/${buildUrl(article.titre)}/${article.id}`,
      })),
      idEnchainementKYCs: action.idEnchainementKYCs,
    };
  }

  static async buildBilan(action: ActionDetail): Promise<ActionBilanViewModel> {
    const common = await this.buildCommonFields(action);
    return {
      ...common,
      titreAffiche: common.titre,
      aides: this.buildAides(action.aides),
      articlesRecommandes: action.articles.map(article => ({
        titre: article.titre,
        image: article.image,
        url: `/article/${buildUrl(article.titre)}/${article.id}`,
      })),
      idEnchainementKYCs: action.idEnchainementKYCs,
      thematique: action.thematique,
    };
  }

  private static async buildCommonFields(action: ActionDetail) {
    const [titre, sousTitre, introduction, labelCompteur] = await Promise.all([
      marked.parseInline(action.titre),
      marked.parseInline(action.sousTitre ?? ''),
      marked.parse(action.corps.introduction ?? ''),
      marked.parseInline(action.labelCompteur ?? ''),
    ]);
    const emoji = action.emoji ? `${cacherEmojisAuxLecteursDecrans(action.emoji)} ` : '';

    return {
      titre: `${emoji}${titre}`,
      sousTitre,
      introduction: cacherEmojisAuxLecteursDecrans(introduction),
      titrePropre: nettoyerEtGarderContenuTextuel(action.titre),
      realisee: action.realisee,
      nombreDeRealisations: action.nombreDeRealisations,
      actionId: action.code,
      points: action.points,
      consigne: action.consigne,
      labelCompteur,
      sources: action.sources.map(source => ({
        label: source.label,
        url: source.url,
      })),
      explicationsRecommandation: this.buildExplicationsRecommandations(action.explicationsRecommandations),
    };
  }

  private static buildAides(aides: ActionDetail['aides']) {
    return aides.map(aide => ({
      titre: aide.titre,
      titreUrl: buildUrl(aide.titre),
      id: aide.id,
      partenaireNom: aide.partenaireNom,
      partenaireImg: aide.partenaireImg,
      montantMaximum: aide.montantMaximum ? `${MontantAfficheEnFRBuilder.build(aide.montantMaximum)}` : undefined,
      estGratuit: aide.estGratuit,
    }));
  }

  private static buildExplicationsRecommandations(
    explicationsRecommandations: ExplicationsRecommandation,
  ): ExplicationRecommandationViewModel | undefined {
    if (!explicationsRecommandations.doiventEtreAffiches()) {
      return undefined;
    }

    return {
      titre: '<span class="text--bold">Recommandée</span> pour vous car',
      justifications: explicationsRecommandations.explications.map(explicationInclusion => {
        return explicationInclusion.labelExplication;
      }),
    };
  }
}

export class ActionPresenterImpl implements ActionPresenter {
  constructor(
    private readonly actionClassiqueViewModel: (viewModel: ActionClassiqueViewModel) => void,
    private readonly actionQuizViewModel: (viewModel: ActionQuizzesViewModel) => void,
    private readonly actionSimulateurViewModel: (viewModel: ActionSimulateurViewModel) => void,
    private readonly actionBilanViewModel: (viewModel: ActionBilanViewModel) => void,
  ) {}

  async presenteActionClassique(action: ActionDetail) {
    this.actionClassiqueViewModel(await ActionViewModelBuilder.buildClassique(action));
  }

  async presenteActionQuiz(action: ActionDetail) {
    this.actionQuizViewModel(await ActionViewModelBuilder.buildQuiz(action));
  }

  async presenteActionSimulateur(action: ActionDetail) {
    this.actionSimulateurViewModel(await ActionViewModelBuilder.buildSimulateur(action));
  }

  async presenteActionBilan(action: ActionDetail) {
    this.actionBilanViewModel(await ActionViewModelBuilder.buildBilan(action));
  }
}
