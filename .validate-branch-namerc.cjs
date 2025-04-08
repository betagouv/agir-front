module.exports = {
  pattern: '^(tech|feature|fix|dependabot)/.+$',
  errorMsg:
    '🤨 La branche que tu essaies de pusher ne respecte pas nos conventions (tech/, feature/, fix/, dependabot/), tu peux la renommer avec `git branch -m <nom-actuel> <nouveau-nom>`',
};
