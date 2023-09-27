<template>
  <div class="jauge-container">
    <div class="jauge-background">
      <div
        class="jauge-remplissage"
        :style="{ position: 'static', backgroundColor: couleur, width: valeurToWidth(valeur) + '%' }"
      ></div>
    </div>
    <div class="jauge-label">{{ formatValeur(valeur) }}</div>
    <div class="jauge-libelle">{{ libelle }}</div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      couleur: {
        type: String,
        required: true,
      },
      valeur: {
        type: Number,
        required: true,
        validator: value => value >= 0 && value <= 5,
      },
      libelle: {
        type: String,
        required: true,
      },
    },
    methods: {
      valeurToWidth(valeur) {
        return (valeur / 5) * 100;
      },
      formatValeur(valeur) {
        return valeur.toLocaleString(undefined, { minimumFractionDigits: 1 }) + ' t';
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
    background-color: #f0f0f0;
    width: 40%;
    height: 100%;
    border-radius: 5px;
    max-width: 150px;
  }

  .jauge-remplissage {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 5px;
  }

  .jauge-label {
    margin-right: 10px;
    margin-left: 10px;
    font-weight: bold;
  }

  .jauge-libelle {
    font-size: 0.8rem;
  }
</style>
