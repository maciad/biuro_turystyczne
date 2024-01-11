import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Tour } from '../../models/tour.model';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css'
})
export class TourDetailComponent {
  tourId: string = '';
  tour: Tour | undefined;

  constructor(private route: ActivatedRoute, private firestoreService: FirestoreService ) {}

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

}

