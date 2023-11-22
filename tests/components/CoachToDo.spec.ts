import { render } from '@testing-library/vue';
import CoachToDo from '@/components/custom/Coach/CoachToDo.vue';
import { TodoListViewModel } from '@/toDoList/adapters/toDoList.presenter.impl';

const todoExemple1 = {
  id: 'test',
  titre: 'Tâche exemple 1',
  url: 'test',
  contentId: 'test',
  progession: {
    etapeCourante: 2,
    etapeTotal: 3,
  },
  nombreDePointsAGagner: 25,
  type: 'test',
  thematique: 'quizz',
  pointAEteRecolte: false,
};
const todoExemple2 = {
  id: 'test 2',
  titre: 'Tâche exemple 2',
  url: 'test 2',
  contentId: 'test 2',
  progession: {
    etapeCourante: 7,
    etapeTotal: 10,
  },
  nombreDePointsAGagner: 25,
  type: 'test 2',
  thematique: 'quizz',
  pointAEteRecolte: false,
};
const todoDoneRecupererExemple1 = {
  id: 'test',
  titre: 'Tâche complétée exemple 1',
  url: 'test',
  contentId: 'test',
  progession: {
    etapeCourante: 2,
    etapeTotal: 3,
  },
  nombreDePointsAGagner: 25,
  type: 'test',
  thematique: 'quizz',
  pointAEteRecolte: true,
};
const todoDoneNonRecupererExemple2 = {
  id: 'test 2',
  titre: 'Tâche complétée exemple 2',
  url: 'test 2',
  contentId: 'test 2',
  progession: {
    etapeCourante: 7,
    etapeTotal: 10,
  },
  nombreDePointsAGagner: 25,
  type: 'test 2',
  thematique: 'quizz',
  pointAEteRecolte: false,
};

describe('Coach - Section ToDo', () => {
  describe('quand il y a seulement des tâches à faire', () => {
    it('affiche uniquement la liste des tâches à faire', () => {
      const props: { todoList: TodoListViewModel } = {
        todoList: {
          aFaire: [todoExemple1, todoExemple2],
          fait: [],
        },
      };

      const { getByRole, getAllByRole, queryByRole } = render(CoachToDo, { props });

      expect(getByRole('heading', { name: 'à faire', level: 3 })).toBeDefined();
      expect(queryByRole('heading', { name: 'déjà fait', level: 3 })).toBeNull();

      expect(getAllByRole('listitem')).toHaveLength(2);

      expect(getByRole('heading', { name: 'Tâche exemple 1', level: 4 })).toBeDefined();
      expect(getByRole('heading', { name: 'Tâche exemple 2', level: 4 })).toBeDefined();
    });
  });

  describe('quand il y a seulement des tâches terminées', () => {
    it('affiche uniquement la liste des tâches terminées', () => {
      const props = {
        todoList: {
          aFaire: [],
          fait: [todoDoneRecupererExemple1, todoDoneNonRecupererExemple2],
        },
      };

      const { getByRole, getAllByRole, queryByRole } = render(CoachToDo, { props });

      expect(queryByRole('heading', { name: 'à faire', level: 3 })).toBeNull();
      expect(getByRole('heading', { name: 'déjà fait', level: 3 })).toBeDefined();

      expect(getAllByRole('listitem')).toHaveLength(2);

      expect(getByRole('heading', { name: 'Tâche complétée exemple 1', level: 4 })).toBeDefined();
      expect(getByRole('heading', { name: 'Tâche complétée exemple 2', level: 4 })).toBeDefined();
    });

    describe("quand la récompense n'est pas encore récupérée", () => {
      it('affiche un bouton avec le nombre de points à récolter', () => {
        const props = {
          todoList: {
            aFaire: [],
            fait: [todoDoneNonRecupererExemple2],
          },
        };

        const { getByRole } = render(CoachToDo, { props });
        const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Récolter vos 25 points' });

        expect(boutonValider.disabled).toBeFalsy();
      });
    });

    describe('quand la récompense est récupérée', () => {
      it('affiche un bouton désactivé avec le nombre de points à récolter', () => {
        const props = {
          todoList: {
            aFaire: [],
            fait: [todoDoneRecupererExemple1],
          },
        };

        const { getByRole } = render(CoachToDo, { props });
        const boutonValider = getByRole<HTMLButtonElement>('button', { name: 'Récolter vos 25 points' });

        expect(boutonValider.disabled).toBeTruthy();
      });
    });
  });

  describe('quand il y a tout type de tâches à faire', () => {
    it('affiche toutes les tâches', () => {
      const props = {
        todoList: {
          aFaire: [todoExemple1, todoExemple2],
          fait: [todoDoneRecupererExemple1, todoDoneNonRecupererExemple2],
        },
      };

      const { getByRole, getAllByRole, queryByRole } = render(CoachToDo, { props });

      expect(getByRole('heading', { name: 'à faire', level: 3 })).toBeDefined();
      expect(queryByRole('heading', { name: 'déjà fait', level: 3 })).toBeDefined();

      expect(getAllByRole('listitem')).toHaveLength(4);

      expect(getByRole('heading', { name: 'Tâche exemple 1', level: 4 })).toBeDefined();
      expect(getByRole('heading', { name: 'Tâche exemple 2', level: 4 })).toBeDefined();

      expect(getByRole('heading', { name: 'Tâche complétée exemple 1', level: 4 })).toBeDefined();
      expect(getByRole('heading', { name: 'Tâche complétée exemple 2', level: 4 })).toBeDefined();
    });
  });
});
