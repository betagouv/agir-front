export function validationPseudo(pseudo: string): boolean {
  const regex =
    /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ]+$/;
  return regex.test(pseudo);
}

export function validationPseudoTaille(pseudo: string): boolean {
  return pseudo.length >= 3 && pseudo.length <= 21;
}

export function validationPrenomOuNom(prenom: string): boolean {
  const regex =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
  return regex.test(prenom);
}

export function validationJour(jour: string): boolean {
  const jourNumber = parseInt(jour);
  return !isNaN(jourNumber) && jourNumber >= 1 && jourNumber <= 31;
}

export function validationMois(mois: string): boolean {
  const moisNumber = parseInt(mois);
  return !isNaN(moisNumber) && moisNumber >= 1 && moisNumber <= 12;
}

export function validationAnnee(annee: string): boolean {
  const anneeNumber = parseInt(annee);
  const currentYear = new Date().getFullYear();
  return !isNaN(anneeNumber) && anneeNumber >= 1900 && anneeNumber <= currentYear;
}

export function validationDateExiste(date: { jour: string; mois: string; annee: string }) {
  const j = parseInt(date.jour);
  const m = parseInt(date.mois);
  const a = parseInt(date.annee);

  if (isNaN(j) || isNaN(m) || isNaN(a)) return false;

  const dateHypothetique = new Date(a, m - 1, j);
  return (
    dateHypothetique.getFullYear() === a && dateHypothetique.getMonth() === m - 1 && dateHypothetique.getDate() === j
  );
}

export function validationDateEstPassee(date: { jour: string; mois: string; annee: string }) {
  const j = parseInt(date.jour);
  const m = parseInt(date.mois);
  const a = parseInt(date.annee);

  if (isNaN(j) || isNaN(m) || isNaN(a)) return false;

  const dateHypothetique = new Date(a, m - 1, j);
  return dateHypothetique.getTime() <= new Date().getTime();
}
