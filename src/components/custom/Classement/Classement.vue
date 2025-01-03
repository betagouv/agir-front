<template>
  <section>
    <CarteInfo>
      <div class="fr-grid-row align-items--center fr-text--lg">
        <span class="fr-mr-2w fr-col-auto" aria-hidden="true">🤩</span>
        <p v-html="classementViewModel.phraseClassement" class="fr-mb-0 fr-col" />
      </div>
    </CarteInfo>
    <ol class="list-style-none fr-p-0">
      <li
        v-for="(item, index) in classementViewModel.classement"
        :class="`fr-grid-row align-items--center flex-space-between fr-mb-2w border-radius--md shadow--light fr-p-2w ${item.style}`"
        :key="index"
        :value="index"
      >
        <div class="fr-grid-row align-items--center fr-text--bold">
          <img v-if="item.medailleTopTrois" :src="item.medailleTopTrois" :alt="`${index}`" class="fr-mr-1w" />
          <span v-else class="border border-radius--md fr-text--bold fr-p-1w fr-mr-1w background--white">
            {{ item.rang }}
          </span>
          <span>{{ item.prenom }}</span>
        </div>
        <div class="fr-grid-row background--white align-items--center border-radius--md fr-text--bold fr-p-1w">
          <span class="fr-mr-1v">{{ item.points }}</span>
          <img src="/ic_score.svg" alt="points" />
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import { ClassementViewModel } from '@/domaines/classement/adapters/classement.presenter.impl';

  defineProps<{ classementViewModel: ClassementViewModel }>();
</script>

<style scoped>
  ol li:nth-child(3) {
    position: relative;
    margin-bottom: 4rem !important;
  }

  ol li:nth-child(3)::before {
    content: '';
    position: absolute;
    bottom: -2rem;
    left: 0;
    width: 10%;
    height: 2px;
    background-color: var(--blue-france-sun-113-625);
  }
</style>
