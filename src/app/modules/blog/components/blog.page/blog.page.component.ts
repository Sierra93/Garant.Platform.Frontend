import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog.page.component.html',
  styleUrls: ['./blog.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
