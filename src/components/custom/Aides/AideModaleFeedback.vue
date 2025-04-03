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
                target="_self"
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
                  <form @submit.prevent="envoyerFeedbackAction">
                    <FieldsetNotationEtoile
                      v-model:notation="notation"
                      legend="Avez-vous aimé cette page ?"
                      :total="4"
                    />

                    <fieldset class="fr-fieldset">
                      <legend class="fr-fieldset__legend">Connaissiez-vous cette aide ?</legend>
                      <div class="fr-fieldset__element fr-fieldset__element--inline">
                        <div class="fr-radio-group">
                          <input type="radio" id="radio-inline-1" name="radio-inline" />
                          <label class="fr-label" for="radio-inline-1">Oui</label>
                        </div>
                      </div>
                      <div class="fr-fieldset__element fr-fieldset__element--inline">
                        <div class="fr-radio-group">
                          <input type="radio" id="radio-inline-2" name="radio-inline" />
                          <label class="fr-label" for="radio-inline-2">Non</label>
                        </div>
                      </div>
                    </fieldset>

                    <fieldset class="fr-fieldset">
                      <legend class="fr-fieldset__legend">Comptez-vous demander cette aide ?</legend>
                      <div class="fr-fieldset__element fr-fieldset__element--inline">
                        <div class="fr-radio-group">
                          <input type="radio" id="radio-inline-2" name="radio-inline-2" />
                          <label class="fr-label" for="radio-inline-2">Oui</label>
                        </div>
                      </div>
                      <div class="fr-fieldset__element fr-fieldset__element--inline">
                        <div class="fr-radio-group">
                          <input type="radio" id="radio-inline-3" name="radio-inline-2" />
                          <label class="fr-label" for="radio-inline-3">Non</label>
                        </div>
                      </div>
                    </fieldset>

                    <div class="flex flex-column fr-input-group">
                      <label class="fr-label" for="pourquoi">Pourquoi ?</label>
                      <textarea v-model="pourquoi" id="pourquoi" name="pourquoi" rows="4" class="fr-input" />
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

  const props = defineProps<{
    notation?: number;
  }>();

  const notation = ref<number>(props.notation ?? 0);
  const pourquoi = defineModel<string>('pourquoi');

  watch(
    () => props.notation,
    note => {
      notation.value = note ?? 0;
    },
  );

  function envoyerFeedbackAction() {
    console.log(notation);
    console.log(pourquoi);
  }
</script>
