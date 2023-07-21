import QuestionDuQuiz from "../../../src/components/QuestionDuQuiz.vue";
import { mount } from "@vue/test-utils";
import router from "../../../src/router";

describe("Lorsque l'utilisateur répond à la question courante du quiz", () => {
  test("on envoie les données de la réponse choisie", async () => {
    // GIVEN
    const wrapper = mount(QuestionDuQuiz, {
      props: {
        etapeCourante: 1,
        item: {
          id: "id_question_0",
          intitule: "intitule de la question",
          reponsesPossibles: ["reponse 1", "reponse 2"],
          ordre: "1",
          texteExplication: "so bad",
          solution: "reponse 1",
        },
        quizViewModel: {
          titre: "tire",
          questions: [
            {
              id: "id_question_0",
              intitule: "intitule de la question",
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
        valeurDesReponses: new Map([]),
      },
      global: { plugins: [router] },
    });

    // WHEN
    const boutonValider = wrapper.find("button");
    await wrapper.find("button").trigger("click");
    const radioInput = wrapper.find('input[type="radio"]');
    await radioInput.setChecked();
    await wrapper.find('input[type="radio"]').trigger("change");

    // THEN
    const verifierReponseEvent = wrapper.emitted("verifier-reponse");
    const envoyerReponseEvent = wrapper.emitted("envoyer-reponse");
    expect(wrapper.text()).toContain("intitule de la question");
    expect(boutonValider.text()).toBe("Valider");
    expect(radioInput.element.checked).toBeTruthy();
    expect(radioInput.element.value).toBe("reponse 1");
    expect(verifierReponseEvent[0]).toEqual(["reponse 1", "id_question_0"]);
    expect(envoyerReponseEvent[0]).toEqual([new Map([["id_question_0", "reponse 1"]])]);
  });
});
