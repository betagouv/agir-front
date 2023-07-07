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
      </div>
      <div class="fr-card__footer">
        <a
          @click="interactionAEteCliquee(interactionViewModel.id)"
          :href="interactionViewModel?.url"
          :target="interactionViewModel?.isUrlExterne ? 'blank' : ''"
          >Commencer <span class="fr-icon-arrow-right-s-line" aria-hidden="true">&nbsp;</span></a
        >
      </div>
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

.fr-card__body{
  flex-direction: row;
}
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
.fr-card:before{
  content: none;
}
.fr-card__body{
  padding: 0 1rem
}
.fr-card.fr-enlarge-link:not(.fr-card--no-icon) .fr-card__content{
  padding-bottom: 0;
}


/* card image */
.fr-card--horizontal-tier .fr-card__header{
  flex: 0 0 30%;
}
.fr-card__img {
  padding: 10px;
}
.fr-card__img img{
  border-radius: 6px;
  max-height: 120px;
  max-width: 240px;
  object-fit: cover;
}
/* bloc "commencer" */
.fr-card__footer{
  text-align: right;
  margin-left: auto;
    margin-top: auto;
    margin-bottom: auto;
  order: 2;
  padding: 0.5rem 2rem 0rem;
}

/*@media only screen and (min-width : 768px) {
  .fr-card__footer{
    display:none;
  }
}*/

/* end card dsfr mod */

</style>
