import { Component } from '@angular/core';
import {Coordinate} from "./model/Coordinate";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CoordinateService} from "./services/coordinate.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //coordinates: Coordinate[] = [];
  coordinateForm = new FormGroup({
    latitude: new FormControl(null, {validators: Validators.required}),
    longitude: new FormControl(null, {validators: Validators.required}),
  });
  selectedCoordinates: Coordinate[] = [];
  result: boolean = false;

  coordinates$: Observable<Coordinate[]> | undefined;

  constructor(
    private coordinateService: CoordinateService
  ) {
  }

  ngOnInit() {
    this.coordinates$ = this.coordinateService.coordinates$;
    this.coordinateService.findAll(); // Charger au départ
  }

  create() {
    if(this.coordinateForm.value.longitude && this.coordinateForm.value.latitude) {
      this.selectedCoordinates = [];
      this.coordinateService.create(this.coordinateForm.value.latitude, this.coordinateForm.value.longitude)
    }
  }

  delete() {
    this.coordinateService.delete(this.selectedCoordinates[0].id);
  }

  compare() {
    this.coordinateService.compare(this.selectedCoordinates[0], this.selectedCoordinates[1], 10).subscribe(result => this.result = result);
  }

  onCheckboxChange(coordinate: Coordinate) {
    console.log(coordinate)
    console.log(this.isSelected(coordinate))
    if(this.isSelected(coordinate)) {
      this.selectedCoordinates = this.selectedCoordinates.filter(p => p.id !== coordinate.id);
    }else if(this.selectedCoordinates.length < 2) {
      this.selectedCoordinates.push(coordinate)
    }
  }

  isSelected(coordinate: Coordinate): boolean {
    return this.selectedCoordinates.includes(coordinate);
  }
}
