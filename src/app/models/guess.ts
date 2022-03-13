export interface IGuess {
  value: string;
  place: boolean;
  letter: boolean;
  guessed: boolean;
}

export class Guess implements IGuess {
  public value = '';
  public place = false;
  public letter = false;
  public guessed = false;

  public toString(): string {
    return this.value;
  }

  public guess(a: string, b: string, word: string): Guess {
    this.place = a === b;
    this.letter = word.includes(b);
    this.guessed = true;

    return this;
  }
}
