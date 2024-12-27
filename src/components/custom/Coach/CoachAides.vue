<template>
  <div>
    <h3 class="fr-mb-0">
      Mes aides à <span class="text--bleu">{{ commune }}</span
      ><span aria-hidden="true">&nbsp;💶</span>
    </h3>
    <p>Retrouvez un ensemble d'aides locales et nationales</p>
    <ul class="list-style-none fr-pl-0">
      <li v-for="aide in aidesNonGroupees" :key="aide.id">
        <AideLink :aide="aide" />
      </li>
    </ul>
    <router-link class="fr-link" :to="RouteAidesPath.AIDES">Voir toutes les aides</router-link>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import AideLink from '@/components/custom/Aides/AideLink.vue';
  import { chargementAidesAxiosRepository } from '@/domaines/aides/adapters/chargementAidesAxiosRepository';
  import {
    AideNonGroupeeViewModel,
    ChargementAidesNonGroupeesPresenterImpl,
  } from '@/domaines/aides/adapters/chargementCinqAidesNonGroupees.presenter.impl';
  import ChargementAidesUsecase from '@/domaines/aides/chargementAides.usecase';
  import { LogementPresenterImpl } from '@/domaines/logement/adapters/logement.presenter.impl';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { RecupererInformationLogementUseCase } from '@/domaines/logement/recupererInformationLogement.usecase';
  import { RouteAidesPath } from '@/router/aides/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const aidesNonGroupees = ref<AideNonGroupeeViewModel[]>();
  const commune = ref<string>('');
  onMounted(async () => {
    const { id: utilisateurId } = utilisateurStore().utilisateur;
    const usecase = new ChargementAidesUsecase(new chargementAidesAxiosRepository());

    const informationLogementUseCase = new RecupererInformationLogementUseCase(new LogementRepositoryAxios());
    await Promise.all([
      usecase.execute(
        utilisateurId,
        new ChargementAidesNonGroupeesPresenterImpl(aidesViewModel => (aidesNonGroupees.value = aidesViewModel)),
      ),
      informationLogementUseCase.execute(
        utilisateurStore().utilisateur.id,
        new LogementPresenterImpl(viewModel => {
          commune.value = viewModel.commune_label;
        }),
      ),
    ]);
  });
</script>
