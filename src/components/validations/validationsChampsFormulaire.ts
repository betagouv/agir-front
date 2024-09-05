export function validationPrenom(prenom: string): boolean {
  const regex = /^[A-Za-zÀ-ÿ\\-]+$/;
  return regex.test(prenom);
}

export function validationNom(nom: string): boolean {
  if (nom == '') {
    return true;
  }
  const regex = /^[A-Za-zÀ-ÿ\\-]*$/;
  return regex.test(nom);
}
