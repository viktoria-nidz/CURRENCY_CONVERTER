import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  exhangeRate = null;
  dollar = null;
  euro = null;
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getExchangeRate().subscribe((response) => {
      this.exhangeRate = response;
      this.dollar = this.exhangeRate[25].rate;
      this.euro = this.exhangeRate[32].rate;
    });
  }
}
