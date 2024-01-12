import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Tour } from '../../models/tour.model';
import { CurrencyService } from '../../services/currency/currency.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css'
})
export class TourDetailComponent implements OnInit {
  tourId: string = '';
  tour: Tour | undefined;
  ratingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    protected firestoreService: FirestoreService, 
    protected currencyService: CurrencyService,
    private formBuilder: FormBuilder
    ) {
      this.ratingForm = this.formBuilder.group({
        rating: [0 , [Validators.required, Validators.min(1), Validators.max(5)]]
      });
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tourId = params['id'];

      if (this.tourId) {
        this.firestoreService.getDocument('wycieczki', this.tourId).subscribe((tour: unknown) => {
          this.tour = tour as Tour;
        });
      }
    });
  }

  redirectToTours() {
    window.location.href = '/tours';
  }

  submitRating(tour: Tour) {
    const selectedRating = +this.ratingForm.get('rating')?.value;
    if (selectedRating > 5 || selectedRating < 1) {
      alert('Ocena musi być z przedziału 1-5!');
      return;
    }
    const newRating = [tour.rating[0] + selectedRating, tour.rating[1] + 1];
    this.firestoreService.updateDocument('wycieczki', tour.id!, { rating: newRating });
    alert('Dziękujemy za ocenę!');
  }
}

