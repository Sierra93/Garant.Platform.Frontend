import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss'],
})
export class SimpleCardComponent implements OnInit {
  @Input() pTitle: string = '';
  @Input() pText: string = '';

  constructor() {}

  ngOnInit(): void {
    
  }
}
