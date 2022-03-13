import { Component, Input, OnInit } from '@angular/core';
import { Guess } from 'src/app/models/guess';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss'],
})
export class KeyComponent implements OnInit {
  @Input() public key: string;
  @Input() public action = false;
  @Input() public guesses: Set<Guess>;

  constructor() {}

  ngOnInit(): void {}

  public getGuess(letter: string): Guess | undefined {
    for (const guess of this.guesses.values()) {
      if (guess.value.toUpperCase() === letter) {
        return guess;
      }
    }

    return undefined;
  }

  public get place(): boolean {
    return Boolean(this.getGuess(this.key)?.place);
  }

  public get letter(): boolean {
    return Boolean(this.getGuess(this.key)?.letter);
  }

  public get guessed(): boolean {
    return Boolean(this.getGuess(this.key)?.guessed);
  }
}
