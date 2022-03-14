import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import dictionaries from '../../../assets/json/dictionaries.json';

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss'],
})
export class DictionariesComponent implements OnInit {
  public dictionaries = Object.entries(dictionaries);
  public expanded = new SelectionModel<string>(true, []);

  constructor() {}

  ngOnInit(): void {}
}
