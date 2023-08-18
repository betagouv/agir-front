import { importEmpreinteUsecase } from "@/bilan/importEmpreinte.usecase";
import { EmpreinteRepositoryAxios } from "@/bilan/adapters/empreinteRepository.axios";
import { utilisateurStore } from "@/store/utilisateur";

const storedtNGC = "storedImportNGC";

export function storeIdNGC(to, from, next) {
  const importNGC = to.query?.importNGC;

  if (importNGC) sessionStorage.setItem(storedtNGC, importNGC);

  next();
}

export function sendIdNGC() {
  const storedImportNGC = sessionStorage.getItem(storedtNGC);
  if (storedImportNGC) {
    const utilisateur = utilisateurStore();
    const importNGC = new importEmpreinteUsecase(new EmpreinteRepositoryAxios());
    importNGC.execute(storedImportNGC, utilisateur.id).then(() => sessionStorage.removeItem(storedImportNGC));
  }
}
