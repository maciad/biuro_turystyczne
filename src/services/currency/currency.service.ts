import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private selectedCurrency = new BehaviorSubject<string>('PLN');
  selectedCurrency$ = this.selectedCurrency.asObservable();

  currencies = ['PLN', 'EUR', 'USD']

  constructor() { }

  changeCurrency(currency: string) {
    this.selectedCurrency.next(currency);
  }

  convertPrice(pricePLN: number, selectedCurrency: string): number {
    switch(selectedCurrency) {
      case 'EUR':
        return Math.ceil(pricePLN / 4.3275);
      case 'USD':
        return Math.ceil(pricePLN / 3.96);
      default:
        return pricePLN;
    }
  }
}
