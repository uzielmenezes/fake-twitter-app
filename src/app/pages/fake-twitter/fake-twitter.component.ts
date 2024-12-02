import {Component, OnInit} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from "primeng/api";
import {RouterOutlet} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'fake-twitter',
  standalone: true,
  imports: [MenubarModule, RouterOutlet, DialogModule, TitleCasePipe],
  templateUrl: './fake-twitter.component.html',
  styleUrl: './fake-twitter.component.scss'
})
export class FakeTwitterComponent implements OnInit {
  items!: MenuItem[];

  username!: string | null;

  initials!: string;

  isVisible: boolean = false;

  ngOnInit() {
    this.getUsernameAndInitials();

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

  showDialog() {
    this.isVisible = !this.isVisible;
  }

  onLogoff() {
    sessionStorage.clear();
    window.location.reload();
  }

  private getUsernameAndInitials() {
    this.username = sessionStorage.getItem('username');
    if (this.username) {
      this.initials = this.username.split(' ').filter(name => name.length > 2).slice(0, 2).map(name => name.charAt(0).toUpperCase()).join('');
    }
  }
}
