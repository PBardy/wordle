import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public links: Link[] = [{ text: 'Home', icon: 'home', href: '/home' }];

  constructor() {}

  ngOnInit(): void {}
}

export interface Link {
  href: string;
  text: string;
  icon: string;
}
