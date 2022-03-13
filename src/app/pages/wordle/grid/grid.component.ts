import { Component, Input, OnInit } from '@angular/core';
import { Guess } from 'src/app/models/guess';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() public grid: Guess[][] = [];

  constructor() {}

  ngOnInit(): void {}

  public get width(): number {
    return this.grid[0].length;
  }

  public get height(): number {
    return this.grid.length;
  }
}
