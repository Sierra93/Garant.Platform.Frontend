import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonDataService } from "../../../../services/common/common-data.service";
import { GarDestroyService } from "../../../../gar-lib/gar-destroy.service";

@Component({
  selector: 'app-news-page',
  templateUrl: './news.page.component.html',
  styleUrls: ['./news.page.component.scss'],
  providers: [GarDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPageComponent {
  
  constructor(
      private commonService: CommonDataService,
      private _destroy$: GarDestroyService
  ) { }

}
