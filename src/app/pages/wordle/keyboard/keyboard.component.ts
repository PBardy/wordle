import { Component, Input, OnInit } from '@angular/core';
import { Guess } from 'src/app/models/guess';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  @Input() public guesses: Set<Guess>;

  constructor() {}

  ngOnInit(): void {}
}
