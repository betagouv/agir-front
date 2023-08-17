import { utilisateurStore } from "@/store/utilisateur";
import { EmpreinteRepository } from "@/bilan/ports/empreinteRepository";

export default function ImportNGCMiddleware(to, from, next) {
  const importNGC = to.query?.importNGC;

  if (importNGC) {
    localStorage.setItem("storedImportNGC", importNGC);
  }

  next();
}
