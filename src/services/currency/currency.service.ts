import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private selectedCurrency = new BehaviorSubject<string>('PLN');
  selectedCurrency$ = this.selectedCurrency.asObservable();

  private exchangeRates = {
    'PLN': 1,
    'EUR': 4.3275,
    'USD': 3.96
  } as { [key: string]: number };

  currencies = Object.keys(this.exchangeRates);

  constructor() { }

  changeCurrency(currency: string) {
    this.selectedCurrency.next(currency);
  }

  convertPrice(pricePLN: number, selectedCurrency: string): number {
    if (this.exchangeRates[selectedCurrency]) {
      return Math.ceil(pricePLN / this.exchangeRates[selectedCurrency]);
    }
    return pricePLN;
  }

  getSelectedCurrency(): string {
    return this.selectedCurrency.getValue();
  }
}
