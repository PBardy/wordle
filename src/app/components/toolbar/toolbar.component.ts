import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SettingsService, Theme } from 'src/app/services/settings.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() public drawer: MatDrawer;

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
