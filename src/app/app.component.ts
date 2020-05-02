import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sample-app';
  isLoggedIn: boolean = false;

  constructor(
    private appService: AppService
  ) {
    this.appService.autoLogin();
  }

  ngOnInit() {
    this.isLoggedIn = !!this.appService.getToken();
    this.appService.authStatus$.subscribe((value) => {
      console.log(value)
      this.isLoggedIn = value;
    });
  }
}
