import { fireEvent, render } from '@testing-library/vue';
import PageQuizComposant from '@/components/custom/Quiz/PageQuizComposant.vue';
import { QuizViewModel } from '@/domaines/quiz/adapters/chargementQuiz.presenter.impl';
import { ArticleDuQuiz } from '@/domaines/quiz/ports/quizRepository';
import { EnvoyerDonneesQuizInteractionUsecase } from '@/domaines/quiz/envoyerDonneesQuizInteraction.usecase';

const quizViewModel: QuizViewModel = {
  titre: 'A quoi ça sert de manger bio ?',
  thematique: 'Climat',
  difficulte: '1',
  nombreDePointsAGagner: '10',
  question: {
    id: '1',
    intitule: "Quel est le principal avantage de l'agriculture biologique ?",
    reponsesPossibles: ['1', '2', '3', '4'],
    ordre: '0',
    texteExplicationOK: 'Lorem texte explication OK',
    texteExplicationKO: 'Lorem texte explication KO',
    solution: '1',
  },
  articleAssocie: null,
};

const pageQuizComposantprops: {
  quizViewModel: QuizViewModel;
  idUtilisateur: string;
  isModePrevisualisation: boolean;
  idQuiz: string;
  articleAssocie: ArticleDuQuiz | null;
} = {
  quizViewModel: quizViewModel,
  idUtilisateur: 'idUtilisateur',
  isModePrevisualisation: false,
  idQuiz: 'idQuiz',
  articleAssocie: null,
};

let page;
let boutonValider: HTMLButtonElement;
let bonneReponse: HTMLInputElement;
let mauvaiseReponse: HTMLInputElement;

describe('Page Quiz Article', () => {
  beforeEach(() => {
    vi.spyOn(EnvoyerDonneesQuizInteractionUsecase.prototype, 'execute').mockImplementation(() => Promise.resolve());
    page = render(PageQuizComposant, { props: pageQuizComposantprops });
    boutonValider = page.getByRole('button', { name: 'Valider' });
    bonneReponse = page.getByRole('radio', { name: '1' });
    mauvaiseReponse = page.getByRole('radio', { name: '2' });
  });

  it("affiche le titre, une question, ses réponses possibles et un bouton 'Valider' disable", () => {
    // WHEN THEN
    // GIVEN
    expect(page.getByRole('heading', { name: 'Une question sur la thématique Climat', level: 1 })).toBeDefined();
    expect(
      page.getByRole('group', { name: "Quel est le principal avantage de l'agriculture biologique ?" }),
    ).toBeDefined();
    expect(page.getByRole('radio', { name: '1' })).toBeDefined();
    expect(page.getByRole('radio', { name: '2' })).toBeDefined();
    expect(page.getByRole('radio', { name: '3' })).toBeDefined();
    expect(page.getByRole('radio', { name: '4' })).toBeDefined();
    expect(page.getAllByRole('radio')).toHaveLength(4);
    expect(boutonValider.disabled).toBeTruthy();
  });

  describe("quand l'utilisateur répond à une question", () => {
    it("le bouton 'Valider' devient enable", async () => {
      // WHEN
      // THEN
      await fireEvent.click(bonneReponse);

      // GIVEN
      expect(boutonValider.disabled).toBeFalsy();
    });

    describe("quand je clique sur le bouton 'Valider'", () => {
      it("les radios deviennent disable et affiche un bouton pour retourner à l'accueil", async () => {
        // WHEN
        // THEN
        const radiosButton = page.getAllByRole('radio');

        await fireEvent.click(bonneReponse);
        await fireEvent.click(boutonValider);

        // GIVEN
        radiosButton.forEach(radio => {
          expect(radio.disabled).toBeTruthy();
        });

        expect(page.getByText("Revenir à l'accueil")).toBeDefined();
      });

      describe('quand la réponse est correcte', () => {
        it('affiche un message de félicitations, le gain de points et la description reponse OK', async () => {
          // WHEN

          // THEN
          await fireEvent.click(bonneReponse);
          await fireEvent.click(boutonValider);

          // GIVEN
          expect(page.getByText('Bien joué !')).toBeDefined();
          expect(page.getByText('Vous récoltez')).toBeDefined();
          expect(page.getByText('+10')).toBeDefined();
          expect(page.getByAltText('points')).toBeDefined();
          expect(page.getByRole('heading', { name: 'Pourquoi ?' })).toBeDefined();
          expect(page.getByText('Lorem texte explication OK')).toBeDefined();
        });

        it('appel le usecase EnvoyerDonneesQuizInteractionUsecase avec les bonnes données', async () => {
          // WHEN
          const envoyerDonneesQuizInteractionUsecaseMock = vi
            .spyOn(EnvoyerDonneesQuizInteractionUsecase.prototype, 'execute')
            .mockImplementation(() => Promise.resolve());

          // THEN
          await fireEvent.click(bonneReponse);
          await fireEvent.click(boutonValider);

          // GIVEN
          expect(envoyerDonneesQuizInteractionUsecaseMock).toHaveBeenNthCalledWith(
            1,
            'idUtilisateur',
            'idQuiz',
            100,
            null,
          );
        });
      });

      describe('quand la réponse est incorrecte', () => {
        it('affiche la description reponse KO', async () => {
          // WHEN
          // THEN
          vi.spyOn(EnvoyerDonneesQuizInteractionUsecase.prototype, 'execute').mockImplementation(() =>
            Promise.resolve(),
          );
          await fireEvent.click(mauvaiseReponse);
          await fireEvent.click(boutonValider);

          // GIVEN
          expect(page.getByRole('heading', { name: 'Pourquoi ?' })).toBeDefined();
          expect(page.getByText('Lorem texte explication KO')).toBeDefined();
        });

        it('appel le usecase EnvoyerDonneesQuizInteractionUsecase avec les bonnes données', async () => {
          // WHEN
          const envoyerDonneesQuizInteractionUsecaseMock = vi
            .spyOn(EnvoyerDonneesQuizInteractionUsecase.prototype, 'execute')
            .mockImplementation(() => Promise.resolve());

          // THEN
          await fireEvent.click(mauvaiseReponse);
          await fireEvent.click(boutonValider);

          // GIVEN
          expect(envoyerDonneesQuizInteractionUsecaseMock).toHaveBeenNthCalledWith(
            1,
            'idUtilisateur',
            'idQuiz',
            0,
            null,
          );
        });
      });
    });
  });
});
