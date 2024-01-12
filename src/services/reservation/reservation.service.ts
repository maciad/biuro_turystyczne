import { Injectable } from '@angular/core';
import { Tour } from '../../models/tour.model';
import { CartService } from '../../services/cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private cartService: CartService ) { }

  addToCart(tour: Tour): void {
    if (this.canAddToCart(tour)) {
      this.cartService.addToCart(tour);
    } else {
      alert('Brak dostępnych miejsc na wycieczkę.');
    }
  }

  removeFromCart(tour: Tour): void {
    if (this.canRemoveFromCart(tour)) {
      this.cartService.removeFromCart(tour);
    } else {
      alert('Nie można cofnąć zamówienia ponad wybraną ilość.');
    }
  }

  canAddToCart(tour: Tour): boolean {
    return tour.max_visitors - tour.current_visitors - this.cartService.getNumberOfItemsInCart(tour) > 0;
  }

  canRemoveFromCart(tour: Tour): boolean {
    // Zabezpieczenie przed cofaniem zamówień ponad wybraną ilość
    return this.cartService.getNumberOfItemsInCart(tour) > 0;
  }

  getAvailableSlots(tour: Tour): number {
    return tour.max_visitors - tour.current_visitors - this.cartService.getNumberOfItemsInCart(tour);
  }

}

