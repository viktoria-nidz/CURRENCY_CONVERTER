import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent {
  constructor(private api: ApiService) {}
  currencyChanged = undefined;
  currencyToChange = undefined;
  exhangeRate = undefined;
  exhangeRateUsed = [];
  selectedOptionFirst = 'EUR';
  selectedOptionSecond = 'USD';
  firstWarning = '';
  secondWarning = '';

  ngOnInit() {
    this.api.getExchangeRate().subscribe((response) => {
      this.exhangeRate = response;
      this.exhangeRateUsed[0] = this.exhangeRate[25];
      this.exhangeRateUsed[1] = this.exhangeRate[32];
    });
  }
  first_currency_value = this.exhangeRateUsed[0];
  second_currency_value = this.exhangeRateUsed[1];
  chooseConvertMethod(currencyChanged, currencyToChange, box_changed) {
    if (currencyToChange !== undefined && currencyChanged !== undefined) {
      this.calcDoubleConvert(currencyChanged, currencyToChange, box_changed);
    } else if (currencyToChange == undefined && currencyChanged == undefined) {
      this.noConvert(box_changed);
    } else if (currencyToChange == undefined || currencyChanged == undefined) {
      this.calcConvert(currencyChanged, currencyToChange, box_changed);
    }
  }
  noConvert(box_changed) {
    if (box_changed == 1) {
      (this.second_currency_value = this.first_currency_value).toFixed(4);
    } else if (box_changed == 2) {
      (this.first_currency_value = this.second_currency_value).toFixed(4);
    }
  }
  calcDoubleConvert(currencyChanged, currencyToChange, box_changed) {
    if (box_changed == 1) {
      this.second_currency_value = (
        (currencyChanged.rate * this.first_currency_value) /
        currencyToChange.rate
      ).toFixed(4);
    } else if (box_changed == 2) {
      this.first_currency_value = (
        (currencyChanged.rate * this.second_currency_value) /
        currencyToChange.rate
      ).toFixed(4);
    }
  }
  calcConvert(currencyChanged, currencyToChange, box_changed) {
    if (currencyChanged == undefined) {
      if (box_changed == 1) {
        this.second_currency_value = (
          this.first_currency_value / currencyToChange.rate
        ).toFixed(4);
      } else if (box_changed == 2) {
        this.first_currency_value = (
          this.second_currency_value / currencyToChange.rate
        ).toFixed(4);
      }
    } else if (currencyToChange == undefined) {
      if (box_changed == 1) {
        this.second_currency_value = (
          this.first_currency_value * currencyChanged.rate
        ).toFixed(4);
      } else if (box_changed == 2) {
        this.first_currency_value = (
          this.second_currency_value * currencyChanged.rate
        ).toFixed(4);
      }
    }
  }

  findExchangeRate(event: any, box_changed) {
    this.firstWarning = 'none';
    this.secondWarning = 'none';
    if (this.first_currency_value < 0) {
      this.firstWarning = 'block';
      this.first_currency_value = null;
    } else if (this.second_currency_value < 0) {
      this.secondWarning = 'block';
      this.first_currency_value = null;
    }
    if (box_changed == 1) {
      this.currencyChanged = this.exhangeRateUsed.find(
        (currency) => currency.cc === this.selectedOptionFirst
      );

      this.currencyToChange = this.exhangeRateUsed.find(
        (currency) => currency.cc === this.selectedOptionSecond
      );
    } else if (box_changed == 2) {
      this.currencyChanged = this.exhangeRateUsed.find(
        (currency) => currency.cc === this.selectedOptionSecond
      );

      this.currencyToChange = this.exhangeRateUsed.find(
        (currency) => currency.cc === this.selectedOptionFirst
      );
    }

    this.chooseConvertMethod(
      this.currencyChanged,
      this.currencyToChange,
      box_changed
    );
  }
}
