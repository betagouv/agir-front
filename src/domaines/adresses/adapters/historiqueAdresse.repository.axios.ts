import { AxiosFactory, intercept40X } from '@/axios.factory';
import { HistoriqueAdresseRepository } from '@/domaines/adresses/ports/historiqueAdresse.repository';
import { AdresseHistorique } from '@/domaines/adresses/recupererHistoriqueAdresse.usecase';

export class HistoriqueAdresseRepositoryAxios implements HistoriqueAdresseRepository {
  @intercept40X()
  async ajouterAdresseHistorique(idUtilisateur: string, adresse: AdresseHistorique): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${idUtilisateur}/adresses_recentes`, {
      code_commune: adresse.code_commune,
      commune: adresse.commmune,
      code_postal: adresse.code_postal,
      numero_rue: adresse.numero_rue,
      rue: adresse.rue,
      longitude: adresse.longitude,
      latitude: adresse.latitude,
    });
  }

  @intercept40X()
  async recupererHistoriqueAdresse(idUtilisateur: string): Promise<AdresseHistorique[]> {
    const axios = AxiosFactory.getAxios();
    return (await axios.get<AdresseHistorique[]>(`/utilisateurs/${idUtilisateur}/adresses_recentes`)).data;
  }

  @intercept40X()
  async supprimerAdresseHistorique(idUtilisateur: string, idAdresseASupprimer: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.delete(`/utilisateurs/${idUtilisateur}/adresses_recentes/${idAdresseASupprimer}`);
  }
}
