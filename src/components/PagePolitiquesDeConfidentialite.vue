<template>
  <PageConformite :type="PageConformiteType.CONFIDENTIALITE" />
</template>
<script setup>
  import PageConformite from '@/components/custom/PageConformite/PageConformite.vue';
  import { PageConformiteType } from '@/conformites/recupererPageConformite.usecase.js';
</script>
