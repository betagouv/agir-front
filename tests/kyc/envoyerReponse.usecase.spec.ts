import { EnvoyerReponseUsecase } from '@/kyc/envoyerReponseUsecase';
import { SpyQuestionRepository } from './adapters/question.repository.spy';

describe("Fichier de tests pour envoyer la réponse d'une question KYC", () => {
  it("En donnant un id d'utilisateur, l'id de la question KYC et la réponse doit appeler le back pour sauvegarder la réponse", async () => {
    // GIVEN
    const questionRepository = new SpyQuestionRepository();

    // WHEN
    const usecase = new EnvoyerReponseUsecase(questionRepository);
    await usecase.execute('utilisateurId', 'questionId', 'Ma réponse, lorem ipsum dolor');

    // THEN
    expect(questionRepository.envoyerQuestionAEteAppele).toBeTruthy();
  });
});
