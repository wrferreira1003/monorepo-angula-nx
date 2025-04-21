import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  DEFAULT_THEME_CONFIG,
  STORAGE_KEY,
} from '../constants/theme.constants';
import { ThemeConfig, ThemeMode } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private themeConfigSubject = new BehaviorSubject<ThemeConfig>(
    this.getInitialConfig()
  );
  themeConfig$ = this.themeConfigSubject.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    // Aplicar tema inicial
    this.applyTheme(this.themeConfigSubject.value);

    // Ouvir mudanças no sistema
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          this.setThemeMode(e.matches ? 'dark' : 'light');
        }
      });
  }

  private getInitialConfig(): ThemeConfig {
    // Verificar configuração salva no localStorage
    const savedConfig = localStorage.getItem(STORAGE_KEY);

    if (savedConfig) {
      try {
        return JSON.parse(savedConfig) as ThemeConfig;
      } catch (e) {
        console.error('Erro ao ler configuração de tema salva', e);
      }
    }

    // Sem configuração salva, usar preferência do sistema para o modo
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return {
      ...DEFAULT_THEME_CONFIG,
      mode: prefersDarkMode ? ('dark' as ThemeMode) : ('light' as ThemeMode),
    };
  }

  private applyTheme(config: ThemeConfig): void {
    // Aplicar modo (claro/escuro)
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${config.mode}-theme`);

    // Aplicar escala de fonte, se definida
    if (config.fontScale) {
      // Remover todas as classes de tamanho de fonte
      document.documentElement.classList.remove(
        'font-size-small',
        'font-size-normal',
        'font-size-large',
        'font-size-xlarge'
      );

      // Adicionar classe apropriada com base na escala
      let fontSizeClass = 'font-size-normal';
      if (config.fontScale <= 0.9) fontSizeClass = 'font-size-small';
      else if (config.fontScale >= 1.1 && config.fontScale < 1.2)
        fontSizeClass = 'font-size-large';
      else if (config.fontScale >= 1.2) fontSizeClass = 'font-size-xlarge';

      document.documentElement.classList.add(fontSizeClass);
    }

    // Salvar configuração
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }

  // Getters
  get currentConfig(): ThemeConfig {
    return this.themeConfigSubject.value;
  }

  // Getters
  get currentTheme(): ThemeMode {
    return this.themeConfigSubject.value.mode;
  }

  // Setters
  setThemeMode(mode: ThemeMode): void {
    const newConfig = {
      ...this.currentConfig,
      mode,
    };
    this.themeConfigSubject.next(newConfig);
    this.applyTheme(newConfig);
  }

  toggleTheme(): void {
    const newMode = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setThemeMode(newMode as ThemeMode);
  }

  setFontScale(scale: number): void {
    const newConfig = {
      ...this.currentConfig,
      fontScale: scale,
    };
    this.themeConfigSubject.next(newConfig);
    this.applyTheme(newConfig);
  }

  // Resetar configuração para padrões
  resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEY);
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const defaultConfig = {
      ...DEFAULT_THEME_CONFIG,
      mode: prefersDarkMode ? ('dark' as ThemeMode) : ('light' as ThemeMode),
    };
    this.themeConfigSubject.next(defaultConfig);
    this.applyTheme(defaultConfig);
  }
}
