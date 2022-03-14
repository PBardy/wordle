import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() public drawer: MatDrawer;

  public links: Link[] = [
    { text: 'Home', icon: 'home', href: '/home' },
    { text: 'Dictionaries', icon: 'book', href: '/dictionary' },
  ];

  public expanded = new SelectionModel<string>(true, []);

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public navigateTo(link: string): void {
    this.drawer.close();
    this.router.navigateByUrl(link);
  }
}

export interface Link {
  href: string;
  text: string;
  icon: string;
}
