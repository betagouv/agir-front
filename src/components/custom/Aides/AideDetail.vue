<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-8">
      <div class="fr-my-3w background--white shadow--light fr-p-2w">
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
          <span v-if="aide.isSimulateur || aide.montantMaximum || aide.estGratuit" class="fr-grid-row">
            <span
              v-if="aide.isSimulateur"
              class="fr-tag background-bleu-light fr-mr-1w fr-icon-money-euro-circle-line fr-tag--icon-left"
            >
              <span class="fr-sr-only">: </span>
              Simulateur
            </span>
            <span v-if="aide.montantMaximum" class="fr-tag">
              <span class="fr-sr-only">, </span>
              Jusqu'à {{ MontantAfficheEnFRBuilder.build(aide.montantMaximum) }}
            </span>
            <span v-if="aide.estGratuit" class="fr-tag">
              <span class="fr-sr-only">, </span>
              Gratuit
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
            @click="trackAide(aide.id, AIDE_TRACKING.DEMANDE)"
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
    <div class="fr-col-12 fr-col-md-4">
      <div v-if="aide.partenaire" class="fr-mt-3w shadow--light">
        <div class="fr-grid-row flex-space-between align-items--center full-width background--white fr-p-2w">
          <p class="text--lh-1-3 fr-h5 fr-mb-0 fr-col-8">
            <span class="text--normal text--bleu text--italic fr-text--md">Proposé par</span><br />
            {{ aide.partenaire.nom }}
          </p>
          <div class="fr-col-4">
            <img
              v-if="aide.partenaire.logoUrl"
              :src="aide.partenaire.logoUrl"
              alt=""
              class="full-width img-partenaire"
            />
          </div>
        </div>
        <BandeauAimezVousCettePage
          v-if="utilisateurStore().estConnecte"
          v-model:notation="notation"
          :feedbackNote="feedbackNote"
        />
      </div>

      <div class="fr-mt-3w fr-pt-3w align-items--center shadow--light full-width background--white fr-p-2w">
        <PartageReseauxSociaux />
      </div>
    </div>

    <AideModaleFeedback :aideId="props.aide.id" :notation="notation" @feedback-envoye="updateNotation" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import BandeauAimezVousCettePage from '@/components/custom/Action/Aside/BandeauAimezVousCettePage.vue';
  import AideModaleFeedback from '@/components/custom/Aides/AideModaleFeedback.vue';
  import ThematiqueTag from '@/components/custom/Thematiques/ThematiqueTag.vue';
  import PartageReseauxSociaux from '@/components/dsfr/PartageReseauxSociaux.vue';
  import { Aide } from '@/domaines/aides/chargementAides.usecase';
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { TagThematique } from '@/domaines/thematiques/TagThematique';
  import { MontantAfficheEnFRBuilder } from '@/shell/formatting/nombreAfficheEnFRBuilder';
  import { AIDE_TRACKING, trackAide } from '@/shell/tracking/aideTracking';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{ aide: Aide }>();
  const notation = ref<number>(0);
  const feedbackNote = ref<number>(-1);

  const derniereMiseAJour = ref<string>('');
  if (props.aide.derniereMaj) {
    derniereMiseAJour.value = new Date(props.aide.derniereMaj).toLocaleDateString('fr-FR');
  }

  function updateNotation(note: number) {
    notation.value = note;
    feedbackNote.value = note;
  }
</script>
