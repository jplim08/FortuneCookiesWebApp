import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fortune-cookies-web-app';
  constructor(
    private url: LocationStrategy,
    public tokenService : TokenService
  ){
    this.tokenService.getToken();
  }
}
