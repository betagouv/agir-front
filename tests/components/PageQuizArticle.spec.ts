import { fireEvent, render } from '@testing-library/vue';
import PageQuizComposant from '@/components/custom/Quiz/PageQuizComposant.vue';
import { QuizViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
import { ArticleDuQuiz } from '@/quiz/ports/quizRepository';
import { EnvoyerDonneesQuizInteractionUsecase } from '@/quiz/envoyerDonneesQuizInteraction.usecase';

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

describe('Page Quiz Article', () => {
  it("affiche le titre, une question, ses réponses possibles et un bouton 'Valider' disable", () => {
    const { getByRole, getAllByRole } = render(PageQuizComposant, { props: pageQuizComposantprops });
    const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });

    expect(getByRole('heading', { name: 'Une question sur la thématique Climat', level: 1 })).toBeDefined();
    expect(getByRole('group', { name: "Quel est le principal avantage de l'agriculture biologique ?" })).toBeDefined();
    expect(getByRole('radio', { name: '1' })).toBeDefined();
    expect(getByRole('radio', { name: '2' })).toBeDefined();
    expect(getByRole('radio', { name: '3' })).toBeDefined();
    expect(getByRole('radio', { name: '4' })).toBeDefined();
    expect(getAllByRole('radio')).toHaveLength(4);
    expect(boutonValider.disabled).toBeTruthy();
  });

  describe("quand l'utilisateur répond à une question", () => {
    it("le bouton 'Valider' devient enable", async () => {
      const { getByRole } = render(PageQuizComposant, { props: pageQuizComposantprops });
      const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
      const reponseUn = getByRole('radio', { name: '1' });

      await fireEvent.click(reponseUn);
      expect(boutonValider.disabled).toBeFalsy();
    });

    describe("quand je clique sur le bouton 'Valider'", () => {
      it("les radios deviennent disable et affiche un bouton pour retourner à l'accueil", async () => {
        const { getAllByRole, getByRole, getByText } = render(PageQuizComposant, { props: pageQuizComposantprops });
        const radiosButton = getAllByRole<HTMLInputElement>('radio');
        const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
        const reponseUn = getByRole('radio', { name: '1' });

        await fireEvent.click(reponseUn);
        await fireEvent.click(boutonValider);

        radiosButton.forEach(radio => {
          expect(radio.disabled).toBeTruthy();
        });

        expect(getByText("Revenir à l'accueil")).toBeDefined();
      });

      describe('quand la réponse est correcte', () => {
        it('affiche un message de félicitations, le gain de points et la description reponse OK', async () => {
          const { getByRole, getByText, getByAltText } = render(PageQuizComposant, { props: pageQuizComposantprops });
          const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
          const reponseUn = getByRole('radio', { name: '1' });

          await fireEvent.click(reponseUn);
          await fireEvent.click(boutonValider);

          expect(getByText('Bien joué !')).toBeDefined();
          expect(getByText('Vous récoltez')).toBeDefined();
          expect(getByText('+10')).toBeDefined();
          expect(getByAltText('points')).toBeDefined();
          expect(getByRole('heading', { name: 'Pourquoi ?' })).toBeDefined();
          expect(getByText('Lorem texte explication OK')).toBeDefined();
        });

        it('appel le usecase EnvoyerDonneesQuizInteractionUsecase avec les bonnes données', async () => {
          const envoyerDonneesQuizInteractionUsecaseMock = vi
            .spyOn(EnvoyerDonneesQuizInteractionUsecase.prototype, 'execute')
            .mockImplementation(() => Promise.resolve());

          const { getByRole } = render(PageQuizComposant, { props: pageQuizComposantprops });
          const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
          const reponseUn = getByRole('radio', { name: '1' });

          await fireEvent.click(reponseUn);
          await fireEvent.click(boutonValider);

          expect(envoyerDonneesQuizInteractionUsecaseMock).toHaveBeenNthCalledWith(
            1,
            'idUtilisateur',
            'idQuiz',
            100,
            null
          );
        });
      });

      describe('quand la réponse est incorrecte', () => {
        it('affiche la description reponse KO', async () => {
          const { getByRole, getByText } = render(PageQuizComposant, { props: pageQuizComposantprops });
          const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
          const reponseUn = getByRole('radio', { name: '2' });

          await fireEvent.click(reponseUn);
          await fireEvent.click(boutonValider);

          expect(getByRole('heading', { name: 'Pourquoi ?' })).toBeDefined();
          expect(getByText('Lorem texte explication KO')).toBeDefined();
        });

        it('appel le usecase EnvoyerDonneesQuizInteractionUsecase avec les bonnes données', async () => {
          const envoyerDonneesQuizInteractionUsecaseMock = vi
            .spyOn(EnvoyerDonneesQuizInteractionUsecase.prototype, 'execute')
            .mockImplementation(() => Promise.resolve());

          const { getByRole } = render(PageQuizComposant, { props: pageQuizComposantprops });
          const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
          const reponseUn = getByRole('radio', { name: '2' });

          await fireEvent.click(reponseUn);
          await fireEvent.click(boutonValider);

          expect(envoyerDonneesQuizInteractionUsecaseMock).toHaveBeenNthCalledWith(
            1,
            'idUtilisateur',
            'idQuiz',
            0,
            null
          );
        });
      });
    });
  });
});
