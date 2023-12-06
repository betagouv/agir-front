import { ValiderCelebrationUsecase } from '@/celebration/validerCelebration.usecase';
import { SpyCelebrationRepository } from './spyCelebrationRepository';

describe('Fichier de tests de validation de celebration', () => {
  it("Prévient le back qu'une celebration a été vu", async () => {
    // GIVEN
    const spyCelebrationRepository = new SpyCelebrationRepository();
    const usecase = new ValiderCelebrationUsecase(spyCelebrationRepository);

    // WHEN
    await usecase.execute('utilisateurId', 'celebrationId');

    // THEN
    expect(spyCelebrationRepository.validerCelebrationAEteAppele).toBeTruthy();
  });
});
