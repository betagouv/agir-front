<template>
  <div class="fr-grid-row fr-grid-row--gutters" v-if="demanderRevenu">
    <div class="fr-col-lg-8">
      <div class="background--white border border-radius--md fr-p-3w fr-mb-4w">
        <h2 class="fr-h5">Nous avons besoin d'information(s) pour calculer les aides retrofit adaptées</h2>
        <form @submit.prevent="mettreAJourEtLancerLaSimulation">
          <div class="fr-input-group" v-if="demanderRevenu">
            <label class="fr-label" for="text-input-rfr"> Revenu fiscal de référence </label>
            <input
              required
              class="fr-input"
              v-model="revenuFiscal"
              name="revenu-fiscal"
              id="text-input-rfr"
              type="text"
            />
          </div>
          <button class="fr-mt-2v fr-btn" :disabled="isDisabled">Sauvegarder et continuer</button>
        </form>
      </div>
    </div>
    <div class="fr-col-lg-4">
      <CarteInfoExplicationsAidesLocales :afficher-explication-revenu-fiscal="demanderRevenu" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { SimulerAideRetrofitPresenterImpl } from '@/aides/adapters/simulerAideRetrofit.presenter.impl';
  import { SimulerAideRetrofitRepositoryAxios } from '@/aides/adapters/simulerAideRetrofit.repository.axios';
  import SimulerAideRetrofitUsecase from '@/aides/simulerAideRetrofit.usecase';
  import { SimulationAideResultatViewModel } from '@/aides/ports/simulationAideResultat';
  import { utilisateurStore } from '@/store/utilisateur';
  import { MettreAJourCompteUtilisateurUsecase } from '@/compte/mettreAJourCompteUtilisateur.usecase';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import CarteInfoExplicationsAidesLocales from '@/components/custom/CarteInfoExplicationsAidesLocales.vue';

  const store = utilisateurStore();
  const emit = defineEmits(['submit-simulation']);
  const revenuFiscal = ref(store.utilisateur.revenuFiscal);

  const demanderRevenu = revenuFiscal.value === null;

  const simulerAideRetrofit = () => {
    const useCase = new SimulerAideRetrofitUsecase(new SimulerAideRetrofitRepositoryAxios());

    function mapValues(viewModels: SimulationAideResultatViewModel[]) {
      emit('submit-simulation', viewModels, store.utilisateur.codePostal, revenuFiscal.value);
    }

    useCase.execute(
      store.utilisateur.codePostal,
      revenuFiscal.value?.toString() || '',
      new SimulerAideRetrofitPresenterImpl(mapValues)
    );
  };

  if (!demanderRevenu) {
    simulerAideRetrofit();
  }

  function mettreAJourLesInfos() {
    {
      const usecase = new MettreAJourCompteUtilisateurUsecase(
        new CompteUtilisateurRepositoryImpl(),
        new SessionRepositoryStore()
      );
      const utilisateur = utilisateurStore().utilisateur;
      const donneeAMettreAjour = {
        nom: utilisateur.nom,
        id: utilisateur.id,
        mail: utilisateur.mail,
        commune: utilisateur.commune,
        codePostal: utilisateur.codePostal,
        prenom: utilisateur.prenom,
        revenuFiscal: revenuFiscal.value?.toString() || '',
        nombreDePartsFiscales: utilisateur.nombreDePartsFiscales?.toString() || '',
      };
      usecase.execute(donneeAMettreAjour);
    }
  }

  const mettreAJourEtLancerLaSimulation = () => {
    mettreAJourLesInfos();
    simulerAideRetrofit();
  };

  const isDisabled = computed(() => {
    return revenuFiscal.value === null || revenuFiscal.value.toString() === '';
  });
</script>
