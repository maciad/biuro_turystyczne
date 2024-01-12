import { Component, OnInit} from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Tour } from '../../models/tour.model';
import { PageEvent } from '@angular/material/paginator';
import { CurrencyService } from '../../services/currency/currency.service';
import { Timestamp } from '@angular/fire/firestore';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];
  filteredTours: Tour[] = [];
  displayedTours: Tour[] = [];
  totalItems = 0;
  pageSize = 6;
  currentPage = 1;
  filterCriteria = {
    location: '',
    priceRange: { min: null, max: null },
    dateRange: { start: null, end: null },
    rating: null
  }

  constructor(
    private firestoreService: FirestoreService,
    private currencyService: CurrencyService,
    private cartService: CartService
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

  addToCart(tour: Tour): void {
    this.cartService.addToCart(tour);
    console.log(this.cartService.getItems());
  }

  removeFromCart(tour: Tour): void {
    this.cartService.removeFromCart(tour);
    console.log(this.cartService.getItems());
  }
  
  getFilteredPriceRange(originalPriceRange: { min: number, max: number }): { min: number, max: number } {
    const availableMinPrice = Math.min(...this.filteredTours.map((tour) => tour.price_pln));
    const availableMaxPrice = Math.max(...this.filteredTours.map((tour) => tour.price_pln));
  
    const filteredMin = Math.max(originalPriceRange.min, availableMinPrice);
    const filteredMax = Math.min(originalPriceRange.max, availableMaxPrice);
  
    return { min: filteredMin, max: filteredMax };
  }

  updateDisplayedTours(): void {

    this.filteredTours = this.filterTours(this.tours, this.filterCriteria);
    const selectedCurrency = this.currencyService.getSelectedCurrency();
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedTours = this.filteredTours
    .slice(startIndex, startIndex + this.pageSize)
    .map((tour) => ({
      ...tour,
      convertedPrice: this.currencyService.convertPrice(tour.price_pln, selectedCurrency)
    }));
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedTours = this.filteredTours.slice(startIndex, startIndex + this.pageSize)
      .map((tour) => ({
        ...tour,
        convertedPrice: this.currencyService.convertPrice(tour.price_pln, this.currencyService.getSelectedCurrency())
      }));
  }
  

  private subscribeToCurrencyChange(): void {
    this.currencyService.selectedCurrency$.subscribe(() => {
      this.updateDisplayedTours();
    });
  }

  getMinPrice(): number {
    return Math.min(...this.filteredTours.map((tour) => tour.price_pln));
  }

  getMaxPrice(): number {
    return Math.max(...this.filteredTours.map((tour) => tour.price_pln));
  }

  onFilterChanged(filterCriteria: any): void {
    this.filterCriteria = filterCriteria;
    // console.log(this.filterCriteria);
    this.updateDisplayedTours();
  }

  private filterTours(tours: Tour[], filterCriteria: any): Tour[] {
    var filterResults =  tours.filter(tour =>
      tour.destination.toLowerCase().includes(filterCriteria.location.toLowerCase()) &&
      (filterCriteria.priceRange.min === null || tour.price_pln >= filterCriteria.priceRange.min) &&
      (filterCriteria.priceRange.max === null || tour.price_pln <= filterCriteria.priceRange.max) &&
      (filterCriteria.dateRange.start === null || tour.start_date >= Timestamp.fromDate(new Date( filterCriteria.dateRange.start))) &&
      (filterCriteria.dateRange.end === null || tour.end_date <= Timestamp.fromDate(new Date(filterCriteria.dateRange.end))) &&
      (filterCriteria.rating === null || tour.rating[0]/tour.rating[1] >= filterCriteria.rating)
    );

    this.currentPage = 1;
    this.totalItems = filterResults.length;
    return filterResults;

  }

}
