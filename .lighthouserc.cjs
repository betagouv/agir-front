module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      settings: {
        onlyCategories: ['performance', 'accessibility', 'best-practices'],
      },
      url: [
        'https://agir.beta.gouv.fr/',
        'https://agir.beta.gouv.fr/onboarding',
        'https://agir.beta.gouv.fr/authentification',
        'https://agir.beta.gouv.fr/creation-compte',
      ],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.1 }],
        'categories:accessibility': ['error', { minScore: 0.1 }],
        'categories:best-practices': ['error', { minScore: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
