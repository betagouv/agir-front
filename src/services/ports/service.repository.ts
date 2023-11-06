import { Service } from '@/services/recupererServiceActifs.usecase';

export interface ServiceRepository {
  recupererServicesActifs(utilisateurId: string): Promise<Service[]>;
}
