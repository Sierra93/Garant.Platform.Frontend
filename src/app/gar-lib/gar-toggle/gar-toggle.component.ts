import { Component, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { NgControl } from "@angular/forms";
import { GarBaseInputComponent } from "../gar-base-input/gar-base-input.component";

@Component({
  selector: 'gar-toggle',
  templateUrl: './gar-toggle.component.html',
  styleUrls: ['./gar-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GarToggleComponent extends GarBaseInputComponent<boolean> {
  
  @HostBinding('class.checked')
  get classChecked(): boolean {
    return <boolean>this.value;
  }

  constructor(
      protected readonly _cdRef: ChangeDetectorRef,
      protected readonly _control: NgControl
  ) {
    super(_cdRef, _control);
  }

}
