export interface BilanOnboarding {
  alimentation: number;
  transports: number;
  logement: number;
  consommation: number;
}

export interface BilanOnboardingRepository {
  recupererBilanOnboarding(utilisateurId: string): Promise<BilanOnboarding>;
}
