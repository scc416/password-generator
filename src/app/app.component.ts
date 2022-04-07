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
    console.log('CLICK');
    this.includeUpperLetter = !this.includeUpperLetter;
  };
}
