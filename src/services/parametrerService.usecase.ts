import { ServiceRepository } from '@/services/ports/service.repository';

export class ParametrerServiceUsecase {
  constructor(private readonly serviceRepository: ServiceRepository) {}
  execute(utilisateurId: string, serviceId: string, parametres: string[]): Promise<void> {
    return this.serviceRepository.parametrerService(utilisateurId, serviceId, parametres);
  }
}
