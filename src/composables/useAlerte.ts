import { ref } from 'vue';

interface Alerte {
  isActive: boolean;
  type: 'success' | 'error' | 'info';
  titre: string;
  message: string;
}

export const useAlerte = () => {
  const alerte = ref<Alerte>({ type: 'success', titre: '', message: '', isActive: false });

  const afficherAlerte = (type: Alerte['type'], titre: Alerte['titre'], message: Alerte['message']) => {
    alerte.value.isActive = true;
    alerte.value.type = type;
    alerte.value.titre = titre;
    alerte.value.message = message;
  };

  return { alerte, afficherAlerte };
};
