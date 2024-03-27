import { EmpreinteRepositoryAxios } from '@/bilan/adapters/empreinteRepository.axios';
import { importEmpreinteUsecase } from '@/bilan/importEmpreinte.usecase';
import { utilisateurStore } from '@/store/utilisateur';

const storedtNGC = 'storedImportNGC';

export function storeIdNGC(to, from, next) {
  const importNGC = to.query?.importNGC;

  if (importNGC) sessionStorage.setItem(storedtNGC, importNGC);

  next();
}

export function sendIdNGC() {
  const storedImportNGC = sessionStorage.getItem(storedtNGC);
  if (storedImportNGC) {
    const utilisateurId: string = utilisateurStore().utilisateur.id;
    const importNGC = new importEmpreinteUsecase(new EmpreinteRepositoryAxios());
    importNGC.execute(storedImportNGC, utilisateurId).then(() => sessionStorage.removeItem(storedImportNGC));
  }
}
