import { ServiceRepository } from '@/domaines/services/ports/service.repository';

export class SpyServiceRepository implements ServiceRepository {
  private _parametrerServiceAEteAppele: boolean = false;

  get parametrerServiceAEteAppele(): boolean {
    return this._parametrerServiceAEteAppele;
  }

  parametrerService(_utilisateurId: string, _serviceId: string, _parametres: { [key: string]: string }): Promise<void> {
    this._parametrerServiceAEteAppele = true;
    return Promise.resolve();
  }
}
