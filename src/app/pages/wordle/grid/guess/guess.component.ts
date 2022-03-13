import { Component, Input, OnInit } from '@angular/core';
import { Guess } from 'src/app/models/guess';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss'],
})
export class GuessComponent implements OnInit {
  @Input() public guess: Guess;

  constructor() {}

  ngOnInit(): void {}
}
