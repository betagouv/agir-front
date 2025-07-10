<template>
  <div class="fr-mt-4w">
    <div class="fr-grid-row fr-grid-row--gutters fr-my-6w">
      <section class="full-height fr-col-12 fr-col-md-6 fr-pr-md-2w">
        <h2 class="fr-h3">Que faire de mes objets ?</h2>
        <CarteDsfr
          :horizontal="true"
          :to="{
            name: RouteServiceName.LONGUE_VIE_AUX_OBJETS,
            params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).url },
          }"
          image="/carte_service_aides_reno.svg"
          size="sm"
          titre="Réparez, vendez, louez vos objets"
          variations="shadow"
        >
          <template #contenuEnd>
            <p class="fr-card__desc">
              Redonnez vie à vos objets et trouvez les nouveaux en seconde main. Pour préserver les ressources de la
              planète… et de votre porte-monnaie !
            </p>
          </template>
        </CarteDsfr>
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import CarteDsfr from '@/components/dsfr/CarteDsfr.vue';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { RouteServiceName } from '@/router/services/routes';
</script>
