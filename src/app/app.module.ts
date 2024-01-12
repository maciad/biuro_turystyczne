import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { ToursComponent } from '../components/tours/tours.component';
import { TourDetailComponent } from '../components/tour-detail/tour-detail.component';
import { CartComponent } from '../components/cart/cart.component';
import { HistoryComponent } from '../components/history/history.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AddTourComponent } from '../components/add-tour/add-tour.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from '../components/filter/filter.component';
import { CartNavbarComponent } from '../components/cart-navbar/cart-navbar.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tours', component: ToursComponent },
  { path: 'tours/:id', component: TourDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'add-tour', component: AddTourComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToursComponent,
    TourDetailComponent,
    CartComponent,
    HistoryComponent,
    NavbarComponent,
    AddTourComponent,
    FilterComponent,
    CartNavbarComponent,
  ],
  imports: [
    FormsModule,
    MatPaginatorModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes),
    AngularFirestoreModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
