import { render, fireEvent } from '@testing-library/vue';
import Quiz from '../../src/components/custom/Quiz.vue';
import { QuizViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
import { vi, describe, it, SpyInstance } from 'vitest';
import { EnvoyerDonneesQuizInteractionUsecase } from '@/quiz/envoyerDonneesQuizInteraction.usecase';

const quizzViewModelMock: QuizViewModel = {
  titre: 'Titre du quizz',
  questions: [
    {
      id: 'id_question_0',
      intitule: 'Intitulé de la question 1',
      reponsesPossibles: ['reponse 1', 'reponse 2'],
      ordre: '1',
      texteExplicationOK: 'Texte explication question 1 OK',
      texteExplicationKO: 'Texte explication question 1 KO',
      solution: 'reponse 1',
    },
    {
      id: 'id_question_1',
      intitule: 'Intitulé de la question 2',
      reponsesPossibles: ['reponse a', 'reponse b'],
      ordre: '2',
      texteExplicationOK: 'Texte explication question 2 OK',
      texteExplicationKO: 'Texte explication question 2 KO',
      solution: 'reponse a',
    },
  ],
  steps: '',
};

const props = {
  quizViewModel: quizzViewModelMock,
  nombreDePointsAGagner: '10',
  idUtilisateur: 'idUtilisateur',
  idInteraction: 'idInteraction',
  isModePrevisualisation: false,
};

describe('Quizz', () => {
  let envoyerDonneesQuizInteractionMock: SpyInstance<[string, string, number, number], Promise<void>>;

  beforeEach(() => {
    envoyerDonneesQuizInteractionMock = vi
      .spyOn(EnvoyerDonneesQuizInteractionUsecase.prototype, 'execute')
      .mockImplementation(
        (_utilisateurId: string, _interactionId: string, _nombreDeBonnesReponses: number, _nombreDeQuestions: number) =>
          Promise.resolve()
      );
  });

  it("affiche l'étape 1 avec la question, les réponses et le bouton 'Valider' disable", () => {
    // GIVEN
    const { getByRole, getAllByRole } = render(Quiz, { props });

    // WHEN
    const titreEtape = getByRole('heading', { level: 2, name: 'Étape 1 sur 3 Question 1 sur 2' });
    const intituleQuestion1 = getByRole('group', { name: 'Intitulé de la question 1' });
    const radios = getAllByRole('radio');
    const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });

    // THEN
    expect(intituleQuestion1).toBeDefined();
    expect(titreEtape).toBeDefined();
    expect(boutonValider.disabled).toBeTruthy();
    expect(radios).toHaveLength(2);
  });

  describe('quand je clique sur une réponse', () => {
    it("le bouton 'Valider' devient enable", async () => {
      // GIVEN
      const { getByRole, getAllByRole } = render(Quiz, { props });

      // WHEN
      const radios = getAllByRole('radio');
      await fireEvent.click(radios[0]);
      const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });

      // THEN
      expect(boutonValider.disabled).toBeFalsy();
    });

    describe('quand je clique sur le bouton Valider', () => {
      it("affiche la réponse et le bouton 'Passer à l'étape suivante'", async () => {
        // GIVEN
        const { getByRole, getAllByRole, getByText } = render(Quiz, { props });

        // WHEN
        const radios = getAllByRole('radio');
        const BONNE_REPONSE = radios[0];
        await fireEvent.click(BONNE_REPONSE);
        const boutonValider = getByRole('button', { name: 'Valider' });
        await fireEvent.click(boutonValider);
        const explication = getByText('Texte explication question 1 OK');
        const boutonEtapeSuivante = getByRole('button', { name: "Passer à l'étape suivante" });

        // THEN
        expect(explication).toBeDefined();
        expect(boutonEtapeSuivante).toBeDefined();
      });

      describe('quand la réponse est incorrect', () => {
        it("affiche un message d'erreur et le bouton 'Passer à l'étape suivante'", async () => {
          // GIVEN
          const { getByRole, getAllByRole, getByText } = render(Quiz, { props });

          // WHEN
          const radios = getAllByRole('radio');
          const MAUVAISE_REPONSE = radios[1];
          await fireEvent.click(MAUVAISE_REPONSE);
          const boutonValider = getByRole('button', { name: 'Valider' });
          await fireEvent.click(boutonValider);
          const messageErreur = getByText('Votre réponse: reponse 2');
          const explication = getByText('Texte explication question 1 KO');
          const boutonEtapeSuivante = getByRole('button', { name: "Passer à l'étape suivante" });

          // THEN
          expect(explication).toBeDefined();
          expect(messageErreur).toBeDefined();
          expect(boutonEtapeSuivante).toBeDefined();
        });
      });
    });
  });

  describe("quand je passe à l'étape suivante", () => {
    it("affiche l'étape 2 avec la question, les réponses et le bouton 'Valider' disable", async () => {
      // GIVEN
      const { getByRole, getAllByRole } = render(Quiz, { props });

      // WHEN
      const radios = getAllByRole('radio');
      await fireEvent.click(radios[1]);
      const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
      await fireEvent.click(boutonValider);
      const boutonEtapeSuivante = getByRole('button', { name: "Passer à l'étape suivante" });
      await fireEvent.click(boutonEtapeSuivante);
      const titreEtape = getByRole('heading', { level: 2, name: 'Étape 2 sur 3 Question 2 sur 2' });
      const boutonValider2 = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
      const intituleQuestion = getByRole('group', { name: 'Intitulé de la question 2' });

      // THEN
      expect(titreEtape).toBeDefined();
      expect(boutonValider2.disabled).toBeTruthy();
      expect(radios).toHaveLength(2);
      expect(intituleQuestion).toBeDefined();
    });
  });

  describe("quand j'arrive à la dernière étape", () => {
    describe('quand toutes les réponses sont corrects', () => {
      it('affiche un message de succès', async () => {
        // GIVEN
        const { getByRole, getAllByRole, getByText } = render(Quiz, { props });

        // WHEN
        const radios = getAllByRole('radio');
        const BONNE_REPONSE_1 = radios[0];
        await fireEvent.click(BONNE_REPONSE_1);
        const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
        await fireEvent.click(boutonValider);
        const boutonEtapeSuivante = getByRole('button', { name: "Passer à l'étape suivante" });
        await fireEvent.click(boutonEtapeSuivante);
        const radios2 = getAllByRole('radio');
        const BONNE_REPONSE_2 = radios2[0];
        await fireEvent.click(BONNE_REPONSE_2);
        const boutonValider2 = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
        await fireEvent.click(boutonValider2);
        const boutonEtapeSuivante2 = getByRole('button', { name: "Passer à l'étape suivante" });
        await fireEvent.click(boutonEtapeSuivante2);

        const messageSuccès = getByText('Bravo, vous avez réussi le quiz !', { exact: false });

        // THEN
        expect(messageSuccès).toBeDefined();
      });
    });

    describe('quand au moins une réponse est incorrecte', () => {
      it("affiche un message d'échec", async () => {
        // GIVEN
        const { getByRole, getAllByRole, getByText } = render(Quiz, { props });

        // WHEN
        const radios = getAllByRole('radio');
        const BONNE_REPONSE = radios[0];
        await fireEvent.click(BONNE_REPONSE);
        const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
        await fireEvent.click(boutonValider);
        const boutonEtapeSuivante = getByRole('button', { name: "Passer à l'étape suivante" });
        await fireEvent.click(boutonEtapeSuivante);
        const radios2 = getAllByRole('radio');
        const MAUVAUSE_REPONSE = radios2[1];
        await fireEvent.click(MAUVAUSE_REPONSE);
        const boutonValider2 = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
        await fireEvent.click(boutonValider2);
        const boutonEtapeSuivante2 = getByRole('button', { name: "Passer à l'étape suivante" });
        await fireEvent.click(boutonEtapeSuivante2);

        const messageSuccès = getByText('Désolé, Vous avez perdu !');

        // THEN
        expect(messageSuccès).toBeDefined();
      });
    });

    it("appel le usecase envoyer les donnees du quizz à l'intéraction avec l'id de l'utilisateur, l'id de l'interaction et son pourcentage de bonnes réponses si le quiz n'est pas en mode preview", async () => {
      // GIVEN
      const props = {
        quizViewModel: quizzViewModelMock,
        nombreDePointsAGagner: '10',
        idUtilisateur: 'idUtilisateur',
        idInteraction: 'idInteraction',
        isModePrevisualisation: false,
      };
      const { getByRole, getAllByRole } = render(Quiz, { props });

      // WHEN
      const radios = getAllByRole('radio');
      const BONNE_REPONSE = radios[0];
      await fireEvent.click(BONNE_REPONSE);
      const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
      await fireEvent.click(boutonValider);
      const boutonEtapeSuivante = getByRole('button', { name: "Passer à l'étape suivante" });
      await fireEvent.click(boutonEtapeSuivante);
      const radios2 = getAllByRole('radio');
      const MAUVAUSE_REPONSE = radios2[1];
      await fireEvent.click(MAUVAUSE_REPONSE);
      const boutonValider2 = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
      await fireEvent.click(boutonValider2);
      const boutonEtapeSuivante2 = getByRole('button', { name: "Passer à l'étape suivante" });
      await fireEvent.click(boutonEtapeSuivante2);

      // THEN
      expect(envoyerDonneesQuizInteractionMock).toHaveBeenNthCalledWith(1, 'idUtilisateur', 'idInteraction', 1, 2);
    });
    it("si le quizz est en mode preview ne doit pas appeler le usecase d'envoi des données du quizz", async () => {
      // GIVEN
      const props = {
        quizViewModel: quizzViewModelMock,
        nombreDePointsAGagner: '10',
        idUtilisateur: 'idUtilisateur',
        idInteraction: 'idInteraction',
        isModePrevisualisation: true,
      };
      const { getByRole, getAllByRole } = render(Quiz, { props });

      // WHEN
      const radios = getAllByRole('radio');
      const BONNE_REPONSE = radios[0];
      await fireEvent.click(BONNE_REPONSE);
      const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
      await fireEvent.click(boutonValider);
      const boutonEtapeSuivante = getByRole('button', { name: "Passer à l'étape suivante" });
      await fireEvent.click(boutonEtapeSuivante);
      const radios2 = getAllByRole('radio');
      const MAUVAUSE_REPONSE = radios2[1];
      await fireEvent.click(MAUVAUSE_REPONSE);
      const boutonValider2 = getByRole<HTMLButtonElement>('button', { name: 'Valider' });
      await fireEvent.click(boutonValider2);
      const boutonEtapeSuivante2 = getByRole('button', { name: "Passer à l'étape suivante" });
      await fireEvent.click(boutonEtapeSuivante2);

      // THEN
      expect(envoyerDonneesQuizInteractionMock).not.toHaveBeenCalledWith(1, 'idUtilisateur', 'idInteraction', 1, 2);
    });
  });
});
