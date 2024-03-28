<template>
  <PageConformite :type="PageConformiteType.MENTIONS_LEGALES" />
</template>
<script setup>
  import { PageConformiteType } from '@/conformites/recupererPageConformite.usecase.ts';
  import PageConformite from '@/components/custom/PageConformite/PageConformite.vue';
</script>
