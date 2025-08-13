import { HistoriqueAdresseRepository } from '@/domaines/adresses/ports/historiqueAdresse.repository';

export interface AdresseHistorique {
  id: string;
  code_commune: string;
  commmune: string;
  code_postal: string;
  numero_rue: string;
  rue: string;
  longitude: number;
  latitude: number;
  date_creation: string;
}

export class RecupererHistoriqueAdresseUsecase {
  constructor(private readonly repository: HistoriqueAdresseRepository) {}

  execute(idUtilisateur: string, callback: (adresses: AdresseHistorique[]) => void): void {
    this.repository
      .recupererHistoriqueAdresse(idUtilisateur)
      .then(adresses => {
        const adressesTriees = adresses
          .sort((a, b) => new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime())
          .slice(0, 2);
        callback(adressesTriees);
      })
      .catch(() => callback([]));
  }
}
