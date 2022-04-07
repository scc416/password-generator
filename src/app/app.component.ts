import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  length = 0;
  includeUpperLetter = true;
  includeLowerLetter = true;
  includeNumber = true;
  includeSymbol = true;

  toggleUpperLetter = () => {
    this.includeUpperLetter = !this.includeUpperLetter;
  };
  toggleLowerLetter = () => {
    this.includeLowerLetter = !this.includeLowerLetter;
  };
  toggleNumber = () => {
    this.includeNumber = !this.includeNumber;
  };
  toggleSymbol = () => {
    this.includeSymbol = !this.includeSymbol;
  };
}
