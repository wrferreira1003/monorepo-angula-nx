import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'projetos-angular-monorepo';
  isDarkTheme = false;

  ngOnInit() {
    // Verificar se há uma preferência de tema salva
    const savedTheme = localStorage.getItem('app_theme');
    if (savedTheme === 'dark') {
      this.isDarkTheme = true;
      this.applyTheme('dark');
    } else {
      // Verificar preferência do sistema
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.isDarkTheme = prefersDark;
      this.applyTheme(prefersDark ? 'dark' : 'light');
    }
  }

  // Função para alternar o tema provisorio aqui
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'dark' : 'light';
    this.applyTheme(theme);
    localStorage.setItem('app_theme', theme);
  }

  // Função para aplicar o tema provisorio aqui
  private applyTheme(theme: 'light' | 'dark') {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
  }
}
