import {Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';

interface Currency {
  txt: string;
  rate: number;
  cc: string;
}

@Component({
  selector: 'currency-app',
  template: `
    <div class="page-header">
      <h1>Конвертер валют</h1>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Валюта</th>
          <th>Обозначение</th>
          <th>Курс</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let curren of currency">
          <td *ngIf="curren.cc === 'USD' || curren.cc === 'EUR'">{{curren.txt}}</td>
          <td *ngIf="curren.cc === 'USD' || curren.cc === 'EUR'">{{curren.cc}}</td>
          <td *ngIf="curren.cc === 'USD' || curren.cc === 'EUR'">{{curren.rate}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="calcForm">
      <label for="in">Введите сумму для конвертации</label>
      <input (input)="calc1()" [(ngModel)] = "value1" type="number" id="in">
      <select (change)="calc1()" [(ngModel)]="input1" id="select1" >
        <option>USD</option>
        <option>EUR</option>
        <option>UAH</option>
      </select>
      <input (input)="calc2()" [(ngModel)] = "value2" type="number" id="out">
      <select (change)="calc1()" [(ngModel)]="input2" id="select2">
        <option>USD</option>
        <option>EUR</option>
        <option>UAH</option>
      </select>
    </div>`

})
export class AppComponent implements OnInit {

  value1:number;
  value2:number;
  input1:string;
  input2:string;

  calc1(): void {
    if (this.input1 === this.input2)
      this.value2 = this.value1
    for (let key in this.currency) {
      if (this.input1 === this.currency[key].cc && this.input2 === 'UAH')
        this.value2 = this.value1 * this.currency[key].rate
      if (this.input1 === 'UAH' && this.input2 === this.currency[key].cc)
        this.value2 = 1 / this.currency[key].rate * this.value1
      //
      if (this.input1 === this.currency[key].cc && (this.input2 !== 'UAH' && this.input2 !== this.input1)) {
        for (let key2 in this.currency) {
          if (this.input2 === this.currency[key2].cc)
            this.value2 = this.value1 * this.currency[key].rate / this.currency[key2].rate
        }
      }
    }
  }

  calc2(): void {
    if (this.input1 === this.input2)
      this.value1 = this.value2
    for (let key in this.currency) {
      if (this.input2 === this.currency[key].cc && this.input1 === 'UAH')
        this.value1 = this.value2 * this.currency[key].rate
      if (this.input2 === 'UAH' && this.input1 === this.currency[key].cc)
        this.value1 = 1 / this.currency[key].rate * this.value2
      //
      if (this.input2 === this.currency[key].cc && (this.input1 !== 'UAH' && this.input1 !== this.input2)){
        for (let key2 in this.currency) {
          if (this.input1 === this.currency[key2].cc)
            this.value1 = this.value2 * this.currency[key].rate / this.currency[key2].rate
        }
      }
    }
  }

  currency: Currency[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.http.get<Currency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json').subscribe
    (data => this.currency = data);
  }

}
