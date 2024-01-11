import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  selectedCurrency = 'PLN';
  
  constructor(
    public currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.currencyService.selectedCurrency$.subscribe((currency) => {
      this.selectedCurrency = currency;
    });
  }
  
  onCurrencyChange() {
    this.currencyService.changeCurrency(this.selectedCurrency);
  }

}
