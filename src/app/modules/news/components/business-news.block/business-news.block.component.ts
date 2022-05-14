import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-business-news-block',
  templateUrl: './business-news.block.component.html',
  styleUrls: ['./business-news.block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessNewsBlockComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
