export interface ServiceRepository {
  parametrerService(utilisateurId: string, serviceId: string, parametres: { [key: string]: string }): Promise<void>;
}
