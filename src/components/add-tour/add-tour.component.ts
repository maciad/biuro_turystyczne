import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Tour } from '../../models/tour.model';
import { Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrl: './add-tour.component.css'
})
export class AddTourComponent {
  tripForm: FormGroup;

  constructor(
    private firestoreService: FirestoreService, 
    private formbuilder: FormBuilder,
    private router: Router
    ) { 
    let today = new Date().toISOString()
    this.tripForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      description: ['', [Validators.required]],
      start_date: [today, [Validators.required]],
      end_date: [today, [Validators.required]],
      price_pln: [0, [Validators.required]],
      max_visitors: ['', [Validators.required]]
    });
  }

  addTrip() {
    if (this.tripForm.valid) {
      const tour: Tour = {
        name: this.tripForm.value.name,
        destination: this.tripForm.value.destination,
        description: this.tripForm.value.description,
        start_date: Timestamp.fromDate(new Date( this.tripForm.value.start_date)),
        end_date: Timestamp.fromDate(new Date( this.tripForm.value.end_date)),
        price_pln: this.tripForm.value.price_pln,
        max_visitors: this.tripForm.value.max_visitors,
        current_visitors: 0,
        rating: [0, 0]
      };
      this.firestoreService.addDocument('wycieczki', tour).then (docRef => {
        this.firestoreService.updateDocument('wycieczki', docRef.id, {id: docRef.id})
      })


      this.router.navigate(['/tours']).then();
    }
  }
}
