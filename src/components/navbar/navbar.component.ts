import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency/currency.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  selectedCurrency = 'PLN';
  
  constructor(
    public currencyService: CurrencyService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.currencyService.selectedCurrency$.subscribe((currency) => {
      this.selectedCurrency = currency;
    });
  }
  
  onCurrencyChange() {
    this.currencyService.changeCurrency(this.selectedCurrency);
  }

  getNumberOfItemsInCart() {
    return this.cartService.getItems().length;
  }
}
