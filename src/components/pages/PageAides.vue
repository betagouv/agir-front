<template>
  <div class="fr-container fr-pb-3w">
    <FilDAriane page-courante="Mes aides" />
    <div v-if="isLoading">Chargement ...</div>
    <div v-else-if="!aides">Une erreur est survenue</div>
    <div v-else>
      <div v-if="!aides.utilisateurEstCouvert" class="fr-alert fr-alert--info fr-mb-4w">
        <h3 class="fr-alert__title">Votre ville n’est pas encore couverte par le service J'agis.</h3>
        <p>
          Nous mettons les informations à jour progressivement. N'hésitez pas à nous en partager à
          <a href="mailto:contact@agir.beta.gouv.fr">contact@agir.beta.gouv.fr</a> !
        </p>
      </div>
      <Aides :aidesGroupesParCategorie="aides.aides" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/alert/alert.min.css';
  import { onMounted, ref } from 'vue';
  import Aides from '@/components/custom/Aides/Aides.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { ChargementAidesPresenterImpl } from '@/domaines/aides/adapters/chargementAides.presenter.impl';
  import { chargementAidesAxiosRepository } from '@/domaines/aides/adapters/chargementAidesAxiosRepository';
  import ChargementAidesUsecase from '@/domaines/aides/chargementAides.usecase';
  import { AidesAvecCouvertureViewModel } from '@/domaines/aides/ports/chargementAides.presenter';
  import { utilisateurStore } from '@/store/utilisateur';

  const aides = ref<AidesAvecCouvertureViewModel>();
  const isLoading = ref<boolean>(true);

  onMounted(async () => {
    const { id: utilisateurId } = utilisateurStore().utilisateur;
    const usecase = new ChargementAidesUsecase(new chargementAidesAxiosRepository());
    await usecase.execute(
      utilisateurId,
      new ChargementAidesPresenterImpl(aidesViewModel => (aides.value = aidesViewModel)),
    );
    isLoading.value = false;
  });
</script>
