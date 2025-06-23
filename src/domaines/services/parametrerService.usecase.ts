import { ServiceRepository } from '@/domaines/services/ports/service.repository';

export class ParametrerServiceUsecase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(utilisateurId: string, serviceId: string, parametres: { [key: string]: string }): Promise<void> {
    await this.serviceRepository.parametrerService(utilisateurId, serviceId, parametres);
  }
}
