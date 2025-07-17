import {
  AfficherMappingTagKYCPresenter,
  MappingTagKYCViewModel,
} from '@/domaines/personnalisation/ports/afficherMappingTagKYC.presenter';
import { MappingTagKYC } from '@/domaines/personnalisation/ports/personnalisation.repository';

export class AfficherMappingTagKYCPresenterImpl implements AfficherMappingTagKYCPresenter {
  constructor(private mappingTagsKYCViewModel: (mappingTagKYCViewModel: MappingTagKYCViewModel) => void) {}

  presente(mappingTagKYC: MappingTagKYC) {
    this.mappingTagsKYCViewModel({
      tags: mappingTagKYC.tousLesTagsDansCms.map(tag => ({
        code: tag.tag_id,
        description: tag.label_explication_front,
        descriptionInterne: tag.description_interne,
        descriptionDynamique: mappingTagKYC.tagsDynamiques.find(t => t.tag === tag.tag_id)?.explication || '',
        type: mappingTagKYC.tagsDynamiques.some(t => t.tag === tag.tag_id) ? 'utilisateur' : 'editorial',
        estAtteignableViaKYC: mappingTagKYC.tagAtteignableViaKYC.includes(tag.tag_id),
        estInatteignableViaKYC: mappingTagKYC.tagInatteignableViaKYC.includes(tag.tag_id),
        estHorsDuBackend: mappingTagKYC.tagsCmsHorsDuBackend.some(
          t => t.tagId === tag.tag_id && t.idCms === tag.id_cms,
        ),
      })),
      tagBackEndHorsDuCms: mappingTagKYC.backEndTagHorsDuCms,
    });
  }
}
