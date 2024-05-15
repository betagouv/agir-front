<template>
  <PageConformite :type="PageConformiteType.CHARTE" />
</template>
<script setup>
  import PageConformite from '@/components/custom/PageConformite/PageConformite.vue';
  import { PageConformiteType } from '@/conformites/recupererPageConformite.usecase.ts';
</script>
