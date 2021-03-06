import { Component } from '@angular/core';

const letters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = ` !"#$%&'()*+,-./:;<=>?@[]^_\\` + '`{|}~';
const ERROR_SHOW = 5000;
const HINT_SHOW = 1500;
const MAX_LENGTH = 100;
const LENGTH_ERROR_MSG = 'The length is not a valid number.';
const TICK_ERROR_MSG = 'Tick at least one check box.';
const MAX_LENGTH_MSG = `The maximum length is ${MAX_LENGTH}`;

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

const isNum = (str: string) => {
  const isDot = str === '.';
  if (isDot) return true;

  const isNumber = numbers.includes(str);
  if (isNumber) return true;

  return false;
};

const isPureNum = (str: string) => {
  for (const char of str) {
    const isValidNum = isNum(char);
    if (!isValidNum) return false;
  }
  return true;
};

const getNewLength = (str: string) => {
  const inputInt = parseInt(str);

  const isWholePositiveNumber =
    inputInt > 0 &&
    inputInt.toString() === parseFloat(str).toString() &&
    isPureNum(str);

  if (isWholePositiveNumber) return inputInt;
  return 0;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  length = 8;
  includeUpperLetter = true;
  includeLowerLetter = true;
  includeNumber = true;
  includeSymbol = true;
  password = '';
  error = '';
  showHint = false;

  updateLength = (e: KeyboardEvent) => {
    const newInput = (e.target as HTMLInputElement).value;
    this.length = getNewLength(newInput);
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
    if (!validLength) return LENGTH_ERROR_MSG;

    const validOptions =
      this.includeUpperLetter ||
      this.includeLowerLetter ||
      this.includeNumber ||
      this.includeSymbol;
    if (!validOptions) return TICK_ERROR_MSG;

    if (this.length > MAX_LENGTH) return MAX_LENGTH_MSG;
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
      this.password = '';
      return;
    }
    const stringOption = this.getPasswordOption();
    const newPassword = getPassword(this.length, stringOption);
    this.password = newPassword;
  };

  copyPassword = () => {
    navigator.clipboard.writeText(this.password);
    this.showHint = true;
    setTimeout(() => (this.showHint = false), HINT_SHOW);
  };
}
