import { Injectable, signal } from '@angular/core';

export type ThemeId = 'midnight' | 'sand' | 'rose';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  swatch: string;
}

const STORAGE_KEY = 'aromystic-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly options: ThemeOption[] = [
    { id: 'midnight', label: 'Midnight Bloom', swatch: '#101d33' },
    { id: 'sand', label: 'Sand & Sapphire', swatch: '#17436e' },
    { id: 'rose', label: 'Rose Noir', swatch: '#2b1f2e' },
  ];

  readonly current = signal<ThemeId>('midnight');

  init(): void {
    let saved: ThemeId | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    } catch {
      saved = null;
    }
    this.set(saved && this.options.some((o) => o.id === saved) ? saved : 'midnight');
  }

  set(theme: ThemeId): void {
    this.current.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }
}
