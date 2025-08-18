import { TitreCatalogue, TitreCatalogueRepository } from '@/domaines/actions/ports/titreCatalogue.repository';

export class RecupererTitreCataloguePartenaireUsecase {
  constructor(private readonly actionsRepository: TitreCatalogueRepository) {}

  async execute(
    partenaire: 'risques_naturels' | 'actions_watt_watchers' | 'semaine_mobilite',
    callBack: (titre: TitreCatalogue) => void,
  ): Promise<void> {
    const titres = await this.actionsRepository.recupererTousLesTitres();
    const titrePartenaire = titres.find(titre => titre.code === partenaire);
    if (titrePartenaire) {
      callBack(titrePartenaire);
    }
  }
}
