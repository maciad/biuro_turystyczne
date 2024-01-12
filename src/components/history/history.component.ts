import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Tour } from '../../models/tour.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  history: Tour[] = [];

  constructor(private cartService: CartService) {}

  // ngOnInit(): void {
  //   this.history = this.cartService.History();
  // }


}
