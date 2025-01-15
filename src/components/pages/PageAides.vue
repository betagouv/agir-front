<template>
  <div class="fr-container fr-pb-3w">
    <FilDAriane page-courante="Mes aides" />
    <div v-if="isLoading">Chargement ...</div>
    <div v-else-if="!aides">
      <ErreurDeChargement
        :action="chargerLesAides"
        message="Une erreur inattendue est survenue pendant le chargement des aides. Veuillez re-essayer"
      />
    </div>
    <div v-else>
      <div v-if="!aides.utilisateurEstCouvert" class="fr-alert fr-alert--info fr-mb-4w">
        <h3 class="fr-alert__title">Votre ville n’est pas encore couverte par le service J'agis.</h3>
        <p>
          Nous mettons les informations à jour progressivement. N'hésitez pas à nous en partager à
          <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a> !
        </p>
      </div>
      <Aides :aidesGroupesParCategorie="aides.aides" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import '@gouvfr/dsfr/dist/component/alert/alert.min.css';
  import { onMounted, ref } from 'vue';
  import Aides from '@/components/custom/Aides/Aides.vue';
  import ErreurDeChargement from '@/components/custom/ErreurDeChargement.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { ChargementAidesPresenterImpl } from '@/domaines/aides/adapters/chargementAides.presenter.impl';
  import { ChargementAidesAxiosRepository } from '@/domaines/aides/adapters/chargementAidesAxiosRepository';
  import ChargementAidesUsecase from '@/domaines/aides/chargementAides.usecase';
  import { AidesAvecCouvertureViewModel } from '@/domaines/aides/ports/chargementAides.presenter';
  import { utilisateurStore } from '@/store/utilisateur';

  const aides = ref<AidesAvecCouvertureViewModel>();
  const isLoading = ref<boolean>(true);

  onMounted(async () => {
    chargerLesAides();
  });

  function chargerLesAides() {
    const { id: utilisateurId } = utilisateurStore().utilisateur;
    const usecase = new ChargementAidesUsecase(new ChargementAidesAxiosRepository());
    isLoading.value = true;
    usecase
      .execute(utilisateurId, new ChargementAidesPresenterImpl(aidesViewModel => (aides.value = aidesViewModel)))
      .catch(() => {
        aides.value = undefined;
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
</script>
