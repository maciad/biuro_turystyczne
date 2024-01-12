import { Component, OnInit} from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CurrencyService } from '../../services/currency/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-navbar',
  templateUrl: './cart-navbar.component.html',
  styleUrl: './cart-navbar.component.css'
})
export class CartNavbarComponent implements OnInit {
  totalPrice = 0;
  totalPriceConverted = 0;
  totalItems = 0;
  selectedCurrency = 'PLN';
  cartSubscription?: Subscription;

  constructor(
    public cartService: CartService,
    public currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.currencyService.selectedCurrency$.subscribe((currency) => {
      this.selectedCurrency = currency;
      this.updateCartInfo();
    });

    this.cartSubscription = this.cartService.getCartUpdatedObservable().subscribe(() => {
      this.updateCartInfo();
    });
    this.updateCartInfo();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription)
      this.cartSubscription.unsubscribe();
  }

  onCurrencyChange() {
    this.currencyService.changeCurrency(this.selectedCurrency);
  }

  private updateCartInfo(): void {
    const cartItems = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalPriceConverted = this.currencyService.convertPrice(this.totalPrice, this.selectedCurrency);
    this.totalItems = cartItems.length;
  }

}
