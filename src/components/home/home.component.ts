import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    // Inicjalizacja mapy po załadowaniu komponentu
    // this.initMap();
  }

  // initMap(): void {
  //   const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //     center: { lat: 50.064453125, lng: 19.923736572265625 },
  //     zoom: 16
  //   });

  //   const marker = new google.maps.Marker({
  //     position: { lat: 50.064453125, lng: 19.923736572265625 },
  //     map: map,
  //     title: 'Miejsce docelowe' // opcjonalny tytuł marker'a
  //   });
  // }
}
