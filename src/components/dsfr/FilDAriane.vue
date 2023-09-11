<template>
  <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
    <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">Voir le fil d’Ariane</button>
    <div class="fr-collapse" id="breadcrumb">
      <ol class="fr-breadcrumb__list">
        <li v-for="page in pageHierarchie" :key="page.label">
          <a class="fr-breadcrumb__link" :href="`/${page.url}`">{{ page.label }}</a>
        </li>
        <li>
          <a class="fr-breadcrumb__link" aria-current="page">{{ pageCourante }}</a>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
  defineProps<{
    pageHierarchie: {
      label: string,
      url: string
    }[]
    pageCourante: string
  }>()
</script>
