import { render } from '@testing-library/vue';
import InputPassword from '../../src/components/custom/InputPassword.vue';

describe('InputPassword', () => {
  describe('au moins 1 chiffre', () => {
    it('Si le mot de passe ne contient pas de chiffre doit avoir la classe fr-message--info', () => {
      const { getByText } = render(InputPassword as unknown as { props: { modelValue: string } }, {
        props: {
          modelValue: 'PasswordWithoutNumber!',
        },
      });

      // Get the message element
      const messageElement = getByText('1 chiffre minimum');

      // Check that the message has the CSS class for error (which indicates red color)
      expect(messageElement.className).toContain('fr-message--info');
    });
    it('Si le mot de passe contient au moins un chiffre doit avoir la classe fr-message--valid', () => {
      const { getByText } = render(InputPassword as unknown as { props: { modelValue: string } }, {
        props: {
          modelValue: 'Password1!',
        },
      });

      // Get the message element
      const messageElement = getByText('1 chiffre minimum');

      // Check that the message has the CSS class for error (which indicates red color)
      expect(messageElement.className).toContain('fr-message--valid');
    });
  });

  describe('au moins 1 caractère spéciale', () => {
    it('Si le mot de passe ne contient pas au moins 1 caractère spéciale doit avoir la classe fr-message--info', () => {
      const { getByText } = render(InputPassword as unknown as { props: { modelValue: string } }, {
        props: {
          modelValue: 'Password',
        },
      });

      // Get the message element
      const messageElement = getByText('1 caractère spécial minimum');

      // Check that the message has the CSS class for error (which indicates red color)
      expect(messageElement.className).toContain('fr-message--info');
    });
    it('Si le mot de passe contient au moins 1 caractère spéciale doit avoir la classe fr-message--valid', () => {
      const { getByText } = render(InputPassword as unknown as { props: { modelValue: string } }, {
        props: {
          modelValue: 'Password1!',
        },
      });

      // Get the message element
      const messageElement = getByText('1 caractère spécial minimum');

      // Check that the message has the CSS class for error (which indicates red color)
      expect(messageElement.className).toContain('fr-message--valid');
    });
  });

  describe('12 caractères minimum', () => {
    it('Si le mot de passe ne contient pas 12 caractères minimum doit avoir la classe fr-message--info', () => {
      const { getByText } = render(InputPassword as unknown as { props: { modelValue: string } }, {
        props: {
          modelValue: 'Password',
        },
      });

      // Get the message element
      const messageElement = getByText('12 caractères minimum');

      // Check that the message has the CSS class for error (which indicates red color)
      expect(messageElement.className).toContain('fr-message--info');
    });
    it('Si le mot de passe contient 12 caractère et plus doit avoir la classe fr-message--valid', () => {
      const { getByText } = render(InputPassword as unknown as { props: { modelValue: string } }, {
        props: {
          modelValue: 'Password123456!',
        },
      });

      // Get the message element
      const messageElement = getByText('12 caractères minimum');

      // Check that the message has the CSS class for error (which indicates red color)
      expect(messageElement.className).toContain('fr-message--valid');
    });
  });

  describe('au moins 1 majuscule et 1 minuscule', () => {
    it('Si le mot de passe ne contient pas de majuscule doit avoir la classe fr-message--info', () => {
      const { getByText } = render(InputPassword as unknown as { props: { modelValue: string } }, {
        props: {
          modelValue: 'password',
        },
      });

      const messageElement = getByText('Au moins 1 majuscule et 1 minuscule');

      expect(messageElement.className).toContain('fr-message--info');
    });
    it('Si le mot de passe ne contient pas de minuscule doit avoir la classe fr-message--info', () => {
      const { getByText } = render(InputPassword as unknown as { props: { modelValue: string } }, {
        props: {
          modelValue: '123PASSWORD!',
        },
      });

      const messageElement = getByText('Au moins 1 majuscule et 1 minuscule');

      expect(messageElement.className).toContain('fr-message--info');
    });
    it('Si le mot de passe contient au moins une majuscule et une minuscule doit avoir la classe fr-message--valid', () => {
      const { getByText } = render(InputPassword as unknown as { props: { modelValue: string } }, {
        props: {
          modelValue: 'Password',
        },
      });

      const messageElement = getByText('Au moins 1 majuscule et 1 minuscule');

      expect(messageElement.className).toContain('fr-message--valid');
    });
  });
});
