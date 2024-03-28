<template>
  <PageConformite :type="PageConformiteType.MENTIONS_LEGALES" />
</template>
<script setup>
  import PageConformite from '@/components/custom/PageConformite/PageConformite.vue';
  import { PageConformiteType } from '@/conformites/recupererPageConformite.usecase.js';
</script>
