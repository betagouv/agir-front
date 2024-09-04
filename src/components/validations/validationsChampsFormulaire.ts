export function validationPrenom(prenom: string): boolean {
  // eslint-disable-next-line no-useless-escape
  const regex = /^[A-Za-zÀ-ÿ\-]+$/;
  return regex.test(prenom);
}

export function validationNom(nom: string): boolean {
  if (nom == '') {
    return true;
  }
  // eslint-disable-next-line no-useless-escape
  const regex = /^[A-Za-zÀ-ÿ\-]*$/;
  return regex.test(nom);
}
