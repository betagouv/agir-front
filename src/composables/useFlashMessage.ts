import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const flashTitre = ref<string | null>(null);
const flashMessage = ref<string | null>(null);
const flashType = ref<AlertType>('info');

type AlertType = 'error' | 'success' | 'info' | 'warning';

export function useFlashMessage() {
  const route = useRoute();
  watch(
    () => route.fullPath,
    () => {
      clearFlashMessage();
    },
  );

  const showFlashMessage = (params: { titre?: string; message?: string; type: AlertType }) => {
    flashTitre.value = params.titre ?? '';
    flashMessage.value = params.message ?? '';
    flashType.value = params.type;
  };

  const clearFlashMessage = () => {
    flashTitre.value = null;
    flashMessage.value = null;
  };

  return {
    flashTitre,
    flashMessage,
    flashType,
    showFlashMessage,
    clearFlashMessage,
  };
}
