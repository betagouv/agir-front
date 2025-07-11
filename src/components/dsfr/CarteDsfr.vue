<template>
  <div
    class="fr-card fr-enlarge-link"
    :class="{
      'fr-card--sm': size === 'sm',
      'fr-card--lg': size === 'lg',
      'fr-card--shadow': variations === 'shadow',
      'fr-card--horizontal-tier': horizontal,
    }"
  >
    <div class="fr-card__body">
      <div class="fr-card__content">
        <slot name="contenuStart" />
        <h3 class="fr-card__title">
          <router-link :to="to">{{ titre }}</router-link>
        </h3>
        <slot name="contenuEnd" />
      </div>
    </div>

    <div class="fr-card__header">
      <div class="fr-card__img">
        <img class="fr-responsive-img background--white" :src="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { RouterLinkParams } from '@/domaines/thematiques/ports/thematiqueResume.presenter';

  withDefaults(
    defineProps<{
      titre: string;
      image: string;
      to: RouterLinkParams;
      size?: 'sm' | 'md' | 'lg';
      horizontal?: boolean;
      variations?: 'none' | 'shadow';
    }>(),
    {
      size: 'md',
      horizontal: false,
      variations: 'none',
    },
  );
</script>
