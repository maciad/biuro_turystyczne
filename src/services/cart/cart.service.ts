import { Injectable } from '@angular/core';
import { Tour } from '../../models/tour.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Tour[] = [];
  private cartUpdated = new Subject<Tour[]>();

  addToCart(tour: Tour) {
    this.items.push(tour);
    this.cartUpdated.next(this.items);
  }

  removeFromCart(tour: Tour) {
    if (!this.items.includes(tour))
      return;
    const index = this.items.indexOf(tour);
    this.items.splice(index, 1);
    this.cartUpdated.next(this.items);
  }

  getItems(): Tour[] {
    return this.items;
  }

  getTotalPrice(): number {
    return this.items.reduce((total, tour) => total + tour.price_pln, 0);
  }

  getCartUpdatedObservable() {
    return this.cartUpdated.asObservable();
  }

  constructor() { }
}
