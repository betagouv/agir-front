<template>
  <dialog aria-labelledby="fr-modal-title-modal-1" role="dialog" id="fr-modal-1" class="fr-modal">
    <div class="fr-container fr-container--fluid fr-container-md">
      <div class="fr-grid-row fr-grid-row--center">
        <div class="fr-col-12 fr-col-md-8">
          <div class="fr-modal__body">
            <div class="fr-modal__header">
              <button
                class="fr-btn--close fr-btn"
                title="Fermer la fenêtre modale"
                aria-controls="fr-modal-1"
                ref="boutonFermer"
              >
                Fermer
              </button>
            </div>
            <div class="fr-modal__content">
              <h1 id="fr-modal-title-modal-1" class="fr-modal__title">Qu'avez-vous pensé de cette action ?</h1>
              <div class="fr-grid-row">
                <div class="fr-col-9">
                  <p>
                    Vos retours sont précieux et façonnent ce service. Partagez-nous vos impressions, nous nous
                    efforcerons d’y répondre prochainement.
                  </p>
                  <form @submit.prevent="envoyerFeedbackAction">
                    <FieldsetNotationEtoile
                      v-model:notation="notation"
                      legend="Avez-vous aimé cette page?"
                      :total="4"
                    />

                    <div class="flex flex-column fr-input-group">
                      <label class="fr-label" for="commentaire">Comment pourrions-nous l'améliorer ?</label>
                      <textarea
                        v-model="commentaire"
                        id="commentaire"
                        name="commentaire"
                        rows="4"
                        class="fr-input"
                        maxlength="500"
                      />
                    </div>

                    <button
                      type="submit"
                      title="Envoyer le formulaire de feedback"
                      class="fr-btn fr-btn--secondary fr-btn--icon-right fr-icon-arrow-right-line"
                    >
                      Envoyer
                    </button>
                  </form>
                </div>
                <div class="fr-col-3">
                  <img src="/feedback-illustration.webp" alt="" class="full-width max-full-width" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import FieldsetNotationEtoile from '@/components/custom/Form/FieldsetNotationEtoile.vue';
  import { useFlashMessage } from '@/composables/useFlashMessage';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { FeedbackRepositoryAxios } from '@/domaines/feedback/adapters/feedback.repository.axios';
  import { ActionFeedback, EnvoyerFeedbackActionUsecase } from '@/domaines/feedback/envoyerFeedbackAction.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    actionId: string;
    notation?: number;
  }>();

  const emit = defineEmits<{
    (e: 'feedback-envoye', notation: number): void;
  }>();

  const boutonFermer = ref<HTMLButtonElement>();
  const envoyerFeedback = new EnvoyerFeedbackActionUsecase(new FeedbackRepositoryAxios());
  const utilisateurId = utilisateurStore().utilisateur.id;
  const typeAction = useRoute().params.type.toString() as TypeAction;
  const { showFlashMessage } = useFlashMessage();

  const notation = ref<number>(props.notation ?? 0);
  const commentaire = ref<string>();

  watch(
    () => props.notation,
    note => {
      notation.value = note ?? 0;
    },
  );

  async function envoyerFeedbackAction() {
    const feedback: ActionFeedback = {
      note: notation.value,
      commentaire: commentaire.value,
    };

    await envoyerFeedback.execute(utilisateurId, props.actionId, typeAction, feedback).then(() => {
      emit('feedback-envoye', notation.value);
      boutonFermer.value?.click();

      showFlashMessage({
        message: 'Merci pour votre retour ! Notre équipe en prendra connaissance très prochainement',
        type: 'success',
      });
    });
  }
</script>
