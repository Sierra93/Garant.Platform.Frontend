import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo.page.component.html',
  styleUrls: ['./demo.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoPageComponent implements OnInit {

  constructor() { }

  textInput: string | undefined;
  numberInput: number | undefined;
  selectInput: any;
  cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
  ];
  
  ngOnInit(): void {
  }

}
