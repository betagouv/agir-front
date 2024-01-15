<template>
  <FilDAriane page-courante="Services" />
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-3">
      <span class="fr-h4">Filtres</span>
      <InputCheckbox
        class="fr-mt-1w"
        id="thematiques"
        label="Catégories affichées"
        :options="optionsCheckbox"
        @update="handleValueChange"
      />
    </div>
    <div class="fr-col-12 fr-col-lg-9">
      <h1 class="fr-h2">Liste des services</h1>
      <div
        v-for="serviceCatalogueViewModel in serviceCatalogueViewModels.catalogue"
        :key="serviceCatalogueViewModel.id"
      >
        <div
          v-if="serviceCatalogueViewModel.thematiques.some(thematique => categoriesActives.includes(thematique))"
          class="fr-p-2w fr-mb-2w background--white border border-radius--md"
        >
          <div class="fr-grid-row fr-col-12">
            <div class="fr-hidden fr-unhidden-md fr-mr-1w">
              <img class="img-icon-rounded" :src="serviceCatalogueViewModel.icon" alt="" width="70" height="70" />
            </div>
            <div class="fr-grid-row flex-space-between flex-column fr-ml-1w fr-ml-md-0">
              <div class="fr-mb-1v fr-m-md-0">
                <span
                  v-for="thematique in serviceCatalogueViewModel.thematiques"
                  :key="thematique"
                  class="fr-mr-1w fr-text--bold text--xs text--lh-0"
                >
                  {{ thematique }}
                </span>
              </div>
              <span class="fr-mb-1v fr-m-md-0 fr-text--bold fr-text--xl text--lh-1">{{
                serviceCatalogueViewModel.titre
              }}</span>
              <span class="fr-m-md-0 fr-text--xs fr-text-mention--grey fr-icon-group-line fr-icon--xs">
                {{ serviceCatalogueViewModel.nombreInstallation }}
              </span>
            </div>
            <div class="fr-grid-row--top fr-grid-row--right fr-grid-row fr-ml-auto">
              <p class="fr-badge fr-badge--info fr-mr-1w" v-if="serviceCatalogueViewModel.estEnConstruction">
                SERVICE BIENTÔT DISPONIBLE
              </p>
              <div v-else>
                <button
                  v-if="serviceCatalogueViewModel.parametrageRequis"
                  data-fr-opened="false"
                  :aria-controls="serviceCatalogueViewModel.id"
                  class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-settings-5-fill fr-btn--sm fr-mr-1w"
                >
                  Configurer
                  <Teleport to="body">
                    <Modale
                      label="Modale de suppression de compte"
                      :id="serviceCatalogueViewModel.id"
                      :radius="false"
                      :is-footer-actions="false"
                      size="m"
                    >
                      <template v-slot:contenu>
                        <h1 :id="serviceCatalogueViewModel.id" class="fr-h4 fr-modal__title">
                          Configurer le service "{{ serviceCatalogueViewModel.titre }}"
                        </h1>
                        <form @submit.prevent="parametrerLeService(serviceCatalogueViewModel.id)">
                          <InputText
                            name="prm"
                            v-model="parametreDuService"
                            label="Numéro de PRM"
                            description="Il s’agit d’une suite de 14 chiffres qui identifie le logement sur le réseau électrique."
                          />
                          <p class="fr-mb-0 fr-text--bold">
                            <span class="fr-icon-question-line fr-text--bold" aria-hidden="true"></span>
                            Comment trouver ce numéro ?
                          </p>
                          <ul class="fr-pl-7v">
                            <li>Sur votre facture</li>
                            <li>
                              Sur votre compteur Linky<br />
                              Faire défiler les affichages du compteur (appui sur la touche +) jusqu’à lire la valeur du
                              « numéro de PRM ».
                            </li>
                          </ul>

                          <InputCheckboxUnitaire
                            class="fr-pl-1v"
                            id="cgu"
                            v-model="acceptationCGU"
                            description="Les données récupérées ne seront pas conservées"
                            label="J’autorise le service “Agir !”
                          à récupérer les données me concernant auprès du GRD ENEDIS (consommation annuelle sur 36 mois
                          maximum, puissance souscrite, Numéro PRM)"
                          />

                          <div class="fr-grid-row fr-grid-row--right fr-pt-6w fr-pb-4w">
                            <button class="fr-btn fr-btn--secondary" :aria-controls="serviceCatalogueViewModel.id">
                              Annuler
                            </button>
                            <button
                              type="submit"
                              class="fr-btn fr-ml-2w"
                              :disabled="!acceptationCGU || parametreDuService.length != 14"
                            >
                              Valider
                            </button>
                          </div>
                        </form>
                      </template>
                    </Modale>
                  </Teleport>
                </button>
                <button
                  v-if="serviceCatalogueViewModel.estInstalle"
                  class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-close-line fr-btn--sm fr-mr-1w"
                  @click="enleverServiceActif(serviceCatalogueViewModel.id)"
                >
                  Enlever
                </button>
                <button
                  v-else
                  class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-download-line fr-btn--sm fr-mr-1w"
                  @click="installerServiceActif(serviceCatalogueViewModel.id)"
                >
                  Installer
                </button>
              </div>
            </div>
          </div>

          <div class="fr-grid-row fr-col-12 fr-mt-2w">
            <div class="fr-col-6">
              <img class="img-illustration" :src="serviceCatalogueViewModel.image" alt="" />
            </div>
            <div class="fr-col-5 fr-ml-2w">
              <p class="fr-text--bold">{{ serviceCatalogueViewModel.description }}</p>
              <p>
                {{ serviceCatalogueViewModel.sousDescription }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ServiceCatalogueViewModel } from '@/services/adapters/serviceCatalogue.presenter.impl';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import { ref } from 'vue';
  import { ServiceEventBusImpl } from '@/services/serviceEventBusImpl';
  import { EnleverServiceActifUsecase } from '@/services/enleverServiceActif.usecase';
  import { ServiceRepositoryAxios } from '@/services/adapters/service.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { InstallerServiceActifUsecase } from '@/services/installerServiceActif.usecase';
  import Modale from '@/components/custom/Modale/Modale.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import { ParametrerServiceUsecase } from '@/services/parametrerService.usecase';
  import ModaleActions from '@/components/custom/Modale/ModaleActions';

  const props = defineProps<{
    serviceCatalogueViewModels: ServiceCatalogueViewModel;
  }>();

  const emit = defineEmits<{
    (event: 'refreshCatalogueServices'): void;
  }>();

  const parametreDuService = ref<string>('');
  const acceptationCGU = ref<boolean>(false);
  const optionsCheckbox = props.serviceCatalogueViewModels.filtreThematiques.map(option => ({
    id: option,
    label: option,
    checked: true,
  }));

  const categoriesActives = ref<string[]>([]);
  categoriesActives.value = optionsCheckbox.filter(({ checked }) => checked).map(({ id }) => id);

  const handleValueChange = value => {
    categoriesActives.value = value;
  };

  async function enleverServiceActif(serviceId: string) {
    const useCase = new EnleverServiceActifUsecase(new ServiceRepositoryAxios(), ServiceEventBusImpl.getInstance());
    const utilisateurId = utilisateurStore().utilisateur.id;
    await useCase.execute(utilisateurId, serviceId);
    emit('refreshCatalogueServices');
  }

  async function installerServiceActif(serviceId: string) {
    const useCase = new InstallerServiceActifUsecase(new ServiceRepositoryAxios(), ServiceEventBusImpl.getInstance());
    const utilisateurId = utilisateurStore().utilisateur.id;
    await useCase.execute(utilisateurId, serviceId);
    emit('refreshCatalogueServices');
  }

  function parametrerLeService(serviceId: string) {
    const parametrerService = new ParametrerServiceUsecase(new ServiceRepositoryAxios());
    parametrerService.execute(utilisateurStore().utilisateur.id, serviceId, [parametreDuService.value]).then(() => {
      new ModaleActions(serviceId).close();
    });
  }
</script>
<style scoped>
  .img-icon-rounded {
    display: block;
    border-radius: 10px;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 18, 0.16);
  }

  .img-illustration {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    max-height: 300px;
  }
</style>
