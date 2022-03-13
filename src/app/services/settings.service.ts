import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private theme: Theme = 'DARK';
  public themeSubject = new BehaviorSubject<Theme>(this.theme);

  constructor() {}

  public get isDarkMode(): boolean {
    return this.theme === 'DARK';
  }

  public get isLightMode(): boolean {
    return this.theme === 'LIGHT';
  }

  public getTheme(): Theme {
    return this.theme;
  }

  public setTheme(value: Theme): void {
    this.theme = value;
    this.themeSubject.next(value);
  }

  public toggleTheme(): void {
    this.theme === 'DARK' ? this.setTheme('LIGHT') : this.setTheme('DARK');
  }
}

export type Theme = 'LIGHT' | 'DARK';
