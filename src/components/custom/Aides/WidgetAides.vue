<template>
  <section v-if="aidesViewModel && aidesViewModel.length > 0">
    <div class="flex flex-space-between align-items--center">
      <h2 class="fr-h3">Aides et bons plans</h2>
      <router-link class="fr-link" :to="{ name: RouteAidesName.AIDES }">Voir tout</router-link>
    </div>

    <GrilleAidesDUneAction :aides="aidesViewModel" />
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
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
  }>();

  const aidesViewModel = ref<ActionAideViewModel[]>();

  const recupererAidesDuneThematique = new RecupererAidesDUneThematiqueUsecase(new ChargementAidesAxiosRepository());
  recupererAidesDuneThematique.execute(
    utilisateurStore().utilisateur.id,
    props.clefThematique,
    new AidesPresenterImpl(vm => {
      aidesViewModel.value = vm;
    }),
  );
</script>
