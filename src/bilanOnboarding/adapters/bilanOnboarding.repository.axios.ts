import { AxiosFactory, intercept401 } from '@/axios.factory';
import { BilanOnboardingRepository, BilanOnboarding } from '@/bilanOnboarding/ports/bilanOnboarding.repository';
import { Cachable, cache } from '@/shell/cache/cacheDecorator';
import { onboardingBilanStore } from '@/store/onboardingBilan';
import { sessionAppRawDataStorage } from '@/shell/cache/appRawDataStorage';

interface BilanOnboardingApiModel {
  onboarding_result: {
    alimentation: number;
    transports: number;
    logement: number;
    consommation: number;
  };
}

export class BilanOnboardingRepositoryAxios extends Cachable implements BilanOnboardingRepository {
  private static BILAN_CACHE_KEY = 'bilan';

  constructor() {
    super(sessionAppRawDataStorage);
  }

  @intercept401()
  @cache({ key: BilanOnboardingRepositoryAxios.BILAN_CACHE_KEY })
  async recupererBilanOnboarding(utilisateurId: string): Promise<BilanOnboarding> {
    const store = onboardingBilanStore();
    if (store.bilan) return store.bilan;

    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<BilanOnboardingApiModel>(`/utilisateurs/${utilisateurId}/profile`);

    store.setBilan(response.data.onboarding_result);

    return response.data.onboarding_result;
  }
}
