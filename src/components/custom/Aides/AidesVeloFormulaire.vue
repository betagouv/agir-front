<template>
  <div class="fr-grid-row fr-grid-row--gutters" v-if="demanderRevenu || demanderPartsFiscales">
    <div class="fr-col-lg-8">
      <div class="background--white border border-radius--md fr-p-3w fr-mb-4w">
        <h2 class="fr-h3">Quelques questions nécessaires à l’estimation des aides</h2>
        <form @submit.prevent="mettreAJourEtLancerLaSimulation">
          <h3 class="fr-h4">Quelle est votre tranche de revenus ?</h3>
          <InputTrancheDeRevenu />
          <!-- <div class="fr-input-group" v-if="demanderRevenu">
            <label class="fr-label" for="text-input-rfr">Revenu fiscal de référence </label>
            <input
              required
              class="fr-input"
              v-model="revenuFiscal"
              name="revenu-fiscal"
              id="text-input-rfr"
              inputmode="numeric"
              type="number"
            />
          </div> -->
          <!-- <div class="fr-input-parts" v-if="demanderPartsFiscales">
            <label class="fr-label" for="text-input-parts">Nombre de parts fisacles</label>
            <input
              required
              class="fr-input"
              v-model="nombreDePartsFiscales"
              name="nombre-de-parts"
              id="text-input-parts"
              inputmode="decimal"
              type="text"
            />
          </div> -->
          <h3 class="fr-h4">Abonnements et cartes</h3>
          <InputCheckboxUnitaire
            id="abonnement-transport"
            label="En tant qu’habitant d’Angers Loire Métropole, êtes-vous abonnés du TER Pays de la Loire ?"
            description="Sont éligibles Tutti illimité ou combiné / Métrocéane mensuel / annuel Loire-Atlantique et Sarthe / mensuel réseaux Mayenne et Vendée (hors scolaire)"
            v-model="abonnementTransport"
          />
          <button class="fr-mt-2w fr-btn" :disabled="!revenuFiscal || !nombreDePartsFiscales">Valider</button>
        </form>
      </div>
    </div>
    <div class="fr-col-lg-4">
      <AidesVeloFormulaireAside />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { MettreAJourCompteUtilisateurUsecase } from '@/compte/mettreAJourCompteUtilisateur.usecase';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import AidesVeloFormulaireAside from '@/components/custom/Aides/AidesVeloFormulaireAside.vue';
  import InputTrancheDeRevenu from '@/components/custom/InputTrancheDeRevenu.vue';

  const store = utilisateurStore();
  const revenuFiscal = ref(store.utilisateur.revenuFiscal);
  const nombreDePartsFiscales = ref(store.utilisateur.nombreDePartsFiscales);
  const demanderRevenu = revenuFiscal.value === null;
  const demanderPartsFiscales = nombreDePartsFiscales.value === null;
  const abonnementTransport = ref(false);

  const emit = defineEmits<{
    (e: 'infos-mises-a-jour'): void;
  }>();

  async function mettreAJourLesInfos() {
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
        revenuFiscal: revenuFiscal.value ? revenuFiscal.value.toString() : '',
        nombreDePartsFiscales: nombreDePartsFiscales.value ? nombreDePartsFiscales.value.toString() : '',
      };
      await usecase.execute(donneeAMettreAjour);
      emit('infos-mises-a-jour');
    }
  }

  const mettreAJourEtLancerLaSimulation = () => {
    mettreAJourLesInfos();
  };
</script>
