<template>
  <div class="jauge-container">
    <div class="jauge-libelle text--bold">{{ libelle }}</div>
    <div class="jauge-background fr-ml-5v">
      <div
        class="jauge-remplissage"
        :style="{ position: 'static', backgroundColor: couleur, width: valeurToWidth(valeur) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      valeur: {
        type: Number,
        required: true,
        validator: value => value >= 0 && value <= 4,
      },
      libelle: {
        type: String,
        required: true,
      },
    },
    methods: {
      valeurToWidth(valeur) {
        return (valeur / 4) * 100;
      },
    },
  });
</script>

<style scoped>
  .jauge-container {
    position: relative;
    display: flex;
    align-items: center;
    height: 20px;
  }

  .jauge-background {
    background: linear-gradient(0deg, #dddddd, #dddddd), linear-gradient(0deg, #d9d9d9, #d9d9d9);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    max-width: 330px;
  }

  .jauge-remplissage {
    background: linear-gradient(270deg, #e42313 0%, #000091 100%), linear-gradient(0deg, #ffffff, #ffffff);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 1);
  }

  .jauge-libelle {
    font-size: 0.8rem;
    min-width: 120px;
  }
</style>
