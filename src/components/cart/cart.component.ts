import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Tour } from '../../models/tour.model';
import { CurrencyService } from '../../services/currency/currency.service';
import { ReservationService } from '../../services/reservation/reservation.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Tour[] = [];
  distinctTours: Tour[] = [];
  totalCartPrice: number = 0;
  totalCartPriceConverted: number = 0;
  
  constructor(
    private cartService: CartService, 
    public currencyService: CurrencyService,
    private reservationService: ReservationService
    ) { }

  // ngOnInit() {
  //   this.currencyService.selectedCurrency$.subscribe((currency) => {
  //     this.cartItems = this.cartService.getItems();
  //     this.updatePrices();
  //     this.updateDistinctTours();
  //   });
  //   // console.log(this.distinctTours);
  // }
  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.subscribeToCurrencyChange();
    this.updatePrices();
    this.updateDistinctTours();
  }

  removeFromCart(tour: Tour): void {
    this.reservationService.removeFromCart(tour);
    this.updatePrices();
    this.updateDistinctTours();
    // console.log(this.distinctTours);
  }

  reserveAdditionalSeat(tour: Tour): void {
    this.reservationService.addToCart(tour);
    this.updatePrices();
    this.updateDistinctTours();
    // console.log(this.distinctTours);
  }

  private subscribeToCurrencyChange(): void {
    this.currencyService.selectedCurrency$.subscribe(() => {
      console.log('Currency changed to ', this.currencyService.getSelectedCurrency());
      this.updatePrices();
      this.updateDistinctTours();
    });
  }


  updatePrices(): void {
    this.totalCartPrice = this.cartService.getTotalPrice();
    this.totalCartPriceConverted = this.currencyService.convertPrice(this.totalCartPrice, this.currencyService.getSelectedCurrency());
    this.distinctTours = this.distinctTours.map((tour) => ({
      ...tour,
      convertedPrice: this.currencyService.convertPrice(tour.price_pln, this.currencyService.getSelectedCurrency())
    }));
    console.log(this.distinctTours);
    
  }

  onCurrencyChange() {
    this.currencyService.changeCurrency(this.currencyService.getSelectedCurrency());
    this.updatePrices();
  }

  updateDistinctTours(): void {
    this.distinctTours = this.cartItems
    .filter((tour, index, self) => self.findIndex(t => t.id === tour.id) === index);
  }

  getTourCount(tour: Tour): number {
    return this.cartService.getNumberOfItemsInCart(tour);
  }

  buySelectedTours(): void {
    this.cartService.buySelectedTours();
    this.updatePrices();
    this.updateDistinctTours();
    // this.cartService.addToHistory();
  }

}
