export class Gamification {
  constructor(
    readonly nombreDePoints: number,
    readonly badges: Badge[],
  ) {}
}

export enum TypeDeBadge {
  PIONNIER = 'pionnier',
}

export class Badge {
  constructor(
    readonly typeDeBadge: TypeDeBadge,
    readonly libelle: string,
    readonly description: string,
  ) {}

  getIllustration(): string {
    switch (this.typeDeBadge) {
      case TypeDeBadge.PIONNIER:
        return '/badge-pionnier.webp';
      default:
        return '';
    }
  }
}

export interface ScoreRepository {
  getGamification(utilisateur: string): Promise<Gamification>;
}
