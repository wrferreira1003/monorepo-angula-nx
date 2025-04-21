// libs/shared/theme/src/lib/models/theme.model.ts
export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  mode: ThemeMode;
  fontScale?: number; // Para acessibilidade
}
