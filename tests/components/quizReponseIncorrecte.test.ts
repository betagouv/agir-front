import QuizReponseIncorrecte from "../../src/components/QuizReponseIncorrecte.vue";
import { mount } from "@vue/test-utils";
import router from "../../src/router";

test("Dans le cas d'une mauvaise réponse sur un quiz non terminé, on affiche le texte d'explication associé et un bouton continuer", async () => {
  // GIVEN
  const wrapper = mount(QuizReponseIncorrecte, {
    props: {
      etapeCourante: 1,
      resultatFinalDuQuiz: false,
      item: {
        id: "id",
        intitule: "intitule",
        reponsesPossibles: ["reponse 1", "reponse 2"],
        ordre: 1,
        texteExplication: "so bad",
        solution: "reponse 1",
      },
      quizViewModel: {
        titre: "tire",
        questions: [
          { id: "id", intitule: "intitule", reponsesPossibles: ["reponse 1", "reponse 2"], ordre: 1, texteExplication: "so bad", solution: "reponse 1" },
        ],
        steps: "2",
      },
    },
    global: { plugins: [router] },
  });

  // WHEN
  const continuerButton = wrapper.find("button");
  await wrapper.find("button").trigger("click");

  // THEN
  expect(continuerButton.text()).toBe("Continuer");
  expect(wrapper.text()).toContain("so bad");
  const questionSuivanteEvent = wrapper.emitted("question-suivante");
  expect(questionSuivanteEvent[0]).toEqual([2, "ETAT_INITIAL"]);
});

test("Dans le cas d'une mauvaise réponse sur un quiz terminé, on affiche le texte d'explication associé et un lien retour au coach", async () => {
  // GIVEN
  const wrapper = mount(QuizReponseIncorrecte, {
    props: {
      etapeCourante: 1,
      resultatFinalDuQuiz: true,
      item: {
        id: "id",
        intitule: "intitule",
        reponsesPossibles: ["reponse 1", "reponse 2"],
        ordre: 1,
        texteExplication: "so bad",
        solution: "reponse 1",
      },
      quizViewModel: {
        titre: "tire",
        questions: [
          { id: "id", intitule: "intitule", reponsesPossibles: ["reponse 1", "reponse 2"], ordre: 1, texteExplication: "so bad", solution: "reponse 1" },
        ],
        steps: "2",
      },
    },
    global: { plugins: [router] },
  });

  // WHEN
  const lienRetourAuCoach = wrapper.find("a");

  // THEN
  expect(lienRetourAuCoach.text()).toBe("Revenir au coach");
  expect(wrapper.text()).toContain("so bad");
  expect(wrapper.text()).toContain("Désolé, Vous avez perdu !");
});
