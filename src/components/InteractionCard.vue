<template>
  <div v-if="interactionViewModel" class="fr-card fr-enlarge-link fr-card--horizontal fr-card--horizontal-tier">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h3 class="fr-card__title">
            {{ getDeviceType() == DeviceType.TABLET ? `${interactionViewModel?.titre.slice(0, 30)}...` : interactionViewModel?.titre }}
        </h3>
        <!--<p class="fr-card__desc">{{ interactionViewModel?.sousTitre }}</p>-->
        <div class="fr-card__start">
          <span class="">{{ interactionViewModel?.categorie }}</span>
        </div>
        <div class="fr-card__end">
          <ul class="fr-tags-group">
            <li>
                <span class="fr-tag">
                  <span class=" fr-icon-time-line fr-icon--sm"> 5 min</span>
                </span>
            </li>
            <li class="no-tag">
              <span class="fr-icon-leaf-line fr-icon--sm">+ {{ interactionViewModel?.nombreDePointsAGagner }} points</span>
            </li>
          </ul>
        </div>
        <!--<div class="">
          <a :href="interactionViewModel?.url" :target="interactionViewModel?.isUrlExterne ? 'blank' : ''">Commencer</a>
        </div>-->
      </div>
<!--
      <div class="interaction-footer">
        <a
          @click="interactionAEteCliquee(interactionViewModel.id)"
          :href="interactionViewModel?.url"
          :target="interactionViewModel?.isUrlExterne ? 'blank' : ''"
          >Commencer</a
        >
        <span class="interaction-duration">5 min</span>
      </div>-->

    </div>
    <div class="fr-card__header">
        <div class="fr-card__img">
            <img class="fr-responsive-img" alt="interaction-item-logo" :src="interactionViewModel?.illustrationURL" />
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

export default {
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
  methods: {
    getDeviceType,
    interactionAEteCliquee(interactionId: string) {
      const idUtilisateur = store.getters["utilisateur/getId"];
      const useCase = new CliquerInteractionUsecase(new InteractionsRepositoryAxios());
      useCase.execute(idUtilisateur, interactionId);
    },
  },
};
</script>
<style scoped>

/* card dsfr mod */
.fr-card__content{
  padding: 1rem;
  height: auto;
}
.fr-card__title{
  text-align: left;

}
.fr-card__start, .fr-tags-group{
  margin-bottom: 0;
  text-align: left;
}
.fr-tags-group>li {
  line-height: 22px;
  height: 22px;
  font-size: .75rem;
    line-height: 1.25rem;
}
.fr-tags-group>li.no-tag {
  padding-top: 2px
}

.fr-card{
  border-radius: 6px;
}
.fr-card__body{
  padding: 0 1rem
}
.fr-card.fr-enlarge-link:not(.fr-card--no-icon) .fr-card__content{
  padding-bottom: 0;
}

.fr-card--horizontal-tier .fr-card__header{
  flex: 0 0 30%;
}
.fr-card__img img{
  border-radius: 6px;
  height: 120px;
  width: 240px;
  margin: 10px;
  object-fit: cover;
}

/* end card dsfr mod */

</style>
