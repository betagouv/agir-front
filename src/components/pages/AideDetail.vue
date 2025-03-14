<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-8">
      <div class="fr-my-3w background--white border border-radius--md fr-p-2w">
        <ThematiqueTag
          :tag="{
            label: MenuThematiques.getThematiqueData(aide.thematique).labelDansLeMenu,
            style: TagThematique.getTagThematiqueUtilitaire(aide.thematique),
          }"
          aria-hidden="true"
        />

        <h1 class="fr-h1 fr-mt-2w fr-mb-0">
          {{ aide.titre }}
        </h1>

        <p v-if="derniereMiseAJour" class="text--italic fr-text--sm fr-mt-2w fr-mb-1w">
          Dernière mise à jour le {{ derniereMiseAJour }}
        </p>
        <p v-else class="text--italic fr-text--sm fr-mt-2w fr-mb-1w">Dernière mise à jour en décembre 2024</p>

        <span class="fr-col-12 fr-pr-2w">
          <span v-if="aide.isSimulateur || aide.montantMaximum" class="fr-grid-row">
            <span
              v-if="aide.isSimulateur"
              class="fr-tag background-bleu-light fr-mr-1w fr-icon-money-euro-circle-line fr-tag--icon-left"
            >
              <span class="fr-sr-only">: </span>
              Simulateur
            </span>
            <span v-if="aide.montantMaximum" class="fr-tag">
              <span class="fr-sr-only">, </span>
              {{ aide.montantMaximum }}
            </span>
          </span>
        </span>
        <div class="cms__content" v-html="aide.contenu" />
        <div class="flex align-items--center gap--small">
          <a
            v-if="aide.urlCommencerVotreDemarche"
            :href="aide.urlCommencerVotreDemarche"
            class="fr-btn"
            rel="noopener external"
            target="_blank"
          >
            Commencer votre démarche
          </a>
          <router-link
            v-if="aide.isSimulateur"
            :to="{ path: aide.url }"
            class="fr-btn fr-btn--icon-left fr-icon-arrow-right-line"
          >
            Estimer le montant des aides
          </router-link>
        </div>
      </div>
    </div>
    <div class="fr-col-12 fr-col-md-4 fr-mt-3w fr-mb-4w">
      <div v-if="aide.partenaire" class="background--white border border-radius--md fr-p-2w">
        <p class="fr-mb-0">Proposé par</p>
        <img :alt="aide.partenaire.nom" :src="aide.partenaire.logoUrl" class="fr-mt-5v max-full-width" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import ThematiqueTag from '@/components/custom/Thematiques/ThematiqueTag.vue';
  import { Aide } from '@/domaines/aides/chargementAides.usecase';
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { TagThematique } from '@/domaines/thematiques/TagThematique';

  const props = defineProps<{ aide: Aide }>();

  const derniereMiseAJour = ref<string>('');
  if (props.aide.derniereMaj) {
    derniereMiseAJour.value = new Date(props.aide.derniereMaj).toLocaleDateString('fr-FR');
  }
</script>
