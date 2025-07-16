import { ServiceRechercheRecettesRepository } from '../../../../src/domaines/serviceRecherche/recettes/ports/serviceRechercheRecettes.repository';
import { ServiceRechercheRecettes } from '../../../../src/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';
import { Recette } from '../../../../src/domaines/serviceRecherche/recettes/recupererDetailServiceRecettes.usecase';

export class ServiceRechercheRecettesMock implements ServiceRechercheRecettesRepository {
  private constructor(
    private serviceRechercheARetourner: ServiceRechercheRecettes | null,
    private recetteARetourner: Recette | null,
  ) {}

  static avecServiceARetourner(serviceRechercheARetourner: ServiceRechercheRecettes): ServiceRechercheRecettesMock {
    return new ServiceRechercheRecettesMock(serviceRechercheARetourner, null);
  }

  static avecRecetteARetourner(recetteARetourner: Recette): ServiceRechercheRecettesMock {
    return new ServiceRechercheRecettesMock(null, recetteARetourner);
  }

  recupererService(
    idUtilisateur: string,
    typeRecette: {
      categorie: string;
      sous_catagorie?: string;
    },
    nombreMaxResultats: number,
  ): Promise<ServiceRechercheRecettes> {
    return Promise.resolve(this.serviceRechercheARetourner!);
  }

  recupererDetailRecette(idUtilisateur: string, idRecette: string): Promise<Recette> {
    return Promise.resolve(this.recetteARetourner!);
  }
}
