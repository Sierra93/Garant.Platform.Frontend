import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile.page',
  templateUrl: './profile.page.component.html',
  styleUrls: ['./profile.page.component.scss'],
})
export class ProfilePageComponent {
  constructor() { }

  shifted: boolean = true;

  public removeShift(): void {
    this.shifted = false;
  }

  public addShift(): void {
    this.shifted = true;
  }

  public onMenuClick(): void {
    this.addShift();
  }
}
