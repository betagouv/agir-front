import { ResumeThematique } from '@/domaines/actions/ports/actions.repository';

export interface RaccourciViewModel {
  to?: RouterLinkParams;
  label: string;
  href?: string;
  emoji?: string;
}

export interface ThematiqueResumeViewModel {
  commune: string;
  listeRaccourcis: RaccourciViewModel[];
}

export interface RouterLinkParams {
  path?: string;
  name?: string;
  params?: { [key: string]: string };
}

export interface ThematiqueResumePresenter {
  presente(resumeThematique: ResumeThematique): Promise<void>;
}
