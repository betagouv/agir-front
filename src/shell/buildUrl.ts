export function buildUrl(text: string): string {
  const map: { [key: string]: string } = {
    '-': ' ',
    a: 'àáâäæãåā',
    c: 'çćč',
    e: 'èéêëēėę',
    i: 'îïíīįì',
    l: 'ł',
    n: 'ñń',
    o: 'ôöòóœøōõ',
    u: 'ûüùúū',
    y: 'ÿ',
    z: 'żźž',
    ss: 'ß',
    g: 'ğ',
    s: 'ş',
  };

  Object.keys(map).forEach(pattern => {
    text = text.replace(new RegExp('[' + map[pattern] + ']', 'g'), pattern);
  });

  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '') // Supprime les caractères non alphanumériques et non tirets
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-'); // Remplace les tirets multiples par un seul tiret
}
