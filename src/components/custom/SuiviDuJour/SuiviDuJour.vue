<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12">
      <div class="border border-radius--md background--white">
        <div class="fr-p-4w">
          <h3 v-if="etapeCourante" class="fr-mx-n1w">{{ currentStepTitle }}</h3>
          <form @submit.prevent="etapeSuivante">
            <div
              v-if="etapeCourante"
              class="fr-stepper__steps fr-mx-n1w"
              :data-fr-current-step="etapeCourante"
              :data-fr-steps="3"
            />
            <br />
            <fieldset class="fr-fieldset" id="checkbox" aria-labelledby="checkbox-legend checkbox-messages">
              <div class="fr-col-12" v-if="etapeCourante == 1">
                <div class="fr-mb-2w">
                  <SuiviDuJourPremiereEtape
                    current-step-question="Comptez combien de repas vous avez consommé avec les aliments suivants :"
                    :etape-courante="etapeCourante"
                    @update:model-value="miseAjourReponseSuiviDuJourAlimentation"
                    :model-value="suiviDuJourAlimentation"
                    :dernier-suivi-du-jour-view-model="dernierSuiviDuJourAlimentationViewmodel"
                  />
                </div>
                <button class="fr-btn" title="Suivant">Continuer</button>
              </div>
              <div class="fr-col-12" v-else-if="etapeCourante == 2">
                <div class="fr-mb-2w">
                  <SuiviDuJourSecondeEtape
                    current-step-question="Quels transports avez vous utilisé aujourd'hui ?"
                    :etape-courante="etapeCourante"
                    @update:model-value="miseAjourReponseSuiviDuJourTransport"
                    :model-value="suiviDuJourTransport"
                    :dernier-suivi-du-jour-view-model="dernierSuiviDuJourTransportViewmodel"
                  />
                </div>
                <ul class="fr-btns-group fr-btns-group--inline fr-btns-group--icon-left">
                  <li>
                    <button
                      @click="etapePrecedente"
                      class="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-icon-arrow-left-line fr-mb-0"
                    >
                      Précédent
                    </button>
                  </li>
                  <li>
                    <button class="fr-btn fr-mb-0" title="Suivant">Continuer</button>
                  </li>
                </ul>
              </div>
              <div class="last-step-container fr-container--fluid" v-else>
                <SuiviDuJourResultats :suivi-du-jour-resultats="suiviDuJourResultatsViewModel" />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import SuiviDuJourResultats from '@/components/custom/SuiviDuJour/SuiviDuJourResultats.vue';
  import SuiviDuJourPremiereEtape from '@/components/custom/SuiviDuJour/SuiviDuJourPremiereEtape.vue';
  import SuiviDuJourSecondeEtape from '@/components/custom/SuiviDuJour/SuiviDuJourSecondeEtape.vue';
  import { EnvoyerSuiviDuJourUsecase } from '@/suivi/envoyerSuiviDuJour.usecase';
  import { SuiviDuJourPresenterImpl, SuiviDuJourResultatsViewModel } from '@/suivi/adapters/suiviDuJour.presenter.impl';
  import { SuiviDuJourRepositoryAxios } from '@/suivi/adapters/suiviDuJour.repository.axios';
  import { ObtenirDernierSuiviUsecase } from '@/suivi/obtenirDernierSuivi.usecase';
  import { DateTimeTypeScript } from '@/DateTime';
  import {
    DernierSuiviDuJourPresenterImpl,
    DernierSuiviDuJourViewModel,
  } from '@/suivi/adapters/dernierSuiviDuJour.presenter.impl';
  import { utilisateurStore } from '@/store/utilisateur';

  const etapeCourante = ref<number>(1);
  let suiviDuJourAlimentation = new Map<string, string>();
  let suiviDuJourTransport = new Map<string, string>();
  const dernierSuiviDuJourAlimentationViewmodel = ref<DernierSuiviDuJourViewModel>();
  const dernierSuiviDuJourTransportViewmodel = ref<DernierSuiviDuJourViewModel>();
  const suiviDuJourResultatsViewModel = ref<SuiviDuJourResultatsViewModel>({
    impactCarbonDuJour: { valeur: '0', pictoSens: '', commentaire: '', variation: '0' },
    suivisPrecedent: { valeursDesSuivis: [], datesDesSuivis: [], moyenneDesSuivis: [] },
    additionCarbone: [],
  });

  const store = utilisateurStore();

  const currentStepTitle = computed(() => {
    if (etapeCourante.value === 1) {
      return '🥦 Alimentation';
    } else if (etapeCourante.value == 2) {
      return '🚗 Transport du quotidien';
    }
    return 'Résultat du suivi';
  });

  onMounted(() => {
    const idUtilisateur = store.utilisateur.id;

    const chargerDernierSuiviAlimentation = new ObtenirDernierSuiviUsecase(new SuiviDuJourRepositoryAxios());

    function mapSuiviAlimentation(dernierSuiviViewModel: DernierSuiviDuJourViewModel) {
      dernierSuiviDuJourAlimentationViewmodel.value = dernierSuiviViewModel;
    }
    function mapSuiviTransport(dernierSuiviViewModel: DernierSuiviDuJourViewModel) {
      dernierSuiviDuJourTransportViewmodel.value = dernierSuiviViewModel;
    }

    chargerDernierSuiviAlimentation.execute(
      idUtilisateur,
      'alimentation',
      new DernierSuiviDuJourPresenterImpl(mapSuiviAlimentation, new DateTimeTypeScript())
    );
    chargerDernierSuiviAlimentation.execute(
      idUtilisateur,
      'transport',
      new DernierSuiviDuJourPresenterImpl(mapSuiviTransport, new DateTimeTypeScript())
    );
  });

  function etapeSuivante() {
    if (etapeCourante.value == 2) {
      calculEmpreinteDuJour();
    }
    etapeCourante.value = etapeCourante.value + 1;
  }

  function etapePrecedente() {
    etapeCourante.value = etapeCourante.value - 1;
  }

  const calculEmpreinteDuJour = () => {
    const idUtilisateur = store.utilisateur.id;
    const envoyerSuiviDuJour = new EnvoyerSuiviDuJourUsecase(new SuiviDuJourRepositoryAxios());
    envoyerSuiviDuJour.execute(
      { valeurs: suiviDuJourAlimentation },
      { valeurs: suiviDuJourTransport },
      new SuiviDuJourPresenterImpl(mapImpactCarboneDuJour),
      idUtilisateur
    );
  };

  function miseAjourReponseSuiviDuJourAlimentation(map: Map<string, string>) {
    suiviDuJourAlimentation = map;
  }

  function miseAjourReponseSuiviDuJourTransport(map: Map<string, string>) {
    suiviDuJourTransport = map;
  }

  function mapImpactCarboneDuJour(impactDuJourViewModel: SuiviDuJourResultatsViewModel) {
    suiviDuJourResultatsViewModel.value = impactDuJourViewModel;
  }
</script>
