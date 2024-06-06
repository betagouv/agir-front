<template>
  <h2 class="fr-h4 fr-mb-1w">{{ defi.libelle }}</h2>
  <span v-if="defi.description" class="fr-text--xs text--mention-grey">{{ defi.description }}</span>
  <div :class="`border-radius--md fr-p-3w fr-my-2w ${message.background}`">
    <h3 class="fr-h4">{{ message.titre }}</h3>
    <p class="fr-mb-0 text--gris fr-text--lg fr-text--bold" v-html="message.description" />
  </div>
  <div v-if="message.gainDePoint" class="defi-accepte fr-mb-2w">
    <span class="fr-text--bold"> Bien joué ! </span>
    Vous récoltez <span class="fr-text--bold">+{{ defi.points }}</span>
    <img width="32" src="/ic_score.svg" alt="points" />
  </div>
  <router-link class="fr-btn fr-btn--icon-left fr-icon-arrow-left-line" :to="useBoutonRetour().url">
    {{ useBoutonRetour().label }}
  </router-link>
</template>

<script setup lang="ts">
  import { useBoutonRetour } from '@/composables/boutonRetour';
  import { DefiViewModel } from '@/domaines/defi/adapters/defi.presenter.impl';

  const props = defineProps<{ defi: DefiViewModel; reponse: string }>();

  const message = {
    titre: '',
    description: '',
    background: '',
    gainDePoint: false,
  };

  if (props.reponse === 'pas_envie') {
    message.titre = '👎 Pas envie';
    message.description = 'Merci pour votre réponse, retrouvez d’autres défis à relever sur la page d’accueil';
    message.background = 'background-bleu-alt-light';
    message.gainDePoint = false;
  } else if (props.reponse === 'deja_fait') {
    message.titre = '✅ Déjà fait';
    message.description = 'Bravo, chaque geste compte !';
    message.gainDePoint = true;
    message.background = 'defi-accepete--message-success';
  } else if (props.reponse === 'en_cours') {
    message.titre = '👍 Défi accepté';
    message.description =
      'Merci pour votre réponse et bravo !<br> N’oubliez pas de mettre à jour le défi en cours quand vous l’avez réalisé sur la page d’accueil';
    message.gainDePoint = false;
    message.background = 'defi-accepete--message-success';
  } else if (props.reponse === 'fait') {
    message.titre = '🏆 Défi realisé ';
    message.description =
      'Félicitations, chaque geste compte !<br> Retrouvez l’ensemble des actions que vous avez réalisé dans votre profil et de nouveaux défis à relever sur la page d’accueil';
    message.gainDePoint = true;
    message.background = 'defi-accepete--message-success';
  } else if (props.reponse === 'abondon') {
    message.titre = "❌ J'abandonne";
    message.description = 'Découvrez sur la page d’accueil d’autres défis recommandés pour vous';
    message.gainDePoint = false;
    message.background = 'background-bleu-alt-light';
  } else if (props.reponse === props.defi.reponse) {
    message.titre = '⏱️ Je relance le défi';
    message.description = 'Vous avez de nouveau 7 jours  pour relever le défi, à vous de jouer !';
    message.gainDePoint = false;
    message.background = 'defi-accepete--message-success';
  }
</script>

<style scoped>
  .defi-accepte {
    display: flex;
    width: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    gap: 0.5rem;
    background-image: url('/article-quiz-gagne.png');
    background-size: contain;
    background-position: center;
  }

  .defi-accepete--message-success {
    background-color: #e1edd6;
  }
</style>
