<template>
  <div v-if="interactionViewModel" class="fr-card fr-enlarge-link fr-card--horizontal fr-card--horizontal-tier">
    <div class="interaction-locked" v-show="interactionViewModel.estBloquee" />
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h3 class="fr-card__title">
          {{ getDeviceType() == DeviceType.TABLET ? `${interactionViewModel?.titre.slice(0, 30)}...` : interactionViewModel?.titre }}
        </h3>
        <div class="fr-card__start">
          <span class="fr-text--sm fr-text--bold">{{ interactionViewModel.categorie }}</span>
        </div>
        <div class="fr-card__end">
          <ul class="fr-tags-group">
            <li>
              <span class="fr-tag">
                {{ interactionViewModel.duree }}
              </span>
            </li>
            <li class="no-tag fr-ml-1v">
              <span class="fr-icon-leaf-line fr-icon--sm">+ {{ interactionViewModel.nombreDePointsAGagner }} </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="fr-card__footer">
        <a
          class="fr-link"
          v-if="!interactionViewModel.estBloquee"
          @click="interactionAEteCliquee(interactionViewModel.id, interactionViewModel.type)"
          :href="interactionViewModel.url"
          :target="interactionViewModel.isUrlExterne ? 'blank' : ''"
          >Commencer <span class="fr-icon-arrow-right-s-line" aria-hidden="true">&nbsp;</span></a
        >
        <div v-else>À venir <span class="fr-icon-lock-line" aria-hidden="true">&nbsp;</span></div>
      </div>
    </div>
    <div class="fr-card__header">
      <div class="fr-card__img">
        <img class="fr-responsive-img" alt="interaction-item-logo" :src="interactionViewModel.illustrationURL" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { InteractionViewModel } from "@/interactions/adapters/interactions.presenter.impl";
import { DeviceType, getDeviceType } from "@/DeviceType";
import { CliquerInteractionUsecase } from "@/interactions/cliquerInteraction.usecase";
import { InteractionsRepositoryAxios } from "@/interactions/adapters/interactionsRepository.axios";
import store from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "InteractionCard",
  computed: {
    DeviceType() {
      return DeviceType;
    },
  },
  props: {
    interactionViewModel: {
      type: Object as () => InteractionViewModel,
      required: true,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const interactionAEteCliquee = (interactionId: string, interactionType: string) => {
      const idUtilisateur = store.getters["utilisateur/getId"];
      const useCase = new CliquerInteractionUsecase(new InteractionsRepositoryAxios());
      useCase.execute(idUtilisateur, interactionId, interactionType).then(() => {
        emit("refreshInteractions");
      });
      store.commit("utilisateur/setInteractionEnCours", interactionId);
    };
    return { interactionAEteCliquee };
  },
  methods: {
    getDeviceType,
  },
});
</script>
<style scoped>
/* card dsfr mod */

.fr-card__body {
  flex-direction: row;
  padding: 0 1rem;
}
.fr-card__content {
  padding: 1rem;
  height: auto;
}
.fr-card__title {
  text-align: left;
}
.fr-card__start,
.fr-tags-group {
  margin-bottom: 0;
  text-align: left;
}

.fr-card__end {
  display: inline-block;
}
.fr-tags-group > li {
  line-height: 22px;
  height: 22px;
  font-size: 0.75rem;
  line-height: 1.25rem;
}
.fr-tags-group > li.no-tag {
  padding-top: 2px;
}

.fr-card {
  border-radius: 6px;
}
.fr-card:before {
  content: none;
}
.fr-card.fr-enlarge-link:not(.fr-card--no-icon) .fr-card__content {
  padding-bottom: 0;
}

/* card image */
.fr-card--horizontal-tier .fr-card__header {
  flex: 0 0 30%;
}
.fr-card__img {
  padding: 10px;
}
.fr-card__img img {
  border-radius: 6px;
  max-height: 120px;
  max-width: 240px;
  object-fit: cover;
}
/* bloc "commencer" */
.fr-card__footer {
  text-align: right;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  padding: 0.5rem 2rem 0rem;
}

@media only screen and (max-width: 768px) {
  .fr-card__body {
    flex-direction: column;
  }
  .fr-card__footer {
    width: 0%;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  .fr-card {
    flex-direction: row;
  }
  /*.fr-card__header {
    display: none
  }*/
}

@media only screen and (max-width: 576px) {
  .fr-card__header {
    display: none;
  }
  .fr-card {
    padding-left: 1rem;
  }
}

/* end card dsfr mod */

.interaction-locked {
  border-radius: 0.375rem;
  opacity: 0.6000000238418579;
  background: #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}
</style>
