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
  password = '';
  error = '';

  updateLength = (e: KeyboardEvent) => {
    const newInput = (e.target as HTMLInputElement).value;
    const inputInt = parseInt(newInput);
    const isPositiveNumber = !isNaN(inputInt) && inputInt > 0;
    if (isPositiveNumber) this.length = inputInt;
    console.log(this.length);
  };

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

  checkError = (): void | string => {
    const validLength = this.length > 0;
    if (!validLength) return 'Length is not valid.';

    const validOptions =
      this.includeUpperLetter ||
      this.includeLowerLetter ||
      this.includeNumber ||
      this.includeSymbol;
    if (!validOptions) return 'Tick at least one check box.';
  };

  generatePassword = () => {
    const error = this.checkError();
    console.log(error);
    if (error) {
      this.error = error;
      setTimeout(() => (this.error = ''), 5000);
      return;
    }
    this.password = 'NEW PASSWORD';
  };
}
