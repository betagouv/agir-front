<template>
  <div class="fr-grid-row fr-grid-row--gutters" v-if="demanderCodePostal || demanderRevenu">
    <div class="fr-col-lg-8">
      <div class="background--white border border-radius--md fr-p-3w fr-mb-4w">
        <h2 class="fr-h5">Nous avons besoin d'information(s) pour calculer les aides vélo adaptées</h2>
        <form @submit.prevent="mettreAJourEtLancerLaSimulation">
          <div class="fr-input-group" v-show="demanderCodePostal">
            <label class="fr-label" for="text-input-code-postal"> Votre code postal </label>
            <input
              required
              class="fr-input"
              v-model="codePostal"
              name="code-postal"
              id="text-input-code-postal"
              type="text"
            />
          </div>
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
      <CarteInfo>
        <p class="fr-text--bold">
          <span class="fr-icon-information-line" aria-hidden="true"></span>
          Pouquoi ces questions ?
        </p>
        <p>Adapter les résultats au plus près de votre situation</p>
        <p>Votre <strong>code postal</strong> permet de consulter les aides locales.</p>
        <p>
          Votre <strong>revenu fiscal de référence</strong> et le <strong>nombre de parts</strong> permettent d’afficher
          les aides en fonction de vos ressources.
        </p>
      </CarteInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import { SimulerAideVeloPresenterImpl } from '@/aides/adapters/simulerAideVelo.presenter.impl';
  import { SimulerAideVeloRepositoryAxios } from '@/aides/adapters/simulerAideVelo.repository.axios';
  import SimulerAideVeloUsecase from '@/aides/simulerAideVelo.usecase';
  import { SimulationAideResultatViewModel } from '@/aides/ports/simulationAideResultat';
  import { utilisateurStore } from '@/store/utilisateur';
  import { MettreAJourCompteUtilisateurUsecase } from '@/compte/mettreAJourCompteUtilisateur.usecase';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';

  const store = utilisateurStore();
  const emit = defineEmits(['submit-simulation']);
  const codePostal = ref(store.utilisateur.codePostal);
  const revenuFiscal = ref(store.utilisateur.revenuFiscal);

  const demanderRevenu = revenuFiscal.value.trim() === '';
  const demanderCodePostal = codePostal.value.trim() === '';

  if (!demanderRevenu && !demanderCodePostal) {
    simulerAideVelo();
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
        codePostal: codePostal.value,
        prenom: utilisateur.prenom,
        revenuFiscal: revenuFiscal.value,
      };
      usecase.execute(donneeAMettreAjour);
    }
  }

  function mapResultatAidesVelo(viewModels: SimulationAideResultatViewModel) {
    emit('submit-simulation', viewModels, codePostal.value, revenuFiscal.value);
  }

  function simulerAideVelo() {
    const useCase = new SimulerAideVeloUsecase(new SimulerAideVeloRepositoryAxios());
    useCase.execute(codePostal.value, revenuFiscal.value, new SimulerAideVeloPresenterImpl(mapResultatAidesVelo));
  }

  const mettreAJourEtLancerLaSimulation = () => {
    mettreAJourLesInfos();
    simulerAideVelo();
  };

  const isDisabled = computed(() => {
    return codePostal.value.trim() === '' || revenuFiscal.value.trim() === '';
  });
</script>
