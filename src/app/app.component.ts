import { Component } from '@angular/core';

const letters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = ` !"#$%&'()*+,-./:;<=>?@[]^_\\` + '`{|}~';
const ERROR_SHOW = 5000;

const getRandomNum = (num: number) => Math.floor(Math.random() * num);
const getPassword = (length: number, options: string) => {
  const optionsLength = options.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    const index = getRandomNum(optionsLength);
    const char = options[index];
    result += char;
  }
  return result;
};

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

  getPasswordOption = () => {
    let result = '';
    if (this.includeLowerLetter) result += letters;
    if (this.includeUpperLetter) result += letters.toUpperCase();
    if (this.includeNumber) result += numbers;
    if (this.includeSymbol) result += symbols;
    return result;
  };

  generatePassword = () => {
    this.error = '';
    const error = this.checkError();
    if (error) {
      this.error = error;
      setTimeout(() => (this.error = ''), ERROR_SHOW);
      return;
    }
    const stringOption = this.getPasswordOption();
    const newPassword = getPassword(this.length, stringOption);
    this.password = newPassword;
  };
}
