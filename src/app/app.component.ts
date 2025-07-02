import {Component, OnInit} from '@angular/core';
import {Coordinate} from "./model/Coordinate";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CoordinateService} from "./services/coordinate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  coordinates: Coordinate[] = [];
  coordinateForm = new FormGroup({
    latitude: new FormControl(null, {validators: Validators.required}),
    longitude: new FormControl(null, {validators: Validators.required}),
  });
  selectedCoordinates: Coordinate[] = [];
  result: boolean = false;
  showResult: boolean = false;

  constructor(
    private coordinateService: CoordinateService
  ) {
  }

  ngOnInit() {
    this.findAllCoordinate();
  }

  findAllCoordinate() {
    this.coordinateService.findAll().subscribe(data => this.coordinates = data);
  }

  create() {
    if(this.coordinateForm.value.longitude && this.coordinateForm.value.latitude) {
      this.coordinateService.create(this.coordinateForm.value.latitude, this.coordinateForm.value.longitude)
    }
  }

  delete() {
    this.coordinateService.delete(this.selectedCoordinates[0].id);
  }

  compare() {
    this.showResult = false;
    this.coordinateService.compare(this.selectedCoordinates[0], this.selectedCoordinates[1], 10).subscribe(result =>
      this.result = result);
    this.showResult = true;
  }

  onCheckboxChange(coordinate: Coordinate) {
    this.showResult = false;
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
