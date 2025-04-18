export default function cacherEmojisAuxLecteursDecrans(text: string): string {
  return text.replace(/([\p{Emoji_Presentation}|\p{Extended_Pictographic}])/gu, emoji => {
    return `<span aria-hidden="true">${emoji}</span>`;
  });
}
