import { utilisateurStore } from "@/store/utilisateur";
import { importerEmpreinteUsecase } from "@/bilan/importerEmpreinte.usecase";
import { EmpreinteRepositoryAxios } from "@/bilan/adapters/empreinteRepository.axios";

export default async function ImportNGCMiddleware(to, from, next) {
  const utilisateur = utilisateurStore();
  const importNGC = new importerEmpreinteUsecase(new EmpreinteRepositoryAxios());

  const storedImportNGC = localStorage.getItem("storedImportNGC");
  if (storedImportNGC && utilisateur.id != "" && (await importNGC.execute(storedImportNGC, utilisateur.id))) {
    localStorage.removeItem("storedImportNGC");
  }

  next();
}
