import QuizReponseCorrecte from "../../../src/components/QuizReponseCorrecte.vue";
import { mount } from "@vue/test-utils";
import router from "../../../src/router";

describe("Lorsque l'utilisateur répond correctement à la question courante du quiz", () => {
  describe("Dans le cas d'un quiz non terminé", () => {
    test("Si l'utilisateur sélectionne une bonne réponse, on affiche un texte de félicitation ainsi q'un bouton continuer", async () => {
      // GIVEN
      const wrapper = mount(QuizReponseCorrecte, {
        props: {
          etapeCourante: 1,
          getScore: "5",
          leQuizContientAuMoinsUneReponseIncorrecte: true,
          quizViewModel: {
            titre: "tire",
            questions: [
              {
                id: "id_question_0",
                intitule: "intitule",
                reponsesPossibles: ["reponse 1", "reponse 2"],
                ordre: 1,
                texteExplication: "so bad",
                solution: "reponse 1",
              },
              {
                id: "id_question_1",
                intitule: "intitule_1",
                reponsesPossibles: ["reponse a", "reponse b"],
                ordre: 2,
                texteExplication: "Eh non",
                solution: "reponse a",
              },
            ],
            steps: "2",
          },
          etatReponseCourante: "REPONSE_CORRECTE",
        },
        global: { plugins: [router] },
      });

      // WHEN
      const boutonContinuer = wrapper.find("button");
      await wrapper.find("button").trigger("click");

      // THEN
      expect(wrapper.text()).toContain("Bien joué !");
      expect(wrapper.text()).toContain("Vous avez donné la bonne réponse");
      expect(boutonContinuer.text()).toBe("Continuer");
      const questionSuivanteEvent = wrapper.emitted("question-suivante");
      expect(questionSuivanteEvent[0]).toEqual([2, "ETAT_INITIAL"]);
    });
  });

  describe("Dans le cas d'un quiz terminé", () => {
    test("Si l'utilisateur a sélectionné que des bonnes réponses, on affiche un texte de félicitation, le nombre de points obtenus ainsi q'un bouton retour au coach", async () => {
      // GIVEN
      const wrapper = mount(QuizReponseCorrecte, {
        props: {
          etapeCourante: 2,
          getScore: "5",
          leQuizContientAuMoinsUneReponseIncorrecte: false,
          quizViewModel: {
            titre: "titre",
            questions: [
              {
                id: "id_question_0",
                intitule: "intitule",
                reponsesPossibles: ["reponse 1", "reponse 2"],
                ordre: 1,
                texteExplication: "so bad",
                solution: "reponse 1",
              },
              {
                id: "id_question_1",
                intitule: "intitule_1",
                reponsesPossibles: ["reponse a", "reponse b"],
                ordre: 2,
                texteExplication: "Eh non",
                solution: "reponse a",
              },
            ],
            steps: "4",
          },
          etatReponseCourante: "REPONSE_CORRECTE",
        },
        global: { plugins: [router] },
      });

      // WHEN
      const boutonRetourAuCoach = wrapper.find("a");

      // THEN
      expect(wrapper.text()).toContain("Bien joué !");
      expect(wrapper.text()).toContain("Vous avez donné la bonne réponse");
      expect(wrapper.text()).toContain("+ 5 points");
      expect(boutonRetourAuCoach.text()).toBe("Revenir au coach");
    });

    test("Si l'utilisateur a sélectionné au moins une mauvaise réponse, on affiche un texte de défaite ainsi q'un bouton retour au coach", async () => {
      // GIVEN
      const wrapper = mount(QuizReponseCorrecte, {
        props: {
          etapeCourante: 2,
          getScore: "5",
          leQuizContientAuMoinsUneReponseIncorrecte: true,
          quizViewModel: {
            titre: "titre",
            questions: [
              {
                id: "id_question_0",
                intitule: "intitule",
                reponsesPossibles: ["reponse 1", "reponse 2"],
                ordre: 1,
                texteExplication: "so bad",
                solution: "reponse 2",
              },
              {
                id: "id_question_1",
                intitule: "intitule_1",
                reponsesPossibles: ["reponse a", "reponse b"],
                ordre: 2,
                texteExplication: "Eh non",
                solution: "reponse a",
              },
            ],
            steps: "4",
          },
          etatReponseCourante: "REPONSE_CORRECTE",
        },
        global: { plugins: [router] },
      });

      // WHEN
      const boutonRetourAuCoach = wrapper.find("a");

      // THEN
      expect(wrapper.text()).toContain("Bien joué !");
      expect(wrapper.text()).toContain("Vous avez donné la bonne réponse");
      expect(wrapper.text()).toContain("Désolé, Vous avez perdu !");
      expect(boutonRetourAuCoach.text()).toBe("Revenir au coach");
    });
  });
});
