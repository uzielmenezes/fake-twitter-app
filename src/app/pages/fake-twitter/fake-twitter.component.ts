import {Component, OnInit} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from "primeng/api";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'fake-twitter',
  standalone: true,
  imports: [MenubarModule, RouterOutlet],
  templateUrl: './fake-twitter.component.html',
  styleUrl: './fake-twitter.component.scss'
})
export class FakeTwitterComponent implements OnInit {
  items!: MenuItem[];

  initials!: string;

  ngOnInit() {
    this.getUsernameInitials();

    this.items = [
      {
        label: 'Tweets',
        routerLink: 'tweets',
      },
      {
        label: 'My Tweets',
        routerLink: 'my-tweets'
      }
    ]
  }

  private getUsernameInitials() {
    let username = sessionStorage.getItem('username');
    if (username) {
      this.initials = username.split(' ').filter(name => name.length > 2).slice(0, 2).map(name => name.charAt(0).toUpperCase()).join('');
    }
  }
}
