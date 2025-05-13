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
              <h1 id="fr-modal-title-modal-1" class="fr-modal__title">Qu'avez-vous pensé de cette aide ?</h1>
              <div class="fr-grid-row">
                <div class="fr-col-9">
                  <p>
                    Vos retours sont précieux et façonnent ce service. Partagez-nous vos impressions, nous nous
                    efforcerons d’y répondre prochainement.
                  </p>
                  <form @submit.prevent="envoyerFeedbackAide">
                    <FieldsetNotationEtoile
                      v-model:notation="notation"
                      legend="Avez-vous aimé cette page ?"
                      :total="4"
                    />

                    <fieldset class="fr-fieldset">
                      <legend class="fr-fieldset__legend text--normal">Connaissiez-vous cette aide ?</legend>
                      <div class="fr-fieldset__element fr-fieldset__element--inline">
                        <div class="fr-radio-group">
                          <input
                            type="radio"
                            id="radio-inline-1"
                            name="radio-inline"
                            v-model="estConnue"
                            :value="true"
                          />
                          <label class="fr-label" for="radio-inline-1">Oui</label>
                        </div>
                      </div>
                      <div class="fr-fieldset__element fr-fieldset__element--inline">
                        <div class="fr-radio-group">
                          <input
                            type="radio"
                            id="radio-inline-2"
                            name="radio-inline"
                            v-model="estConnue"
                            :value="false"
                            checked
                          />
                          <label class="fr-label" for="radio-inline-2">Non</label>
                        </div>
                      </div>
                    </fieldset>

                    <fieldset class="fr-fieldset">
                      <legend class="fr-fieldset__legend text--normal">Comptez-vous demander cette aide ?</legend>
                      <div class="fr-fieldset__element fr-fieldset__element--inline">
                        <div class="fr-radio-group">
                          <input
                            type="radio"
                            id="radio-inline-3"
                            name="radio-inline-2"
                            v-model="seraSollicite"
                            :value="true"
                          />
                          <label class="fr-label" for="radio-inline-3">Oui</label>
                        </div>
                      </div>
                      <div class="fr-fieldset__element fr-fieldset__element--inline">
                        <div class="fr-radio-group">
                          <input
                            type="radio"
                            id="radio-inline-4"
                            name="radio-inline-2"
                            v-model="seraSollicite"
                            :value="false"
                            checked
                          />
                          <label class="fr-label" for="radio-inline-4">Non</label>
                        </div>
                      </div>
                    </fieldset>

                    <div class="flex flex-column fr-input-group">
                      <label class="fr-label" for="pourquoi">Pourquoi ?</label>
                      <textarea
                        v-model="pourquoi"
                        id="pourquoi"
                        name="pourquoi"
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
  import FieldsetNotationEtoile from '@/components/custom/Form/FieldsetNotationEtoile.vue';
  import { useFlashMessage } from '@/composables/useFlashMessage';
  import { FeedbackRepositoryAxios } from '@/domaines/feedback/adapters/feedback.repository.axios';
  import { AideFeedback, EnvoyerFeedbackAideUsecase } from '@/domaines/feedback/envoyerFeedbackAide.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    notation?: number;
    aideId: string;
  }>();

  const emit = defineEmits<{
    (e: 'feedback-envoye', notation: number): void;
  }>();

  const boutonFermer = ref<HTMLButtonElement>();
  const envoyerFeedback = new EnvoyerFeedbackAideUsecase(new FeedbackRepositoryAxios());
  const utilisateurId = utilisateurStore().utilisateur.id;
  const { showFlashMessage } = useFlashMessage();

  const notation = ref<number>(props.notation ?? 0);
  const estConnue = ref<boolean>(false);
  const seraSollicite = ref<boolean>(false);
  const pourquoi = ref<string>('');

  watch(
    () => props.notation,
    note => {
      notation.value = note ?? 0;
    },
  );

  async function envoyerFeedbackAide() {
    const feedback: AideFeedback = {
      note: notation.value,
      estConnue: estConnue.value,
      seraSollicite: seraSollicite.value,
      commentaire: pourquoi.value,
    };

    await envoyerFeedback.execute(utilisateurId, props.aideId, feedback).then(() => {
      boutonFermer.value?.click();
      emit('feedback-envoye', notation.value);

      showFlashMessage({
        message: 'Merci pour votre retour ! Notre équipe en prendra connaissance très prochainement',
        type: 'success',
      });
    });
  }
</script>
