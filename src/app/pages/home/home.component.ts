import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Difficulty, Mode, Option } from 'src/app/definitions';
import { SettingsService, Theme } from 'src/app/services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  public theme: Theme;
  public themeClass: string;

  public modes: Option<Mode>[] = [
    { value: 'CLASSIC', label: 'Classic' },
    { value: 'EXPLODING_KITTENS', label: 'Exploding Kittens' },
  ];

  public sizes: Option<number>[] = new Array(7)
    .fill(0)
    .map((e, i) => ({ value: i + 4, label: String(i + 4) }));

  public difficulties: Option<Difficulty>[] = [
    { value: 'EASY', label: 'EASY' },
    { value: 'NORMAL', label: 'Normal' },
    { value: 'HARD', label: 'Hard' },
    { value: 'LEAD_DEV', label: 'Lead Dev' },
  ];

  public form = new FormGroup({
    size: new FormControl(5, [Validators.required]),
    mode: new FormControl('CLASSIC', [Validators.required]),
    difficulty: new FormControl('NORMAL', [Validators.required]),
  });

  constructor(private router: Router, public settings: SettingsService) {}

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

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.router.navigate(['/wordle'], { queryParams: this.form.value });
  }
}
