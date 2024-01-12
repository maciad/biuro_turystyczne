import { Injectable } from '@angular/core';
import { Tour } from '../../models/tour.model';
import { Subject } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';
import { CurrencyService } from '../currency/currency.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Tour[] = [];
  private cartUpdated = new Subject<Tour[]>();
  
  constructor(private firestoreService: FirestoreService,
    private currencyService: CurrencyService
    ) {}

  addToCart(tour: Tour) {
    this.items.push(tour);
    this.cartUpdated.next(this.items);
  }

  removeFromCart(tour: Tour): void {
    const tourToRemove = this.items.find(item => item.id === tour.id);
  
    if (!tourToRemove) {
      // console.error('Tour not found in cart:', tour);
      return;
    }
  
    const index = this.items.indexOf(tourToRemove);
    this.items.splice(index, 1);
    this.cartUpdated.next(this.items);
    // console.log('Tour removed from cart:', tourToRemove);
  }

  getItems(): Tour[] {
    return this.items;
  }

  getNumberOfItemsInCart(tour: Tour): number {
    return this.items.filter(t => t.id === tour.id).length;
  }

  removeAllFromCart(tour: Tour): void {
    this.items = this.items.filter(item => item.id !== tour.id);
    this.cartUpdated.next(this.items);
  }


  getTotalPrice(): number {
    return this.items.reduce((total, tour) => total + tour.price_pln, 0);
  }

  getSelectedPrice(): number {
    return this.items.filter(item => item.isSelected).reduce((total, tour) => total + tour.price_pln, 0);
  }

  getCartUpdatedObservable() {
    return this.cartUpdated.asObservable();
  }

  buySelectedTours(): void {
    var counts = this.items.map(item => {
      return {
        id: item.id,
        current_visitors: item.current_visitors,
        count: this.getNumberOfItemsInCart(item)
        }
    })
    for (let count of counts) {
      this.firestoreService.updateDocument('wycieczki', count.id!, {
        current_visitors: count.current_visitors + count.count
      });
    }
    this.items = [];
    this.cartUpdated.next(this.items);
  }


}
