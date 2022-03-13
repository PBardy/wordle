import dictionaries from '../../../assets/json/dictionaries.json';

import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Difficulty, Mode } from 'src/app/definitions';
import { Guess } from 'src/app/models/guess';
import { toLowerCase } from 'src/app/util/string';
import { MatDialog } from '@angular/material/dialog';
import { GameOverDialogComponent } from './dialogs/game-over-dialog/game-over-dialog.component';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss'],
})
export class WordleComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  public size = 5;
  public mode: Mode = 'CLASSIC';
  public difficulty: Difficulty = 'NORMAL';

  public grid: Guess[][] = [];
  public dictionary: string[] = [];

  public row = 0;
  public col = 0;
  public word: string;
  public guesses = new Set<Guess>();
  public letters = new Set<string>();

  private heights: Record<Difficulty, number> = {
    EASY: 2,
    NORMAL: 1,
    HARD: 0,
    LEAD_DEV: -1,
  };

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  @HostListener('document:keydown', ['$event'])
  public onKeypress(event: KeyboardEvent): void {
    let key = event.key;

    // Make guess with current buffer
    if (key === 'Enter') {
      return this.makeGuess();
    }

    // Delete previous letter
    if (key === 'Backspace') {
      return this.backSpace();
    }

    // If we're not doing an action only accept single characters
    if (key.length !== 1) return;

    // Easy-Mode and Normal-Mode
    if (this.difficulty === 'EASY' || this.difficulty === 'NORMAL') {
      key = key.toLowerCase();
    }

    // Only add valid letters for difficulty
    if (key !== '') {
      this.addLetter(key);
    }
  }

  ngOnInit(): void {
    this.initParams();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private get height(): number {
    return this.size + this.heights[this.difficulty];
  }

  private get buffer(): string {
    const row = this.grid[this.row];
    const word = row.join('');
    return word;
  }

  private initParams(): void {
    this.subscriptions.add(
      this.route.queryParams.subscribe({
        next: (params) => {
          this.size = Number(params.size);
          this.mode = params.mode;
          this.difficulty = params.difficulty;
          this.buildGame();
        },
      })
    );
  }

  private buildGame(): void {
    this.reset();
    this.buildDictionary();
    this.buildGrid();
    this.chooseWord();
  }

  private buildDictionary(): void {
    this.dictionary = dictionaries[this.mode];

    // Easy Mode
    if (this.difficulty === 'EASY') {
      this.dictionary = this.dictionary.map((w) => w.toLowerCase());
      this.dictionary = this.dictionary.filter((w) => w.length === this.size);
    }

    // Normal Mode
    if (this.difficulty === 'NORMAL') {
      this.dictionary = this.dictionary.map((word) => word.toLowerCase());
      this.dictionary = this.dictionary.filter((w) => w.length <= this.size);
      this.dictionary = this.dictionary.map((w) => w.padEnd(this.size, '-'));
    }

    // Hard Mode

    // Lead Dev Mode
  }

  private reset(): void {
    this.row = 0;
    this.col = 0;
    this.guesses = new Set<Guess>();
    this.letters = new Set<string>();
  }

  private buildGrid(): void {
    this.grid = [];

    for (let row = 0; row < this.height; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.size; col++) {
        this.grid[row][col] = new Guess();
      }
    }
  }

  private chooseWord(): void {
    const randInt = Math.floor(Math.random() * this.dictionary.length);
    this.word = this.dictionary[randInt];
  }

  private makeGuess(): void {
    if (this.buffer.length !== this.size) return;

    for (let i = 0; i < this.buffer.length; i++) {
      const a = this.word[i];
      const b = this.buffer[i];
      const c = this.grid[this.row][i];
      c.guess(a, b, this.word);

      if (!this.letters.has(c.value)) {
        this.letters.add(c.value);
        this.guesses = new Set(this.guesses.add(c));
      }
    }

    if (this.buffer === this.word) {
      return this.onGameOver(true);
    }

    if (this.row + 1 === this.height) {
      return this.onGameOver(false);
    }

    this.col = 0;
    this.row = this.row + 1;
  }

  private backSpace(): void {
    const guess = this.grid[this.row][this.col];
    if (guess) {
      guess.value = '';
    }

    this.col = this.col - 1 > 0 ? this.col - 1 : 0;
  }

  private addLetter(letter: string): void {
    const guess = this.grid[this.row][this.col];
    if (guess) {
      guess.value = letter;
    }

    this.col = this.col + 1 < this.size ? this.col + 1 : this.size - 1;
  }

  private onGameOver(won: boolean): void {
    const data = { won, word: this.word };

    this.subscriptions.add(
      this.dialog
        .open(GameOverDialogComponent, { data, autoFocus: false })
        .afterClosed()
        .subscribe({
          next: (replay: boolean) => {
            if (replay) {
              this.buildGame();
            }
          },
        })
    );
  }
}
