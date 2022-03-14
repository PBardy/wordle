import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService, Theme } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'wordle';

  private subscriptions = new Subscription();

  public theme: Theme;
  public themeClass: string;

  constructor(public settings: SettingsService) {}

  ngOnInit(): void {
    this.initSettings();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initSettings(): void {
    this.subscriptions.add(
      this.settings.themeSubject.asObservable().subscribe({
        next: (theme) => {
          this.theme = theme;
          this.themeClass = theme === 'DARK' ? 'dark-mode' : 'light-mode';
        },
      })
    );
  }
}
