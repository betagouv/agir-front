<template>
  <section class="fr-container">
    <h1 class="fr-h2 fr-mt-3w">Dictionnaire de tags</h1>

    <Callout titre="Tag back-end hors du cms">
      <template v-slot:texte>
        <ul>
          <li v-for="tagHS in viewModel?.tagBackEndHorsDuCms" :key="tagHS" v-text="tagHS" />
        </ul>
      </template>
    </Callout>

    <h2 class="fr-h3 fr-mb-3w">Les tags :</h2>
    <ul class="list-style-none fr-p-0">
      <li v-for="tag in viewModel?.tags" :key="tag.code">
        <span class="fr-badge fr-mb-1w" v-text="tag.type" />

        <h3 class="fr-h4" v-text="tag.description" />

        <p v-if="tag.descriptionInterne">
          <em v-text="tag.descriptionInterne" />
        </p>

        <div class="display-block">
          <p v-if="tag.estHorsDuBackend" class="fr-badge fr-badge--warning">TAG HORS DU BACK-END</p>
          <p v-if="tag.estInatteignableViaKYC" class="fr-badge fr-badge--warning">TAG INATTEIGNABLE VIA KYC</p>
          <p v-if="tag.estAtteignableViaKYC" class="fr-badge fr-badge--success">TAG ATTEIGNABLE VIA KYC</p>
        </div>

        <p v-if="tag.descriptionDynamique">
          <span class="text--bold">Description du tag dynamique :</span> {{ tag.descriptionDynamique }}
        </p>

        <code
          class="display-inline-block fr-p-1w fr-code background--gris-dark fr-text--sm fr-mb-0"
          v-text="tag.code"
        />

        <hr class="fr-mt-4w fr-mb-1w" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Callout from '@/components/dsfr/Callout.vue';
  import { AfficherMappingTagKYCPresenterImpl } from '@/domaines/personnalisation/adapters/afficherMappingTagKYC.presenter.impl';
  import { PersonnalisationRepositoryAxios } from '@/domaines/personnalisation/adapters/personnalisation.repository.axios';
  import { MappingTagKYCViewModel } from '@/domaines/personnalisation/ports/afficherMappingTagKYC.presenter';
  import { RecupererMappingTagKYCUsecase } from '@/domaines/personnalisation/recupererMappingTagKYC.usecase';

  const viewModel = ref<MappingTagKYCViewModel>();
  const personnalisationRepository = new PersonnalisationRepositoryAxios();
  const recupererMappingTagKYCUsecase = new RecupererMappingTagKYCUsecase(
    personnalisationRepository,
    new AfficherMappingTagKYCPresenterImpl(vm => (viewModel.value = vm)),
  );

  onMounted(async () => {
    await recupererMappingTagKYCUsecase.execute();
  });
</script>

<style scoped></style>
