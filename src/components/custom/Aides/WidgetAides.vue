<template>
  <section v-if="aidesViewModel && aidesViewModel.length > 0">
    <div class="flex flex-space-between align-items--center fr-mb-2w">
      <h2 class="fr-h3 fr-mb-0">Aides et bons plans</h2>
      <router-link :to="{ name: RouteAidesName.AIDES }" class="fr-link">Voir toutes les aides</router-link>
    </div>

    <GrilleAidesDUneAction :aides="aidesViewModel" :trois-colonnes="true" />
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import GrilleAidesDUneAction from '@/components/custom/Aides/GrilleAidesDUneAction.vue';
  import { ActionAideViewModel } from '@/domaines/actions/ports/action.presenter';
  import { AidesPresenterImpl } from '@/domaines/aides/adapters/aides.presenter.impl';
  import { ChargementAidesAxiosRepository } from '@/domaines/aides/adapters/chargementAides.axios.repository';
  import RecupererAidesDUneThematiqueUsecase from '@/domaines/aides/recupererAidesDUneThematique.usecase';
  import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
  import { RouteAidesName } from '@/router/aides/routeAidesName';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    clefThematique: ClefThematiqueAPI;
    nombreAidesMax?: number;
  }>();

  const aidesViewModel = ref<ActionAideViewModel[]>();
  const recupererAidesDuneThematique = new RecupererAidesDUneThematiqueUsecase(new ChargementAidesAxiosRepository());

  onMounted(async () => {
    await recupererAides();
  });

  watch(
    () => props.clefThematique,
    async () => {
      await recupererAides();
    },
  );

  async function recupererAides() {
    await recupererAidesDuneThematique.execute(
      utilisateurStore().utilisateur.id,
      props.clefThematique,
      new AidesPresenterImpl(vm => {
        aidesViewModel.value = vm;
      }),
      props.nombreAidesMax,
    );
  }
</script>
