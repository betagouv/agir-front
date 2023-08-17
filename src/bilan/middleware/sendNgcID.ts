import { utilisateurStore } from "@/store/utilisateur";
import { importEmpreinteUsecase } from "@/bilan/importEmpreinte.usecase";
import { EmpreinteRepositoryAxios } from "@/bilan/adapters/empreinteRepository.axios";

export default async function ImportNGCMiddleware(to, from, next) {
  const utilisateur = utilisateurStore();
  const importNGC = new importEmpreinteUsecase(new EmpreinteRepositoryAxios());

  const storedImportNGC = sessionStorage.getItem("storedImportNGC");
  if (storedImportNGC && utilisateur.id != "" && (await importNGC.execute(storedImportNGC, utilisateur.id))) {
    sessionStorage.removeItem("storedImportNGC");
  }

  next();
}
