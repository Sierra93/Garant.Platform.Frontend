import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss'],
})
export class StatisticsCardComponent implements OnInit {
  @Input() pTitle: string = '';
  @Input() cTitle: string = '';
  @Input() cSubtitle: string = '';
  @Input() cText: string = '';

  constructor() {}

  ngOnInit(): void {}
}
