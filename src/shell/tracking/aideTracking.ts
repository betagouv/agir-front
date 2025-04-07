import { AxiosFactory } from '@/axios.factory';
import { utilisateurStore } from '@/store/utilisateur';

export enum AIDE_TRACKING {
  DEMANDE,
  INFOS,
}

export function trackAide(idAide: string, typeAide: AIDE_TRACKING) {
  if (utilisateurStore().estConnecte) {
    const axios = AxiosFactory.getAxios();

    if (typeAide === AIDE_TRACKING.DEMANDE) {
      axios.post(`/utilisateurs/${utilisateurStore().utilisateur.id}/aides/${idAide}/vu_demande`, { idAide });
    } else if (typeAide === AIDE_TRACKING.INFOS) {
      axios.post(`/utilisateurs/${utilisateurStore().utilisateur.id}/aides/${idAide}/vu_infos`, { idAide });
    }
  }
}
