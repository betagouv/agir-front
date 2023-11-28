module.exports = {
  pattern: '^(tech|feature|fix)/.+$',
  errorMsg:
    '🤨 La branche que tu essaies de pusher ne respecte pas nos conventions (tech/, feature/, fix/), tu peux la renommer avec `git branch -m <nom-actuel> <nouveau-nom>`',
};
