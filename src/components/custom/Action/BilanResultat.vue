<template>
  <div v-if="bilanThematiqueViewModel">
    <h2 class="fr-h3">Votre bilan ????</h2>
    <p>
      Vous avez terminé votre bilan ! Il est de {{ bilanThematiqueViewModel.impactAnnuelEnTonnes }} de CO2 équivalent
      par an pour ???
    </p>
    <ul class="list-style-none full-width fr-p-0 fr-p-md-2w fr-m-0">
      <li
        v-for="(detail, index) in bilanThematiqueViewModel.details"
        :key="detail.label"
        :class="bilanThematiqueViewModel.details.length - 1 === index ? 'fr-mb-0' : 'fr-mb-4w'"
      >
        <p class="fr-grid-row fr-grid-row--gutters flex-space-between align-items--center fr-mb-1v">
          <span class="fr-text--bold fr-col-auto">{{ detail.emoji }}</span>
          <span
            :class="`text--lh-1-3 fr-col-auto fr-py-1v fr-px-1w fr-mb-0 fr-mr-1w fr-text--sm border-radius--xs tag-impact-fort`"
          >
            {{ detail.label }}
          </span>
        </p>
        <div class="progress-bar border-radius--md" aria-hidden="true" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { TerminerActionUsecase } from '@/domaines/actions/terminerAction.usecase';
  import { BilanCarboneRepositoryAxios } from '@/domaines/bilanCarbone/adapters/bilanCarbone.repository.axios';
  import {
    BilanThematiquePresenterImpl,
    BilanThematiqueViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanThematique.presenter.impl';
  import { RecupererBilanDepuisThematiqueUsecase } from '@/domaines/bilanCarbone/recupererBilanDepuisThematique.usecase';
  import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    thematique: ClefThematiqueAPI;
    idAction: string;
  }>();
  const bilanThematiqueViewModel = ref<BilanThematiqueViewModel>();
  const recupererBilanUsecase = new RecupererBilanDepuisThematiqueUsecase(new BilanCarboneRepositoryAxios());
  const actionTermineUsecase = new TerminerActionUsecase(new ActionsRepositoryAxios(), ActionsEventBus.getInstance());

  onMounted(async () => {
    await actionTermineUsecase.execute(utilisateurStore().utilisateur.id, props.idAction, TypeAction.BILAN);

    await recupererBilanUsecase.execute(
      utilisateurStore().utilisateur.id,
      props.thematique,
      new BilanThematiquePresenterImpl(vm => {
        bilanThematiqueViewModel.value = vm;
      }),
    );
  });
</script>
