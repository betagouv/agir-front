import { AxiosFactory, intercept401 } from '@/axios.factory';
import { BilanOnboardingRepository, BilanOnboarding } from '@/bilanOnboarding/ports/bilanOnboarding.repository';
import { onboardingBilanStore } from '@/store/onboardingBilan';

interface BilanOnboardingApiModel {
  onboarding_result: {
    alimentation: number;
    transports: number;
    logement: number;
    consommation: number;
  };
}

export class BilanOnboardingRepositoryAxios implements BilanOnboardingRepository {
  @intercept401()
  async recupererBilanOnboarding(utilisateurId: string): Promise<BilanOnboarding> {
    const store = onboardingBilanStore();
    if (store.bilan) return store.bilan;

    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<BilanOnboardingApiModel>(`/utilisateurs/${utilisateurId}/profile`);

    store.setBilan(response.data.onboarding_result);

    return response.data.onboarding_result;
  }
}
