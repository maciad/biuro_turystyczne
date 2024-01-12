import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<any>();
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 10000;

  filterCriteria = {
    location: '',
    priceRange: { min: null, max: null },
    dateRange: { start: null, end: null },
    rating: null
  }

  applyFilter() {
    this.filterChanged.emit(this.filterCriteria);
  }
}
