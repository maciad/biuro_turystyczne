import { Component, OnInit} from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Tour } from '../../models/tour.model';
import { PageEvent } from '@angular/material/paginator';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];
  displayedTours: Tour[] = [];
  totalItems = 0;
  pageSize = 6;
  currentPage = 1;

  constructor(
    private firestoreService: FirestoreService,
    private currencyService: CurrencyService
  ) { }
  
  ngOnInit(): void {
    this.loadTours();
    this.subscribeToCurrencyChange();
  }

  loadTours(): void {
    this.firestoreService.getCollection('wycieczki').subscribe((tours: Tour[]) => {
      this.tours = tours;
      this.totalItems = this.tours.length;
      this.updateDisplayedTours();
    });
  }

  updateDisplayedTours(): void {
    this.currencyService.selectedCurrency$.subscribe((selectedCurrency) => {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.displayedTours = this.tours.slice(startIndex, startIndex + this.pageSize).map((tour) => ({
        ...tour,
        convertedPrice: this.currencyService.convertPrice(tour.price_pln, selectedCurrency)
      }));
    });
  }
  

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.updateDisplayedTours()
  }

  private subscribeToCurrencyChange(): void {
    this.currencyService.selectedCurrency$.subscribe(() => {
      this.updateDisplayedTours();
    });
  }

}
