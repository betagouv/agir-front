<template>
  <div>
    <h3 class="fr-mb-0">
      Vos aides à <span class="text--bleu">{{ commune }}</span
      >&nbsp;💶
    </h3>
    <p>Retrouvez un ensemble d'aides locales et nationales</p>
    <ul class="list-style-none fr-mb-2w">
      <li
        v-for="aide in aidesNonGroupees"
        :key="aide.id"
        class="aide-link-card position--relative fr-mb-3w background--white shadow border-radius--md fr-p-3w full-height fr-grid-row flex-space-between"
      >
        <div class="todo full-width">
          <div>
            <h3 class="fr-text--lg text--semi-bold fr-m-0">
              <router-link :to="aide.url" class="aide-link-card__link display-block fr-mb-0">
                {{ aide.titre }}
              </router-link>
            </h3>
          </div>
          <div class="fr-ml-auto">
            <span
              v-if="aide.isSimulateur"
              class="fr-tag background-bleu-light fr-mr-1w fr-icon-money-euro-circle-line fr-tag--icon-left"
            >
              Simulateur
            </span>
            <span class="fr-icon-arrow-right-s-line todo__picto text--bleu" aria-hidden="true"></span>
          </div>
        </div>
      </li>
    </ul>
    <router-link class="fr-link" :to="RouteAidesPath.VOS_AIDES">Voir toutes les aides</router-link>
  </div>
</template>

<style scoped>
  .todo {
    display: flex;
    gap: 1rem;
    align-items: center;
    border-radius: 8px;
    transition: box-shadow 0.3s ease;
  }

  .aide-link-card {
    transition: box-shadow 0.3s ease-in-out;
  }

  .aide-link-card:hover {
    box-shadow: 0 6px 18px 0 rgba(0, 0, 18, 0.4);
    outline-width: 0;
  }

  .aide-link-card__link {
    background-image: none;
    outline-width: 0;
  }

  .aide-link-card__link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    outline-color: inherit;
    outline-offset: 2px;
    outline-style: inherit;
    border-radius: 0.5rem;
  }

  .todo:hover .fr-icon-arrow-right-s-line::before {
    animation: slide1 1s ease-in-out infinite;
  }

  @keyframes slide1 {
    0%,
    100% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(10px, 0);
    }
  }
</style>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
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
