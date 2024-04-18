<template>
  <div>
    <PageConformite :type="PageConformiteType.CONFIDENTIALITE" />
    <div class="fr-container fr-mb-4w">
      <p>
        Vous pouvez vous opposer au suivi de votre navigation sur ce site web. Cela protégera votre vie privée, mais
        empêchera également le propriétaire d'apprendre de vos actions et de créer une meilleure expérience pour vous et
        les autres utilisateurs.
      </p>
      <InputCheckboxUnitaire
        class="fr-pl-1v"
        id="cgu"
        v-model="utilisateurStore().tracking.matomo"
        label="Je souhaite ne pas être suivi par Matomo sur ce site."
        @update:modelValue="onOptInOrOutMatomo()"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import PageConformite from '@/components/custom/PageConformite/PageConformite.vue';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import { PageConformiteType } from '@/conformites/recupererPageConformite.usecase.ts';
  import { utilisateurStore } from '@/store/utilisateur';

  function onOptInOrOutMatomo() {
    if (utilisateurStore().tracking.matomo) {
      window._paq.push(['forgetUserOptOut']);
    } else {
      window._paq.push(['optUserOut']);
    }
  }
</script>
