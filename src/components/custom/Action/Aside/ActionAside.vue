<template>
  <aside v-if="estConnecte">
    <div class="shadow fr-mb-2w">
      <div class="background--white fr-p-2w">
        <slot />
      </div>
      <BandeauAimezVousCettePage v-model:notation="notation" :feedback-note="feedbackNote" />
    </div>

    <ActionModaleFeedback
      :notation="notation"
      :action-id="actionBaseViewModel.actionId"
      @feedback-envoye="updateNotation"
    />

    <ActionEncartPartenaire v-if="actionBaseViewModel.partenaire" :partenaire="actionBaseViewModel.partenaire" />

    <ExplicationsRecommandations
      v-if="actionBaseViewModel.explicationsRecommandation"
      :explications-recommandation="actionBaseViewModel.explicationsRecommandation"
    />
  </aside>

  <aside v-else>
    <div class="shadow fr-mb-2w">
      <div class="background--white fr-p-2w">
        <h2 class="fr-h3 text--lh-1-3">
          <span class="underline-courbe underline-courbe--vert">200</span> idées pour faire des économies en réduisant
          son empreinte
        </h2>

        <ul class="fr-p-0 list-style-none fr-tags-group fr-tags-group--sm fr-mb-2w">
          <li class="text--lh-1-3">
            <p class="fr-tag fr-tag--custom-bleu"><span aria-hidden="true">🍛</span> Cuisine</p>
          </li>
          <li class="text--lh-1-3">
            <p class="fr-tag fr-tag--custom-bleu"><span aria-hidden="true">🚅</span> Déplacements</p>
          </li>
          <li class="text--lh-1-3">
            <p class="fr-tag fr-tag--custom-bleu"><span aria-hidden="true">🏠</span> Logement</p>
          </li>
          <li class="text--lh-1-3">
            <p class="fr-tag fr-tag--custom-bleu"><span aria-hidden="true">💰</span> Aides financières</p>
          </li>
          <li class="text--lh-1-3"><p class="fr-tag fr-tag--custom-bleu">Solutions pratiques locales</p></li>
        </ul>

        <form class="flex flex-column">
          <!--          todo-->
          <InputText name="email" label="Juste avec un mail !" v-model="email" class="fr-mb-2w" />
          <button class="fr-btn full-width text--center flex-center">Valider</button>
        </form>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ActionEncartPartenaire from '@/components/custom/Action/Aside/ActionEncartPartenaire.vue';
  import ActionModaleFeedback from '@/components/custom/Action/Aside/ActionModaleFeedback.vue';
  import BandeauAimezVousCettePage from '@/components/custom/Action/Aside/BandeauAimezVousCettePage.vue';
  import ExplicationsRecommandations from '@/components/custom/Action/Aside/ExplicationsRecommandations.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();

  const estConnecte: boolean = utilisateurStore().estConnecte;
  const email = ref<string>('');
  const notation = ref<number>(0);
  const feedbackNote = ref<number>(-1);

  function updateNotation(note: number) {
    notation.value = note;
    feedbackNote.value = note;
  }
</script>
