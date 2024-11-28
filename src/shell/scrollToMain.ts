export const scrollToMain = () => {
  const main = document.querySelector('main');
  main?.scrollIntoView({ behavior: 'smooth' });
};
